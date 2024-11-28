import React from "react";
import { Chart as ChartJS, ChartOptions, ChartData, Plugin } from "chart.js";
import { Chart } from "react-chartjs-2";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";

ChartJS.register(TreemapController, TreemapElement);

interface DataItem {
  name: string;
  value: number;
  displayValue: string;
  color: string;
}

interface HeatmapProps {
  data: DataItem[];
}

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  const chartData: ChartData<"treemap"> = {
    datasets: [
      {
        tree: data.map((item) => ({ name: item.name, value: item.value })),
        key: "value",
        labels: {
          display: false,
        },
        backgroundColor: (context: any) => {
          if (context.raw) {
            const item = data.find((d) => d.name === context.raw._data.name);
            return item?.color || "#000000";
          }
          return "#000";
        },
        borderWidth: 0,
        spacing: 2,
        borderColor: "#ffffff",
      } as any,
    ],
  };

  const options: ChartOptions<"treemap"> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (context: any) =>
            context[0].raw ? context[0].raw._data.name : "",
          label: (context: any) => {
            if (context.raw) {
              const item = data.find((d) => d.name === context.raw._data.name);
              return item ? `Value: ${item.displayValue}` : "";
            }
          },
        },
        position: "nearest", // Ensure this matches one of the available positioners
      },
    },
  };

  const plugin: Plugin<"treemap"> = {
    id: "customTreemapLabels",
    afterDatasetsDraw: (chart) => {
      const ctx = chart.ctx;
      chart.data.datasets.forEach((dataset: any, datasetIndex) => {
        const meta = chart.getDatasetMeta(datasetIndex);
        if (!meta.hidden) {
          meta.data.forEach((element: any, index: number) => {
            const { x, y, width, height } = element;
            const item = data[index];
            if (item) {
              const minDimension = Math.min(width, height);
              const fontSize = Math.max(minDimension / 10, 10); // Adjust as needed

              ctx.save();
              ctx.font = `${fontSize}px Poppins-Medium`;
              ctx.fillStyle = "#000";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";

              const centerX = x + width / 2;
              const centerY = y + height / 2;

              ctx.fillText(item.name, centerX, centerY - fontSize / 2);
              ctx.fillText(item.displayValue, centerX, centerY + fontSize / 2);
              ctx.restore();
            }
          });
        }
      });
    },
  };

  return (
    <Chart
      type="treemap"
      data={chartData}
      options={options}
      plugins={[plugin]}
    />
  );
};

export default Heatmap;
