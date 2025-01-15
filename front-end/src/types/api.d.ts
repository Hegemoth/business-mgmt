import { uuid } from './shared';

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

type CustomParams = QueryParams & Record<string, any>;

interface CustomHeaders {
  headers?: {
    'X-Org-Id': uuid;
  };
}

interface Filters {
  add: (params: string[]) => void;
  replace: (params: string[]) => void;
  remove: (params: string[]) => void;
  reset: () => void;
  getFilterValueByName: (param: string) => string;
  current?: string[];
}

type FilterAction = 'add' | 'remove' | 'replace' | 'reset';
