import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../../shared/baseQuery';
import { ApiResponse, QueryParams } from '../../types/api';
import {
  Employee,
  EmployeeAssignment,
  EmployeeAssignmentData,
  EmployeeData,
  EmployeePosition,
  EmployeePositionData,
} from '../../types/employees';
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
        body,
      }),
    }),

    updateEmployee: builder.mutation<Employee, EmployeeData & { id: uuid }>({
      query: ({ id, ...body }) => ({
        url: `/employees/${id}`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteEmployee: builder.mutation<void, uuid>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
    }),

    getEmployeePositions: builder.query<ApiResponse<EmployeePosition>, QueryParams>({
      query: (params) => ({
        url: '/employeepositions',
        params,
      }),
    }),

    addEmployeePosition: builder.mutation<EmployeePosition, EmployeePositionData>({
      query: (body) => ({
        url: '/employeepositions',
        method: 'POST',
        body,
      }),
    }),

    updateEmployeePosition: builder.mutation<EmployeePosition, EmployeePositionData & { id: uuid }>(
      {
        query: ({ id, ...body }) => ({
          url: `/employeepositions/${id}`,
          method: 'PATCH',
          body,
        }),
      }
    ),

    deleteEmployeePosition: builder.mutation<void, uuid>({
      query: (id) => ({
        url: `/employeepositions/${id}`,
        method: 'DELETE',
      }),
    }),

    getEmployeeAssignments: builder.query<ApiResponse<EmployeeAssignment>, QueryParams>({
      query: (params) => ({
        url: '/employeeassignments',
        params,
      }),
    }),

    addEmployeeAssignment: builder.mutation<EmployeeAssignment, EmployeeAssignmentData>({
      query: (body) => ({
        url: '/employeeassignments',
        method: 'POST',
        body,
      }),
    }),

    updateEmployeeAssignment: builder.mutation<
      EmployeeAssignment,
      EmployeeAssignmentData & { id: uuid }
    >({
      query: ({ id, ...body }) => ({
        url: `/employeeassignments/${id}`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteEmployeeAssignment: builder.mutation<void, uuid>({
      query: (id) => ({
        url: `/employeeassignments/${id}`,
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
  useGetEmployeePositionsQuery,
  useLazyGetEmployeePositionsQuery,
  useAddEmployeePositionMutation,
  useUpdateEmployeePositionMutation,
  useDeleteEmployeePositionMutation,
  useGetEmployeeAssignmentsQuery,
  useLazyGetEmployeeAssignmentsQuery,
  useAddEmployeeAssignmentMutation,
  useUpdateEmployeeAssignmentMutation,
  useDeleteEmployeeAssignmentMutation,
} = employeesApi;
