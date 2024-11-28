import React from "react";
import styles from "./LatestProjectLong.module.scss";
import LazyImage from "../../../../common/Components/LazyImage/LazyImage";
import { format } from "date-fns";



const LatestProjectLongLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
      <div className={`wave-container ${styles.waveLoader}`}>
            <div className="wave"></div>
          </div>
      </div>
      <div className={styles.descriptionContainer}>
        <div>
          <div className={styles.loading}>
          <div className={`wave-container ${styles.waveLoader}`}>
            <div className="wave"></div>
          </div>
          </div>
          <div className={styles.loading2}>
          <div className={`wave-container ${styles.waveLoader}`}>
            <div className="wave"></div>
          </div>
          </div>
        </div>
        <div className={styles.cardsFooter}>
            <div className={styles.loading}>
            <div className={`wave-container ${styles.waveLoader}`}>
            <div className="wave"></div>
          </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LatestProjectLongLoader;
