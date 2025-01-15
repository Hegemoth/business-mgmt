import { Alert, Button, Grid2 as Grid } from '@mui/material';
import { omitBy } from 'lodash';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../components/ConfirmationModal';
import Icon from '../../components/Icon';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Pill from '../../components/Pill';
import { useAsyncPagination } from '../../hooks/useAsyncPagination';
import { useModalMode } from '../../hooks/useModalMode';
import {
  useAddEmployeeAssignmentMutation,
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeePositionsQuery,
  useLazyGetEmployeesQuery,
  useUpdateEmployeeMutation,
} from '../../redux/api/employeesApi';
import { Employee, EmployeeAssignmentData, EmployeeData } from '../../types/employees';
import { ModalMode } from '../../types/enums';
import { getFullName } from '../../utils/data-utils';
import { toastErr } from '../../utils/form-utils';
import AddEditEmployeeModal from './modals/AddEditEmployeeModal';
import AssignEmployeePositionModal from './modals/AssignEmployeePositionModal';
import EmployeesFilters from './sections/EmployeesFilters.tsx';
import { EmployeesSubtableRef } from './sections/EmployeesSubtable.tsx';
import EmployeesTable from './sections/EmployeesTable';

const Employees = () => {
  const subtableRef = useRef<EmployeesSubtableRef>(null!);

  const { employees, refetch, filters, ResetButton, ...asyncPagination } =
    useAsyncPagination<Employee>({
      lazyRtkQuery: useLazyGetEmployeesQuery as any,
      queryKey: 'employees',
    });

  const { positions } = useGetEmployeePositionsQuery(
    { limit: 50 },
    {
      selectFromResult: ({ data }) => ({
        positions: data?.items || [],
      }),
    }
  );

  const [addEmployee, addEmployeeState] = useAddEmployeeMutation();
  const [updateEmployee, updateEmployeeState] = useUpdateEmployeeMutation();
  const [deleteEmployee, deleteEmployeeState] = useDeleteEmployeeMutation();
  const [addAssignment, addAssignmentState] = useAddEmployeeAssignmentMutation();
  const [addEditMode, setAddEditMode, addEditValues] = useModalMode<Employee>();
  const [deleteMode, setDeleteMode, deleteValues] = useModalMode<Employee>();
  const [assignMode, setAssignMode, assignValues] = useModalMode<Employee>();
  const [changeActiveStatusMode, setChangeActiveStatusMode, changeActiveStatusValues] =
    useModalMode<Employee>();

  const onAddEmployee = (data: EmployeeData): void => {
    const nonEmptyData = omitBy(data, (v) => v === '') as EmployeeData;
    const promise = addEmployee(nonEmptyData);

    toast
      .promise(promise, {
        pending: 'Dodawanie pracownika...',
        success: 'Pomyślnie dodano pracownika',
        error: 'Nie udało się dodać pracownika',
      })
      .then(() => {
        setAddEditMode(ModalMode.CLOSED);
        refetch();
      });
  };

  const onEditEmployee = (data: EmployeeData): void => {
    if (!addEditValues) return toastErr();

    const promise = updateEmployee({ ...data, id: addEditValues.id });

    toast
      .promise(promise, {
        pending: 'Edytowanie pracownika...',
        success: 'Pomyślnie edytowano pracownika',
        error: 'Nie udało się edytować pracownika',
      })
      .then(() => {
        setAddEditMode(ModalMode.CLOSED);
        refetch();
      });
  };

  const onDeleteEmployee = (): void => {
    if (!deleteValues) return toastErr();

    const promise = deleteEmployee(deleteValues.id);

    toast
      .promise(promise, {
        pending: 'Usuwanie pracownika...',
        success: 'Pomyślnie usunięto pracownika',
        error: 'Nie udało się usunąć pracownika',
      })
      .then(() => {
        setDeleteMode(ModalMode.CLOSED);
        refetch();
      });
  };

  const onChangeEmployeeActiveStatus = (): void => {
    if (!changeActiveStatusValues) return toastErr();

    const promise = updateEmployee({
      ...changeActiveStatusValues,
      active: !changeActiveStatusValues.active,
      id: changeActiveStatusValues.id,
    });

    toast
      .promise(promise, {
        pending: 'Zmiana statusu aktywności pracownika...',
        success: 'Pomyślnie edytowano status aktywności pracownika',
        error: 'Nie udało się zmienić statusu aktywności pracownika',
      })
      .then(() => {
        setChangeActiveStatusMode(ModalMode.CLOSED);
        refetch();
      });
  };

  const onAssignPosition = (data: Omit<EmployeeAssignmentData, 'employeeId'>): void => {
    if (!assignValues) return toastErr();

    const promise = addAssignment({
      ...data,
      employeeId: assignValues.id,
    }).unwrap();

    toast
      .promise(promise, {
        pending: 'Przypisywanie stanowiska...',
        success: 'Pomyślnie przypisano stanowisko',
        error: 'Nie udało się przypisać stanowiska',
      })
      .then(() => {
        setAssignMode(ModalMode.CLOSED);
        refetch();
        subtableRef?.current?.refetchAssignments();
      });
  };

  return (
    <PageContainer>
      <PageTitle
        title="Pracownicy"
        rightContent={
          <Button
            variant="contained"
            startIcon={<Icon.Add />}
            onClick={() => setAddEditMode(ModalMode.ADD)}
          >
            Dodaj pracownika
          </Button>
        }
        bottomContent={<ResetButton />}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <EmployeesFilters filters={filters} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <EmployeesTable
            ref={subtableRef}
            employees={employees}
            asyncPagination={asyncPagination as any}
            {...{
              setAddEditMode,
              setDeleteMode,
              setChangeActiveStatusMode,
              setAssignMode,
            }}
          />
        </Grid>
      </Grid>

      <AddEditEmployeeModal
        mode={addEditMode}
        setMode={setAddEditMode}
        values={addEditValues}
        submit={addEditMode === ModalMode.ADD ? onAddEmployee : onEditEmployee}
        isLoading={addEmployeeState.isLoading || updateEmployeeState.isLoading}
      />

      <ConfirmationModal
        open={!!deleteMode}
        close={() => setDeleteMode(ModalMode.CLOSED)}
        onConfirm={onDeleteEmployee}
        title={
          <>
            Usuń pracownika <Pill severity="error">{getFullName(deleteValues)}</Pill>
          </>
        }
        isLoading={deleteEmployeeState.isLoading}
        deletion
      >
        <Alert severity="error">
          Czy na pewno chcesz trwale usunąć tego pracownika z bazy? Może to wpłynąć na dane Twojej
          organizacji.
        </Alert>
      </ConfirmationModal>

      <ConfirmationModal
        open={!!changeActiveStatusMode}
        close={() => setChangeActiveStatusMode(ModalMode.CLOSED)}
        onConfirm={onChangeEmployeeActiveStatus}
        title={changeActiveStatusValues?.active ? 'Deaktywuj pracownika' : 'Aktywuj pracownika'}
        isLoading={updateEmployeeState.isLoading}
      >
        <Alert severity="warning">
          Czy na pewno chcesz zmienić status użytkownika{' '}
          <Pill severity="warning">{getFullName(changeActiveStatusValues)}</Pill> na{' '}
          <strong>{changeActiveStatusValues?.active ? 'nieaktywny' : 'aktywny'}</strong>?
        </Alert>
      </ConfirmationModal>

      <AssignEmployeePositionModal
        mode={assignMode}
        setMode={() => setAssignMode(ModalMode.CLOSED)}
        positions={positions}
        submit={onAssignPosition}
        isLoading={addAssignmentState.isLoading}
      />
    </PageContainer>
  );
};

export default Employees;
