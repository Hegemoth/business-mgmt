import { Box } from '@mui/material';

interface CellProps {
  children: React.ReactNode;
}

const Cell = ({ children }: CellProps) => (
  <Box display="flex" alignItems="center" height="100%">
    {children}
  </Box>
);

export default Cell;
