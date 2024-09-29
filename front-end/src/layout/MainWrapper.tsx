import { Box } from '@mui/material';
import React from 'react';
import Loading from '../components/Loading';

interface MainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper = ({ children }: MainWrapperProps) => {
  const isFetching = false;

  if (isFetching) {
    return <Loading />;
  }

  // if (currentOrg) return OrgSelection
  return (
    <>
      <Box>{children}</Box>
    </>
  );
};

export default MainWrapper;
