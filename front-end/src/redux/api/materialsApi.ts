import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../../shared/baseQuery';
import { ApiResponse, QueryParams } from '../../types/api';
import { Material, MaterialData } from '../../types/materials';
import { uuid } from '../../types/shared';

export const materialsApi = createApi({
  reducerPath: 'materialsApi',
  baseQuery,
  endpoints: (builder) => ({
    getMaterials: builder.query<ApiResponse<Material>, QueryParams>({
      query: (params) => ({
        url: '/materials',
        params,
      }),
    }),

    addMaterial: builder.mutation<Material, MaterialData>({
      query: (body) => ({
        url: '/materials',
        method: 'POST',
        body,
      }),
    }),

    updateMaterial: builder.mutation<Material, MaterialData & { id: uuid }>({
      query: ({ id, ...body }) => ({
        url: `/materials/${id}`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteMaterial: builder.mutation<void, uuid>({
      query: (id) => ({
        url: `/materials/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMaterialsQuery,
  useLazyGetMaterialsQuery,
  useAddMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
} = materialsApi;
