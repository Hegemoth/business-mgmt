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
import { omit } from 'lodash';
import * as Yup from 'yup';
import FormTextField from '../../../components/form/FormTextField';
import FormWrapper from '../../../components/form/FormWrapper';
import { FIELD_REQUIRED } from '../../../constants/constants';
import { ModalMode } from '../../../types/enums';
import { Product, ProductData } from '../../../types/products';

interface AddEditProductModalProps {
  mode: ModalMode;
  setMode: (mode: ModalMode, data?: Product) => void;
  values: Product | null;
  submit: (data: ProductData) => void;
  isLoading: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string().required(FIELD_REQUIRED),
  netCost: Yup.number().required(FIELD_REQUIRED),
  taxRate: Yup.number().required(FIELD_REQUIRED),
  grossCost: Yup.number().required(FIELD_REQUIRED),
});

const AddEditProductModal = ({
  mode,
  setMode,
  values,
  submit,
  isLoading,
}: AddEditProductModalProps) => {
  const initialValues =
    ModalMode.EDIT && values !== null
      ? omit(values, ['id', 'orgId'])
      : {
          name: '',
          netCost: 0,
          taxRate: 0,
          grossCost: 0,
          active: true,
        };

  return (
    <Dialog open={!!mode} onClose={() => setMode(ModalMode.CLOSED)}>
      <Formik {...{ initialValues, validationSchema }} onSubmit={submit}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <DialogTitle>{mode === ModalMode.ADD ? 'Dodaj produkt' : 'Edytuj produkt'}</DialogTitle>

            <DialogContent>
              <DialogContentText>Pola oznaczone gwiazdką są wymagane</DialogContentText>

              <FormWrapper>
                <Grid size={{ xs: 12 }}>
                  <FormTextField name="name" label="Nazwa*" />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormTextField name="netCost" label="Koszt netto*" number />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormTextField name="taxRate" label="VAT*" number />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormTextField name="grossCost" label="Koszt brutto*" number />
                </Grid>
              </FormWrapper>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={() => setMode(ModalMode.CLOSED)}>
                Anuluj
              </Button>
              <LoadingButton type="submit" variant="contained" loading={isLoading}>
                {mode === ModalMode.ADD ? 'Dodaj' : 'Edytuj'}
              </LoadingButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddEditProductModal;
