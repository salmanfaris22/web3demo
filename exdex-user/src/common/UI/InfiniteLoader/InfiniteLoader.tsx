import React from "react";
import styles from "./InfiniteLoader.module.scss";

const InfiniteLoader = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default InfiniteLoader;
