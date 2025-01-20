import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid2 as Grid,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PageContainer from '../../components/PageContainer';
import { useGetOrganizationsQuery } from '../../redux/api/organizationApi';
import { getCurrentOrg } from '../../redux/slices/appContextSlice';
import { capitalizeFull } from '../../utils/text-utils';
import DashboardStepper from './sections/DashboardStepper/DashboardStepper';
import EmployeesWidget from './sections/EmployeesWidget/EmployeesWidget';
import MaterialsWidget from './sections/MaterialsWidget/MaterialsWidget';
import ProductsWidget from './sections/ProductsWidget/ProductsWidget';
import ReportChart from './sections/ReportChart/ReportChart';

const Home = () => {
  const currentOrg = useSelector(getCurrentOrg);
  const orgs = useGetOrganizationsQuery({ limit: 1 });
  const [showAlert, setShowAlert] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowAlert(false), 4000);
    return () => clearTimeout(timer);
  }, []);
  
  // TODO: Delete when API will handle it
  const orgWithData = currentOrg?.id === "999c973d-19e5-4b66-8ff3-5efc4c16f47b";

  return (
    <PageContainer>
      <Grid container spacing={2}>
        {showAlert && (
          <Grid size={{ xs: 12 }}>
            <Alert severity="info" variant="filled">
              Ze względu na to, że aplikacja to w głównej mierze front-endowy projekt, niektóre
              statystyki mogą nie pokrywać się ze stanem faktycznym.
            </Alert>
          </Grid>
        )}

        {currentOrg?.package === 'demo' ? (
          <>
            <Grid size={{ xs: 12, md: 4 }}>
              <Alert severity="warning">
                Obecny pakiet: <strong>DEMO</strong>
              </Alert>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Alert severity="info">
                Co zyskasz z pakietem premium?
                <ul>
                  {!currentOrg.features.filtering && (
                    <li>Możliwość filtrowania wszystkich tabel w aplikacji</li>
                  )}
                  {!currentOrg.features.materialsLimit && (
                    <li>Brak ograniczenia liczby materiałów do 10</li>
                  )}
                  {!currentOrg.features.productsLimit && (
                    <li>Brak ograniczenia liczby produktów do 10</li>
                  )}
                </ul>
              </Alert>
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <Card>
                <CardContent>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                      toast.info(
                        'Business.mgmt Premium nie jest jeszcze dostępne w Twoim regionie :)'
                      )
                    }
                  >
                    Kup pakiet premium
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </>
        ) : (
          <Grid size={{ xs: 12 }}>
            <Alert severity="success">
              Obecny pakiet: <strong>PREMIUM</strong>
            </Alert>
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <DashboardStepper />
        </Grid>

        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Tyle organizacji już zaufało Business.mgmt"
              titleTypographyProps={{ typography: 'h3' }}
            />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h2" fontSize={64}>
                {orgs.data?.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <EmployeesWidget />
        </Grid>

        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <MaterialsWidget />
        </Grid>

        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <ProductsWidget />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 1.5, border: '1px solid #eee' }} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card sx={{ textAlign: 'center' }}>
            <Typography variant="caption" fontSize="large">
              Statystyki dla:{' '}
              <strong>{capitalizeFull(format(new Date(), 'LLLL yyyy', { locale: pl }))}</strong>
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6, xl: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Przychód" titleTypographyProps={{ typography: 'h3' }} />
            <CardContent>
              <Typography variant="h1" fontSize={64}>
                {orgWithData ? "230 325" : 0} zł
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6, xl: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Koszty" titleTypographyProps={{ typography: 'h3' }} />
            <CardContent>
              <Typography variant="h1" fontSize={64}>
                {orgWithData ? "189 872" : 0} zł
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6, xl: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Zysk" titleTypographyProps={{ typography: 'h3' }} />
            <CardContent>
              <Typography variant="h1" fontSize={64}>
                {orgWithData ? "40 453" : 0} zł
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card sx={{ textAlign: 'center' }}>
            <Typography variant="caption" fontSize="large">
              Twój wynik w ostatnim kwartale
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ReportChart />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Home;
