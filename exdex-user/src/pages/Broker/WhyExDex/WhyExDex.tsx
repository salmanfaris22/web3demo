import React from "react";
import styles from "./WhyExDex.module.scss";
import Marquee from "react-fast-marquee";

const WhyExDex = () => {
  return (
    <div className={styles.container}>
      <Marquee className={styles.marqueTxt} speed={35}>
        <div className={styles.bigText} >Why EXDEX?</div>
      </Marquee>
      <h2>Why EXDEX?</h2>
    </div>
  );
};

export default WhyExDex;
