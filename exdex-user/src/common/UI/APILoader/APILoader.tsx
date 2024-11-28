import React, { useState } from "react";
import styles from "./APILoader.module.scss";

const APILoader = ({ text = "Loading" }: { text?: string }) => {
  return (
      <div className={styles.fadeWrapper}>
        <div className={styles.fadeContinuous}>
          <img src="/assets/images/loader/logo.png" alt="Logo" />
          <div>{text}</div>
        </div>
      </div>
  );
};

export default APILoader;
