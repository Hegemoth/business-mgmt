import { DataGridProProps, GridApi as GridApiPro } from '@mui/x-data-grid-pro';
import { MutableRefObject } from 'react';
import Icon from '../components/Icon';
import { TableId } from '../types/enums';
import { AsyncPagination } from '../types/shared';

interface TableConfig {
  apiRef: MutableRefObject<GridApiPro | null>;
  uniqueId: TableId;
  asyncPagination?: AsyncPagination<any>;
  simpleTable?: boolean;
}

interface TableReturn {
  dataGridProps: Partial<DataGridProProps>;
}

export const useTable = ({
  apiRef,
  uniqueId,
  asyncPagination,
  simpleTable = false,
}: TableConfig): TableReturn => {
  if (simpleTable || !asyncPagination) {
    return {
      dataGridProps: {
        hideFooter: true,
      },
    };
  }

  return {
    dataGridProps: {
      apiRef: apiRef as MutableRefObject<GridApiPro>,
      className: `datagrid-${uniqueId}`,
      pagination: true,
      disableRowSelectionOnClick: true,
      disableColumnFilter: true,
      autoHeight: true,
      autosizeOptions: {
        includeHeaders: true,
        includeOutliers: true,
        outliersFactor: 1.5,
        expand: false,
      },
      pinnedColumns: { right: ['actions'] },
      pageSizeOptions: [25, 50],
      autosizeOnMount: true,
      sx: {
        '.actions-header': {
          borderLeft: '1px solid #ddd',
        },
        '.actions-column': {
          borderLeft: '1px solid #ddd',
        },
      },
      slots: {
        detailPanelExpandIcon: Icon.ChevronRight,
        detailPanelCollapseIcon: Icon.ExpandMore,
      },
      loading: asyncPagination.isFetching,
      rowCount: asyncPagination.dataLength,
      paginationMode: 'server',
      onPaginationModelChange: asyncPagination.changePagination,
      sortingMode: 'server',
      onSortModelChange: asyncPagination.changeSort,
      paginationModel: {
        page: asyncPagination.pageIndex as number,
        pageSize: asyncPagination.pageSize as number,
      },
    },
  };
};
