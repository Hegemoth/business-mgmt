import { LoadingButton } from '@mui/lab';
import {
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
import { omit } from 'lodash';
import * as Yup from 'yup';
import FormTextField from '../../../components/form/FormTextField';
import FormWrapper from '../../../components/form/FormWrapper';
import { FIELD_REQUIRED } from '../../../constants/constants';
import {
  EmployeePosition,
  EmployeePositionData,
} from '../../../types/employees';
import { ModalMode } from '../../../types/enums';

interface AddEditEmployeePositionModalProps {
  mode: ModalMode;
  setMode: (mode: ModalMode, data?: EmployeePosition) => void;
  values: EmployeePosition | null;
  submit: (data: EmployeePositionData) => void;
  isLoading: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string().required(FIELD_REQUIRED),
  color: Yup.string().required(FIELD_REQUIRED),
});

const AddEditEmployeePositionModal = ({
  mode,
  setMode,
  values,
  submit,
  isLoading,
}: AddEditEmployeePositionModalProps) => {
  const initialValues =
    mode === ModalMode.EDIT && values !== null
      ? omit(values, ['id', 'orgId'])
      : { name: '', color: '#6366F1' };

  return (
    <Dialog open={!!mode} onClose={() => setMode(ModalMode.CLOSED)}>
      <Formik {...{ initialValues, validationSchema }} onSubmit={submit}>
        {({ handleSubmit, touched, errors, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <DialogTitle>
              {mode === ModalMode.ADD
                ? 'Dodaj stanowisko'
                : 'Edytuj stanowisko'}
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                Pola oznaczone gwiazdką są wymagane
              </DialogContentText>

              <FormWrapper>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormTextField name="name" label="Nazwa*" />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Field name="color">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="color"
                        label="Kolor*"
                        sx={{ borderRadius: '50%', p: 0 }}
                        helperText={touched.color && errors.color}
                        error={touched.color && !!errors.color}
                        onChange={(e) => setFieldValue('color', e.target.value)}
                      />
                    )}
                  </Field>
                </Grid>
              </FormWrapper>
            </DialogContent>

            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setMode(ModalMode.CLOSED)}
              >
                Anuluj
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
              >
                {mode === ModalMode.ADD ? 'Dodaj' : 'Edytuj'}
              </LoadingButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddEditEmployeePositionModal;
