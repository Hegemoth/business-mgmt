// import { alpha, styled, Theme, useTheme } from '@mui/material';

// interface PillProps {
//   color: string;
//   children?: React.ReactNode;
// }

// interface PillRootProps extends PillProps {
//   theme: Theme;
// }

// const PillRoot = styled('span')<PillRootProps>(({ color }) => ({
//   alignItems: 'center',
//   backgroundColor: alpha(color, 0.12),
//   borderRadius: 12,
//   color: 'color',
//   cursor: 'default',
//   display: 'inline-flex',
//   flexGrow: 0,
//   flexShrink: 0,
//   fontFamily: theme.typography.fontFamily,
//   fontSize: theme.typography.pxToRem(12),
//   lineHeight: 2,
//   fontWeight: 600,
//   justifyContent: 'center',
//   letterSpacing: 0.5,
//   minWidth: 20,
//   paddingLeft: theme.spacing(1),
//   paddingRight: theme.spacing(1),
//   textTransform: 'uppercase',
//   whiteSpace: 'nowrap',
// }));

// const Pill = ({ color = '#222', children, ...other }: PillProps) => {
//   const theme = useTheme();

//   return (
//     <PillRoot color={color} theme={theme} {...other}>
//       {children}
//     </PillRoot>
//   );
// };

// export default Pill;

import { alpha, SxProps, Theme, useTheme } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import { Severity } from '../types/shared';

interface PillProps extends BoxProps {
  children: React.ReactNode;
  severity?: Severity;
  color?: string;
  noTransform?: boolean;
  sx?: SxProps<Theme>;
}

const Pill = ({
  children,
  severity,
  color,
  noTransform,
  sx,
  ...other
}: PillProps) => {
  const theme = useTheme();

  const pillType = severity ? 'severity' : color ? 'color' : 'severity';

  return (
    <Box
      component="span"
      sx={{
        alignItems: 'center',
        backgroundColor: alpha(
          pillType === 'severity'
            ? theme.palette[severity || 'primary'].main
            : (color as string),
          0.12
        ),
        borderRadius: 12,
        color:
          pillType === 'severity'
            ? theme.palette[severity || 'primary'].main
            : color,
        cursor: 'default',
        display: 'inline-flex',
        flexGrow: 0,
        flexShrink: 0,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.pxToRem(12),
        lineHeight: 2,
        fontWeight: 600,
        justifyContent: 'center',
        letterSpacing: 0.5,
        minWidth: 20,
        px: 1,
        textTransform: noTransform ? 'none' : 'uppercase',
        whiteSpace: 'nowrap',
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
};

export default Pill;
