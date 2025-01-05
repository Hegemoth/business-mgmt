import { TextField } from '@mui/material';
import { Field, FieldProps } from 'formik';

interface FormTextFieldProps {
  name: string;
  label: string;
}

const FormTextField = ({ name, label }: FormTextFieldProps) => (
  <Field name={name}>
    {({ field, meta }: FieldProps) => (
      <TextField
        {...field}
        fullWidth
        label={label}
        helperText={meta.touched && meta.error ? meta.error : ''}
        error={meta.touched && !!meta.error}
      />
    )}
  </Field>
);

export default FormTextField;
