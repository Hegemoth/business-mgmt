import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid2 as Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import useDebouncedCallback from 'beautiful-react-hooks/useDebouncedCallback';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFilterClear } from '../../../hooks/useFilterClear';
import { getCurrentOrg } from '../../../redux/slices/appContextSlice';
import { Filters } from '../../../types/api';

type Sign = 'lte' | 'gte';

interface ProductsFiltersProps {
  filters: Filters;
}

const ProductsFilters = ({ filters }: ProductsFiltersProps) => {
  const currentOrg = useSelector(getCurrentOrg);
  const isEnabled = currentOrg?.features.filtering;

  const [name, setName] = useFilterClear(filters, 'name');
  const [netCost, setNetCost] = useFilterClear(filters, 'netCost');
  const [taxRate, setTaxRate] = useFilterClear(filters, 'taxRate');
  const [grossCost, setGrossCost] = useFilterClear(filters, 'grossCost');
  const [netSign, setNetSign] = useState<Sign>('lte');
  const [taxSign, setTaxSign] = useState<Sign>('lte');
  const [grossSign, setGrossSign] = useState<Sign>('lte');

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

  return (
    <Card>
      <CardHeader
        title="Filtry"
        subheader="Filtruj listę pracowników za pomocą poniższych parameterów"
        action={
          !isEnabled && (
            <Alert severity="warning">
              Ulepsz pakiet do premium, aby filtrować listę materiałów
            </Alert>
          )
        }
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
              disabled={!isEnabled}
            />
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
                  disabled={!isEnabled}
                >
                  <MenuItem value="gte">{'>'}</MenuItem>
                  <MenuItem value="lte">{'<'}</MenuItem>
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
                  disabled={!isEnabled}
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
                  disabled={!isEnabled}
                >
                  <MenuItem value="gte">{'>'}</MenuItem>
                  <MenuItem value="lte">{'<'}</MenuItem>
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
                  disabled={!isEnabled}
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
                  disabled={!isEnabled}
                >
                  <MenuItem value="gte">{'>'}</MenuItem>
                  <MenuItem value="lte">{'<'}</MenuItem>
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
                  disabled={!isEnabled}
                />
              </Box>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductsFilters;
