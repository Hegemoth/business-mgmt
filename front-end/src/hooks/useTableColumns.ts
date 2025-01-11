import { GridColDef, GridValidRowModel } from '@mui/x-data-grid-pro';
import { useMemo } from 'react';
import { enhanceColumns } from '../utils/data-grid-utils';
import { useTableAggregate } from './useTableAggregate';

export const useTableColumns = <T extends GridValidRowModel>(
  columns: GridColDef<T>[],
  params?: {
    aggregateColumns: Record<keyof T, boolean>;
  }
): GridColDef<T>[] => {
  return useMemo(() => {
    if (
      params?.aggregateColumns &&
      Object.keys(params.aggregateColumns).length > 0
    ) {
      const [displayAggregation] = useTableAggregate<T>(
        params.aggregateColumns
      );
      
      return displayAggregation(enhanceColumns(columns));
    }

    return enhanceColumns(columns);
  }, []);
};
