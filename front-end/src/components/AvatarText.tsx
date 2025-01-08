import { Avatar, Stack, Typography } from '@mui/material';
import { indigo } from '../theme/colors';
import { capitalize, getFirstLetter } from '../utils/text-utils';

interface AvatarTextProps {
  text: string;
  src?: string;
  color?: string;
}

const AvatarText = ({ text, src, color = indigo.main }: AvatarTextProps) => (
  <Stack direction="row" alignItems="center" gap={1} height="100%">
    <Avatar src={src} sx={{ width: 28, height: 28, bgcolor: color }}>
      {!src && getFirstLetter(text)}
    </Avatar>
    <Typography variant="subtitle1">{capitalize(text)}</Typography>
  </Stack>
);

export default AvatarText;
