import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../../shared/baseQuery';
import { ApiResponse, QueryParams } from '../../types/api';
import { Product, ProductData } from '../../types/products';
import { uuid } from '../../types/shared';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<ApiResponse<Product>, QueryParams>({
      query: (params) => ({
        url: '/products',
        params,
      }),
    }),

    addProduct: builder.mutation<Product, ProductData>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
    }),

    updateProduct: builder.mutation<Product, ProductData & { id: uuid }>({
      query: ({ id, ...body }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteProduct: builder.mutation<void, uuid>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
