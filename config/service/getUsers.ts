import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type IUsersResponse from "@/types/users.types";
import { HYDRATE } from "next-redux-wrapper";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/users",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getUsers: builder.query<IUsersResponse[], { limit: number; page: number }>({
      query: ({ limit, page }) => `?_limit=${limit}&_page=${page}`,
    }),
    getUsersById: builder.query<IUsersResponse, number>({
      query: (id) => `?id=${id}`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUsersByIdQuery,
  util: { getRunningQueriesThunk },
} = usersApi;
export const { getUsers, getUsersById } = usersApi.endpoints;
