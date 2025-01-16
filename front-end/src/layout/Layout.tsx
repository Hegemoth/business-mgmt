import { Box, Theme, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { SIDE_NAV_WIDTH } from '../constants/constants';
import { useToggle } from '../hooks/useToggle';
import { getCurrentOrg } from '../redux/slices/appContextSlice';
import SideNav from './SideNav/SideNav';
import TopNav from './TopNav/TopNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSideNavOpen, toggleSideNav] = useToggle(true);
  const isLgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const currentOrg = useSelector(getCurrentOrg);
  const contentPadding = isSideNavOpen && isLgUp ? `${SIDE_NAV_WIDTH}px` : 0;
  const isSideNavRight = currentOrg?.config.sidenav === 'right';

  return (
    <Box>
      <TopNav {...{ isSideNavOpen, toggleSideNav }} />
      <SideNav {...{ isSideNavOpen, toggleSideNav }} />
      <Box sx={isSideNavRight ? { pr: contentPadding } : { pl: contentPadding }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
