import { Box, Stack, Typography } from '@mui/material';

interface PageTitleProps {
  title: string;
  rightContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
}

const PageTitle = ({ title, rightContent, bottomContent }: PageTitleProps) => (
  <Stack direction="row" justifyContent="space-between" sx={{ pb: 4 }}>
    <Stack spacing={2}>
      <Typography variant="h2">{title}</Typography>
      {bottomContent && <Box>{bottomContent}</Box>}
    </Stack>

    {rightContent && <Box>{rightContent}</Box>}
  </Stack>
);

export default PageTitle;
