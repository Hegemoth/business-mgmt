import { Box, Card, Step, StepLabel, Stepper } from '@mui/material';
import {
  useGetEmployeeAssignmentsQuery,
  useGetEmployeePositionsQuery,
  useGetEmployeesQuery,
} from '../../../../redux/api/employeesApi';
import { useGetMaterialsQuery } from '../../../../redux/api/materialsApi';
import { useGetProductsQuery } from '../../../../redux/api/productsApi';

const steps = [
  'Dodaj pracowników',
  'Dodaj stanownika',
  'Przypisz stanowiska pracownikom',
  <>
    Dodaj materiały <br />
    (wszelkie koszta firmy)
  </>,
  <>
    Dodaj produkty <br />
    (wszelkie przychody firmy)
  </>,
  'Ciesz się analizami przychodów',
];

const DashboardStepper = () => {
  const employees = useGetEmployeesQuery({ limit: 1 });
  const positions = useGetEmployeePositionsQuery({ limit: 1 });
  const assignments = useGetEmployeeAssignmentsQuery({ limit: 1 });
  const materials = useGetMaterialsQuery({ limit: 1 });
  const products = useGetProductsQuery({ limit: 1 });

  const getActiveStep = () => {
    if (!employees.data?.total) return 0;
    if (!positions.data?.total) return 1;
    if (!assignments.data?.total) return 2;
    if (!materials) return 3;
    if (!products) return 4;
    return 5;
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Card
        sx={{
          py: 4,
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stepper activeStep={getActiveStep()} alternativeLabel sx={{ width: '100%' }}>
          {steps.map((step, i) => (
            <Step key={i}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Card>
    </Box>
  );
};

export default DashboardStepper;
