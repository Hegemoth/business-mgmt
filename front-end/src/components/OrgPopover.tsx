import { Box, Divider, MenuList, Popover, Typography } from '@mui/material';

// TODO Component

interface OrgPopoverProps {
  anchorEl: null | HTMLElement;
  onClose?: () => void;
  open: boolean;
  horizontal?: 'left' | 'center' | 'right';
  vertical?: 'top' | 'center' | 'bottom';
  title: string;
  subtitle?: string;
  additionalContent?: React.ReactNode;
  width?: number | string;
}

const OrgPopover = ({
  anchorEl,
  onClose = () => {},
  open,
  horizontal = 'left',
  vertical = 'bottom',
  title,
  subtitle,
  additionalContent,
  width,
}: OrgPopoverProps) => {
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: horizontal,
        vertical: vertical,
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: width || 200, zIndex: 400 } }}
      disableScrollLock
    >
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="overline">{title}</Typography>
        {subtitle && (
          <Typography color="text.secondary" variant="body2">
            {subtitle}
          </Typography>
        )}
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1,
          },
          maxHeight: 300,
          overflowX: 'hidden',
        }}
      >
        {additionalContent}
      </MenuList>
    </Popover>
  );
};

export default OrgPopover;
