import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  registerables
} from "chart.js"; // Import necessary components

import styles from "./DottedLineGraph.module.scss";

// Register the components
ChartJS.register(
  CategoryScale, // For the x-axis
  LinearScale, // For the y-axis
  PointElement, // To render points
  LineElement, // To render lines
  Title,
  Tooltip,
  Legend,
  ...registerables
);

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Dataset 1",
      data: [80, 75, 75, 75, 60, 55, 55, 65, 75, 75, 60, 60],
      borderColor: "rgba(204, 253, 80, 1)",
      fill: false,
      // pointRadius : (context:any) => {
      //   console.log(context.dataset.data.length , context.dataIndex)
      //   return context.dataIndex === context.dataset.data.length - 1 ? '10' : '0';
      // }, // Adjust the circle radius as needed
      // pointStyle: (context:any) => {
      //   console.log(context.dataset.data.length , context.dataIndex)
      //   return context.dataIndex === context.dataset.data.length - 1 ? 'circle' : '';
      // },
      // backgroundColor : "red",
      // borderWidth: 2, // Set the border width
      // borderDash: [5, 5], // Set the border style (optional)
    },
    {
      label: "Dataset 2",
      data: [60, 55, 55, 65, 65, 75, 80, 65, 65, 75, 75, 80],
      borderColor: "white",
      fill: false,
    },
    {
      label: "Dataset 3",
      data: [10, 20, 20, 10, 10, 21, 21, 29, 29, 15, 15, 20],
      borderColor: "rgba(5, 79, 190, 1)",
      fill: false,
    },
  ],
};

const options: ChartOptions<"line"> = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#fff",
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        color: "#fff",
      },
      position: "right",
      border: { dash: [2, 6], color: "#D9D9D93D" },
      grid: {
        color: "#D9D9D93D",
        lineWidth: 2,
        
      },
    },
  },
};
const DottedLineGraph = () => {
  //@ts-ignore
  return <Line data={data} options={options} />;
};

export default DottedLineGraph;
