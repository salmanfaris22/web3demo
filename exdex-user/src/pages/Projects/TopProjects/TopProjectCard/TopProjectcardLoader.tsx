import React from "react";
import styles from "./TopProjectCard.module.scss";

const TopProjectcardLoader = () => {
  return (
    <div className={styles.container}>
      <div className={`wave-container wave-black ${styles.waveLoader}`}>
        <div className="wave"></div>
      </div>
    </div>
  );
};

export default TopProjectcardLoader;
