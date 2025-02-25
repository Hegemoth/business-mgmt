import {
  Box,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Stack,
  SvgIcon,
  SxProps,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomPopover from '../../components/CustomPopover';
import Icon from '../../components/Icon';
import IconTooltip from '../../components/IconTooltip';
import { SIDE_NAV_WIDTH } from '../../constants/constants';
import { usePopover } from '../../hooks/usePopover';
import { useGetOrganizationsQuery } from '../../redux/api/organizationApi';
import { getCurrentOrg, setCurrentOrg } from '../../redux/slices/appContextSlice';
import { AppRoute } from '../../types/enums';
import { Organization } from '../../types/organization';
import SideNavList from './components/SideNavList';

const drawerPaperProps: SxProps<Theme> = {
  sx: {
    backgroundColor: '#02002e',
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
  fontStyle: 'italic',
  fontSize: 20.8,
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
  const orgPopover = usePopover();
  const dispatch = useDispatch();

  const { orgs } = useGetOrganizationsQuery(
    {},
    { selectFromResult: (r) => ({ orgs: r.data?.items || [] }) }
  );

  const changeOrg = (org: Organization) => {
    dispatch(setCurrentOrg(org));
    setTimeout(() => window.location.reload(), 0);
  };

  return (
    <Drawer
      anchor={currentOrg?.config.sidenav}
      variant={isLgUp ? 'persistent' : 'temporary'}
      open={isSideNavOpen}
      onClose={toggleSideNav}
      {...(!isLgUp && { sx: { zIndex: (theme) => theme.zIndex.modal } })}
      PaperProps={drawerPaperProps}
    >
      <Box sx={sxRootBox}>
        <Stack sx={sxRootStack}>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
              <Box component={Link} to={AppRoute.HOME} sx={sxLogo}>
                <Typography variant="h1" sx={sxH1}>
                  Business.mgmt
                </Typography>
              </Box>

              <IconTooltip icon={<Icon.Close />} label="Zamknij menu" onClick={toggleSideNav} />
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: 'neutral.700' }} />

          <SideNavList />

          <Divider sx={{ borderColor: 'neutral.700' }} />

          <Stack spacing={2} sx={{ p: 3 }}>
            <Typography variant="subtitle2" color="neutral.100">
              Twoja organizacja:
            </Typography>

            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              sx={sxOrgNameStack}
            >
              <Typography variant="body2" color="neutral.300">
                {currentOrg?.name}
              </Typography>

              <Tooltip title="Twoje organizacje">
                <IconButton onClick={orgPopover.handleOpen} ref={orgPopover.anchorRef}>
                  <SvgIcon fontSize="small" sx={{ color: 'neutral.500' }}>
                    <Icon.ExpandLess />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <CustomPopover
        title="Wybierz organizację"
        open={orgPopover.open}
        onClose={orgPopover.handleClose}
        anchorEl={orgPopover.anchorRef.current}
        vertical="top"
        content={
          currentOrg
            ? orgs
                .filter((org) => org.id !== currentOrg.id)
                .map((org) => (
                  <MenuItem key={org.id} onClick={() => changeOrg(org)}>
                    {org.name}
                  </MenuItem>
                ))
            : []
        }
      />
    </Drawer>
  );
};

export default SideNav;
