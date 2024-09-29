import { Box } from '@mui/material';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => (
  <Box sx={{ p: 3 }}>{children}</Box>
);

export default PageContainer;
