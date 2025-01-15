import { Card, CardContent, CardHeader, Grid2 as Grid, Switch } from '@mui/material';
import { DataGridPro, GridColDef, useGridApiRef } from '@mui/x-data-grid-pro';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Pill from '../../components/Pill';
import { useTable } from '../../hooks/useTable';
import { useUpdateOrganizationMutation } from '../../redux/api/organizationApi';
import { getCurrentOrg, setCurrentOrg } from '../../redux/slices/appContextSlice';
import { TableId } from '../../types/enums';

const AdminFeatures = () => {
  const currentOrg = useSelector(getCurrentOrg)!;
  const [updateOrg] = useUpdateOrganizationMutation();
  const dispatch = useDispatch();

  console.log(currentOrg.features);

  const rows = Object.entries(currentOrg.features).map(([key, value], i) => ({
    id: i,
    name: key,
    value,
  }));

  const toggleFeature = (featureName: string, newValue: boolean) => {
    const promise = updateOrg({
      id: currentOrg.id,
      features: { ...currentOrg.features, [featureName]: newValue },
    });

    toast
      .promise(promise, {
        pending: 'Przełączanie funkcjonalności...',
        success: 'Funkcjonalność została przełączona',
        error: 'Nie udało się przełączyć funkcjonalności',
      })
      .then((res) => {
        if (res.data) dispatch(setCurrentOrg(res.data));
      });
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Funkcjonalność',
      flex: 1,
      renderCell: ({ value }) => <Pill>{value}</Pill>,
    },
    {
      field: 'value',
      headerName: 'Wartość',
      flex: 1,
      renderCell: ({ row, value }) => (
        <Switch checked={value} onChange={(_, val) => toggleFeature(row.name, val)} />
      ),
    },
  ];

  const { dataGridProps } = useTable({
    apiRef: useGridApiRef(),
    uniqueId: TableId.ADMIN_FEATURES,
    simpleTable: true,
  });

  return (
    <PageContainer>
      <PageTitle title="Funkcjonalności" />
      <Grid container>
        <Grid size={{ xs: 12, md: 6, xl: 4 }}>
          <Card>
            <CardHeader
              title="Tabela funkcjonalności"
              subheader="Przełącz funkcjonalności dla obecnej organizacji"
            />
            <CardContent>
              <DataGridPro rows={rows} columns={columns} key={rows.length} {...dataGridProps} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AdminFeatures;
