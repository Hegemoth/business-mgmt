import {
  GridColDef,
  GridColTypeDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from '@mui/x-data-grid-pro';
import { get } from 'lodash';

export const enhanceColumns = (columns: GridColDef[]): GridColDef[] => {
  return columns.map((column) => {
    if (column.type !== 'actions') {
      return {
        ...column,
        headerAlign: 'left',
        align: 'left',
      };
    }

    return {
      ...column,
      headerAlign: 'center',
      align: 'center',
      resizable: false,
      headerClassName: 'actions-header',
      cellClassName: 'actions-column',
    };
  });
};

export const getNestedValues = (params: GridRenderCellParams<any, any, GridTreeNodeWithRender>) => {
  return get(params.row, params.field);
};

const currencyFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
});

export const dateFormatter = new Intl.DateTimeFormat('pl-PL', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export const displayAsPln: GridColTypeDef = {
  type: 'number',
  valueFormatter: (value) => currencyFormatter.format(Number(value ?? 0)),
};

export const displayAsPct: GridColTypeDef = {
  type: 'number',
  valueFormatter: (value) => (value !== undefined ? `${value}%` : '---'),
};

export const displayAsDate: GridColTypeDef = {
  type: 'date',
  valueFormatter: (value) => value && dateFormatter.format(new Date(value)),
};
