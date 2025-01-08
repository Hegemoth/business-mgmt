import { Alert, Button, Grid2 as Grid } from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../components/ConfirmationModal';
import Icon from '../../components/Icon';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Pill from '../../components/Pill';
import { useModalMode } from '../../hooks/useModalMode';
import {
  useAddEmployeePositionMutation,
  useDeleteEmployeePositionMutation,
  useLazyGetEmployeePositionsQuery,
  useUpdateEmployeePositionMutation,
} from '../../redux/api/employeesApi';
import { EmployeePosition, EmployeePositionData } from '../../types/employees';
import { ModalMode } from '../../types/enums';
import { toastErr } from '../../utils/form-utils';
import AddEditEmployeePositionModal from './modals/AddEditEmployeePositionModal';
import EmployeePositionsTable from './sections/EmployeePositionsTable';

const EmployeePositions = () => {
  const [getPositions, positions] = useLazyGetEmployeePositionsQuery();
  const [addPosition, addPositionState] = useAddEmployeePositionMutation();
  const [updatePosition, updatePositionState] =
    useUpdateEmployeePositionMutation();
  const [deletePosition, deletePositionState] =
    useDeleteEmployeePositionMutation();
  const [addEditMode, setAddEditMode, addEditValues] =
    useModalMode<EmployeePosition>();
  const [deleteMode, setDeleteMode, deleteValues] =
    useModalMode<EmployeePosition>();

  const onAddEmployeePosition = (data: EmployeePositionData): void => {
    const nonEmptyData = _.omitBy(
      data,
      (v) => v === ''
    ) as EmployeePositionData;

    const promise = addPosition(nonEmptyData);

    toast
      .promise(promise, {
        pending: 'Dodawanie stanowiska...',
        success: 'Pomyślnie dodano stanowisko',
        error: 'Nie udało się dodać stanowiska',
      })
      .then(() => {
        setAddEditMode(ModalMode.CLOSED);
        getPositions({});
      });
  };

  const onEditEmployeePosition = (data: EmployeePositionData): void => {
    if (!addEditValues) return toastErr();

    const promise = updatePosition({ ...data, id: addEditValues.id });

    toast
      .promise(promise, {
        pending: 'Edytowanie stanowiska...',
        success: 'Pomyślnie edytowano stanowisko',
        error: 'Nie udało się edytować stanowiska',
      })
      .then(() => {
        setAddEditMode(ModalMode.CLOSED);
        getPositions({});
      });
  };

  const onDeleteEmployeePosition = (): void => {
    if (!deleteValues) return toastErr();

    const promise = deletePosition(deleteValues.id);

    toast
      .promise(promise, {
        pending: 'Usuwanie stanowiska...',
        success: 'Pomyślnie usunięto stanowisko',
        error: 'Nie udało się usunąć stanowiska',
      })
      .then(() => {
        setDeleteMode(ModalMode.CLOSED);
        getPositions({});
      });
  };

  useEffect(() => {
    getPositions({});
  }, []);

  if (!positions.data) return null;

  return (
    <PageContainer>
      <PageTitle
        title="Stanowiska"
        rightContent={
          <Button
            variant="contained"
            startIcon={<Icon.Add />}
            onClick={() => setAddEditMode(ModalMode.ADD)}
          >
            Dodaj stanowisko
          </Button>
        }
      />

      <Grid container>
        <Grid size={{ xs: 12 }}>
          <EmployeePositionsTable
            positions={positions.data.items}
            isLoading={positions.isFetching}
            {...{ setAddEditMode, setDeleteMode }}
          />
        </Grid>
      </Grid>

      <AddEditEmployeePositionModal
        mode={addEditMode}
        setMode={setAddEditMode}
        values={addEditValues}
        submit={
          addEditMode === ModalMode.ADD
            ? onAddEmployeePosition
            : onEditEmployeePosition
        }
        isLoading={addPositionState.isLoading || updatePositionState.isLoading}
      />

      <ConfirmationModal
        open={!!deleteMode}
        close={() => setDeleteMode(ModalMode.CLOSED)}
        onConfirm={onDeleteEmployeePosition}
        title={
          <>
            Usuń stanowisko <Pill severity="error">{deleteValues?.name}</Pill>
          </>
        }
        isLoading={deletePositionState.isLoading}
        deletion
      >
        <Alert severity="error">
          Czy na pewno chcesz trwale usunąć to stanowisko z bazy? Może to
          wpłynąć na dane Twojej organizacji.
        </Alert>
      </ConfirmationModal>
    </PageContainer>
  );
};

export default EmployeePositions;
