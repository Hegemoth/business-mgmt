import { Stack, SxProps, Theme } from '@mui/material';
import { GridApiPro } from '@mui/x-data-grid-pro';
import React, { useCallback, useEffect, useState } from 'react';

const sx: SxProps<Theme> = {
  px: 1,
  py: 2,
  height: '100%',
  boxSizing: 'border-box',
  position: 'sticky',
  left: 0,
};

interface InnerTableWrapperProps {
  apiRef: React.MutableRefObject<GridApiPro>;
  children: React.ReactNode;
}

const InnerTableWrapper = ({ apiRef, children }: InnerTableWrapperProps) => {
  const [width, setWidth] = useState(() => {
    const dimensions = apiRef.current.getRootDimensions();
    return dimensions.viewportInnerSize.width;
  });

  const handleViewportInnerSizeChange = useCallback(() => {
    const dimensions = apiRef.current.getRootDimensions();
    setWidth(dimensions.viewportInnerSize.width);
  }, [apiRef]);

  useEffect(() => {
    return apiRef.current.subscribeEvent('viewportInnerSizeChange', handleViewportInnerSizeChange);
  }, [apiRef, handleViewportInnerSizeChange]);

  return <Stack sx={{ ...sx, width }}>{children}</Stack>;
};

export default InnerTableWrapper;
