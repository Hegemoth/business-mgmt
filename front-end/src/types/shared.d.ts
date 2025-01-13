import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid-pro';
import { ApiResponse, ApiResponseExt, QueryParams } from './api';

type uuid = string;

type DateType = Date | string;

type Severity =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'warning'
  | 'success';

interface LazyRtkQueryResult {
  currentData: ApiResponse<T>;
  data: ApiResponseExt<T>;
  enpointName: string;
  fulfilledTimeStamp: number;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isUninitialized: boolean;
  originalArgs: QueryParams;
  requestId: string;
  reset: () => void;
  startedTimeStamp: number;
  status: string;
}

type AsyncPagination<T> = Partial<
  {
    page: number;
    pageIndex: number;
    pageSize: number;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    previousPage: () => void;
    nextPage: () => void;
    goToPage: React.Dispatch<React.SetStateAction<number>>;
    refetch: () => void;
    canPreviousPage: boolean;
    canNextPage: boolean;
    pageOptions: number[];
    filters: {
      readonly add: (filters: string[]) => void;
      readonly replace: (filters: string[]) => void;
      readonly remove: (filters: string[]) => void;
      readonly reset: () => void;
      readonly getFilterValueByName: (name: string) => string;
      readonly current: string[];
    };
    ResetButton: () => Element | null;
    sortKey: string | null;
    setSortKey: React.Dispatch<React.SetStateAction<string | null>>;
    setPayload: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    changeSort: (model: GridSortModel) => void;
    changePagination: (model: GridPaginationModel) => void;
    currentData: ApiResponse<T>;
    data: ApiResponseExt<T>;
    enpointName: string;
    fulfilledTimeStamp: number;
    isError: boolean;
    isFetching: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isUninitialized: boolean;
    originalArgs: QueryParams;
    requestId: string;
    reset: () => void;
    startedTimeStamp: number;
    status: string;
    dataLength: number;
    original: ApiResponse<T>;
    aggregates: Record<string, number> | null;
  } & {
    [key: string]: T[];
  }
>;
