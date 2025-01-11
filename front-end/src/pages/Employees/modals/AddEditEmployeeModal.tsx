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
import { Employee, EmployeeData } from '../../../types/employees';
import { ModalMode } from '../../../types/enums';

interface AddEditEmployeeModalProps {
  mode: ModalMode;
  setMode: (mode: ModalMode, data?: Employee) => void;
  values: Employee | null;
  submit: (data: EmployeeData) => void;
  isLoading: boolean;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required(FIELD_REQUIRED),
  lastName: Yup.string().required(FIELD_REQUIRED),
  email: Yup.string().email('Niepoprawny adres email'),
  phone: Yup.string(),
});

const AddEditEmployeeModal = ({
  mode,
  setMode,
  values,
  submit,
  isLoading,
}: AddEditEmployeeModalProps) => {
  const initialValues =
    mode === ModalMode.EDIT && values !== null
      ? omit(values, ['id', 'orgId'])
      : { firstName: '', lastName: '', email: '', phone: '', active: true };

  return (
    <Dialog open={!!mode} onClose={() => setMode(ModalMode.CLOSED)}>
      <Formik {...{ initialValues, validationSchema }} onSubmit={submit}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <DialogTitle>
              {mode === ModalMode.ADD
                ? 'Dodaj pracownika'
                : 'Edytuj pracownika'}
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                Pola oznaczone gwiazdką są wymagane
              </DialogContentText>

              <FormWrapper>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormTextField name="firstName" label="Imię*" />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormTextField name="lastName" label="Nazwisko*" />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormTextField name="email" label="Email" />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormTextField name="phone" label="Telefon" />
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

export default AddEditEmployeeModal;
