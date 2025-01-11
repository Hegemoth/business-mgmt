import {
  Alert,
  alpha,
  Avatar,
  Box,
  IconButton,
  MenuItem,
  Stack,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';
import CustomPopover from '../../components/CustomPopover';
import Icon from '../../components/Icon';
import { SIDE_NAV_WIDTH, TOP_NAV_HEIGHT } from '../../constants/constants';
import { usePopover } from '../../hooks/usePopover';
import { getCurrentOrg } from '../../redux/slices/appContextSlice';

interface TopNavProps {
  isSideNavOpen: boolean;
  toggleSideNav: () => void;
}

const TopNav = ({ isSideNavOpen, toggleSideNav }: TopNavProps) => {
  const isLgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const isHamburgerVisible = !isLgUp || !isSideNavOpen;
  const avatarPopover = usePopover();
  const currentOrg = useSelector(getCurrentOrg);

  const sxHeader = (theme: Theme) => ({
    position: 'sticky',
    zIndex: theme.zIndex.appBar,
    right: { lg: isSideNavOpen ? SIDE_NAV_WIDTH : 0 },
    top: 0,
    width: { lg: isSideNavOpen ? `calc(100% - ${SIDE_NAV_WIDTH}px)` : '100%' },
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: alpha(theme.palette.background.default, 0.8),
    backdropFilter: 'blur(6px)',
  });

  return (
    <>
      <Box component="header" sx={sxHeader}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ height: TOP_NAV_HEIGHT, px: 2 }}
        >
          {/* <Stack direction="row" alignItems="center" spacing={2}>
          <Alert severity="info">Zalogowany</Alert>
        </Stack> */}

          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              ref={avatarPopover.anchorRef}
              onClick={avatarPopover.handleOpen}
              sx={{ height: 40, width: 40, cursor: 'pointer' }}
            />
            {isHamburgerVisible && (
              <IconButton onClick={toggleSideNav}>
                <Icon.Hamburger />
              </IconButton>
            )}
          </Stack>

          {/* TODO: Avatar & popover */}
        </Stack>
      </Box>
      <CustomPopover
        title="Konto"
        subtitle={currentOrg?.name}
        open={avatarPopover.open}
        onClose={avatarPopover.handleClose}
        anchorEl={avatarPopover.anchorRef.current}
        content={
          <MenuItem
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Wyloguj
          </MenuItem>
        }
      />
    </>
  );
};

export default TopNav;
