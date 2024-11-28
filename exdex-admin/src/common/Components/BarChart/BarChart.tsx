import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface DatasetProps {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface ChartProps {
  labels: string[];
  datasets: DatasetProps[];
}

const BarChart: React.FC<ChartProps> = ({ labels, datasets }) => {
  const data = {
    labels,
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      stack: "stack1",
      borderRadius: {
        topLeft: 10,
        topRight: 10,
        bottomLeft: index === 1 ? 10 : 0, // Add border radius to the bottom part only if it's the bottom bar
        bottomRight: index === 1 ? 10 : 0,
      },
      barThickness: 8, // Further reduce bar thickness
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false, // Hide grid lines
        },
        ticks: {
          display: false, // Hide x-axis labels
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false, // Hide grid lines
        },
        ticks: {
          display: false, // Hide y-axis labels
          beginAtZero: true,
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
