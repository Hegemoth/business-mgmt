import { Box, Theme, useMediaQuery } from '@mui/material';
import { SIDE_NAV_WIDTH } from '../constants/constants';
import { useToggle } from '../hooks/useToggle';
import SideNav from './SideNav/SideNav';
import TopNav from './TopNav/TopNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSideNavOpen, toggleSideNav] = useToggle(true);
  const isLgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  return (
    <Box>
      <TopNav {...{ isSideNavOpen, toggleSideNav }} />
      <SideNav {...{ isSideNavOpen, toggleSideNav }} />
      <Box sx={{ pl: isSideNavOpen && isLgUp ? `${SIDE_NAV_WIDTH}px` : 0 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
