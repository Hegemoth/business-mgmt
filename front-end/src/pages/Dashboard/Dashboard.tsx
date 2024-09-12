import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { backendUrl } from '../../constants/backendUrl';
import { Organization } from '../../types/types';

const Dashboard = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    fetch(`${backendUrl}/organizations`)
      .then((res) => res.json())
      .then((res) => setOrganizations(res));
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Box>
        <Button variant="contained">Dodaj organizację</Button>
      </Box>

      <Box sx={{ pt: 2 }}>
        <Typography>Lokalizacje:</Typography>
      </Box>

      <Box sx={{ pt: 2 }}>
        {organizations.map((org) => (
          <Typography key={org.id}>{org.name}</Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
