import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../../shared/baseQuery';
import { ApiResponse, QueryParams } from '../../types/api';
import {
  Employee,
  EmployeeData,
  EmployeePayload,
  EmployeePosition,
  EmployeePositionData,
} from '../../types/employees';
import { uuid } from '../../types/shared';

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery,
  endpoints: (builder) => ({
    getEmployees: builder.query<any, any>({
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

    getEmployeePositions: builder.query<
      ApiResponse<EmployeePosition>,
      QueryParams
    >({
      query: (params) => ({
        url: '/employeepositions',
        params,
      }),
    }),

    addEmployeePosition: builder.mutation<
      EmployeePosition,
      EmployeePositionData
    >({
      query: (body) => ({
        url: '/employeepositions',
        method: 'POST',
        body,
      }),
    }),

    updateEmployeePosition: builder.mutation<
      EmployeePosition,
      EmployeePositionData & { id: uuid }
    >({
      query: ({ id, ...body }) => ({
        url: `/employeepositions/${id}`,
        method: 'PUT',
        body,
      }),
    }),

    deleteEmployeePosition: builder.mutation<void, string>({
      query: (id) => ({
        url: `/employeepositions/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLazyGetEmployeesQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useLazyGetEmployeePositionsQuery,
  useAddEmployeePositionMutation,
  useUpdateEmployeePositionMutation,
  useDeleteEmployeePositionMutation,
} = employeesApi;
