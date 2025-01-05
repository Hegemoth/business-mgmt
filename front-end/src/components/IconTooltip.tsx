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
  action: boolean;
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
  ...rest
}: IconTooltipProps) => (
  <Tooltip
    title={locked?.isLocked ? locked.title : label}
    placement={placement}
    slotProps={{ popper: { sx: { zIndex: 1600 } } }}
  >
    <IconButton
      onClick={locked.isLocked ? () => null : onClick}
      disabled={disabled}
    >
      <SvgIcon
        fontSize={action ? 'small' : fontSize}
        color={locked.isLocked ? 'disabled' : color}
        {...rest}
      >
        {icon}
      </SvgIcon>

      {locked?.isLocked && (
        <SvgIcon fontSize="small" {...rest} sx={sxLockIcon}>
          <Icon.Lock />
        </SvgIcon>
      )}
    </IconButton>
  </Tooltip>
);

export default IconTooltip;
