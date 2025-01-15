import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2 as Grid,
  MenuItem,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { omit } from 'lodash';
import * as Yup from 'yup';
import FormDateField from '../../../components/form/FormDateField';
import FormSelectField from '../../../components/form/FormSelectField';
import FormTextField from '../../../components/form/FormTextField';
import FormWrapper from '../../../components/form/FormWrapper';
import { FIELD_REQUIRED } from '../../../constants/constants';
import { translateMap } from '../../../helpers/language-helpers';
import { EmployeeAssignment, EmployeeAssignmentData } from '../../../types/employees';
import { EmploymentType, ModalMode, PaymentPeriod } from '../../../types/enums';
import { getEnumValues } from '../../../utils/enum-utils';

interface EditAssignmentModalProps {
  mode: ModalMode;
  setMode: (mode: ModalMode, data?: EmployeeAssignment) => void;
  values: EmployeeAssignment | null;
  submit: (data: Omit<EmployeeAssignmentData, 'employeeId'>) => void;
  isLoading: boolean;
}

const validationSchema = Yup.object({
  positionId: Yup.string().required(FIELD_REQUIRED),
  employmentType: Yup.string().required(FIELD_REQUIRED),
  paymentPeriod: Yup.string().required(FIELD_REQUIRED),
  rate: Yup.number().required(FIELD_REQUIRED),
  empStart: Yup.date().nullable().required(FIELD_REQUIRED),
});

const EditAssignmentModal = ({
  mode,
  setMode,
  values,
  submit,
  isLoading,
}: EditAssignmentModalProps) => {
  const initialValues = {
    ...omit(values, ['id', 'orgId']),
    ...(values?.empStart && { empStart: new Date(values.empStart) }),
    ...(values?.empEnd && { empEnd: new Date(values.empEnd) }),
  };

  return (
    <Dialog open={!!mode} onClose={() => setMode(ModalMode.CLOSED)}>
      <Formik {...{ initialValues, validationSchema }} onSubmit={submit}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <DialogTitle>Edytuj przypisanie</DialogTitle>

            <DialogContent>
              <DialogContentText>Pola oznaczone gwiazdką są wymagane</DialogContentText>

              <FormWrapper>
                <Grid size={{ xs: 12 }}>
                  <FormSelectField
                    name="employmentType"
                    label="Forma zatrudnienia*"
                    items={getEnumValues(EmploymentType).map((t) => (
                      <MenuItem key={t} value={t}>
                        {t}
                      </MenuItem>
                    ))}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormSelectField
                    name="paymentPeriod"
                    label="Naliczanie wynagrodzenia*"
                    items={getEnumValues(PaymentPeriod).map((value) => (
                      <MenuItem key={value} value={value}>
                        {/* @ts-ignore */}
                        {translateMap[value]}
                      </MenuItem>
                    ))}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormTextField name="rate" label="Stawka*" number />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormDateField name="empStart" label="Początek zatrudnienia*" />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormDateField name="empEnd" label="Koniec zatrudnienia" />
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

export default EditAssignmentModal;
