import { Box, Button, Stack, Typography } from '@mui/material';
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
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
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
    </Box>
  );
};

export default OrgSelect;
