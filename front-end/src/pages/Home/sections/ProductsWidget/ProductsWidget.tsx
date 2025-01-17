import { Card, CardContent, CardHeader, Divider, Skeleton, Stack, Typography } from '@mui/material';
import Icon from '../../../../components/Icon';
import IconTooltip from '../../../../components/IconTooltip';
import Pill from '../../../../components/Pill';
import { useGetProductsQuery } from '../../../../redux/api/productsApi';
import { AppRoute } from '../../../../types/enums';
import { Severity } from '../../../../types/shared';

const ProductsWidget: React.FC = () => {
  const all = useGetProductsQuery({ limit: 1 });
  const active = useGetProductsQuery({ f: ['active:true'], limit: 1 });

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title="Produkty"
        action={
          <IconTooltip
            icon={<Icon.Launch />}
            label="Przejdź do produktów"
            onClick={() => window.open(AppRoute.PRODUCTS, '_blank')}
          />
        }
        titleTypographyProps={{ typography: 'h3' }}
      />
      <CardContent sx={{ pt: 3 }}>
        <Stack spacing={1.5}>
          <ProductsWidgetRow
            label="Wszystkie"
            total={all.data?.total}
            severity="info"
            loading={all.isFetching}
          />

          <Divider />

          <ProductsWidgetRow
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

export default ProductsWidget;

interface ProductsWidgetRowProps {
  label: string;
  total?: number;
  severity?: Severity;
  loading?: boolean;
}

export const ProductsWidgetRow = ({
  label,
  total,
  severity = 'primary',
  loading,
}: ProductsWidgetRowProps) => {
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
