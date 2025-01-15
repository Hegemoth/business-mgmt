import { Card, CardContent, CardHeader } from '@mui/material';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import BinaryIcon from '../../../components/BinaryIcon';
import Cell from '../../../components/Cell';
import Icon from '../../../components/Icon';
import IconTooltip from '../../../components/IconTooltip';
import { useTable } from '../../../hooks/useTable';
import { useTableColumns } from '../../../hooks/useTableColumns';
import { ModalMode, TableId } from '../../../types/enums';
import { AsyncPagination } from '../../../types/pagination';
import { Product } from '../../../types/products';
import { displayAsPct, displayAsPln } from '../../../utils/data-grid-utils';

interface ProductsTableProps {
  products: Product[];
  asyncPagination: AsyncPagination<Product>;
  setAddEditMode: (mode: ModalMode, data?: Product) => void;
  setDeleteMode: (mode: ModalMode, data?: Product) => void;
  setChangeActiveStatusMode: (mode: ModalMode, data?: Product) => void;
}

const ProductsTable = ({
  products,
  asyncPagination,
  setAddEditMode,
  setDeleteMode,
  setChangeActiveStatusMode,
}: ProductsTableProps) => {
  const columns = useTableColumns<Product>([
    {
      field: 'name',
      headerName: 'Nazwa',
    },
    {
      field: 'netCost',
      headerName: 'Koszt netto',
      ...displayAsPln,
    },
    {
      field: 'taxRate',
      headerName: 'VAT',
      ...displayAsPct,
    },
    {
      field: 'grossCost',
      headerName: 'Koszt brutto',
      ...displayAsPln,
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
      field: 'actions',
      type: 'actions',
      headerName: 'Akcje',
      getActions: ({ row }) => [
        <IconTooltip
          icon={<Icon.Edit />}
          label="Edytuj materiał"
          onClick={() => setAddEditMode(ModalMode.EDIT, row)}
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
          label="Usuń materiał"
          onClick={() => setDeleteMode(ModalMode.DELETE, row)}
          action
        />,
      ],
    },
  ]);

  const { dataGridProps } = useTable({
    apiRef: useGridApiRef(),
    uniqueId: TableId.PRODUCTS,
    asyncPagination,
  });

  return (
    <Card>
      <CardHeader
        title="Tabela produktów"
        subheader="Dodaj i modyfikuj produktów, które aktualnie posiada Twoja firma"
      />
      <CardContent>
        <DataGridPro rows={products} columns={columns} key={products.length} {...dataGridProps} />
      </CardContent>
    </Card>
  );
};

export default ProductsTable;
