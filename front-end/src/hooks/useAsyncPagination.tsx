import { Button } from '@mui/material';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import {
  fetchBaseQuery,
  TypedLazyQueryTrigger,
} from '@reduxjs/toolkit/query/react';
import { useMemo, useReducer, useState } from 'react';
import Icon from '../components/Icon';
import {
  ApiResponse,
  CustomParams,
  Filters,
  QueryParams,
  SimpleFilter,
} from '../types/api';
import { LazyRtkQueryResult } from '../types/shared';
import { getFilterName, getFilterValue } from '../utils/data-utils';
import { useDelayEffect } from './useDelayEffect';
import { filtersReducer } from './utils/filtersReducer';

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

type UseAsyncPaginationReturn<T, K extends string> = {
  page: number;
  pageIndex: number;
  pageSize: number;
  setPageSize: (size: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  goToPage: (page: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: number[];
  refetch: () => void;
  filters: Filters;
  sortKey: string | null;
  changeSort: (model: GridSortModel) => void;
  changePagination: (model: GridPaginationModel) => void;
  ResetButton: () => JSX.Element | null;
  currentData: ApiResponse<T>;
  dataLength: number;
  enpointName: string;
  fulfilledTimeStamp: number;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isUninitialized: boolean;
  original: ApiResponse<T>;
  originalArgs: QueryParams;
  requestId: string;
  reset: () => void;
  startedTimeStamp: number;
  status: string;
} & {
  [key in K]: T[];
};

export function useAsyncPagination<T, K extends string = string>({
  lazyRtkQuery,
  queryKey,
  queryParams,
  payload,
}: UseAsyncPaginationProps<T, K>): UseAsyncPaginationReturn<T, K> {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [sortKey, setSortKey] = useState(queryParams?.s || null);
  const [paramsState, setParamsState] = useState(queryParams);
  const [canRefetch, setCanRefetch] = useState(true);

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
    () => {
      if (canRefetch) {
        setParamsState({
          offset: pageSize * page,
          limit: pageSize,
          ...queryParams,
        });
        trigger({ ...paramsState, ...payload });
        setCanRefetch(false);
      } else {
        setCanRefetch(true);
      }
    },
    [paramsState, page, pageSize],
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
      JSON.stringify(queryParams?.f?.sort() || []) !==
      JSON.stringify(paramsState?.f?.sort() || []),
    [queryParams?.f, paramsState?.f]
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
      current: paramsState?.f,
    },
    refetch: () => trigger(result.originalArgs),
    ResetButton,
    sortKey,
    changeSort,
    changePagination,
    ...result,
  };
}

export default useAsyncPagination;
