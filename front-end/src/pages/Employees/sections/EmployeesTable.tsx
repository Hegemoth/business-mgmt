import { Card, CardContent, CardHeader } from '@mui/material';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import AvatarText from '../../../components/AvatarText';
import BinaryIcon from '../../../components/BinaryIcon';
import Cell from '../../../components/Cell';
import Icon from '../../../components/Icon';
import IconTooltip from '../../../components/IconTooltip';
import { useTable } from '../../../hooks/useTable';
import { useTableColumns } from '../../../hooks/useTableColumns';
import { error, indigo } from '../../../theme/colors';
import { Employee } from '../../../types/employees';
import { ModalMode, TableId } from '../../../types/enums';
import { AsyncPagination } from '../../../types/shared';
import EmployeesSubtable from './EmployeesSubtable';

interface EmployeesTableProps {
  employees: Employee[];
  asyncPagination: AsyncPagination<Employee>;
  setAddEditMode: (mode: ModalMode, data?: Employee) => void;
  setDeleteMode: (mode: ModalMode, data?: Employee) => void;
  setChangeActiveStatusMode: (mode: ModalMode, data?: Employee) => void;
  setAssignMode: (mode: ModalMode, data?: Employee) => void;
}

const EmployeesTable = ({
  employees,
  asyncPagination,
  setAddEditMode,
  setDeleteMode,
  setChangeActiveStatusMode,
  setAssignMode,
}: EmployeesTableProps) => {
  const columns = useTableColumns<Employee>([
    {
      field: 'firstName',
      headerName: 'Pracownik',
      renderCell: ({ row }) => (
        <AvatarText
          text={`${row.firstName} ${row.lastName}`}
          color={row.active ? indigo.main : error.main}
        />
      ),
    },
    {
      field: 'active',
      headerName: 'Aktywny',
      renderCell: ({ row }) => (
        <Cell>
          <BinaryIcon condition={row.active} />
        </Cell>
      ),
    },
    {
      field: 'email',
      headerName: 'E-mail',
    },
    {
      field: 'phone',
      headerName: 'Telefon',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Akcje',
      getActions: ({ row }) => [
        <IconTooltip
          icon={<Icon.Edit />}
          label="Edytuj pracownika"
          onClick={() => setAddEditMode(ModalMode.EDIT, row)}
          action
        />,
        <IconTooltip
          icon={<Icon.AddPerson />}
          label="Przypisz stanowisko"
          onClick={() => setAssignMode(ModalMode.ADD, row)}
          action
        />,
        <IconTooltip
          icon={row.active ? <Icon.Deactivate /> : <Icon.Activate />}
          label={row.active ? 'Deaktywuj' : 'Aktywuj'}
          onClick={() => setChangeActiveStatusMode(ModalMode.EDIT, row)}
          action
        />,
        <IconTooltip
          icon={<Icon.Delete />}
          label="Usuń pracownika"
          onClick={() => setDeleteMode(ModalMode.DELETE, row)}
          action
        />,
      ],
    },
  ]);

  const { dataGridProps } = useTable({
    apiRef: useGridApiRef(),
    uniqueId: TableId.EMPLOYEES,
    asyncPagination,
  });

  return (
    <Card>
      <CardHeader
        title="Tabela pracowników"
        subheader="Dodaj i modyfikuj pracowników oraz zarządzaj ich stanowiskami"
      />
      <CardContent>
        <DataGridPro
          rows={employees}
          columns={columns}
          getDetailPanelContent={({ row }) => (
            <EmployeesSubtable employee={row} />
          )}
          getDetailPanelHeight={() => "auto"}
          sx={{
            '& .MuiDataGrid-detailPanel': {
              overflow: 'visible',
            },
          }}
          {...dataGridProps}
        />
      </CardContent>
    </Card>
  );
};

export default EmployeesTable;
