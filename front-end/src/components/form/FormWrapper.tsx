import Grid from '@mui/material/Grid2';

interface FormWrapperProps {
  children: React.ReactNode;
}

const FormWrapper = ({ children }: FormWrapperProps) => {
  return (
    <Grid container sx={{ my: 2 }} spacing={2}>
      {children}
    </Grid>
  );
};

export default FormWrapper;
