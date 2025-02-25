import { Card, CardContent, CardHeader } from '@mui/material';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import BinaryIcon from '../../../components/BinaryIcon';
import Cell from '../../../components/Cell';
import Icon from '../../../components/Icon';
import IconTooltip from '../../../components/IconTooltip';
import Pill from '../../../components/Pill';
import { useTable } from '../../../hooks/useTable';
import { useTableColumns } from '../../../hooks/useTableColumns';
import { ModalMode, TableId } from '../../../types/enums';
import { Material } from '../../../types/materials';
import { AsyncPagination } from '../../../types/pagination';
import { displayAsPct, displayAsPln } from '../../../utils/data-grid-utils';
import { getUnit } from '../../../utils/data-utils';

interface MaterialsTableProps {
  materials: Material[];
  asyncPagination: AsyncPagination<Material>;
  setAddEditMode: (mode: ModalMode, data?: Material) => void;
  setDeleteMode: (mode: ModalMode, data?: Material) => void;
  setChangeActiveStatusMode: (mode: ModalMode, data?: Material) => void;
}

const MaterialsTable = ({
  materials,
  asyncPagination,
  setAddEditMode,
  setDeleteMode,
  setChangeActiveStatusMode,
}: MaterialsTableProps) => {
  const columns = useTableColumns<Material>([
    {
      field: 'name',
      headerName: 'Nazwa',
    },
    {
      field: 'amount',
      headerName: 'Ilość',
      renderCell: ({ row }) => <Pill>{`${row.amount} ${getUnit(row.unit)}`}</Pill>,
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
    uniqueId: TableId.MATERIALS,
    asyncPagination,
  });

  return (
    <Card>
      <CardHeader
        title="Tabela materiałów"
        subheader="Dodaj i modyfikuj materiały, które aktualnie posiada Twoja firma"
      />
      <CardContent>
        <DataGridPro rows={materials} columns={columns} key={materials.length} {...dataGridProps} />
      </CardContent>
    </Card>
  );
};

export default MaterialsTable;
