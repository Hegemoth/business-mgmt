import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../constants/constants';
import { Organization } from '../../types/organization';

export const organizationApi = createApi({
  reducerPath: 'organizationApi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  endpoints: (builder) => ({
    getOrganizations: builder.query<Organization[], void>({
      query: () => '/organizations',
    }),
  }),
});

export const { useGetOrganizationsQuery } = organizationApi;
