import React, { useRef, useEffect } from "react";
import classes from "./TableChart.module.scss";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

interface TableChartProps {
  data: string[];
  isDetailedChart?: boolean;
  showArea?: boolean;
  showAxis?: boolean;
  customColors?: {
    lineColor?: string;
    fillColor?: string;
    gradientStart?: string;
    gradientEnd?: string;
  };
  useGradient?: boolean;
}

const TableChart: React.FC<TableChartProps> = ({
  data,
  isDetailedChart = false,
  showArea = false,
  showAxis = false,
  customColors = {},
  useGradient = false,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const getColor = (colorVar: string) => {
    if (colorVar.startsWith("var(")) {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(colorVar.slice(4, -1))
        .trim();
    }
    return colorVar;
  };

  const numericData = data.map((item) => parseFloat(item));
  const lineColor = getColor(customColors.lineColor || "rgba(0, 140, 255, 1)");
  const fillColor = getColor(
    customColors.fillColor || "rgba(0, 140, 255, 0.2)"
  );
  const gradientStart = getColor(
    customColors.gradientStart || "rgba(0, 140, 255, 0.8)"
  );
  const gradientEnd = getColor(
    customColors.gradientEnd || "rgba(43, 45, 52, 0.8)"
  );

  const chartData = {
    labels: isDetailedChart
      ? data.map((_, index) => index.toString())
      : Array(12).fill(""),
    datasets: [
      {
        data: numericData,
        borderColor: lineColor,
        borderWidth: 2,
        fill: showArea,
        lineTension: 0.5,
        backgroundColor: function (context: any) {
          if (!showArea) return "rgba(0, 0, 0, 0)"; 

          if (useGradient) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
              return null;
            }
            const gradient = ctx.createLinearGradient(
              0,
              chartArea.bottom,
              0,
              chartArea.top
            );
            gradient.addColorStop(0, gradientEnd);
            gradient.addColorStop(1, gradientStart);
            return gradient;
          } else {
            return fillColor;
          }
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: showAxis,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        display: showAxis,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: isDetailedChart,
      },
    },
    elements: {
      point: {
        radius: isDetailedChart ? 2 : 0,
      },
    },
  };

  useEffect(() => {
    // Force chart update when component mounts or updates
    if (chartRef.current) {
      const chart = chartRef.current.firstChild as HTMLCanvasElement;
      if (chart) {
        const chartInstance = ChartJS.getChart(chart);
        if (chartInstance) {
          chartInstance.update();
        }
      }
    }
  }, [customColors, useGradient, showArea]);

  return (
    <div
      ref={chartRef}
      className={`${classes.chartOuter} ${
        isDetailedChart ? classes.detailedChart : ""
      }`}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TableChart;
