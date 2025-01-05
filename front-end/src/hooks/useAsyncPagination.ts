import { TypedLazyQueryTrigger } from '@reduxjs/toolkit/query/react';
import { useState } from 'react';
import { QueryParams } from '../types/api';

interface UseAsyncPaginationProps {
  lazyRtkQuery: TypedLazyQueryTrigger<
    { _page: number; _limit: number; selectFromResult?: any },
    { items: any[]; total: number } | undefined,
    any
  >;
  queryKey: string;
  params?: QueryParams;
}

interface UseAsyncPaginationReturn<T> {
  [key: string]: T[];
  page: number;
  pageIndex: number;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: number[];
  gotoPage: (pageIndex: number) => void;
  refetch: () => void;
  isLoading: boolean;
  isError: boolean;
  dataLength: number;
}

export const useAsyncPagination = <T>({
  lazyRtkQuery,
  queryKey,
  params,
}: UseAsyncPaginationProps): UseAsyncPaginationReturn<T> => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const [trigger, result] = lazyRtkQuery({
    _page: page,
    _limit: pageSize,
    selectFromResult: ({ data, ...rest }) => ({
      [queryKey]: rest.isError ? [] : data?.items || [],
      dataLength: data?.total || 0,
      original: data,
      ...rest,
    }),
  });

  const data = result.data || { items: [], total: 0 };

  const previousPage = (): void => {
    setPage(page - 1);
  };

  const nextPage = (): void => {
    setPage(page + 1);
  };

  return {
    [queryKey]: !result.isError ? data.items : [],
    page: page + 1,
    pageIndex: page,
    pageSize,
    setPageSize,
    previousPage,
    nextPage,
    canPreviousPage: page > 0,
    canNextPage: pageSize * (page + 1) < result.dataLength,
    pageOptions: Array.from(
      Array(Math.ceil(result.dataLength / pageSize)).keys()
    ),
    gotoPage: setPage,
    refetch: () => trigger(result.originalArgs),
    isLoading: result.isLoading,
    isError: result.isError,
  };
};
