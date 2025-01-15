import { Card, CardContent, CardHeader } from '@mui/material';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import Icon from '../../../components/Icon';
import IconTooltip from '../../../components/IconTooltip';
import { useTable } from '../../../hooks/useTable';
import { useTableColumns } from '../../../hooks/useTableColumns';
import { ModalMode, TableId } from '../../../types/enums';
import { Material } from '../../../types/materials';
import { AsyncPagination } from '../../../types/shared';

interface MatierialsTableProps {
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
}: MatierialsTableProps) => {
  const columns = useTableColumns<Material>([
    {
      field: 'name',
      headerName: 'Nazwa',
    },
    {
      field: 'active',
      headerName: 'Aktywny',
    },
    {
      field: 'unit',
      headerName: 'Jednostka miary',
    },
    {
      field: 'netCost',
      headerName: 'Koszt netto',
    },
    {
      field: 'taxRate',
      headerName: 'VAT',
    },
    {
      field: 'grossCost',
      headerName: 'Koszt brutto',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Akcje',
      getActions: ({ row }) => [
        <IconTooltip
          icon={<Icon.Edit />}
          label="Edytuj pracownika"
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
          label="Usuń pracownika"
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
        title="Tabela pracowników"
        subheader="Dodaj i modyfikuj pracowników oraz zarządzaj ich stanowiskami"
      />
      <CardContent>
        <DataGridPro rows={materials} columns={columns} key={materials.length} {...dataGridProps} />
      </CardContent>
    </Card>
  );
};

export default MaterialsTable;
