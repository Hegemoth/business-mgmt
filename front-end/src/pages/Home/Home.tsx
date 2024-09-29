import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid2 as Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Icon } from '../../components/Icon';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import { BACKEND_URL } from '../../constants/constants';
import { Organization } from '../../types/organization';

const Home = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  // TODO: Zmiana na RTK Query
  useEffect(() => {
    fetch(`${BACKEND_URL}/organizations`)
      .then((res) => res.json())
      .then((res) => setOrganizations(res));
  }, []);

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
              <Alert color="info" variant="outlined">
                {organizations.map((org) => (
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
                {organizations.map((org) => (
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
                {organizations.map((org) => (
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
                {organizations.map((org) => (
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
                {organizations.map((org) => (
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
                {organizations.map((org) => (
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
