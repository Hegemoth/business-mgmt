import { Box, Divider, MenuList, Popover, Typography } from '@mui/material';

interface CustomPopoverProps {
  title: string;
  open: boolean;
  anchorEl: HTMLElement | null;
  subtitle?: string;
  content?: React.ReactNode;
  horizontal?: 'left' | 'center' | 'right';
  vertical?: 'top' | 'center' | 'bottom';
  onClose?: () => void;
}

const CustomPopover = ({
  title,
  subtitle,
  open,
  anchorEl,
  content,
  horizontal = 'left',
  vertical = 'bottom',
  onClose = () => {},
}: CustomPopoverProps) => {
  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal, vertical }}
    >
      <Box sx={{ minWidth: 150, px: 2, py: 1.5 }}>
        <Typography variant="overline">{title}</Typography>
        {subtitle && (
          <Typography color="text.secondary" variant="body2">
            {subtitle}
          </Typography>
        )}
      </Box>
      <Divider />
      <MenuList dense sx={{ p: 1 }}>
        {content}
      </MenuList>
    </Popover>
  );
};

export default CustomPopover;
