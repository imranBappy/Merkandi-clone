import { apiSlice } from "../api/apiSlice";

const url = `/image`;
export const imageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postImages: builder.mutation({
      query: (body) => ({
        url: `${url}/bulk`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Image"],
    }),
    getImages: builder.query({
      query: (page) => `${url}?page=${page || 1}}`,
      providesTags: ["Image"],
    }),

    getMoreImages: builder.query({
      query: (page) => `${url}?page=${page || 1}}`,
      async onQueryStarted(page, { dispatch, queryFulfilled }) {
        try {
          const image = await queryFulfilled;
          if (image?.data?.data.length > 0) {
            dispatch(
              apiSlice.util.updateQueryData("getImages", 1, (draft) => {
                draft.data.push(...image?.data?.data);
              })
            );
          }
        } catch (error) {
          console.log({ error });
        }
      },
      // providesTags: ["Image"],
    }),
    searchImages: builder.query({
      query: (term) => `${url}/search?term=${term || ""}}`,
      providesTags: ["Image"],

      async onQueryStarted(term, { dispatch, queryFulfilled }) {
        try {
          const image = await queryFulfilled;
          if (image?.data?.data.length > 0) {
            dispatch(
              apiSlice.util.updateQueryData("searchImages", term, (draft) => {
                draft.data = image?.data?.data;
              })
            );
          }
        } catch (error) {
          console.log({ error });
        }
      },
    }),
    deleteImage: builder.mutation({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Image", id }],
    }),
  }),
});

export const {
  usePostImagesMutation,
  useGetImagesQuery,
  useDeleteImageMutation,
  useSearchImagesQuery,
} = imageApi;
