import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DatasetProps {
  data: number[];
  backgroundColor: string[];
  borderRadius?: number;
  borderSkipped?: string[];
}

interface ChartProps {
  datasets: DatasetProps[];
  hoverOffset?: number;
  customOptions? : ChartOptions<any>;
  labels? : string[]
}

const DoughnutChart: React.FC<ChartProps> = ({ datasets, hoverOffset = 4  , labels, customOptions}) => {
  const data = {
    ...(labels&& {labels}),
    datasets: datasets.map((dataset) => ({
      ...dataset,
      borderRadius: 20, // Set one-sided border radius
      borderSkipped: false, // No borders between segments
    })),
  };

  const options = customOptions  ? customOptions :  {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "85%", // Thin out the doughnut
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw}`,
        },
      },
    },
    elements: {
      arc: {
        borderRadius: 20,
        borderWidth: 0,
        borderSkipped: false, // Skip border radius on the start side
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
