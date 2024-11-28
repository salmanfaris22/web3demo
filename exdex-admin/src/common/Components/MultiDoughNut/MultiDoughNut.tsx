import React, { useEffect, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import classes from "./MultiDoughNut.module.scss";

Chart.register(ArcElement, Tooltip, Legend);

interface CustomDoughnutChartProps {
  dataValues: number[];
  gradients: { [key: string]: string[] };
  cutout: string;
}

const CustomDoughnutChart: React.FC<CustomDoughnutChartProps> = ({
  dataValues,
  gradients,
  cutout,
}) => {
  const chartRef = useRef<any>(null);
  const [chartData, setChartData] = useState<any>({ datasets: [] });

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;

      const datasets = dataValues.map((value, index) => {
        const gradientKey = `gradient${index + 1}`;
        const gradientColors = gradients[gradientKey];
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, gradientColors[0]);
        gradient.addColorStop(1, gradientColors[1]);

        return {
          data: [value, 100 - value],
          backgroundColor: [gradient, "transparent"],
          borderWidth: 0,
          borderRadius: 5,
          cutout: cutout || "30%",
        };
      });

      const data = { datasets };
      setChartData(data);
    }
  }, [dataValues, gradients, cutout]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 360,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    elements: {
      arc: {
        borderWidth: 0,
        borderSkipped: false,
      },
    },
  };

  return (
    <div className={classes.chartContainer}>
      <Doughnut ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default CustomDoughnutChart;
