import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid2 as Grid,
} from '@mui/material';
import Icon from '../../components/Icon';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import { useGetOrganizationsQuery } from '../../redux/api/organizationApi';

const Home = () => {
  const { organizations, isLoadingOrganizations } = useGetOrganizationsQuery(
    {},
    {
      selectFromResult: (r) => ({
        organizations: r.data?.items || [],
        isLoadingOrganizations: r.isLoading,
      }),
    }
  );

  return (
    <PageContainer>
      <PageTitle
        title="Dashboard"
        bottomContent={
          <Button variant="contained" startIcon={<Icon.Add />}>
            Dodaj organizację
          </Button>
        }
        rightContent={
          <Button variant="contained" startIcon={<Icon.Add />}>
            Dodaj organizację
          </Button>
        }
      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardHeader
              title="Organizacje"
              subheader="Sprawdź listę organizacji"
            />
            <CardContent>
              {isLoadingOrganizations && (
                <Alert color="info">Ładowanie organizacji...</Alert>
              )}
              {!isLoadingOrganizations && (
                <Alert color="info" variant="outlined">
                  {organizations?.map((org) => (
                    <Box key={org.id}>{org.name}</Box>
                  ))}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Alert color="warning">
                {organizations?.map((org) => (
                  <Box key={org.id}>{org.name}</Box>
                ))}
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardHeader
              title="Organizacje"
              subheader="Sprawdź listę organizacji"
            />
            <CardContent>
              <Alert color="info" variant="outlined">
                {organizations?.map((org) => (
                  <Box key={org.id}>{org.name}</Box>
                ))}
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Alert color="warning">
                {organizations?.map((org) => (
                  <Box key={org.id}>{org.name}</Box>
                ))}
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardHeader
              title="Organizacje"
              subheader="Sprawdź listę organizacji"
            />
            <CardContent>
              <Alert color="info" variant="outlined">
                {organizations?.map((org) => (
                  <Box key={org.id}>{org.name}</Box>
                ))}
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Alert color="warning">
                {organizations?.map((org) => (
                  <Box key={org.id}>{org.name}</Box>
                ))}
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Home;
