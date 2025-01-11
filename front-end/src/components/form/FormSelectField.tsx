import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
} from '@mui/material';
import { Field, FieldProps } from 'formik';

interface FormSelectFieldProps {
  name: string;
  label: string;
  items: JSX.Element[];
}

const FormSelectField = ({ name, label, items }: FormSelectFieldProps) => (
  <Field name={name}>
    {({ field, meta }: FieldProps) => (
      <FormControl fullWidth error={meta.touched && !!meta.error}>
        <InputLabel>{label}</InputLabel>
        <Select {...field} label={label}>
          {items}
        </Select>
        <FormHelperText>{meta.touched && meta.error}</FormHelperText>
      </FormControl>
    )}
  </Field>
);

export default FormSelectField;
