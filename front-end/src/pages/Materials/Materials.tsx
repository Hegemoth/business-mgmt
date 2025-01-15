import { Alert, Button, Grid2 as Grid } from '@mui/material';
import { omitBy } from 'lodash';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../components/ConfirmationModal';
import Icon from '../../components/Icon';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Pill from '../../components/Pill';
import useAsyncPagination from '../../hooks/useAsyncPagination';
import { useModalMode } from '../../hooks/useModalMode';
import {
  useAddMaterialMutation,
  useDeleteMaterialMutation,
  useLazyGetMaterialsQuery,
  useUpdateMaterialMutation,
} from '../../redux/api/materialsApi';
import { ModalMode } from '../../types/enums';
import { Material, MaterialData } from '../../types/materials';
import { toastErr } from '../../utils/form-utils';
import AddEditMaterialModal from './modals/AddEditMaterialModal';
import MaterialsFilters from './sections/MaterialsFilters';
import MaterialsTable from './sections/MaterialsTable';

const Materials = () => {
  const { materials, refetch, filters, ResetButton, ...asyncPagination } =
    useAsyncPagination<Material>({
      lazyRtkQuery: useLazyGetMaterialsQuery as any,
      queryKey: 'materials',
    });

  const [addMaterial, addMaterialState] = useAddMaterialMutation();
  const [updateMaterial, updateMaterialState] = useUpdateMaterialMutation();
  const [deleteMaterial, deleteMaterialState] = useDeleteMaterialMutation();
  const [addEditMode, setAddEditMode, addEditValues] = useModalMode<Material>();
  const [deleteMode, setDeleteMode, deleteValues] = useModalMode<Material>();
  const [changeActiveStatusMode, setChangeActiveStatusMode, changeActiveStatusValues] =
    useModalMode<Material>();

  const onAddMaterial = (data: MaterialData): void => {
    const nonEmptyData = omitBy(data, (v) => v === '') as MaterialData;
    const promise = addMaterial(nonEmptyData);

    toast
      .promise(promise, {
        pending: 'Dodawanie materiału...',
        success: 'Pomyślnie dodano materiał',
        error: 'Nie udało się dodać materiału',
      })
      .then(() => {
        setAddEditMode(ModalMode.CLOSED);
        refetch();
      });
  };

  const onEditMaterial = (data: MaterialData): void => {
    if (!addEditValues) return toastErr();

    const promise = updateMaterial({ ...data, id: addEditValues.id });

    toast
      .promise(promise, {
        pending: 'Edytowanie materiału...',
        success: 'Pomyślnie edytowano materiał',
        error: 'Nie udało się edytować materiału',
      })
      .then(() => {
        setAddEditMode(ModalMode.CLOSED);
        refetch();
      });
  };

  const onDeleteMaterial = (): void => {
    if (!deleteValues) return toastErr();

    const promise = deleteMaterial(deleteValues.id);

    toast
      .promise(promise, {
        pending: 'Usuwanie materiału...',
        success: 'Pomyślnie usunięto materiał',
        error: 'Nie udało się usunąć materiału',
      })
      .then(() => {
        setDeleteMode(ModalMode.CLOSED);
        refetch();
      });
  };

  const onChangeMaterialActiveStatus = (): void => {
    if (!changeActiveStatusValues) return toastErr();

    const promise = updateMaterial({
      ...changeActiveStatusValues,
      active: !changeActiveStatusValues.active,
      id: changeActiveStatusValues.id,
    });

    toast
      .promise(promise, {
        pending: 'Zmiana statusu aktywności materiału...',
        success: 'Pomyślnie edytowano status aktywności materiału',
        error: 'Nie udało się zmienić statusu aktywności materiału',
      })
      .then(() => {
        setChangeActiveStatusMode(ModalMode.CLOSED);
        refetch();
      });
  };

  return (
    <PageContainer>
      <PageTitle
        title="Lista materiałów"
        rightContent={
          <Button
            variant="contained"
            startIcon={<Icon.Add />}
            onClick={() => setAddEditMode(ModalMode.ADD)}
          >
            Dodaj materiał
          </Button>
        }
        bottomContent={
          <>
            <Alert severity="info" color="success" sx={{ mb: 2 }}>
              <strong>Materiały</strong> - tak na potrzeby aplikacji zostały nazwane wszelkie
              podmioty zakupione na potrzeby organizacji.
            </Alert>
            <ResetButton />
          </>
        }
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <MaterialsFilters filters={filters} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <MaterialsTable
            materials={materials}
            asyncPagination={asyncPagination as any}
            {...{
              setAddEditMode,
              setDeleteMode,
              setChangeActiveStatusMode,
            }}
          />
        </Grid>
      </Grid>

      <AddEditMaterialModal
        mode={addEditMode}
        setMode={setAddEditMode}
        values={addEditValues}
        submit={addEditMode === ModalMode.ADD ? onAddMaterial : onEditMaterial}
        isLoading={addMaterialState.isLoading || updateMaterialState.isLoading}
      />

      <ConfirmationModal
        open={!!deleteMode}
        close={() => setDeleteMode(ModalMode.CLOSED)}
        onConfirm={onDeleteMaterial}
        title={
          <>
            Usuń materiał <Pill severity="error">{deleteValues?.name}</Pill>
          </>
        }
        isLoading={deleteMaterialState.isLoading}
        deletion
      >
        <Alert severity="error">
          Czy na pewno chcesz trwale usunąć ten materiał z bazy? Może to wpłynąć na dane Twojej
          organizacji.
        </Alert>
      </ConfirmationModal>

      <ConfirmationModal
        open={!!changeActiveStatusMode}
        close={() => setChangeActiveStatusMode(ModalMode.CLOSED)}
        onConfirm={onChangeMaterialActiveStatus}
        title={changeActiveStatusValues?.active ? 'Deaktywuj material' : 'Aktywuj material'}
        isLoading={updateMaterialState.isLoading}
      >
        <Alert severity="warning">
          Czy na pewno chcesz zmienić status materiału{' '}
          <Pill severity="warning">{changeActiveStatusValues?.name}</Pill> na{' '}
          <strong>{changeActiveStatusValues?.active ? 'nieaktywny' : 'aktywny'}</strong>?
        </Alert>
      </ConfirmationModal>
    </PageContainer>
  );
};

export default Materials;
