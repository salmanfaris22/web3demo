import React from "react";
import classes from "./ProgressBar.module.scss";
import {  formatCurrencySimple } from "../../../utils/currencyFormatter";

interface ProgressBarProps {
  percentage: number;
  backgroundColor: string;
  barColor: string;
  barBorder: number;
  showPercent: boolean;
  fontStyle?: any;
  range?: {
    min: string;
    max: string;
  };
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  backgroundColor,
  barColor,
  barBorder,
  showPercent,
  fontStyle,
  range,
}) => {
  const progressInnerStyle = {
    width: `${percentage > 0 ? percentage : 0}%`,
    backgroundColor: barColor,
    border: `${barBorder}px solid ${backgroundColor}`,
    ...fontStyle,
  };

  return (
    <>
      {range && (
        <div className={classes.rangeWrapper}>
          <div className={classes.rangeVal}>{range.min}</div>
          <div className={classes.rangeVal}>{range.max}</div>
        </div>
      )}
      <div
        className={classes.progress}
        style={{ backgroundColor: backgroundColor }}
        title={percentage + "%"}
      >
        <div className={classes.progressInner} style={progressInnerStyle}>
          {showPercent && percentage > 17 && formatCurrencySimple(percentage) + "%"}
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
