import React from "react";
import styles from "./LevelGraph.module.scss";

const LevelGraph = ({ count }: { count: number }) => {

  const getClassForValue = (value: number) => {
    if (!value) {
      return styles.noVal;
    }
    if (value < 1000) {
      return styles.start;
    } else if (value < 5000) {
      return styles.mid;
    } else {
      return styles.end;
    }
  };

  return (
    <div className={styles.container}>
      <img src="/assets/images/affiliation/calculatorGraph.png" alt="calulator" />
      <div className={`${styles.revenueMeter} ${getClassForValue(count)}`}>
        <div className={styles.indicWrap}>
          <div className={styles.revenue}>
            <div>${count.toFixed(2)}</div>
            <div>Commission/month</div>
          </div>
          <div className={styles.bulb}></div>
          <div className={styles.line}>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelGraph;
