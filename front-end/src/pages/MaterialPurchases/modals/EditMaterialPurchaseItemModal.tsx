import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2 as Grid,
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormTextField from '../../../components/form/FormTextField';
import FormWrapper from '../../../components/form/FormWrapper';
import { FIELD_REQUIRED } from '../../../constants/constants';
import { ModalMode } from '../../../types/enums';
import { MaterialPurchaseItem } from '../../../types/materials';

interface EditMaterialPurchaseItemModalProps {
  mode: ModalMode;
  setMode: (mode: ModalMode, data?: MaterialPurchaseItem) => void;
  values: MaterialPurchaseItem | null;
  submit: (data: MaterialPurchaseItem) => void;
  isLoading: boolean;
}

const validationSchema = Yup.object({
  amount: Yup.number().required(FIELD_REQUIRED),
});

const EditMaterialPurchaseItemModal = ({
  mode,
  setMode,
  values,
  submit,
  isLoading,
}: EditMaterialPurchaseItemModalProps) => {
  const initialValues = values
    ? {
        amount: values.amount,
        material: values.material,
      }
    : ({} as MaterialPurchaseItem);

  return (
    <Dialog open={!!mode} onClose={() => setMode(ModalMode.CLOSED)}>
      <Formik {...{ initialValues, validationSchema }} onSubmit={submit}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <DialogTitle>Edytuj pozycję zakupową</DialogTitle>

            <DialogContent>
              <DialogContentText>Pola oznaczone gwiazdką są wymagane</DialogContentText>

              <FormWrapper>
                <Grid size={{ xs: 12 }}>
                  <FormTextField name="amount" label="Ilość*" number />
                </Grid>
              </FormWrapper>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={() => setMode(ModalMode.CLOSED)}>
                Anuluj
              </Button>
              <LoadingButton type="submit" variant="contained" loading={isLoading}>
                Edytuj
              </LoadingButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditMaterialPurchaseItemModal;
