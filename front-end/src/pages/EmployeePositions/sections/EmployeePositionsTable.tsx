import { Card, CardContent, CardHeader } from '@mui/material';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import AvatarText from '../../../components/AvatarText';
import Cell from '../../../components/Cell';
import ColorMark from '../../../components/ColorMark';
import Icon from '../../../components/Icon';
import IconTooltip from '../../../components/IconTooltip';
import { useTable } from '../../../hooks/useTable';
import { useTableColumns } from '../../../hooks/useTableColumns';
import { EmployeePosition } from '../../../types/employees';
import { ModalMode, TableId } from '../../../types/enums';
import { AsyncPagination } from '../../../types/shared';

interface EmployeePositionsTableProps {
  positions: EmployeePosition[];
  asyncPagination: AsyncPagination<EmployeePosition>;
  setAddEditMode: (mode: ModalMode, data?: EmployeePosition) => void;
  setDeleteMode: (mode: ModalMode, data?: EmployeePosition) => void;
}

const EmployeePositionsTable = ({
  positions,
  asyncPagination,
  setAddEditMode,
  setDeleteMode,
}: EmployeePositionsTableProps) => {
  const columns = useTableColumns<EmployeePosition>([
    {
      field: 'name',
      headerName: 'Stanowisko',
      renderCell: ({ row, value }) => <AvatarText text={value} color={row.color} />,
    },
    {
      field: 'color',
      headerName: 'Kolor',
      renderCell: ({ value }) => (
        <Cell>
          <ColorMark color={value} />
        </Cell>
      ),
      sortable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Akcje',
      getActions: ({ row }) => [
        <IconTooltip
          icon={<Icon.Edit />}
          label="Edytuj stanowisko"
          onClick={() => setAddEditMode(ModalMode.EDIT, row)}
          action
        />,
        <IconTooltip
          icon={<Icon.Delete />}
          label="Usuń stanowisko"
          onClick={() => setDeleteMode(ModalMode.DELETE, row)}
          action
        />,
      ],
    },
  ]);

  const { dataGridProps } = useTable({
    apiRef: useGridApiRef(),
    uniqueId: TableId.EMPLOYEE_POSITIONS,
    asyncPagination,
  });

  return (
    <Card>
      <CardHeader title="Tabela stanowisk" subheader="Dodaj i modyfikuj stanowiska" />
      <CardContent>
        <DataGridPro rows={positions} columns={columns} key={positions.length} {...dataGridProps} />
      </CardContent>
    </Card>
  );
};

export default EmployeePositionsTable;
