import { apiSlice } from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";
import { io } from "socket.io-client";
// X-Total-Count

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => `/message`,
      async onCacheEntryAdded(
        arg,
        {
          updateCachedData,
          cacheDataLoaded,
          dispatch,
          cacheEntryRemoved,
          getState,
        }
      ) {
        const socket = io("http://localhost:5000", {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttemps: 10,
          // transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
        });
        try {
          await cacheDataLoaded;
          const { data: authData } = getState().auth;
          socket.on("newConversation", (data) => {
            const isMyMessage =
              data?.conversation?.createdBy?.email === authData.email ||
              data?.conversation?.participant?.email === authData.email;
            updateCachedData((draft) => {
              if (isMyMessage) {
                const conversation = draft?.conversations?.find(
                  (c) => c._id === data.conversation._id
                );
                if (conversation) {
                  conversation.updatedAt = data.conversation.updatedAt;
                  const updatedConversation = draft?.conversations?.map((c) => {
                    if (c._id === data.conversation._id) {
                      return conversation;
                    }
                    return c;
                  });
                  draft.conversations = updatedConversation;
                } else {
                  draft?.conversations?.unshift(data.conversation);
                }
              }
            });
          });
        } catch (error) {}
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    // for infinite scroll
    getMoreConversations: builder.query({
      query: ({ page, email }) =>
        `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=${page}&_limit=${process.env.REACT_APP_CONVERSATION_PER_PAGE}`,
      async onQueryStarted({ email }, { dispatch, queryFulfilled }) {
        try {
          const conversations = await queryFulfilled;
          if (conversations?.data?.length > 0) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getConversations",
                email,
                (draft) => {
                  draft.data.push(...conversations?.data);
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
    getConversation: builder.query({
      query: ({ userEmail, participantEmail }) =>
        `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
    }),
    addConversation: builder.mutation({
      query: (data) => ({
        url: `/message`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(
        { users, message, timestamp },
        { dispatch, queryFulfilled }
      ) {
        const conversaction = await queryFulfilled;
        if (conversaction?.data?.id) {
          // silent to message table;
          //   dispatch(
          //     messagesApi.endpoints.addMessage.initiate({
          //       conversationId: conversaction?.data?.id,
          //       sender: users[0],
          //       receiver: users[1],
          //       message: message,
          //       timestamp: timestamp,
          //     })
          //   );
        }
      },
    }),
    editConversation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(
        { id, data: { users, message, timestamp } },
        { queryFulfilled, dispatch }
      ) {
        // now it is not needed because we are using socket.io
        // update conversations cache pessimistically
        // const pathResult1 = dispatch(
        //     apiSlice.util.updateQueryData(
        //         "getConversations",
        //         users[0].email,
        //         (draft) => {
        //             const draftConversation = draft.find((c) => c.id === id);
        //             draftConversation.message = message;
        //             draftConversation.timestamp = timestamp;
        //         }
        //     )
        // );

        try {
          const conversaction = await queryFulfilled;

          if (conversaction?.data?.id) {
            // silent to message table;
            await dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversationId: conversaction?.data?.id,
                sender: users[0],
                receiver: users[1],
                message: message,
                timestamp: timestamp,
              })
            ).unwrap();
            //  now it is not needed because we are using socket.io
            // update messages cache pessimistically
            // dispatch(
            //     apiSlice.util.updateQueryData(
            //         "getMessages",
            //         String(res.conversationId), // covertion id
            //         (draft) => {
            //             draft.push({
            //                 id: Date.now(),
            //                 conversationId: id,
            //                 sender: users[0],
            //                 receiver: users[1],
            //                 message: message,
            //                 timestamp: timestamp
            //             })
            //         }
            //     )
            // );
          }
        } catch (error) {
          // console.log({ error });
          // pathResult1.undo();
        }
      },
    }),

    // messages
  }),
});

export const {
  useGetConversationsQuery,
  useGetMoreConversationsQuery,
  useGetConversationQuery,
  useAddConversationMutation,
  useEditConversationMutation,
} = conversationsApi;
