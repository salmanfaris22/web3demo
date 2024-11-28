import React, { useState } from "react";
import styles from "./Loader.module.scss";
import PageAnimation from "../../Components/PageAnimation/PageAnimation";

const FadeComponent = ({ text = "Loading" }: { text?: string }) => {
  return (
    <PageAnimation>
      <div className={styles.fadeWrapper}>
        <div className={styles.fadeContinuous}>
          <img src="/assets/images/loader/logo.png" alt="Logo" />
          <div>{text}</div>
        </div>
      </div>
    </PageAnimation>
  );
};

export default FadeComponent;
