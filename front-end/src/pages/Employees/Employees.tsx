import { Alert, Button, Grid2 as Grid } from '@mui/material';
import _ from 'lodash';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../components/ConfirmationModal';
import Icon from '../../components/Icon';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Pill from '../../components/Pill';
import { useModalMode } from '../../hooks/useModalMode';
import {
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
  useLazyGetEmployeesQuery,
  useUpdateEmployeeMutation,
} from '../../redux/api/employeesApi';
import { Employee, EmployeeData } from '../../types/employees';
import { ModalMode } from '../../types/enums';
import { toastErr } from '../../utils/data-utils';
import AddEditEmployeeModal from './modals/AddEditEmployeeModal';
import EmployeesTable from './sections/EmployeesTable';

const Employees = () => {
  const [getEmployees, lazyEmployees] = useLazyGetEmployeesQuery();
  const [addEmployee, addEmployeeState] = useAddEmployeeMutation();
  const [updateEmployee, updateEmployeeState] = useUpdateEmployeeMutation();
  const [deleteEmployee, deleteEmployeeState] = useDeleteEmployeeMutation();

  const { employees, isLoadingEmployees } = useGetEmployeesQuery(
    {},
    {
      selectFromResult: (r) => ({
        employees: r.data?.items || [],
        isLoadingEmployees: r.isFetching,
        rest: r,
      }),
    }
  );

  const [addEditMode, setAddEditMode, addEditValues] = useModalMode<Employee>();
  const [deleteMode, setDeleteMode, deleteValues] = useModalMode<Employee>();
  const [
    changeActiveStatusMode,
    setChangeActiveStatusMode,
    changeActiveStatusValues,
  ] = useModalMode<Employee>();

  const onAddEmployee = (data: EmployeeData): void => {
    const nonEmptyData = _.omitBy(data, (v) => v === '') as EmployeeData;
    const promise = addEmployee(nonEmptyData);

    toast
      .promise(promise, {
        pending: 'Dodawanie pracownika...',
        success: 'Pomyślnie dodano pracownika',
        error: 'Nie udało się dodać pracownika',
      })
      .then(() => {
        setAddEditMode(ModalMode.CLOSED);
        getEmployees({});
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
        getEmployees({});
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
        setChangeActiveStatusMode(ModalMode.CLOSED);
        getEmployees({});
      });
  };

  const onChangeEmployeeActiveState = (): void => {
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
        getEmployees({});
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
      />

      <Grid container>
        <Grid size={{ xs: 12 }}>
          <EmployeesTable
            employees={lazyEmployees.data?.items || employees}
            isLoading={isLoadingEmployees}
            {...{ setAddEditMode, setDeleteMode, setChangeActiveStatusMode }}
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
            Usuń pracownika{' '}
            <Pill severity="error">
              {deleteValues?.firstName} {deleteValues?.lastName}
            </Pill>
          </>
        }
        isLoading={deleteEmployeeState.isLoading}
      >
        <Alert severity="error">
          Czy na pewno chcesz trwale usunąć tego pracownika z bazy? Może to
          wpłynąć na dane Twojej organizacji.
        </Alert>
      </ConfirmationModal>

      <ConfirmationModal
        open={!!changeActiveStatusMode}
        close={() => setChangeActiveStatusMode(ModalMode.CLOSED)}
        onConfirm={onChangeEmployeeActiveState}
        title={
          changeActiveStatusValues?.active
            ? 'Deaktywuj pracownika'
            : 'Aktywuj pracownika'
        }
        isLoading={updateEmployeeState.isLoading}
      >
        <Alert severity="warning">
          Czy na pewno chcesz zmienić status użytkownika{' '}
          <Pill severity="warning">
            {changeActiveStatusValues?.firstName}{' '}
            {changeActiveStatusValues?.lastName}
          </Pill>{' '}
          na{' '}
          <strong>
            {changeActiveStatusValues?.active ? 'nieaktywny' : 'aktywny'}
          </strong>
          ?
        </Alert>
      </ConfirmationModal>
    </PageContainer>
  );
};

export default Employees;
