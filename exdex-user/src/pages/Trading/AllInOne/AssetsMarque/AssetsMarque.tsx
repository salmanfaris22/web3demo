import React from "react";
import styles from "./AssetsMarque.module.scss";
import { MarqueList } from "./Marque";

const AssetsMarque = () => {
  return (
    <div className={styles.container}>
      <h2>Assets that we trade</h2>
      <p></p>
      <div>
        <MarqueList direction="left" />
        <MarqueList direction="right" />
        <MarqueList direction="left" />
      </div>
    </div>
  );
};

export default AssetsMarque;
