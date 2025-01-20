import { Box, Card } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { format, subMonths } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { getCurrentOrg } from '../../../../redux/slices/appContextSlice';
import { toCurrency } from '../../../../utils/number-utils';
import { capitalize } from '../../../../utils/text-utils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const ReportChart = () => {
  // TODO: Delete when API will handle it
  const currentOrg = useSelector(getCurrentOrg);
  const orgWithData = currentOrg?.id === '999c973d-19e5-4b66-8ff3-5efc4c16f47b';

  const createData = (revenue: number, costs: number, profit: number) => ({
    revenue: orgWithData ? revenue : 0,
    costs: orgWithData ? costs : 0,
    profit: orgWithData ? profit : 0,
  });
  
  const data = {
    past2: createData(192805.84, 127466.92, 65338.92),
    past1: createData(172805.44, 122466.89, 50338.55),
    current: createData(230325.56, 189872.12, 40453.44),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      datalabels: {
        backgroundColor: function (context: any) {
          return context.dataset.backgroundColor;
        },
        borderRadius: 4,
        color: 'white',
        font: {
          weight: 'bold' as const,
          size: 12,
        },
        formatter: (val: any) => toCurrency(val),
        padding: 6,
        display: true,
      },
    },
  };

  const getMonthLabels = () => {
    const now = new Date();
    return [
      capitalize(format(subMonths(now, 2), 'LLLL yyyy', { locale: pl })),
      capitalize(format(subMonths(now, 1), 'LLLL yyyy', { locale: pl })),
      capitalize(format(now, 'LLLL yyyy', { locale: pl })),
    ];
  };

  const chartData = {
    labels: getMonthLabels(),
    datasets: [
      {
        label: 'Przychód',
        data: [data.past2.revenue, data.past1.revenue, data.current.revenue],
        backgroundColor: 'rgba(0, 120, 230, 0.8)',
      },
      {
        label: 'Koszty',
        data: [data.past2.costs, data.past1.costs, data.current.costs],
        backgroundColor: 'rgba(230, 140, 0, 0.8)',
      },
      {
        label: 'Zysk',
        data: [data.past2.profit, data.past1.profit, data.current.profit],
        backgroundColor: (ctx: any) =>
          ctx.raw >= 0 ? 'rgba(20, 190, 0, 0.8)' : 'rgba(190, 20, 0, 0.8)',
      },
    ].map((dataset) => ({
      ...dataset,
      borderRadius: 10,
      datalabels: {
        align: 'end' as const,
        anchor: 'end' as const,
      },
    })),
  };

  return (
    <Card sx={{ mb: 2, py: 2 }}>
      <Box sx={{ ml: 2, borderBottom: 1, borderColor: 'divider', height: 400 }}>
        <Bar options={options} data={chartData} />
      </Box>
    </Card>
  );
};

export default ReportChart;
