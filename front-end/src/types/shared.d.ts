import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid-pro';
import { ApiResponse, ApiResponseExt, QueryParams } from './api';
import { Product } from './products';

type uuid = string;
type DateType = Date | string;

type Severity = 'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success';

type OnlyData<T> = Omit<T, 'id' | 'orgId'>;
