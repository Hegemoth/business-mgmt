import { Card, CardContent, CardHeader } from '@mui/material';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import Icon from '../../../components/Icon';
import IconTooltip from '../../../components/IconTooltip';
import Pill from '../../../components/Pill';
import { useTable } from '../../../hooks/useTable';
import { useTableColumns } from '../../../hooks/useTableColumns';
import { ModalMode, TableId } from '../../../types/enums';
import { MaterialPurchase } from '../../../types/materials';
import { AsyncPagination } from '../../../types/pagination';
import { apiToHumanMonth } from '../../../utils/date-utils';
import MaterialPurchaseSubtable from './MaterialPurchaseSubtable';

interface MaterialPurchasesTableProps {
  purchases: MaterialPurchase[];
  asyncPagination: AsyncPagination<MaterialPurchase>;
  setDeleteMode: (mode: ModalMode, data?: MaterialPurchase) => void;
}

const MaterialPurchasesTable = ({
  purchases,
  asyncPagination,
  setDeleteMode,
}: MaterialPurchasesTableProps) => {
  const columns = useTableColumns<MaterialPurchase>([
    {
      field: 'date',
      headerName: 'Miesiąc',
      renderCell: ({ value }) => <Pill>{apiToHumanMonth(value)}</Pill>,
    },
    {
      field: 'items',
      headerName: 'Ilość materiałów',
      renderCell: ({ row }) => (row.items ? row.items.length : '---'),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Akcje',
      getActions: ({ row }) => [
        <IconTooltip
          icon={<Icon.Delete />}
          label="Usuń zakup"
          onClick={() => setDeleteMode(ModalMode.DELETE, row)}
          action
        />,
      ],
    },
  ]);

  const { dataGridProps } = useTable({
    apiRef: useGridApiRef(),
    uniqueId: TableId.MATERIAL_PURCHASE,
    asyncPagination,
  });

  return (
    <Card>
      <CardHeader title="Tabela zakupów" subheader="Dodaj i zarządzaj zakupami" />
      <CardContent>
        <DataGridPro
          rows={purchases}
          columns={columns}
          key={purchases.length}
          getDetailPanelContent={({ row }) => <MaterialPurchaseSubtable purchase={row} />}
          getDetailPanelHeight={() => 'auto'}
          {...dataGridProps}
        />
      </CardContent>
    </Card>
  );
};

export default MaterialPurchasesTable;
