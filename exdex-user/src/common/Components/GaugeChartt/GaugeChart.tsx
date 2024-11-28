import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import styles from "./GaugeChart.module.scss";
ChartJS.register(ArcElement, Tooltip);

const GaugeChart = ({
  value,
  maxValue,
}: {
  value: number;
  maxValue: number;
}) => {
  // Calculate the percentage based on the value and maxValue
  const percentage = (value / maxValue) * 100;

  // Data for the Doughnut chart
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage], // Filled and empty portions
        backgroundColor: ["#c7ff63", "#5bd3be"], // Two colors as in the design
        borderWidth: 0, // No borders between segments
        rotation: -90, // Rotate to start from top
        cutout: "90%", // Hollow center
        circumference: 180, // Half-circle
      },
    ],
  };

  // Options to remove animation and maintain the semi-circle look
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false }, // Disable tooltip
    },
    rotation: -90,
    circumference: 180,
  };

  return (
    <div className={styles.container}>
      <div className={styles.gaugeWrapper}>
        <Doughnut data={data} options={options} />
        <div className={styles.valueWrapper} >{value}</div>
        {/* Centered value */}
        {/* <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '2em',
          color: '#c7ff63',
          fontWeight: 'bold',
        }}
      >
        {value}
      </div> */}
      </div>
    </div>
  );
};

export default GaugeChart;
