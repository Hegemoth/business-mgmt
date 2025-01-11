import { TextField } from '@mui/material';
import { Field, FieldProps } from 'formik';

interface FormTextFieldProps {
  name: string;
  label: string;
  number?: boolean;
}

const FormTextField = ({ name, label, number }: FormTextFieldProps) => (
  <Field name={name}>
    {({ field, meta }: FieldProps) => (
      <TextField
        {...field}
        fullWidth
        label={label}
        helperText={meta.touched && meta.error}
        error={meta.touched && !!meta.error}
        {...(number && { type: 'number' })}
      />
    )}
  </Field>
);

export default FormTextField;
