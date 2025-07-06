import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './../../api/baseQuery';
import type { IBook, IGetBooksResponse } from '../../../types/book.interface';
import type {
  IBorrowForm,
  Response,
  TBorrowSummary,
} from '../../../types/borrow.interface';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery,
  tagTypes: ['books', 'borrow-summary'],
  endpoints: builder => ({
    getBooks: builder.query<IGetBooksResponse, void>({
      query: () => '/books',
      providesTags: ['books'],
    }),
    addBook: builder.mutation({
      query: newBook => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['books'],
    }),
    deleteBook: builder.mutation({
      query: id => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books'],
    }),
    getBorrowSummary: builder.query<Response<TBorrowSummary[]>, unknown>({
      query: () => '/borrow',
      providesTags: ['borrow-summary'],
    }),
    getSingleBook: builder.query<Response<IBook>, string>({
      query: id => `/books/${id}`,
      providesTags: ['books'],
    }),
    borrowBook: builder.mutation<Response<IBook>, IBorrowForm>({
      query: body => ({
        url: `/borrow`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['books', 'borrow-summary'],
    }),
    updateBook: builder.mutation({
      query: body => ({
        url: `/books/${body._id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useGetBorrowSummaryQuery,
  useGetSingleBookQuery,
  useBorrowBookMutation,
  useUpdateBookMutation,
} = bookApi;
