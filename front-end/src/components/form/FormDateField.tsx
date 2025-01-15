import { DatePicker } from '@mui/x-date-pickers-pro';
import { format, isValid } from 'date-fns';
import { Field, FieldProps } from 'formik';

interface FormDateFieldProps {
  name: string;
  label: string;
}

const FormDateField = ({ name, label }: FormDateFieldProps) => {
  return (
    <Field name={name}>
      {({ field, meta, form }: FieldProps) => (
        <DatePicker
          label={label}
          {...(field.value && { defaultValue: new Date(field.value) })}
          onChange={(date: Date | null) => {
            date && isValid(date)
              ? form.setFieldValue(field.name, format(date, 'yyyy-MM-dd'))
              : form.setFieldValue(field.name, null);
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              helperText: meta.touched && meta.error,
              error: meta.touched && !!meta.error,
            },
          }}
        />
      )}
    </Field>
  );
};

export default FormDateField;
