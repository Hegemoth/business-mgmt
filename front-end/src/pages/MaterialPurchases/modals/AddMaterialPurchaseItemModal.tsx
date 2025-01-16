import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2 as Grid,
  TextField,
} from '@mui/material';
import { Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormTextField from '../../../components/form/FormTextField';
import FormWrapper from '../../../components/form/FormWrapper';
import { FIELD_REQUIRED } from '../../../constants/constants';
import { useGetMaterialsQuery } from '../../../redux/api/materialsApi';
import { ModalMode, Unit } from '../../../types/enums';
import { MaterialPurchaseItem } from '../../../types/materials';

interface AddMaterialPurchaseItemModalProps {
  mode: ModalMode;
  setMode: (mode: ModalMode, data?: MaterialPurchaseItem) => void;
  submit: (data: MaterialPurchaseItem) => void;
  isLoading: boolean;
}

const validationSchema = Yup.object({
  amount: Yup.number()
    .required(FIELD_REQUIRED)
    .positive('Ilość musi być liczbą dodatnią')
    .integer('Ilość musi być liczbą całkowitą')
    .min(1, 'Ilość musi być większa niż 0'),

  material: Yup.object({
    id: Yup.string().required(FIELD_REQUIRED),
    name: Yup.string().required(FIELD_REQUIRED),
    unit: Yup.string().required(FIELD_REQUIRED),
  }).required(FIELD_REQUIRED),
});

const AddMaterialPurchaseItemModal = ({
  mode,
  setMode,
  submit,
  isLoading,
}: AddMaterialPurchaseItemModalProps) => {
  // TODO: Change to async select
  const { materials } = useGetMaterialsQuery(
    { limit: 300 },
    { selectFromResult: (r) => ({ materials: r.data?.items || [] }) }
  );

  const initialValues = {
    amount: 0,
    material: {
      id: '',
      name: '',
      unit: '' as Unit,
    },
  };

  return (
    <Dialog open={!!mode} onClose={() => setMode(ModalMode.CLOSED)} fullWidth maxWidth="sm">
      <Formik {...{ initialValues, validationSchema }} onSubmit={submit}>
        {({ handleSubmit, touched, errors, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <DialogTitle>Dodaj materiał do zakupu</DialogTitle>

            <DialogContent>
              <DialogContentText>Pola oznaczone gwiazdką są wymagane</DialogContentText>

              <FormWrapper>
                <Grid size={{ xs: 12, md: 5 }}>
                  <FormTextField name="amount" label="Ilość*" number />
                </Grid>

                <Grid size={{ xs: 12, md: 7 }}>
                  <Field name="material">
                    {({ field }: FieldProps) => (
                      <Autocomplete
                        options={materials}
                        getOptionLabel={(option) => option.name}
                        onChange={(_, v) =>
                          setFieldValue(
                            'material',
                            v ? { id: v.id, name: v.name, unit: v.unit } : null
                          )
                        }
                        value={field.value || null}
                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Materiał*"
                            error={Boolean(touched.material && errors.material)}
                            // helperText={touched.material && errors.material ? errors.material : ''}
                          />
                        )}
                      />
                    )}
                  </Field>
                </Grid>
              </FormWrapper>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={() => setMode(ModalMode.CLOSED)}>
                Anuluj
              </Button>
              <LoadingButton type="submit" variant="contained" loading={isLoading}>
                Dodaj
              </LoadingButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddMaterialPurchaseItemModal;
