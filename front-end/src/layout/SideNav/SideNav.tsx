import {
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Box, Theme } from '@mui/system';
import { Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { SIDE_NAV_WIDTH } from '../../constants/constants';
import { AppRoute } from '../../types/enums';
import SideNavList from './components/SideNavList';

interface SideNavProps {
  isSideNavOpen: boolean;
  toggleSideNav: () => void;
}

const SideNav = ({ isSideNavOpen, toggleSideNav }: SideNavProps) => {
  const isLgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  return (
    <Drawer
      anchor="left"
      variant={isLgUp ? 'persistent' : 'temporary'}
      open={isSideNavOpen}
      onClose={toggleSideNav}
      sx={!isLgUp ? { zIndex: (theme) => theme.zIndex.modal } : {}}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: SIDE_NAV_WIDTH,
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%',
          },
          '& .simplebar-scrollbar:before': {
            background: 'neutral.400',
          },
        }}
      >
        {/* TODO: Check is everything ok with styles */}
        <Stack
          sx={{
            height: '100%',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Stack sx={{ gap: 3, p: 3 }}>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                component={Link}
                to={AppRoute.HOME}
                sx={{ color: 'white', textDecoration: 'none' }}
              >
                <Typography variant="h1" sx={{ fontSize: 20 }}>
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
              sx={{
                p: 1,
                borderRadius: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
              }}
            >
              <Typography color="neutral.400" variant="body2">
                {'currentOrg.name'}
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

          <Box component="nav" sx={{ flexGrow: 1, px: 2, py: 3 }}>
            <SideNavList />
          </Box>

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
              endIcon={
                <SvgIcon fontSize="small">
                  <Icon.Launch />
                </SvgIcon>
              }
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
