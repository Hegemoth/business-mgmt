import { Alert, Button, Card, CardContent, CardHeader } from '@mui/material';
import { DataGridPro, useGridApiContext, useGridApiRef } from '@mui/x-data-grid-pro';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../../components/ConfirmationModal';
import Icon from '../../../components/Icon';
import IconTooltip from '../../../components/IconTooltip';
import InnerTableWrapper from '../../../components/InnerTableWrapper';
import Pill from '../../../components/Pill';
import { useModalMode } from '../../../hooks/useModalMode';
import { useTable } from '../../../hooks/useTable';
import { useTableColumns } from '../../../hooks/useTableColumns';
import { useUpdateMaterialPurchaseMutation } from '../../../redux/api/materialsApi';
import { ModalMode, TableId } from '../../../types/enums';
import { MaterialPurchase, MaterialPurchaseItem } from '../../../types/materials';
import { getUnit } from '../../../utils/data-utils';
import { apiToHumanMonth } from '../../../utils/date-utils';
import { toastErr } from '../../../utils/form-utils';
import AddMaterialPurchaseItemModal from '../modals/AddMaterialPurchaseItemModal';
import EditMaterialPurchaseItemModal from '../modals/EditMaterialPurchaseItemModal';

interface MaterialPurchaseSubtableProps {
  purchase: MaterialPurchase;
  refetch: () => void;
}

const MaterialPurchaseSubtable = ({ purchase, refetch }: MaterialPurchaseSubtableProps) => {
  const [addMode, setAddMode] = useModalMode<MaterialPurchaseItem>();
  const [editMode, setEditMode, editValues] = useModalMode<MaterialPurchaseItem>();
  const [deleteMode, setDeleteMode, deleteValues] = useModalMode<MaterialPurchaseItem>();

  const [updateMaterialPurchase, updateMaterialPurchaseStatus] =
    useUpdateMaterialPurchaseMutation();

  const addMatierialPurchaseItem = (data: MaterialPurchaseItem): void => {
    const promise = updateMaterialPurchase({
      ...purchase,
      items: [...purchase.items, data],
    });

    toast
      .promise(promise, {
        pending: 'Dodawanie materiału do zakupu...',
        success: 'Dodano materiał do zakupu',
        error: 'Nie udało się dodać materiału do zakupu',
      })
      .then(() => {
        setAddMode(ModalMode.CLOSED);
        refetch();
      });
  };

  const editMatierialPurchaseItem = (data: MaterialPurchaseItem): void => {
    if (!editValues) return toastErr();

    const items = purchase.items.map((item) =>
      item.material.id === editValues.material.id ? data : item
    );
    const promise = updateMaterialPurchase({ ...purchase, items });

    toast
      .promise(promise, {
        pending: 'Edytowanie pozycji zakupowej...',
        success: 'Edytowano pozycję zakupową',
        error: 'Nie udało się edytować pozycji zakupowej',
      })
      .then(() => {
        setEditMode(ModalMode.CLOSED);
        refetch();
      });
  };

  const deleteMatierialPurchaseItem = (): void => {
    if (!deleteValues) return toastErr();

    const items = purchase.items.filter((i) => i.material.id !== deleteValues.material.id);
    const promise = updateMaterialPurchase({ ...purchase, items });

    toast
      .promise(promise, {
        pending: 'Usuwanie materiału z zakupu...',
        success: 'Usunięto materiał z zakupu',
        error: 'Nie udało się usunąć materiału',
      })
      .then(() => {
        setDeleteMode(ModalMode.CLOSED);
        refetch();
      });
  };

  // if (!purchase.items.length) return null;

  const columns = useTableColumns<MaterialPurchaseItem>([
    {
      field: 'material.name',
      headerName: 'Nazwa',
      // valueGetter: getNestedValues,
      renderCell: ({ row }) => `${row.material.name}`,
    },
    {
      field: 'amount',
      headerName: 'Ilość',
      renderCell: ({ row }) => (
        <Pill severity="secondary">{`${row.amount} ${getUnit(row.material.unit)}`}</Pill>
      ),
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
    uniqueId: TableId.MATERIAL_PURCHASE_SUBTABLE,
  });

  return (
    <InnerTableWrapper apiRef={apiRef}>
      <Card>
        <CardHeader
          title={
            <>
              Zakup za <Pill severity="secondary">{apiToHumanMonth(purchase.date)}</Pill>
            </>
          }
          action={
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Icon.Add />}
              onClick={() => setAddMode(ModalMode.ADD)}
            >
              Dodaj materiał do zakupu
            </Button>
          }
        />
        <CardContent>
          <DataGridPro
            rows={purchase.items}
            columns={columns}
            key={purchase.items.length}
            getRowId={() => Math.random()}
            {...dataGridProps}
            pinnedColumns={{ right: ['actions'] }}
            autosizeOnMount={true}
          />
        </CardContent>
      </Card>

      <AddMaterialPurchaseItemModal
        mode={addMode}
        setMode={setAddMode}
        submit={addMatierialPurchaseItem}
        isLoading={updateMaterialPurchaseStatus.isLoading}
      />

      <EditMaterialPurchaseItemModal
        mode={editMode}
        setMode={setEditMode}
        values={editValues}
        submit={editMatierialPurchaseItem}
        isLoading={updateMaterialPurchaseStatus.isLoading}
      />

      <ConfirmationModal
        open={!!deleteMode}
        close={() => setDeleteMode(ModalMode.CLOSED)}
        onConfirm={deleteMatierialPurchaseItem}
        title={
          <>
            Usuń pozycję zakupową <Pill severity="error">{deleteValues?.material.name}</Pill>
          </>
        }
        isLoading={updateMaterialPurchaseStatus.isLoading}
        deletion
      >
        <Alert severity="error">Czy na pewno chcesz trwale usunąć tę pozycję?</Alert>
      </ConfirmationModal>
    </InnerTableWrapper>
  );
};

export default MaterialPurchaseSubtable;
