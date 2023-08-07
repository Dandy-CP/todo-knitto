import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type ITodoResponse from "@/types/todo.types";
import { HYDRATE } from "next-redux-wrapper";

export const toDoApi = createApi({
  reducerPath: "toDoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/todos",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getToDoList: builder.query<ITodoResponse, { limit: number; page: number }>({
      query: ({ limit, page }) => `?_limit=${limit}&_page=${page}`,
    }),
    getToDoById: builder.query<ITodoResponse, number>({
      query: (id) => `?id=${id}`,
    }),
    getToDoByUserId: builder.query<ITodoResponse, number>({
      query: (userID) => `?userId=${userID}`,
    }),
    getToDoByStatus: builder.query<
      ITodoResponse,
      { status: boolean; limit: number; page: number }
    >({
      query: ({ status, limit, page }) =>
        `?completed=${status}&_limit=${limit}&_page=${page}`,
    }),
    postNewTodo: builder.mutation<
      ITodoResponse,
      { title: string; completed: boolean }
    >({
      query: ({ title, completed }) => ({
        url: "https://jsonplaceholder.typicode.com/todos",
        method: "POST",
        body: {
          title,
          completed,
        },
      }),
      transformResponse: (result: ITodoResponse) => result,
    }),
  }),
});

export const {
  useGetToDoListQuery,
  useGetToDoByIdQuery,
  usePostNewTodoMutation,
  util: { getRunningQueriesThunk },
} = toDoApi;

export const { getToDoList, getToDoById, getToDoByUserId, getToDoByStatus } =
  toDoApi.endpoints;
