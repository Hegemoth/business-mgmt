import { useFormikContext } from 'formik';

export const getValidationResult = (field: string) => {
  const { errors, touched, submitCount } = useFormikContext<any>();

  const error = (touched[field] || !!submitCount) && !!errors[field];
  const errorMessage = error ? errors[field] : '';

  return {
    helperText: errorMessage,
    error,
  };
};
