import {
  IconButton,
  SvgIcon,
  SvgIconProps,
  SxProps,
  Theme,
  Tooltip,
  TooltipProps,
} from '@mui/material';
import Icon from './Icon';

const sxLockIcon: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  right: 0,
  width: '50%',
  height: '50%',
};

interface IconTooltipProps extends SvgIconProps {
  icon: React.ReactNode;
  label: string | JSX.Element;
  onClick?: (e: React.SyntheticEvent) => void;
  placement?: TooltipProps['placement'];
  disabled?: boolean;
  locked?: {
    isLocked: boolean;
    title?: string;
  };
  action?: boolean;
  noPadding?: boolean;
}

const IconTooltip = ({
  icon,
  label,
  onClick,
  placement,
  color = 'action',
  fontSize = 'medium',
  disabled,
  locked = {
    isLocked: false,
    title: 'Akcja zablokowana',
  },
  action,
  noPadding,
  ...rest
}: IconTooltipProps) => {
  // @ts-ignore
  const { touchRippleRef, ...other } = rest;

  return (
    <Tooltip
      title={locked?.isLocked ? locked.title : label}
      placement={placement}
      slotProps={{ popper: { sx: { zIndex: 1600 } } }}
    >
      <IconButton
        onClick={locked.isLocked ? () => null : onClick}
        disabled={disabled}
        {...(noPadding && { sx: { p: 0 } })}
      >
        <SvgIcon
          fontSize={action ? 'small' : fontSize}
          color={locked.isLocked ? 'disabled' : color}
          {...other}
        >
          {icon}
        </SvgIcon>

        {locked?.isLocked && (
          <SvgIcon fontSize="small" {...other} sx={sxLockIcon}>
            <Icon.Lock />
          </SvgIcon>
        )}
      </IconButton>
    </Tooltip>
  );
};

export default IconTooltip;
