import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import useDebouncedCallback from 'beautiful-react-hooks/useDebouncedCallback';
import { Filters } from '../../../types/api';

interface EmployeesFiltersProps {
  filters: Filters;
}

const EmployeesFilters = ({ filters }: EmployeesFiltersProps) => {
  const handleFirstNameFilterChange = useDebouncedCallback(
    (e) => filters.replace([`firstName:${e.target.value}_like`]),
    [700]
  );

  const handleLastNameFilterChange = useDebouncedCallback(
    (e) => filters.replace([`lastName:${e.target.value}_like`]),
    [700]
  );

  const activeStatusOptions = [
    { title: 'Aktywni', value: 'true' },
    { title: 'Nieaktywni', value: 'false' },
    { title: 'Wszyscy', value: '' },
  ];

  return (
    <Card>
      <CardHeader
        title="Filtry"
        subheader="Filtruj listę pracowników za pomocą poniższych parameterów"
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 3 }}>
            <TextField
              fullWidth
              label="Imię"
              defaultValue={filters.getFilterValueByName('firstName')}
              onChange={handleFirstNameFilterChange}
            />
          </Grid>

          <Grid size={{ xs: 3 }}>
            <TextField
              fullWidth
              label="Nazwisko"
              defaultValue={filters.getFilterValueByName('lastName')}
              onChange={handleLastNameFilterChange}
            />
          </Grid>

          <Grid size={{ xs: 3 }}>
            <FormControl fullWidth>
              <InputLabel shrink>Status aktywności</InputLabel>
              <Select
                label="Status aktywności"
                displayEmpty
                value={filters.getFilterValueByName('active')}
                onChange={(e) => filters.replace([`active:${e.target.value}`])}
              >
                {activeStatusOptions.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EmployeesFilters;
