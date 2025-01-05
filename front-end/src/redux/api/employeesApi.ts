import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../../shared/baseQuery';
import { ApiResponse, QueryParams } from '../../types/api';
import { Employee, EmployeeData, EmployeePayload } from '../../types/employees';
import { uuid } from '../../types/shared';

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery,
  endpoints: (builder) => ({
    getEmployees: builder.query<ApiResponse<Employee>, QueryParams>({
      query: (params) => ({
        url: '/employees',
        params,
      }),
    }),

    addEmployee: builder.mutation<Employee, EmployeeData>({
      query: (body) => ({
        url: '/employees',
        method: 'POST',
        body: {
          ...body,
          active: true,
        },
      }),
    }),

    updateEmployee: builder.mutation<Employee, EmployeePayload & { id: uuid }>({
      query: ({ id, ...body }) => ({
        url: `/employees/${id}`,
        method: 'PUT',
        body,
      }),
    }),

    deleteEmployee: builder.mutation<void, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useLazyGetEmployeesQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeesApi;
