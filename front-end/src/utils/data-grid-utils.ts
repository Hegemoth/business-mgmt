import { GridColDef } from '@mui/x-data-grid';

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
