import { Box } from '@mui/material';
import React from 'react';

interface MainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper = ({ children }: MainWrapperProps) => (
  <>
    <Box>{children}</Box>
  </>
);

export default MainWrapper;
