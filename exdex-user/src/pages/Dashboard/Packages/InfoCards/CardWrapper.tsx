import React, { ReactNode } from "react";
import styles from "./InfoCards.module.scss";
import QnIcons from "../../../../common/Components/Icons/QnIcons";

const defaultDataIndicators = [
  "var(--neo-lime)",
  "var(--light-green)",
  "var(--color-orange)",
];

const CardWrapper = ({
  title,
  dataIndicators = defaultDataIndicators,
  showMeter = true,
  data = [],
  children,
}: {
  title: string;
  showMeter?: boolean;
  dataIndicators?: string[];
  data?: any[];
  children: ReactNode;
}) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.header}>
        {title}
        <QnIcons />
      </div>
      {children}
      {data.length > 0 && showMeter && (
        <div className={styles.meter}>
          {data.map((d, i) => {
            return (
              <div
                className={styles.meterData}
                style={{ background: dataIndicators[i], width: d * 100 + "%" }}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CardWrapper;
