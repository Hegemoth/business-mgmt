import { Card, CardContent, CardHeader, Divider, Skeleton, Stack, Typography } from '@mui/material';
import Icon from '../../../../components/Icon';
import IconTooltip from '../../../../components/IconTooltip';
import Pill from '../../../../components/Pill';
import { useGetEmployeesQuery } from '../../../../redux/api/employeesApi';
import { AppRoute } from '../../../../types/enums';
import { Severity } from '../../../../types/shared';

const EmployeesWidget: React.FC = () => {
  const all = useGetEmployeesQuery({ limit: 1 });
  const active = useGetEmployeesQuery({ f: ['active:true'], limit: 1 });

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title="Pracownicy"
        action={
          <IconTooltip
            icon={<Icon.Launch />}
            label="Przejdź do pracowników"
            onClick={() => window.open(AppRoute.EMPLOYEES, '_blank')}
          />
        }
        titleTypographyProps={{ typography: 'h3' }}
      />
      <CardContent sx={{ pt: 3 }}>
        <Stack spacing={1.5}>
          <EmployeesWidgetRow
            label="Wszyscy"
            total={all.data?.total}
            severity="info"
            loading={all.isFetching}
          />

          <Divider />
          {/* <Typography variant="h6">Aktywni</Typography> */}

          <EmployeesWidgetRow
            label="Aktywni"
            severity="success"
            total={active.data?.total}
            loading={active.isFetching}
          />
          <EmployeesWidgetRow
            label="Bez przypisanego stanowiska"
            total={8}
            severity={!!8 ? 'warning' : 'success'}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EmployeesWidget;

interface EmployeesWidgetRowProps {
  label: string;
  total?: number;
  severity?: Severity;
  loading?: boolean;
}

export const EmployeesWidgetRow = ({
  label,
  total,
  severity = 'primary',
  loading,
}: EmployeesWidgetRowProps) => {
  if (loading) {
    return <Skeleton height={21.97} />;
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="body1" fontSize={22}>
        {label}:{' '}
      </Typography>
      <Pill severity={severity}>
        <Typography variant="h3">{total}</Typography>
      </Pill>
    </Stack>
  );
};
