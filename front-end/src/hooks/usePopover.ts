import { useRef, useState } from 'react';

export const usePopover = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleToggle = () => setOpen((prev) => !prev);

  return {
    anchorRef,
    open,
    handleOpen,
    handleClose,
    handleToggle,
  } as const
};
