export type Export = string;

interface ApiResponse<T> {
  items: T[];
  total: number;
  limit: number | null;
  offset: number;
}

interface ApiResponseExt<T> extends ApiResponse<T> {
  aggregates: Record<string, number>;
}

interface SearchParams {
  f?: string[];
  s?: string;
}

interface PaginationParams {
  limit?: number;
  offset?: number;
}

type QueryParams = SearchParams & PaginationParams;

interface CustomHeaders {
  headers?: {
    'X-Org-Id': string;
  };
}
