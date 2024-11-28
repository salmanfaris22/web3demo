import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import styles from "./DonutGraph.module.scss";
import { formatCurrency } from "../../../utils/currencyFormatter";

ChartJS.register(ArcElement, Tooltip, Legend);

function generateRandomColors(length: number): string[] {
  return Array.from({ length }, () => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
}

const initialColors = [
  "#F000CC", // Dubai - dark pink
  "#6212DC", // Indonesia - dark purple
  "#B6FFE5", // Iran - cyan
];

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      display: false,
      labels: {
        color: "#ffffff",
        font: {
          size: 14,
        },
        padding: 20,
        boxWidth: 14,
        usePointStyle: false,
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  cutout: "80%",
};

interface ChartProps {
  data: number[];
  label: string[];
}

export const Chart: React.FC<ChartProps> = ({ data, label }) => {
  const [dataSet, setData] = useState<number[]>(data);
  const [labelsSet, setLabels] = useState<string[]>(label);
  const [colorsSet, setColors] = useState<string[]>([]); // Initialize with an empty array
  const [selected, setSelected] = useState<null | number>(null);

  useEffect(() => {
    const colors = [
      ...initialColors,
      ...(data.length > initialColors.length ? generateRandomColors(data.length - initialColors.length) : []),
    ];
    setData(data);
    setLabels(label);
    setColors(colors);
  }, [data, label]);


  const filterData = (index: number) => {
    const arr = [...data];
    const labelsArr = [...label];
    const colorsArr = [...initialColors];

    // Check if the clicked index is the same as the selected one
    if (index === selected) {
      // Restore the element
      const restoredData = arr[index];
      const restoredLabel = labelsArr[index];
      const restoredColor = colorsArr[index];

      // Update the states to include the restored element
      setData((prev) => [...prev, restoredData]);
      setLabels((prev) => [...prev, restoredLabel]);
      setColors((prev) => [...prev, restoredColor]);
      setSelected(null); // Reset selected
    } else {
      // Remove the selected element
      const splicedData = arr.filter((_, i) => i !== index);
      const splicedLabels = labelsArr.filter((_, i) => i !== index);
      const splicedColors = colorsArr.filter((_, i) => i !== index);

      setData(splicedData);
      setLabels(splicedLabels);
      setColors(splicedColors);
      setSelected(index);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ height: "180px", display: "flex", width: "180px", minWidth: "85px" }}>
        {dataSet && (
          <Doughnut
          //@ts-ignore
            options={options}
            data={{
              labels: labelsSet,
              datasets: [
                {
                  data: dataSet,
                  backgroundColor: colorsSet,
                  borderColor: colorsSet,
                  borderWidth: 0,
                },
              ],
            }}
          />
        )}
      </div>
      <div className={styles.legendWrap}>
        {label.map((x, i) => (
          <div style={{opacity : selected === i ? 0.5 : 1 }}  className={styles.legend} key={i} onClick={() => filterData(i)}>
            <div
              className={styles.legendIcon}
              style={{ background: initialColors[i] }}
            ></div>
            <div className={styles.data}>{x}</div>
            <div title={String(data[i])} className={styles.value}>{formatCurrency(data[i])}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
