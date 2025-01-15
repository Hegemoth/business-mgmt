import { Alert, Card, CardContent, CardHeader, Grow, Stack } from '@mui/material';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AvatarText from '../../../components/AvatarText';
import BinaryIcon from '../../../components/BinaryIcon';
import Cell from '../../../components/Cell';
import Icon from '../../../components/Icon';
import IconTooltip from '../../../components/IconTooltip';
import { useTable } from '../../../hooks/useTable';
import { useTableColumns } from '../../../hooks/useTableColumns';
import { getHintsVisible, toggleHintsVisible } from '../../../redux/slices/hintsSlice';
import { error, indigo } from '../../../theme/colors';
import { Employee } from '../../../types/employees';
import { ModalMode, TableId } from '../../../types/enums';
import { AsyncPagination } from '../../../types/pagination';
import EmployeesSubtable, { EmployeesSubtableRef } from './EmployeesSubtable';

interface EmployeesTableProps {
  employees: Employee[];
  asyncPagination: AsyncPagination<Employee>;
  setAddEditMode: (mode: ModalMode, data?: Employee) => void;
  setDeleteMode: (mode: ModalMode, data?: Employee) => void;
  setChangeActiveStatusMode: (mode: ModalMode, data?: Employee) => void;
  setAssignMode: (mode: ModalMode, data?: Employee) => void;
}

const hints = [
  'Aby zarządzać stanowiskami danego pracownika, rozwiń wiersz przy jego nazwisku.',
  'Po najechaniu na nazwę kolumny zobaczysz ikonę strzałki oraz menu oznaczone trzema kropkami.',
  'Użyj strzałek przy nazwach kolumn do sortowania wierszy.',
  'W menu przy nazwie kolumny znajdziesz takie opcje jak przypięcie kolumn i ukrycie ich.',
  'Możesz zmienić kolejność kolumn poprzez przeciągnięcie ich w inne miejsce.',
];

const EmployeesTable = forwardRef(
  (
    {
      employees,
      asyncPagination,
      setAddEditMode,
      setDeleteMode,
      setChangeActiveStatusMode,
      setAssignMode,
    }: EmployeesTableProps,
    ref: React.ForwardedRef<EmployeesSubtableRef>
  ) => {
    const dispatch = useDispatch();
    const hintVisible = useSelector(getHintsVisible);
    const [currentHint, setCurrentHint] = useState(0);

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

    useEffect(() => {
      if (!hintVisible) return;

      const interval = setInterval(() => {
        setCurrentHint((prev) => (prev + 1) % hints.length);
      }, 10000);

      return () => clearInterval(interval);
    }, [hintVisible]);

    return (
      <Card>
        <CardHeader
          title="Tabela pracowników"
          subheader="Dodaj i modyfikuj pracowników oraz zarządzaj ich stanowiskami"
          action={
            <Stack flexDirection="row" alignItems="flex-start" height="100%">
              <Grow in={hintVisible} unmountOnExit>
                <Alert severity="info">
                  <Stack flexDirection="row" gap={1.5}>
                    {hints[currentHint]}
                    <IconTooltip
                      icon={<Icon.Close />}
                      label="Wyłącz podpowiedzi"
                      onClick={() => dispatch(toggleHintsVisible())}
                      noPadding
                    />
                  </Stack>
                </Alert>
              </Grow>
              {!hintVisible && (
                <IconTooltip
                  icon={<Icon.ChevronLeft />}
                  label="Włącz podpowiedzi"
                  onClick={() => dispatch(toggleHintsVisible())}
                />
              )}
            </Stack>
          }
        />
        <CardContent>
          <DataGridPro
            rows={employees}
            columns={columns}
            key={employees.length}
            getDetailPanelContent={({ row }) => <EmployeesSubtable ref={ref} employee={row} />}
            getDetailPanelHeight={() => 'auto'}
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
  }
);

export default EmployeesTable;
