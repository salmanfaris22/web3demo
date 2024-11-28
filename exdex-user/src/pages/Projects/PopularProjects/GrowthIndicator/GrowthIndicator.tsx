import React from "react";
import styles from "./GrowthIndicator.module.scss";

const GrowthIndicator = ({ growth }: { growth: number }) => {
  return <div className={styles.container}>{growth}x</div>;
};

export default GrowthIndicator;
