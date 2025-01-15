import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PageContainer from '../../components/PageContainer';
import Pill from '../../components/Pill';
import { useGetOrganizationsQuery } from '../../redux/api/organizationApi';
import { getCurrentOrg } from '../../redux/slices/appContextSlice';
import DashboardStepper from './sections/DashboardStepper/DashboardStepper';
import EmployeesWidget from './sections/EmployeesWidget/EmployeesWidget';

const Home = () => {
  const currentOrg = useSelector(getCurrentOrg);
  const orgs = useGetOrganizationsQuery({ limit: 1 });
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAlert(false), 4000);
    return () => clearTimeout(timer);
  }, []);

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

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Tyle organizacji już zaufało Business.mgmt"
              titleTypographyProps={{ typography: 'h3' }}
            />
            <CardContent sx={{ textAlign: 'center' }}>
              {/* <Stack alignItems="center"> 
                <Pill severity="primary"> */}
              <Typography variant="h2" fontSize={64}>
                {orgs.data?.total}
              </Typography>
              {/* </Pill>
              </Stack> */}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6, xl: 4 }}>
          <EmployeesWidget />
        </Grid>

        <Grid size={{ xs: 12, lg: 6, xl: 2 }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Materiały" titleTypographyProps={{ typography: 'h3' }} />
            <CardContent>
              <Stack alignItems="center">
                <Pill severity="secondary">
                  <Typography variant="h2">46</Typography>
                </Pill>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6, xl: 2 }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Produkty" titleTypographyProps={{ typography: 'h3' }} />
            <CardContent>
              {/* <Stack flexDirection="row" justifyContent="center" alignItems="center"> */}
              <Pill severity="secondary">
                <Typography variant="h2">37</Typography>
              </Pill>
              {/* </Stack> */}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>Statystyki dla: STYCZEŃ 2024</Grid>

        <Grid size={{ xs: 12, lg: 6, xl: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Przychód" titleTypographyProps={{ typography: 'h3' }} />
            <CardContent>
              <Typography variant="h1" fontSize={64}>
                230 325 zł
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6, xl: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Koszty" titleTypographyProps={{ typography: 'h3' }} />
            <CardContent>
              <Typography variant="h1" fontSize={64}>
                189 872 zł
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6, xl: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Zysk" titleTypographyProps={{ typography: 'h3' }} />
            <CardContent>
              <Typography variant="h1" fontSize={64}>
                40 726 zł
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Home;
