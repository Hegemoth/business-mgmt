import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCurrentOrg } from '../redux/slices/appContextSlice';
import { Organization } from '../types/organization';

interface OrgSelectProps {
  orgs: Organization[];
}

const OrgSelect = ({ orgs }: OrgSelectProps) => {
  const dispatch = useDispatch();

  const onOrgSelect = (org: Organization) => {
    dispatch(setCurrentOrg(org));
  };

  return (
    <Box sx={{ p: 2, position: 'relative' }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Wybierz organizację
        </Typography>
      </Box>

      <Stack gap={2}>
        {orgs.map((org) => (
          <Box key={org.id} sx={{ m: '0 auto' }}>
            <Button variant="contained" onClick={() => onOrgSelect(org)}>
              {org.name}
            </Button>
          </Box>
        ))}
      </Stack>

      <Alert
        severity="info"
        variant="filled"
        sx={{ position: 'absolute', width: 550, bottom: 0, right: 15 }}
      >
        Jeśli chcesz przejrzeć organizację pokazową z uzupełnionymi danymi, wybierz{' '}
        <strong>Garage Inc.</strong> (organizacja w aplikacji posiada pakiet „premium” i włączone
        wszystkie funkcjonalności) lub <strong>W gorącej wodzie company</strong> (organizacja
        posiada pakiet „demo”). Pozostałe organizacje nie zawierają żadnych danych.
      </Alert>
    </Box>
  );
};

export default OrgSelect;
