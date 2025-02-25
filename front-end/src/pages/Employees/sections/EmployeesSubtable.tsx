import { Alert, Card } from '@mui/material';
import { DataGridPro, useGridApiContext, useGridApiRef } from '@mui/x-data-grid-pro';
import { forwardRef, useImperativeHandle } from 'react';
import { toast } from 'react-toastify';
import AvatarText from '../../../components/AvatarText';
import ConfirmationModal from '../../../components/ConfirmationModal';
import Icon from '../../../components/Icon';
import IconTooltip from '../../../components/IconTooltip';
import InnerTableWrapper from '../../../components/InnerTableWrapper';
import Pill from '../../../components/Pill';
import { translateMap } from '../../../helpers/language-helpers';
import useAsyncPagination from '../../../hooks/useAsyncPagination';
import { useModalMode } from '../../../hooks/useModalMode';
import { useTable } from '../../../hooks/useTable';
import { useTableColumns } from '../../../hooks/useTableColumns';
import {
  useDeleteEmployeeAssignmentMutation,
  useGetEmployeePositionsQuery,
  useLazyGetEmployeeAssignmentsQuery,
  useUpdateEmployeeAssignmentMutation,
} from '../../../redux/api/employeesApi';
import { Employee, EmployeeAssignment, EmployeeAssignmentData } from '../../../types/employees';
import { ModalMode, TableId } from '../../../types/enums';
import { displayAsDate, displayAsPln } from '../../../utils/data-grid-utils';
import { getFullName } from '../../../utils/data-utils';
import { toastErr } from '../../../utils/form-utils';
import EditAssignmentModal from '../modals/EditAssignmentModal';

export interface EmployeesSubtableRef {
  refetchAssignments: () => void;
}

interface EmployeesSubtableProps {
  employee: Employee;
}

const EmployeesSubtable = forwardRef(
  ({ employee }: EmployeesSubtableProps, ref: React.ForwardedRef<EmployeesSubtableRef>) => {
    const { assignments, refetch, ...asyncPagination } = useAsyncPagination<EmployeeAssignment>({
      lazyRtkQuery: useLazyGetEmployeeAssignmentsQuery as any,
      queryKey: 'assignments',
      queryParams: {
        f: [`employeeId:${employee.id}`],
      },
    });

    useImperativeHandle(ref, () => ({
      refetchAssignments: () => refetch(),
    }));

    const { positions } = useGetEmployeePositionsQuery(
      { limit: 50 },
      {
        selectFromResult: ({ data }) => ({
          positions: data?.items || [],
        }),
      }
    );

    const [updateAssignment, updateAssignmentState] = useUpdateEmployeeAssignmentMutation();
    const [deleteAssignment, deleteAssignmentState] = useDeleteEmployeeAssignmentMutation();
    const [editMode, setEditMode, editValues] = useModalMode<EmployeeAssignment>();
    const [deleteMode, setDeleteMode, deleteValues] = useModalMode<EmployeeAssignment>();

    const onEditAssignment = (data: Omit<EmployeeAssignmentData, 'employeeId'>): void => {
      if (!editValues) return toastErr();

      const { id, employeeId } = editValues;
      const promise = updateAssignment({ ...data, id, employeeId });

      toast
        .promise(promise, {
          pending: 'Edytowanie przypisania...',
          success: 'Pomyślnie edytowano przypisanie',
          error: 'Nie udało się edytować przypisania',
        })
        .then(() => {
          setEditMode(ModalMode.CLOSED);
          refetch();
        });
    };

    const onDeleteAssignment = (): void => {
      if (!deleteValues) return toastErr();

      const promise = deleteAssignment(deleteValues.id);

      toast
        .promise(promise, {
          pending: 'Usuwanie przypisania...',
          success: 'Pomyślnie usunięto przypisanie',
          error: 'Nie udało się usunąć przypisania',
        })
        .then(() => {
          setDeleteMode(ModalMode.CLOSED);
          refetch();
        });
    };

    const columns = useTableColumns<EmployeeAssignment>([
      {
        field: 'positionId',
        headerName: 'Stanowisko',
        renderCell: ({ row }) => {
          const position = positions.find((p) => p.id === row.positionId);
          return position ? <AvatarText text={position.name} color={position.color} /> : null;
        },
        sortable: false,
      },
      {
        field: 'employmentType',
        headerName: 'Forma zatrudnienia',
        sortable: false,
      },
      {
        field: 'empStart',
        headerName: 'Początek zatrudnienia',
        ...displayAsDate,
        renderCell: ({ formattedValue }) => <Pill>{formattedValue}</Pill>,
      },
      {
        field: 'empEnd',
        headerName: 'Koniec zatrudnienia',
        ...displayAsDate,
        renderCell: ({ formattedValue }) =>
          formattedValue ? <Pill>{formattedValue}</Pill> : '---',
      },
      {
        field: 'paymentPeriod',
        headerName: 'Naliczanie wynagrodzenia',
        renderCell: ({ row }) => `${translateMap[row.paymentPeriod] as any}`,
      },
      {
        field: 'rate',
        headerName: 'Stawka',
        ...displayAsPln,
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Akcje',
        getActions: ({ row }) => [
          <IconTooltip
            icon={<Icon.Edit />}
            label="Edytuj przypisanie"
            onClick={() => setEditMode(ModalMode.EDIT, row)}
            action
          />,
          <IconTooltip
            icon={<Icon.Delete />}
            label="Usuń przypisanie"
            onClick={() => setDeleteMode(ModalMode.DELETE, row)}
            action
          />,
        ],
      },
    ]);

    const apiRef = useGridApiContext();

    const { dataGridProps } = useTable({
      apiRef: useGridApiRef(),
      uniqueId: TableId.EMPLOYEES_SUBTABLE,
      asyncPagination: asyncPagination as any,
    });

    return (
      <InnerTableWrapper apiRef={apiRef}>
        <Card>
          <DataGridPro
            rows={assignments}
            columns={columns}
            key={assignments.length}
            {...dataGridProps}
          />
        </Card>

        <EditAssignmentModal
          mode={editMode}
          setMode={() => setEditMode(ModalMode.CLOSED)}
          values={editValues}
          submit={onEditAssignment}
          isLoading={updateAssignmentState.isLoading}
        />

        <ConfirmationModal
          open={!!deleteMode}
          close={() => setDeleteMode(ModalMode.CLOSED)}
          onConfirm={onDeleteAssignment}
          title="Usuń przypisanie pracownika"
          isLoading={deleteAssignmentState.isLoading}
          deletion
        >
          <Alert severity="warning">
            Czy na pewno chcesz usunąć przypisanie pracownika{' '}
            <Pill severity="warning">{getFullName(employee)}</Pill> do stanowiska{' '}
            <Pill severity="warning">
              {positions.find((p) => p.id === deleteValues?.positionId)?.name}
            </Pill>
            ?
          </Alert>
        </ConfirmationModal>
      </InnerTableWrapper>
    );
  }
);

export default EmployeesSubtable;
