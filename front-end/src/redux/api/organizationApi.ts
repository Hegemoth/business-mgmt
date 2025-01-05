import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../../shared/baseQuery';
import { ApiResponse, QueryParams } from '../../types/api';
import { Organization } from '../../types/organization';

export const organizationApi = createApi({
  reducerPath: 'organizationApi',
  baseQuery,
  endpoints: (builder) => ({
    getOrganizations: builder.query<ApiResponse<Organization>, QueryParams>({
      query: (params) => ({
        url: '/organizations',
        params,
      }),
    }),
  }),
});

export const { useGetOrganizationsQuery } = organizationApi;

// const defaultResponseTransform = <T>(
//   response: T[],
//   meta: FetchBaseQueryMeta
// ): ApiResponse<T> => ({
//   items: response,
//   total: Number(meta?.response?.headers.get('X-Total-Count')) || 0,
//   limit: Number(meta?.response?.headers.get('X-Limit')),
//   offset: Number(meta?.response?.headers.get('X-Offset')),
// });
