import { Box, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { NavItem } from '../../../types/navigation';
import SideNavConfig from '../config/SideNavConfig';
import SideNavItem from './SideNavItem';

// props: menuItems

// const SideNavItem: React.FC<NavItem & { active: boolean }> = ({
//   title,
//   path,
//   icon,
//   active,
// }) => (
//   <li>
//     <Box
//       component="a"
//       href={path}
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         padding: '10px 16px',
//         backgroundColor: active ? 'lightgray' : 'transparent',
//         textDecoration: 'none',
//         color: 'black',
//         '&:hover': {
//           backgroundColor: 'lightblue', // Optional hover effect
//         },
//       }}
//     >
//       <span>{icon}</span>
//       <span style={{ marginLeft: '8px' }}>{title}</span>
//     </Box>
//   </li>
// );

const SideNavList = () => {
  const { pathname } = useLocation();
  const navConfig = SideNavConfig();

  const isActive = (navItem: NavItem) => {
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
    <Stack component="ul" spacing={0.5} sx={{ p: 0, m: 0, listStyle: 'none' }}>
      {navConfig.map((navCategory) => (
        <Box key={navCategory.category}>
          {navCategory.category !== 'main' && (
            <li>
              <Stack
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{ px: 1, py: 2 }}
              >
                <Box
                  component="span"
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'neutral.400',
                  }}
                >
                  {navCategory.category}
                </Box>
              </Stack>
            </li>
          )}
          {navCategory.items.map((navItem: NavItem) => (
            <SideNavItem
              {...navItem}
              key={String(navItem.title)}
              active={isActive(navItem)}
            />
          ))}
        </Box>
      ))}
    </Stack>
  );
};

export default SideNavList;
