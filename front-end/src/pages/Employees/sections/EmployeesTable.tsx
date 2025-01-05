import { Card, CardContent, CardHeader } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import BinaryIcon from '../../../components/BinaryIcon';
import Icon from '../../../components/Icon';
import IconTooltip from '../../../components/IconTooltip';
import { useTable } from '../../../hooks/useTable';
import { useTableColumns } from '../../../hooks/useTableColumns';
import { Employee } from '../../../types/employees';
import { ModalMode, TableId } from '../../../types/enums';

interface EmployeesTableProps {
  employees: Employee[];
  isLoading: boolean;
  setAddEditMode: (mode: ModalMode, data?: Employee) => void;
  setDeleteMode: (mode: ModalMode, data?: Employee) => void;
  setChangeActiveStatusMode: (mode: ModalMode, data?: Employee) => void;
}

const EmployeesTable = ({
  employees,
  isLoading,
  setAddEditMode,
  setDeleteMode,
  setChangeActiveStatusMode,
}: EmployeesTableProps) => {
  const columns = useTableColumns<Employee>([
    {
      field: 'firstName',
      headerName: 'Pracownik',
      renderCell: ({ row }) => `${row.firstName} ${row.lastName}`,
    },
    {
      field: 'active',
      headerName: 'Aktywny',
      renderCell: ({ row }) => <BinaryIcon condition={row.active} />,
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
          onClick={() => console.log('soon')}
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
  });

  return (
    <Card>
      <CardHeader
        title="Tabela pracowników"
        subheader="Dodaj i modyfikuj pracowników oraz zarządzaj ich stanowiskami"
      />
      <CardContent>
        <DataGrid
          rows={employees}
          columns={columns}
          loading={isLoading}
          {...dataGridProps}
        />
      </CardContent>
    </Card>
  );
};

export default EmployeesTable;
