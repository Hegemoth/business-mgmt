import { Button } from '@mui/material';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid-pro';
import {
  fetchBaseQuery,
  TypedLazyQueryTrigger,
} from '@reduxjs/toolkit/query/react';
import { useMemo, useReducer, useState } from 'react';
import Icon from '../components/Icon';
import {
  ApiResponse,
  CustomParams,
  QueryParams,
  SimpleFilter,
} from '../types/api';
import { LazyRtkQueryResult } from '../types/shared';
import { getFilterName, getFilterValue } from '../utils/data-utils';
import { filtersReducer } from './useAsyncPagination/filtersReducer';
import { useDelayEffect } from './useDelayEffect';

type LazyRtkQueryResultExtended<T, K extends string> = LazyRtkQueryResult & {
  dataLength: number;
  original: ApiResponse<T>;
  aggregates: Record<string, number> | null;
} & {
  [key in K]: T[];
};

type QueryOperationResult<T, K extends string> = [
  (params: CustomParams) => void,
  LazyRtkQueryResultExtended<T, K>
];

type UseAsyncPaginationProps<T, K extends string> = {
  lazyRtkQuery: TypedLazyQueryTrigger<
    ApiResponse<T>,
    CustomParams,
    ReturnType<typeof fetchBaseQuery>
  >;
  queryKey: K;
  queryParams?: QueryParams;
  payload?: Record<string, any>;
};

export function useAsyncPagination<T, K extends string = string>({
  lazyRtkQuery,
  queryKey,
  queryParams,
  payload: initialPayload,
}: UseAsyncPaginationProps<T, K>) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [sortKey, setSortKey] = useState(queryParams?.s || null);
  const [payload, setPayload] = useState(initialPayload || {});

  const [filtersState, dispatchFilters] = useReducer(
    filtersReducer,
    queryParams?.f || []
  );

  const [trigger, result] = lazyRtkQuery({
    selectFromResult: (res: LazyRtkQueryResult) => ({
      [queryKey]: res.isError ? [] : res.data?.items || [],
      dataLength: res.data?.total || 0,
      original: res.data,
      aggregates: res.data?.aggregates || null,
      ...res,
    }),
  }) as unknown as QueryOperationResult<T, K>;

  useDelayEffect(
    () =>
      trigger({
        ...queryParams,
        offset: pageSize * page,
        limit: pageSize,
        ...payload,
      }),
    [page, pageSize, payload],
    100
  );

  const previousPage = (): void => {
    setPage(page - 1);
  };

  const nextPage = (): void => {
    setPage(page + 1);
  };

  const changePagination = (model: GridPaginationModel): void => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  const changeSort = (model: GridSortModel): void => {
    if (!model.length) {
      return setSortKey(null);
    }

    model[0].sort === 'asc'
      ? setSortKey(model[0].field)
      : setSortKey(`-${model[0].field}`);
  };

  const addFilter = (filters: string[]): void => {
    dispatchFilters({ type: 'add', filters });
    setPage(0);
  };

  const replaceFilter = (filters: string[]): void => {
    dispatchFilters({ type: 'replace', filters });
    setPage(0);
  };

  const removeFilter = (filters: string[]): void => {
    dispatchFilters({ type: 'remove', filters });
    setPage(0);
  };

  const resetFilters = (): void => {
    dispatchFilters({ type: 'reset', filters: queryParams?.f || [] });
    setPage(0);
  };

  const getFilterByName = (name: string): SimpleFilter[] => {
    return filtersState
      .filter((f) => getFilterName(f) === name)
      .map((f) => ({
        name: getFilterName(f),
        value: getFilterValue(f),
      }));
  };

  const isFiltersChanged = useMemo(
    () =>
      JSON.stringify(queryParams?.f?.sort()) !==
      JSON.stringify(filtersState?.sort()),
    [queryParams?.f, filtersState]
  );

  const ResetButton = (): JSX.Element | null => {
    if (!isFiltersChanged) {
      return null;
    }

    return (
      <Button color="error" onClick={resetFilters} startIcon={<Icon.Clear />}>
        Wyczyść filtry
      </Button>
    );
  };

  return {
    page: page + 1,
    pageIndex: page,
    pageSize,
    setPageSize,
    previousPage,
    nextPage,
    goToPage: setPage,
    refetch: () => trigger(result.originalArgs),
    canPreviousPage: page > 0,
    canNextPage: result.dataLength - pageSize * page > pageSize,
    pageOptions: Array.from(
      Array(Math.ceil(result.dataLength / pageSize)).keys()
    ),
    filters: {
      add: addFilter,
      replace: replaceFilter,
      remove: removeFilter,
      reset: resetFilters,
      getFilterByName,
      current: filtersState,
    },
    ResetButton,
    sortKey,
    setSortKey,
    setPayload,
    changeSort,
    changePagination,
    ...result,
  } as const;
}

export default useAsyncPagination;
