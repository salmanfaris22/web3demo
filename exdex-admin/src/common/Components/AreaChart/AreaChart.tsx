import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DatasetProps {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  fill: boolean;
  tension?: number;
}

interface ChartProps {
  labels: string[];
  datasets: DatasetProps[];
  showAxes?: boolean;
  smoothness?: number;
  showLegend?: boolean;
  title?: string;
}

const AreaChart: React.FC<ChartProps> = ({
  labels,
  datasets,
  showAxes = true,
  smoothness = 0.4,
  showLegend = false,
  title,
}) => {
  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      tension: smoothness,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
      },
      title: {
        display: !!title,
        text: title,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        display: showAxes,
        grid: {
          color: showAxes ? "rgba(255, 255, 255, 0.1)" : "transparent",
        },
        ticks: {
          color: showAxes ? "white" : "transparent",
        },
      },
      y: {
        display: showAxes,
        grid: {
          color: showAxes ? "rgba(255, 255, 255, 0.1)" : "transparent",
        },
        ticks: {
          color: showAxes ? "white" : "transparent",
          beginAtZero: true,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default AreaChart;
