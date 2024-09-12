import { Box } from '@mui/material';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Box>{children}</Box>
  </>
);

export default Layout;
