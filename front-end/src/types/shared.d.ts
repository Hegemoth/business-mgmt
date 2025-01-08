import { ApiResponse, ApiResponseExt } from "./api";

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
  data: ApiResponseExt<T>
  // dataLength: number;
  enpointName: string;
  fulfilledTimeStamp: number;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isUninitialized: boolean;
  // original: ApiResponse<T>;
  originalArgs: QueryParams;
  requestId: string;
  reset: () => void;
  startedTimeStamp: number;
  status: string;
  // key: string;
}
