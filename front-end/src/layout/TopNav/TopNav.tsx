import {
  Alert,
  alpha,
  Avatar,
  Box,
  IconButton,
  MenuItem,
  Stack,
  Theme,
  Typography,
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
  const currentOrg = useSelector(getCurrentOrg);
  const avatarPopover = usePopover();
  const isLgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const isHamburgerVisible = !isLgUp || !isSideNavOpen;
  const isSideNavRight = currentOrg?.config.sidenav === 'right';
  const contentPadding = isSideNavOpen ? SIDE_NAV_WIDTH : 0;

  const sxHeader = (theme: Theme) => ({
    position: 'sticky',
    zIndex: theme.zIndex.appBar,
    ...(isSideNavRight && { right: { lg: contentPadding } }),
    ...(!isSideNavRight && { left: { lg: contentPadding } }),
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
          justifyContent="space-between"
          sx={{ height: TOP_NAV_HEIGHT, px: 2 }}
        >
          <Stack direction="row" alignItems="center">
            <Alert severity="info" sx={{ py: 0 }}>
              <Typography fontSize={10} color="#303030">
                Zalogowany jako:
              </Typography>
              <Typography fontSize={15} fontWeight={700} color="#303030">
                Admin {/* TODO: Add user view with limited access to organizations */}
              </Typography>
            </Alert>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
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
        </Stack>
      </Box>

      <CustomPopover
        title="Organizacja"
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
            Wyjdź
          </MenuItem>
        }
      />
    </>
  );
};

export default TopNav;
