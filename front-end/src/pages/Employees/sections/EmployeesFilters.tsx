import {
  Alert,
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
import { useSelector } from 'react-redux';
import { useFilterClear } from '../../../hooks/useFilterClear';
import { getCurrentOrg } from '../../../redux/slices/appContextSlice';
import { Filters } from '../../../types/api';

interface EmployeesFiltersProps {
  filters: Filters;
}

const EmployeesFilters = ({ filters }: EmployeesFiltersProps) => {
  const currentOrg = useSelector(getCurrentOrg);
  const isEnabled = currentOrg?.features.filtering;

  const [firstName, setFirstName] = useFilterClear(filters, 'firstName');
  const [lastName, setLastName] = useFilterClear(filters, 'firstName');
  const [activeStatus, setActiveStatus] = useFilterClear(filters, 'active');

  const handleFirstNameFilterChange = useDebouncedCallback(
    (e) => {
      filters.replace([`firstName_like:${e.target.value}`]);
    },
    [500]
  );

  const handleLastNameFilterChange = useDebouncedCallback(
    (e) => {
      filters.replace([`lastName_like:${e.target.value}`]);
    },
    [500]
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
        subheader={'Filtruj listę pracowników za pomocą poniższych parameterów'}
        action={
          !isEnabled && (
            <Alert severity="warning">
              Ulepsz pakiet do premium, aby filtrować listę pracowników
            </Alert>
          )
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3, xl: 2 }}>
            <TextField
              fullWidth
              label="Imię"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                handleFirstNameFilterChange(e);
              }}
              disabled={!isEnabled}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3, xl: 2 }}>
            <TextField
              fullWidth
              label="Nazwisko"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                handleLastNameFilterChange(e);
              }}
              disabled={!isEnabled}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3, xl: 2 }}>
            <FormControl fullWidth>
              <InputLabel shrink>Status aktywności</InputLabel>
              <Select
                label="Status aktywności"
                value={activeStatus}
                onChange={(e) => {
                  setActiveStatus(e.target.value);
                  filters.replace([`active:${e.target.value}`]);
                }}
                displayEmpty
                disabled={!isEnabled}
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
