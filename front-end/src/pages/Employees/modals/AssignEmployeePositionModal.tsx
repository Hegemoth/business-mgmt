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
import * as Yup from 'yup';
import FormDateField from '../../../components/form/FormDateField';
import FormSelectField from '../../../components/form/FormSelectField';
import FormTextField from '../../../components/form/FormTextField';
import FormWrapper from '../../../components/form/FormWrapper';
import { FIELD_REQUIRED } from '../../../constants/constants';
import { translateMap } from '../../../helpers/language-helpers';
import {
  Employee,
  EmployeeAssignmentData,
  EmployeePosition,
} from '../../../types/employees';
import { EmploymentType, ModalMode, PaymentPeriod } from '../../../types/enums';
import { getEnumValues } from '../../../utils/enum-utils';

interface AssignEmployeePositionModalProps {
  mode: ModalMode;
  setMode: (mode: ModalMode, data?: Employee) => void;
  positions: EmployeePosition[];
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

const AssignEmployeePositionModal = ({
  mode,
  setMode,
  positions,
  submit,
  isLoading,
}: AssignEmployeePositionModalProps) => {
  const initialValues = {
    positionId: '',
    rate: '',
    employmentType: '',
    paymentPeriod: '',
    empStart: null,
    empEnd: undefined,
  } as any;

  return (
    <Dialog open={!!mode} onClose={() => setMode(ModalMode.CLOSED)}>
      <Formik {...{ initialValues, validationSchema }} onSubmit={submit}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <DialogTitle>Dodaj przypisanie</DialogTitle>

            <DialogContent>
              <DialogContentText>
                Pola oznaczone gwiazdką są wymagane
              </DialogContentText>

              <FormWrapper>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormSelectField
                    name="positionId"
                    label="Stanowisko*"
                    items={positions.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.name}
                      </MenuItem>
                    ))}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
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
                  <FormDateField
                    name="empStart"
                    label="Początek zatrudnienia*"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormDateField name="empEnd" label="Koniec zatrudnienia" />
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
                Przypisz
              </LoadingButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AssignEmployeePositionModal;
