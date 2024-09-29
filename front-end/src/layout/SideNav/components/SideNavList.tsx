import { Box, Stack, SxProps, Theme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { NavItem } from '../../../types/navigation';
import SideNavConfig from '../config/SideNavConfig';
import SideNavItem from './SideNavItem';

const sxNav: SxProps<Theme> = {
  flexGrow: 1,
  px: 2,
  py: 3,
};

const sxCategoryTitle: SxProps<Theme> = {
  p: 1,
  fontSize: 14,
  fontWeight: 700,
  textTransform: 'uppercase',
  color: 'neutral.400',
};

const sxCategoryItems: SxProps<Theme> = {
  m: 0,
  p: 0,
  listStyle: 'none',
};

const SideNavList = () => {
  const { pathname } = useLocation();
  const navConfig = SideNavConfig();

  const isActive = (navItem: NavItem): boolean => {
    if (pathname === navItem.path) {
      return true;
    }

    if (navItem.navNestedItems) {
      return navItem.navNestedItems.some(
        (nestedItem) => pathname === nestedItem.path
      );
    }

    return false;
  };

  return (
    <Box component="nav" sx={sxNav}>
      {navConfig.map((navCategory) => (
        <Stack spacing={1} key={navCategory.category}>
          {navCategory.category !== 'main' && (
            <Box component="span" sx={sxCategoryTitle}>
              {navCategory.category}
            </Box>
          )}

          <Box component="ul" sx={sxCategoryItems}>
            {navCategory.items.map((navItem) => (
              <SideNavItem
                key={String(navItem.title)}
                {...navItem}
                active={isActive(navItem)}
                currentPath={pathname}
              />
            ))}
          </Box>
        </Stack>
      ))}
    </Box>
  );
};

export default SideNavList;
