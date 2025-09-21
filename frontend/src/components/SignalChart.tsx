import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
  TimeScaleOptions,
  LinearScaleOptions,
  ChartData,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

type Sample = { timestamp: string; value: number };

type Props = { samples: Sample[] };

const SignalChart: React.FC<Props> = ({ samples }) => {
  const data: ChartData<'line', { x: number; y: number }[], unknown> = {
    datasets: [
      {
        label: 'Signal',
        data: samples.map((s) => ({ x: new Date(s.timestamp).getTime(), y: s.value })),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.2,
        pointRadius: 1,
        fill: true,
      },
    ],
  };

  const xScale = { type: 'time' as const, time: { unit: 'second' as const } };

  const options: ChartOptions<'line'> = {
    scales: {
      x: (xScale as unknown) as TimeScaleOptions,
      y: ({ beginAtZero: true } as unknown) as LinearScaleOptions,
    },
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: 300 }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default SignalChart;