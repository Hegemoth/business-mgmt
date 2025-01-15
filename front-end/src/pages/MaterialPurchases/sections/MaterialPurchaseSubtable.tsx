import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { getUnit } from '@mui/material/styles/cssUtils';
import { DataGridPro, useGridApiContext, useGridApiRef } from '@mui/x-data-grid-pro';
import Icon from '../../../components/Icon';
import IconTooltip from '../../../components/IconTooltip';
import InnerTableWrapper from '../../../components/InnerTableWrapper';
import Pill from '../../../components/Pill';
import { useModalMode } from '../../../hooks/useModalMode';
import { useTable } from '../../../hooks/useTable';
import { useTableColumns } from '../../../hooks/useTableColumns';
import { ModalMode, TableId } from '../../../types/enums';
import { MaterialPurchase, MaterialPurchaseItem, NestedMaterial } from '../../../types/materials';
import { apiToHumanMonth } from '../../../utils/date-utils';

interface MaterialPurchaseSubtableProps {
  purchase: MaterialPurchase;
}

const MaterialPurchaseSubtable = ({ purchase }: MaterialPurchaseSubtableProps) => {
  const [editMode, setEditMode, editValues] = useModalMode<MaterialPurchaseItem>();
  const [deleteMode, setDeleteMode, deleteValues] = useModalMode<MaterialPurchaseItem>();

  if (!purchase.items.length) return null;

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
            <Button variant="contained" color="secondary" startIcon={<Icon.Add />}>
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
          />
        </CardContent>
      </Card>
    </InnerTableWrapper>
  );
};

export default MaterialPurchaseSubtable;
