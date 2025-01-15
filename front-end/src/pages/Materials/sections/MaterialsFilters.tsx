import {
  Box,
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
import { useState } from 'react';
import { useFilterClear } from '../../../hooks/useFilterClear';
import { Filters } from '../../../types/api';

type Sign = 'lt' | 'gt';

interface MaterialsFiltersProps {
  filters: Filters;
}

const MaterialsFilters = ({ filters }: MaterialsFiltersProps) => {
  const [name, setName] = useFilterClear(filters, 'name');
  const [status, setStatus] = useFilterClear(filters, 'active');
  const [netCost, setNetCost] = useFilterClear(filters, 'netCost');
  const [taxRate, setTaxRate] = useFilterClear(filters, 'taxRate');
  const [grossCost, setGrossCost] = useFilterClear(filters, 'grossCost');
  const [netSign, setNetSign] = useState<Sign>('lt');
  const [taxSign, setTaxSign] = useState<Sign>('lt');
  const [grossSign, setGrossSign] = useState<Sign>('lt');

  const handleNameFilterChange = useDebouncedCallback(
    (e) => {
      filters.replace([`name_like:${e.target.value}`]);
    },
    [500]
  );

  const handleFilterChange = useDebouncedCallback(
    (key: string, value: string | number, sign: Sign) => {
      filters.replace([`${key}_${sign}:${value}`]);
    },
    [500]
  );

  const handleSignChange = (
    setter: React.Dispatch<React.SetStateAction<Sign>>,
    value: Sign,
    key: string,
    currentValue: string
  ) => {
    setter(value);
    if (currentValue) {
      filters.replace([`${key}_${value}:${currentValue}`]);
    }
  };

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
          <Grid size={{ xs: 12, sm: 6, md: 3, xl: 2 }}>
            <TextField
              fullWidth
              label="Nazwa"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleNameFilterChange(e);
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3, xl: 2 }}>
            <FormControl fullWidth>
              <InputLabel shrink>Status</InputLabel>
              <Select
                label="Status"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  filters.replace([`active:${e.target.value}`]);
                }}
                displayEmpty
              >
                {activeStatusOptions.map(({ title, value }) => (
                  <MenuItem key={value} value={value}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3, xl: 2 }}>
            <FormControl fullWidth>
              <Box sx={{ display: 'flex' }}>
                <Select
                  displayEmpty
                  value={netSign}
                  onChange={(e) =>
                    handleSignChange(setNetSign, e.target.value as Sign, 'netCost', netCost)
                  }
                  autoWidth
                >
                  <MenuItem value="gt">{'>'}</MenuItem>
                  <MenuItem value="lt">{'<'}</MenuItem>
                </Select>
                <TextField
                  fullWidth
                  type="number"
                  label="Koszt netto"
                  value={netCost}
                  onChange={(e) => {
                    setNetCost(e.target.value);
                    handleFilterChange('netCost', e.target.value, netSign);
                  }}
                />
              </Box>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3, xl: 2 }}>
            <FormControl fullWidth>
              <Box sx={{ display: 'flex' }}>
                <Select
                  displayEmpty
                  value={taxSign}
                  onChange={(e) =>
                    handleSignChange(setTaxSign, e.target.value as Sign, 'taxRate', taxRate)
                  }
                  autoWidth
                >
                  <MenuItem value="gt">{'>'}</MenuItem>
                  <MenuItem value="lt">{'<'}</MenuItem>
                </Select>
                <TextField
                  fullWidth
                  type="number"
                  label="VAT"
                  value={taxRate}
                  onChange={(e) => {
                    setTaxRate(e.target.value);
                    handleFilterChange('taxRate', e.target.value, taxSign);
                  }}
                />
              </Box>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3, xl: 2 }}>
            <FormControl fullWidth>
              <Box sx={{ display: 'flex' }}>
                <Select
                  displayEmpty
                  value={grossSign}
                  onChange={(e) =>
                    handleSignChange(setGrossSign, e.target.value as Sign, 'grossCost', grossCost)
                  }
                  autoWidth
                >
                  <MenuItem value="gt">{'>'}</MenuItem>
                  <MenuItem value="lt">{'<'}</MenuItem>
                </Select>
                <TextField
                  fullWidth
                  type="number"
                  label="Koszt brutto"
                  value={grossCost}
                  onChange={(e) => {
                    setGrossCost(e.target.value);
                    handleFilterChange('grossCost', e.target.value, grossSign);
                  }}
                />
              </Box>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MaterialsFilters;
