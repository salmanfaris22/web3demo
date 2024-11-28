import React from "react";
import styles from "./NoDataFound.module.scss";

const NoDataFound = ({ title }: { title: string }) => {
  return (
    <div className={styles.container}>
      <img src="/assets/images/searchLg.png" alt="No Data icon" />
      <div>{title}</div>
    </div>
  );
};

export default NoDataFound;
