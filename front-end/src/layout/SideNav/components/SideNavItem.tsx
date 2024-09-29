import { Box, ButtonBase, Collapse, SvgIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { Icon } from '../../../components/Icon';
import { useToggle } from '../../../hooks/useToggle';
import { AppRoute } from '../../../types/enums';
import { NavItem, NavNestedItem } from '../../../types/navigation';

type NestedItemPath = NavNestedItem['path'];

interface SideNavItemProps extends NavItem {
  active?: boolean;
  currentPath?: string;
}

const buttonBaseStyles = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  textAlign: 'left',
  mb: 0.5,
  px: 2,
  py: '6px',
  borderRadius: 1,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
};

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
          ...buttonBaseStyles,
          backgroundColor: active ? 'rgba(255, 255, 255, 0.04)' : 'initial',
        }}
        {...getLinkProps(path)}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              mr: 2,
              color: active ? 'primary.main' : 'neutral.400',
            }}
          >
            <SvgIcon fontSize="small">{icon}</SvgIcon>
          </Box>
        )}

        <Box
          component="span"
          sx={{
            flexGrow: 1,
            fontSize: 14,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontWeight: 600,
            lineHeight: '24px',
            color: active ? 'common.white' : 'neutral.400',
          }}
        >
          {title}
        </Box>

        {navNestedItems && (
          <SvgIcon
            fontSize="small"
            sx={{ fontSize: '15px', color: 'neutral.400' }}
          >
            {isNestedMenuOpen ? <Icon.ExpandMore /> : <Icon.ChevronLeft />}
          </SvgIcon>
        )}
      </ButtonBase>

      <Collapse in={isNestedMenuOpen} timeout="auto" unmountOnExit>
        {navNestedItems?.map((nestedItem) => (
          <li key={String(nestedItem.title)}>
            <ButtonBase
              sx={buttonBaseStyles}
              {...getLinkProps(nestedItem.path)}
            >
              <Box
                component="span"
                sx={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: 2,
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
                  flexGrow: 1,
                  fontSize: 13,
                  fontFamily: (theme) => theme.typography.fontFamily,
                  fontWeight: 500,
                  lineHeight: '24px',
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
      </Collapse>
    </li>
  );
};

export default SideNavItem;
