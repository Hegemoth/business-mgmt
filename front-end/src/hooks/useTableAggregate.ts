import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { get } from 'lodash';
import { AGGREGATE_ROW } from '../constants/constants';

export const useTableAggregate = <T extends GridValidRowModel>(
  aggregatedColumns: Record<keyof T, boolean>
) => {
  const displayAggregates = (columns: GridColDef<T>[]): GridColDef<T>[] => {
    return columns.map((column) => {
      if (get(aggregatedColumns, column.field)) {
        return column;
      }

      if (column.type === 'actions') {
        return {
          ...column,
          getActions: () => [],
        };
      }

      return {
        ...column,
        renderCell: (params) => {
          if (params.row.id === AGGREGATE_ROW) {
            return null;
          }

          return column.renderCell?.(params) || params.value || undefined;
        },
      };
    });
  };

  return [displayAggregates] as const;
};
