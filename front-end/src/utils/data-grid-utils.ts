import { GridColDef } from '@mui/x-data-grid';

export const enhanceColumns = (columns: GridColDef[]): GridColDef[] => {
  return columns.map((column, i) => {
    if (column.type !== 'actions') {
      return {
        ...column,
        headerAlign: 'left',
        align: 'left',
        ...(i === columns.length - 2 && { cellClassName: 'sx-pr' }), // Padding right at prior to last column
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
