import { DataGridProps, GridApi } from '@mui/x-data-grid';
import { MutableRefObject, useRef } from 'react';
import { TableId } from '../types/enums';

interface TableConfig {
  apiRef?: MutableRefObject<GridApi>;
  uniqueId?: TableId;
  simpleTable?: boolean;
}

interface TableReturn {
  dataGridProps: Partial<DataGridProps>;
}

export const useTable = ({
  apiRef,
  uniqueId,
  simpleTable = false,
}: TableConfig): TableReturn => {
  if (simpleTable) {
    return {
      dataGridProps: {
        hideFooter: true,
      },
    };
  }

  const isFirstRenderRef = useRef(true);

  const handleAutosizeColumns = () => {
    if (apiRef?.current) {
      apiRef.current.autosizeColumns();

      setTimeout(() => {
        isFirstRenderRef.current = false;
      }, 1000);
    }
  };

  const onStateChange = () => {
    if (apiRef?.current && isFirstRenderRef.current) {
      handleAutosizeColumns();
    }
  };

  return {
    dataGridProps: {
      className: `datagrid-${uniqueId}`,
      apiRef,
      pagination: true,
      disableRowSelectionOnClick: true,
      autoHeight: true,
      disableColumnFilter: true,
      autosizeOptions: {
        includeHeaders: true,
        includeOutliers: false,
        outliersFactor: 1.5,
        expand: false,
      },
      pageSizeOptions: [8, 25, 50],
      onStateChange,
      autosizeOnMount: true,
      sx: {
        '.actions-header': {
          borderLeft: '1px solid #ddd',
          borderRight: '1px solid #ddd',
        },
        '.actions-column': {
          borderLeft: '1px solid #ddd',
          borderRight: '1px solid #ddd',
        },
        '.MuiDataGrid-row--borderBottom': {
          gap: 2,
        },
        '.MuiDataGrid-row': {
          gap: 2,
        },
      },
    },
  };
};
