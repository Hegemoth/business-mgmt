import {
  Card,
  CardContent,
  FormControl,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useState } from 'react';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';

const Settings = () => {
  const [menu, setMenu] = useState('right');

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
                  value={menu}
                  onChange={(e) => setMenu(e.target.value)}
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
