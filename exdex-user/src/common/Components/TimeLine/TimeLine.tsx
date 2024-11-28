import React from "react";
import styles from "./TimeLine.module.scss";

export interface ITimeLineProps {
  timeLineItems: {
    title: string;
    description: string;
    className?: string;
  }[];
}

const TimeLine = ({ timeLineItems }: ITimeLineProps) => {
  return (
    <div className={styles.container}>
      {timeLineItems.map((x, index) => {
        return (
          <div
            className={`${styles.timeLineItem} ${x.className} ${
              index !== timeLineItems.length - 1 && styles.timeLineLine
            }`}
          >
            <div className={styles.timeLineTitle}>{x.title}</div>
            <div className={styles.description}>{x.description}</div>
            <div className={`${styles.count} ${index === 0 && styles.active}`}>
              {index + 1}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimeLine;
