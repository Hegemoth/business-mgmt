import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import PageContainer from '../../components/PageContainer';
import Pill from '../../components/Pill';
import { useGetOrganizationsQuery } from '../../redux/api/organizationApi';
import DashboardStepper from './sections/DashboardStepper/DashboardStepper';
import EmployeesWidget from './sections/EmployeesWidget/EmployeesWidget';

const Home = () => {
  const orgs = useGetOrganizationsQuery({ limit: 1 });

  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Alert severity="info" variant="filled">
          Ze względu na to, że aplikacja to w głównej mierze front-endowy projekt, niektóre
          statystyki mogą nie pokrywać się ze stanem faktycznym.
        </Alert>

        <Grid size={{ xs: 12 }}>
          <DashboardStepper />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 4 }}>
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
