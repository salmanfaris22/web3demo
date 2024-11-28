import React from "react";
import classes from "./BubbleChart.module.scss";
interface CircleData {
  radius: number;
  left: string;
  bottom: string;
  zIndex: number;
}

interface BubbleChartWithDivsProps {
  values: number[];
}

const BubbleChart: React.FC<BubbleChartWithDivsProps> = ({ values }) => {
  // Function to normalize the values and create circle data
  const createCircleData = (
    values: number[],
    containerWidth: number,
    containerHeight: number
  ): CircleData[] => {
    const maxRadius = containerWidth * 0.6; // Set max radius relative to container width
    const minRadius = containerWidth * 0.3; // Set min radius relative to container width
    const maxValue = Math.max(...values);
    const padding = 0; // Padding to prevent circles from touching the container edges
    const sortedValues = [...values].sort((a, b) => a - b);

    return values.map((value, index) => {
      const radius = (value / maxValue) * (maxRadius - minRadius) + minRadius; // Normalize radius
      const maxLeft = containerWidth - radius - padding;
      const maxBottom = containerHeight - radius - padding;
      const leftPosition = (index * (radius * 1.2)) % maxLeft; // Ensure it stays within bounds
      const bottomPosition = Math.random() * (maxBottom - padding) + padding; // Ensure it stays within bounds
      const zIndex = 100 - sortedValues.indexOf(value) + 1; // Higher values get lower zIndex

      return {
        radius,
        left: `${leftPosition}px`,
        bottom: `${bottomPosition}px`,
        zIndex: zIndex,
      };
    });
  };

  const containerWidth = 240; // Set container width
  const containerHeight = 180; // Set container height
  const circles = createCircleData(values, containerWidth, containerHeight);

  const colors = [
    "linear-gradient(188deg, #8DEC2C 6.16%, rgba(63, 104, 21, 0.73) 139.85%)",
    "linear-gradient(188.59deg, #8B2224 6.56%, rgba(139, 34, 36, 0) 134.72%)",
    "rgba(186, 72, 138, 1)",
    "linear-gradient(183.72deg, #51B07E 3.14%, rgba(64, 169, 114, 0.67) 129.47%)",
    "rgba(70, 130, 180, 1)",
  ];

  return (
    <div
      style={{
        position: "relative",
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        overflow: "hidden",
      }}
    >
      {circles.map((circle, index) => (
        <div
          className={`${classes.circle} ${
            values[index] == 0 ? classes.hide : ""
          }`}
          key={index}
          style={{
            width: `${circle.radius}px`,
            height: `${circle.radius}px`,
            background: colors[index % colors.length], // Cycle through colors
            left: circle.left,
            bottom: circle.bottom,
            zIndex: circle.zIndex,
          }}
        >
          <div className={classes.val}>{values[index]}%</div>
        </div>
      ))}
    </div>
  );
};

export default BubbleChart;
