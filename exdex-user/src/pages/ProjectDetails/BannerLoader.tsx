import React from "react";
import styles from "./ProjectDetails.module.scss";

const BannerLoader = () => {
  return (
    <div className={styles.bannerLoader}>
      <div className={styles.bannerImageLoad}>
        {" "}
        <div className={`wave-container wave-black`}>
          <div className="wave"></div>
        </div>
      </div>
      <div className={styles.textLines}>
        {" "}
        <div className={`wave-container wave-black`}>
          <div className="wave"></div>
        </div>
      </div>
      <div className={styles.textLines}>
        {" "}
        <div className={`wave-container wave-black`}>
          <div className="wave"></div>
        </div>
      </div>
      <div className={styles.textLines}>
        {" "}
        <div className={`wave-container wave-black`}>
          <div className="wave"></div>
        </div>
      </div>
      <div className={styles.textLines}>
        {" "}
        <div className={`wave-container wave-black`}>
          <div className="wave"></div>
        </div>
      </div>
    </div>
  );
};

export default BannerLoader;
