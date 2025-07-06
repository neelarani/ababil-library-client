import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { BASE_URL } from '../../utils/env';

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});
