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
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
}

interface ChartProps {
  labels: string[];
  datasets: DatasetProps[];
  yAxisMax?: number;
  tooltipPrefix: string;
  title?: string;
  curveTension?: number;
  yAxisPosition?: "left" | "right";
  gridColor?: string; // Add gridColor as an optional prop
}

const CommissionChart: React.FC<ChartProps> = ({
  labels,
  datasets,
  yAxisMax,
  tooltipPrefix,
  title,
  curveTension = 0,
  yAxisPosition = "left",
  gridColor = "rgba(255, 255, 255, 0.06)",
}) => {
  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      tension: curveTension, // Apply the curve tension to each dataset
    })),
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `${tooltipPrefix}${context.raw}`,
        },
      },
      title: {
        display: !!title,
        text: title,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        position: yAxisPosition,
        ticks: {
          color: "white",
        },
        grid: {
          color: gridColor, // Apply the gridline color to the y-axis
        },
      },
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: gridColor, // Apply the gridline color to the x-axis
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default CommissionChart;
