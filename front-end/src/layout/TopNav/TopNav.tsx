import {
  Alert,
  alpha,
  Box,
  IconButton,
  Stack,
  Theme,
  useMediaQuery,
} from '@mui/material';
import Icon from '../../components/Icon';
import { SIDE_NAV_WIDTH, TOP_NAV_HEIGHT } from '../../constants/constants';

interface TopNavProps {
  isSideNavOpen: boolean;
  toggleSideNav: () => void;
}

const TopNav = ({ isSideNavOpen, toggleSideNav }: TopNavProps) => {
  const isLgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const isHamburgerVisible = !isLgUp || !isSideNavOpen;

  const sxHeader = (theme: Theme) => ({
    position: 'sticky',
    zIndex: theme.zIndex.appBar,
    left: { lg: isSideNavOpen ? SIDE_NAV_WIDTH : 0 },
    top: 0,
    width: { lg: isSideNavOpen ? `calc(100% - ${SIDE_NAV_WIDTH}px)` : '100%' },
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: alpha(theme.palette.background.default, 0.8),
    backdropFilter: 'blur(6px)',
  });

  return (
    <Box component="header" sx={sxHeader}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ height: TOP_NAV_HEIGHT, px: 2 }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {isHamburgerVisible && (
            <IconButton onClick={toggleSideNav}>
              <Icon.Hamburger />
            </IconButton>
          )}
          {/* <Alert>Testowanie</Alert>
          <Alert>Testowanie</Alert> */}
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          {/* <Alert>Testtt</Alert>
          <Alert>Testtt</Alert>
          <Alert>Testtt</Alert> */}
        </Stack>

        {/* TODO: Avatar & popover */}
      </Stack>
    </Box>
  );
};

export default TopNav;
