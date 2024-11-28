import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
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
  tooltipPrefix?: string;
}

const RadarChart: React.FC<ChartProps> = ({
  labels,
  datasets,
  tooltipPrefix = "",
}) => {
  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: "rgba(204, 253, 81, 1)", // Set grid color
        },
        grid: {
          color: "rgba(204, 253, 81, 1)", // Set grid color
        },
        pointLabels: {
          color: "white", // Color of the labels around the chart
          font: {
            size: 13, // Increase font size of labels
          },
        },
        ticks: {
          display: false, // Hide the y-axis values
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `${tooltipPrefix}${context.raw}`,
        },
      },
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;
