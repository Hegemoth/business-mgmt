import { Alert, Button, Grid2 as Grid } from '@mui/material';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../components/ConfirmationModal';
import Icon from '../../components/Icon';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Pill from '../../components/Pill';
import useAsyncPagination from '../../hooks/useAsyncPagination';
import { useModalMode } from '../../hooks/useModalMode';
import {
  useAddMaterialPurchaseMutation,
  useDeleteMaterialPurchaseMutation,
  useLazyGetMaterialPurchasesQuery,
} from '../../redux/api/materialsApi';
import { ModalMode } from '../../types/enums';
import { MaterialPurchase, MaterialPurchaseData } from '../../types/materials';
import { toastErr } from '../../utils/form-utils';
import AddMaterialPurchaseModal from './modals/AddMaterialPurchaseModal';
import MaterialPurchasesTable from './sections/MaterialPurchaseTable';

const MaterialPurchases = () => {
  const { purchases, refetch, filters, ResetButton, ...asyncPagination } =
    useAsyncPagination<MaterialPurchase>({
      lazyRtkQuery: useLazyGetMaterialPurchasesQuery as any,
      queryKey: 'purchases',
      queryParams: {
        s: '-date',
      },
    });

  const [addMaterialPurchase, addMaterialPurchaseState] = useAddMaterialPurchaseMutation();
  const [deleteMaterialPurchase, deleteMaterialPurchaseState] = useDeleteMaterialPurchaseMutation();
  const [addMode, setAddMode] = useModalMode<MaterialPurchase>();
  const [deleteMode, setDeleteMode, deleteValues] = useModalMode<MaterialPurchase>();
  useModalMode<MaterialPurchase>();

  const onAddPurchase = (data: MaterialPurchaseData): void => {
    const promise = addMaterialPurchase(data);

    toast
      .promise(promise, {
        pending: 'Dodawanie zakupu...',
        success: 'Pomyślnie dodano zakup',
        error: 'Nie udało się dodać zakupu',
      })
      .then(() => {
        setAddMode(ModalMode.CLOSED);
        refetch();
      });
  };

  const onDeletePurchase = (): void => {
    if (!deleteValues) return toastErr();

    const promise = deleteMaterialPurchase(deleteValues.id);

    toast
      .promise(promise, {
        pending: 'Usuwanie zakupu...',
        success: 'Pomyślnie usunięto zakup',
        error: 'Nie udało się usunąć zakupu',
      })
      .then(() => {
        setDeleteMode(ModalMode.CLOSED);
        refetch();
      });
  };

  return (
    <PageContainer>
      <PageTitle
        title="Kupno materiałów"
        rightContent={
          <Button
            variant="contained"
            startIcon={<Icon.Add />}
            onClick={() => setAddMode(ModalMode.ADD)}
          >
            Dodaj zakup
          </Button>
        }
        bottomContent={<ResetButton />}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <MaterialPurchasesTable
            purchases={purchases}
            asyncPagination={asyncPagination as any}
            {...{ setDeleteMode, refetch }}
          />
        </Grid>
      </Grid>

      <AddMaterialPurchaseModal
        mode={addMode}
        setMode={setAddMode}
        submit={onAddPurchase}
        isLoading={addMaterialPurchaseState.isLoading}
      />

      <ConfirmationModal
        open={!!deleteMode}
        close={() => setDeleteMode(ModalMode.CLOSED)}
        onConfirm={onDeletePurchase}
        title={
          <>
            Usuń zakup <Pill severity="error">{deleteValues?.date}</Pill>
          </>
        }
        isLoading={deleteMaterialPurchaseState.isLoading}
        deletion
      >
        <Alert severity="error">
          Czy na pewno chcesz trwale usunąć ten zakup z bazy? Może to wpłynąć na dane Twojej
          organizacji.
        </Alert>
      </ConfirmationModal>
    </PageContainer>
  );
};

export default MaterialPurchases;
