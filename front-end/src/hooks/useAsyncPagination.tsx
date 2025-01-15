import { Button } from '@mui/material';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid-pro';
import { fetchBaseQuery, TypedLazyQueryTrigger } from '@reduxjs/toolkit/query/react';
import { useEffect, useMemo, useReducer, useState } from 'react';
import Icon from '../components/Icon';
import { ApiResponse, CustomParams, QueryParams } from '../types/api';
import { LazyRtkQueryResult } from '../types/pagination';
import { getFilterName, getFilterValue } from '../utils/data-utils';
import { filtersReducer } from './useAsyncPagination/filtersReducer';

interface ResetButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

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
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState(queryParams?.s || null);
  const [payload, setPayload] = useState(initialPayload || {});
  const [paramsState, setParamsState] = useState<QueryParams | null>(null);

  const [filtersState, dispatchFilters] = useReducer(filtersReducer, queryParams?.f || []);

  const [trigger, result] = lazyRtkQuery({
    selectFromResult: (res: LazyRtkQueryResult) => ({
      [queryKey]: res.isError ? [] : res.data?.items || [],
      dataLength: res.data?.total || 0,
      original: res.data,
      aggregates: res.data?.aggregates || null,
      ...res,
    }),
  }) as unknown as QueryOperationResult<T, K>;

  useEffect(() => {
    if (paramsState) {
      trigger({
        ...paramsState,
        offset: pageSize * page,
        limit: pageSize,
        ...payload,
      });
    } else {
      setParamsState({
        offset: pageSize * page,
        limit: pageSize,
        ...queryParams,
      });
      trigger({ ...queryParams, ...payload });
    }
  }, [paramsState, page, pageSize, payload]);

  useEffect(() => {
    paramsState &&
      setParamsState({
        ...paramsState,
        f: filtersState,
      });
  }, [filtersState]);

  useEffect(() => {
    paramsState &&
      setParamsState({
        ...paramsState,
        s: sortKey || undefined,
      });
  }, [sortKey]);

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

    model[0].sort === 'asc' ? setSortKey(model[0].field) : setSortKey(`-${model[0].field}`);
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

  const getFilterValueByName = (name: string, i?: number): string => {
    const arr = filtersState
      .filter((f) => getFilterName(f) === name)
      .map((f) => ({
        name: getFilterName(f),
        value: getFilterValue(f),
      }));

    if (i) return arr[i]?.value || '';
    return arr[0]?.value || '';
  };

  const isFiltersChanged = useMemo(
    () => JSON.stringify(queryParams?.f?.sort() || []) !== JSON.stringify(filtersState?.sort()),
    [queryParams?.f, filtersState]
  );

  const ResetButton = ({ onClick }: ResetButtonProps): JSX.Element | null => {
    if (!isFiltersChanged) {
      return null;
    }

    return (
      <Button
        variant="outlined"
        color="error"
        onClick={onClick || resetFilters}
        startIcon={<Icon.Clear />}
      >
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
    pageOptions: Array.from(Array(Math.ceil(result.dataLength / pageSize)).keys()),
    filters: {
      add: addFilter,
      replace: replaceFilter,
      remove: removeFilter,
      reset: resetFilters,
      getFilterValueByName,
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
