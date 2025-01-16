import {
  Card,
  CardContent,
  FormControl,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import { useUpdateOrganizationMutation } from '../../redux/api/organizationApi';
import { getCurrentOrg, setCurrentOrg } from '../../redux/slices/appContextSlice';

const Settings = () => {
  const currentOrg = useSelector(getCurrentOrg)!;
  const [updateOrg] = useUpdateOrganizationMutation();
  const dispatch = useDispatch();

  const toggleSideNav = (newValue: 'left' | 'right') => {
    const promise = updateOrg({
      id: currentOrg.id,
      config: { ...currentOrg.config, sidenav: newValue },
    });

    toast
      .promise(promise, {
        pending: 'Przełączanie menu...',
        success: 'Przełączono menu aplikacji',
        error: 'Nie udało się przełączyć menu aplikacji',
      })
      .then((res) => {
        if (res.data) dispatch(setCurrentOrg(res.data));
      });
  };

  return (
    <PageContainer>
      <PageTitle title="Ustawienia" />
      <Grid container>
        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 2 }}>
          <Card>
            <CardContent>
              <FormControl fullWidth>
                <InputLabel shrink>Menu aplikacji</InputLabel>
                <Select
                  label="Menu aplikacji"
                  value={currentOrg.config.sidenav}
                  onChange={(e) => toggleSideNav(e.target.value as 'left' | 'right')}
                >
                  <MenuItem value="right">Po prawej</MenuItem>
                  <MenuItem value="left">Po lewej</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Settings;
