import {
  Box,
  ButtonBase,
  Collapse,
  SvgIcon,
  SxProps,
  Theme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Icon } from '../../../components/Icon';
import { useToggle } from '../../../hooks/useToggle';
import { AppRoute } from '../../../types/enums';
import { NavItem, NavNestedItem } from '../../../types/navigation';

const sxButtonBase: SxProps<Theme> = {
  width: '100%',
  textAlign: 'left',
  mb: 0.5,
  px: 2,
  py: 1,
  borderRadius: 1,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
};

const sxIcon: SxProps<Theme> = {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  mr: 2,
};

const sxTitle = {
  flexGrow: 1,
  fontSize: 14,
  fontFamily: (theme: Theme) => theme.typography.fontFamily,
  fontWeight: 600,
  lineHeight: '24px',
};

const sxNestedTitle: SxProps<Theme> = {
  flexGrow: 1,
  fontSize: 13,
  fontFamily: (theme) => theme.typography.fontFamily,
  fontWeight: 500,
  lineHeight: '24px',
};

type NestedItemPath = NavNestedItem['path'];

interface SideNavItemProps extends NavItem {
  active?: boolean;
  currentPath?: string;
}

const SideNavItem = ({
  title,
  icon,
  path,
  navNestedItems,
  active = false,
  currentPath,
}: SideNavItemProps) => {
  const [isNestedMenuOpen, toggleNestedMenu] = useToggle(false);

  const isNestedItemActive = (nestedItemPath: NestedItemPath): boolean => {
    return currentPath === nestedItemPath;
  };

  const getLinkProps = (route?: AppRoute) => {
    if (!route) return {};
    return {
      component: Link,
      to: route,
    };
  };

  return (
    <li>
      <ButtonBase
        onClick={navNestedItems && toggleNestedMenu}
        sx={{
          ...sxButtonBase,
          backgroundColor: active ? 'rgba(255, 255, 255, 0.04)' : 'initial',
        }}
        {...getLinkProps(path)}
      >
        {icon && (
          <Box
            component="span"
            sx={{ ...sxIcon, color: active ? 'primary.main' : 'neutral.400' }}
          >
            <SvgIcon fontSize="small">{icon}</SvgIcon>
          </Box>
        )}

        <Box
          component="span"
          sx={{ ...sxTitle, color: active ? 'common.white' : 'neutral.400' }}
        >
          {title}
        </Box>

        {navNestedItems && (
          <SvgIcon sx={{ fontSize: '15px', color: 'neutral.400' }}>
            {isNestedMenuOpen ? <Icon.ExpandMore /> : <Icon.ChevronLeft />}
          </SvgIcon>
        )}
      </ButtonBase>

      <Collapse in={isNestedMenuOpen} timeout="auto" unmountOnExit>
        <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
          {navNestedItems?.map((nestedItem) => (
            <li key={String(nestedItem.title)}>
              <ButtonBase sx={sxButtonBase} {...getLinkProps(nestedItem.path)}>
                <Box
                  component="span"
                  sx={{
                    ...sxIcon,
                    color: isNestedItemActive(nestedItem.path)
                      ? 'primary.main'
                      : 'transparent',
                  }}
                >
                  <SvgIcon sx={{ fontSize: '0.5rem', mr: 0.8, ml: 0.7 }}>
                    <Icon.Square />
                  </SvgIcon>
                </Box>

                <Box
                  component="span"
                  sx={{
                    ...sxNestedTitle,
                    color: isNestedItemActive(nestedItem.path)
                      ? 'common.white'
                      : 'neutral.400',
                  }}
                >
                  {nestedItem.title}
                </Box>
              </ButtonBase>
            </li>
          ))}
        </Box>
      </Collapse>
    </li>
  );
};

export default SideNavItem;
