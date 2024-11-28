import React from "react";
import styles from "./ImpactCard.module.scss";

export enum ImpactText {
  ForexGrowthRate = "Forex Growth Rate",
  SpotGrowthRate = "Spot Growth Rate",
  FutureGrowthRate = "Future Growth Rate",
}

export interface IImpactCardProps {
  percentage: number;
  percentageChange: number;
  text: `${ImpactText}`;
  theme?: "light" | "dark";
  typeOfChange: "increase" | "decrease";
}

function getColorCssVariable(colorType: `${ImpactText}`): string {
  switch (colorType) {
    case ImpactText.ForexGrowthRate:
      return "var(--color-white)";
    case ImpactText.SpotGrowthRate:
      return "var(--mist-blue)";
    case ImpactText.FutureGrowthRate:
      return "var(--neo-lime)";
    default:
      return "";
  }
}

const ImpactCard = ({
  percentageChange,
  percentage,
  text,
  theme = "dark",
  typeOfChange,
}: IImpactCardProps) => {
  return (
    <div
      className={styles.container}
      style={{ background: getColorCssVariable(text) }}
    >
      <div
        className={`${styles.percentage} ${
          theme === "light" && styles.lightTheme
        }`}
      >
        {percentage}%
      </div>
      <div
        className={`${styles.text} ${theme === "light" && styles.lightTheme}`}
      >
        {text}
      </div>
      <div
        className={`${styles.percentageOfChange} ${
          typeOfChange === "increase" ? styles.increase : styles.decrease
        }`}
      >{typeOfChange === "increase" ? "+" : "-"}{percentageChange}</div>
    </div>
  );
};

export default ImpactCard;
