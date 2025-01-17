import { Card, CardContent, CardHeader, Divider, Skeleton, Stack, Typography } from '@mui/material';
import Icon from '../../../../components/Icon';
import IconTooltip from '../../../../components/IconTooltip';
import Pill from '../../../../components/Pill';
import { useGetMaterialsQuery } from '../../../../redux/api/materialsApi';
import { AppRoute } from '../../../../types/enums';
import { Severity } from '../../../../types/shared';

const MaterialsWidget: React.FC = () => {
  const all = useGetMaterialsQuery({ limit: 1 });
  const active = useGetMaterialsQuery({ f: ['active:true'], limit: 1 });

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title="Materiały"
        action={
          <IconTooltip
            icon={<Icon.Launch />}
            label="Przejdź do materiałów"
            onClick={() => window.open(AppRoute.MATERIALS, '_blank')}
          />
        }
        titleTypographyProps={{ typography: 'h3' }}
      />
      <CardContent sx={{ pt: 3 }}>
        <Stack spacing={1.5}>
          <MaterialsWidgetRow
            label="Wszystkie"
            total={all.data?.total}
            severity="info"
            loading={all.isFetching}
          />

          <Divider />

          <MaterialsWidgetRow
            label="Aktywne"
            severity="success"
            total={active.data?.total}
            loading={active.isFetching}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MaterialsWidget;

interface MaterialsWidgetRowProps {
  label: string;
  total?: number;
  severity?: Severity;
  loading?: boolean;
}

export const MaterialsWidgetRow = ({
  label,
  total,
  severity = 'primary',
  loading,
}: MaterialsWidgetRowProps) => {
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
