import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

interface ConfirmationModalProps {
  open: boolean;
  close: () => void;
  onConfirm: () => void;
  title: string | JSX.Element;
  isLoading: boolean;
  children?: React.ReactNode;
}

const ConfirmationModal = ({
  open,
  close,
  onConfirm,
  title,
  isLoading,
  children,
}: ConfirmationModalProps) => (
  <Dialog open={open} onClose={close}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      <Button onClick={close} variant="outlined">
        Anuluj
      </Button>
      <LoadingButton
        onClick={onConfirm}
        variant="contained"
        loading={isLoading}
        autoFocus
      >
        Potwierdź
      </LoadingButton>
    </DialogActions>
  </Dialog>
);

export default ConfirmationModal;
