import { apiSlice } from "../api/apiSlice";

import { io } from "socket.io-client";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (id) => `/message/all/${id}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheEntryRemoved, cacheDataLoaded, getState }
      ) {
        try {
          await cacheDataLoaded;
          const socket = io("http://localhost:5000", {
            reconnectionDelay: 1000,
            reconnection: true,
            reconnectionAttemps: 10,
            // transports: ["websocket"],
            agent: false,
            upgrade: false,
            rejectUnauthorized: false,
          });

          const { data: authData } = getState().auth;

          socket.on("newMessage", (data) => {
            console.log(data);
            const isMyMessage =
              data.sender.email === authData.email ||
              data.receiver.email === authData.email;
            if (isMyMessage) {
              updateCachedData((draft) => {
                console.log(JSON.parse(JSON.stringify(draft)));
                draft.messages?.push(data);
              });
            }
          });
        } catch (error) {}
        await cacheEntryRemoved;
      },
    }),
    // for infinite scroll
    getMoreMessages: builder.query({
      query: ({ page, id }) =>
        `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=${page}&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const messages = await queryFulfilled;
          if (messages?.data?.length > 0) {
            dispatch(
              apiSlice.util.updateQueryData("getMessages", id, (draft) => {
                draft.data.push(...messages?.data);
              })
            );
          }
        } catch (error) {}
      },
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: `/message/send`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetMoreMessagesQuery,
  useAddMessageMutation,
} = messagesApi;
