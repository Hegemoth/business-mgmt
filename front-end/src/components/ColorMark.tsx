import { Box } from '@mui/material';

interface ColorMarkProps {
  color: string;
}

const ColorMark = ({ color }: ColorMarkProps) => (
  <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: color }} />
);

export default ColorMark;
