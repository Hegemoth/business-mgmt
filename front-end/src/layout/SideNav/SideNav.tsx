import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  SvgIcon,
  SxProps,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';
import { SIDE_NAV_WIDTH } from '../../constants/constants';
import { getCurrentOrg } from '../../redux/slices/appContextSlice';
import { AppRoute } from '../../types/enums';
import SideNavList from './components/SideNavList';

const drawerPaperProps: SxProps<Theme> = {
  sx: {
    backgroundColor: 'neutral.900',
    color: 'common.white',
    width: SIDE_NAV_WIDTH,
  },
};

const sxRootBox: SxProps<Theme> = {
  height: '100%',
  '& .simplebar-content': {
    height: '100%',
  },
  '& .simplebar-scrollbar:before': {
    background: 'neutral.400',
  },
};

const sxRootStack: SxProps<Theme> = {
  height: '100%',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

const sxLogo: SxProps<Theme> = {
  color: 'white',
  textDecoration: 'none',
};

const sxH1: SxProps<Theme> = {
  fontFamily: 'Verdana',
  fontSize: 20.2,
};

const sxOrgNameStack = {
  p: 1,
  borderRadius: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.04)',
};

interface SideNavProps {
  isSideNavOpen: boolean;
  toggleSideNav: () => void;
}

const SideNav = ({ isSideNavOpen, toggleSideNav }: SideNavProps) => {
  const currentOrg = useSelector(getCurrentOrg);
  const isLgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  return (
    <Drawer
      anchor="left"
      variant={isLgUp ? 'persistent' : 'temporary'}
      open={isSideNavOpen}
      onClose={toggleSideNav}
      sx={isLgUp ? {} : { zIndex: (theme) => theme.zIndex.modal }}
      PaperProps={drawerPaperProps}
    >
      <Box sx={sxRootBox}>
        <Stack sx={sxRootStack}>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box component={Link} to={AppRoute.HOME} sx={sxLogo}>
                <Typography variant="h1" sx={sxH1}>
                  Business.mgmt
                </Typography>
              </Box>

              <IconButton onClick={toggleSideNav}>
                <Icon.ChevronLeft />
              </IconButton>
            </Stack>

            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              sx={sxOrgNameStack}
            >
              <Typography variant="body2" color="neutral.400">
                {currentOrg?.name}
              </Typography>

              {/* TODO: Add popover with orgs */}
              <Tooltip title="Twoje organizacje">
                <IconButton
                // onClick={restaurantsPopover.handleOpen}
                // ref={restaurantsPopover.anchorRef}
                >
                  <SvgIcon fontSize="small" sx={{ color: 'neutral.500' }}>
                    <Icon.ExpandMore />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: 'neutral.700' }} />

          <SideNavList />

          <Divider sx={{ borderColor: 'neutral.700' }} />

          <Box sx={{ px: 2, py: 3 }}>
            <Typography variant="subtitle2" color="neutral.100">
              Potrzebujesz pomocy?
            </Typography>

            <Typography variant="body2" color="neutral.400">
              Sprawdź FAQ
            </Typography>

            <Button
              component="a"
              href="https://www.youtube.com/@Hegemoth"
              target="_blank"
              variant="contained"
              fullWidth
              endIcon={<Icon.Launch />}
              sx={{ mt: 2 }}
            >
              FAQ
            </Button>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default SideNav;
