import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers-pro';
import { useState } from 'react';
import { ModalMode } from '../../../types/enums';
import { MaterialPurchase, MaterialPurchaseData } from '../../../types/materials';
import { toApiFormatDateMonths } from '../../../utils/date-utils';

interface AddMaterialPurchaseModalProps {
  mode: ModalMode;
  setMode: (mode: ModalMode, data?: MaterialPurchase) => void;
  submit: (data: MaterialPurchaseData) => void;
  isLoading: boolean;
}

const AddMaterialPurchaseModal = ({
  mode,
  setMode,
  submit,
  isLoading,
}: AddMaterialPurchaseModalProps) => {
  const [date, setDate] = useState(new Date());

  const onAddInventory = () => {
    submit({
      date: toApiFormatDateMonths(date),
      items: [],
    });
  };

  return (
    <Dialog open={!!mode} onClose={() => setMode(ModalMode.CLOSED)}>
      <DialogTitle>Dodaj zakup za dany miesiąc</DialogTitle>
      <DialogContent>
        <StaticDatePicker
          onChange={(date) => {
            date && setDate(date as Date);
          }}
          views={['year', 'month']}
          slots={{
            actionBar: () => null,
            shortcuts: () => null,
            toolbar: () => null,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setMode(ModalMode.CLOSED)}>Anuluj</Button>
        <LoadingButton onClick={onAddInventory} variant="contained" loading={isLoading} autoFocus>
          Dodaj
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddMaterialPurchaseModal;
