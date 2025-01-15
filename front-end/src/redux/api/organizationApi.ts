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
    updateOrganization: builder.mutation<Organization, Partial<Organization>>({
      query: ({ id, ...body }) => ({
        url: `/organizations/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useLazyGetOrganizationsQuery,
  useUpdateOrganizationMutation,
} = organizationApi;
