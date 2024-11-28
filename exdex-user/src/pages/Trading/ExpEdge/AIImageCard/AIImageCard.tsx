import React from "react";
import styles from "./AIImageCard.module.scss";
import { motion } from "framer-motion";

export interface IAICard {
  name: string;
  feature: string[];
  entryprice: number;
  marketprice: number;
  percentage: string;
  type: "white" | "black" | "green";
  qr : string;

}

const AIImageCard = ({
  feature,
  name,
  entryprice,
  marketprice,
  type,
  percentage,
  qr,
  index
}: IAICard &{  index : number}) => {
  const getTheme = () => {
    if (type === "black") return styles.black;
    if (type === "white") return styles.white;
    if (type === "green") return styles.green;
  };

  return (
    <motion.div
    initial={{opacity : 0  , scale: 0.5}}
    whileInView={{opacity:1 , scale :1}}
    transition={{
      duration : 0.2,
      delay : index * 0.1,
      ease : [0,0.71,0.2,1.01]
    }} className={`${styles.container} `}>
      <div className={`${getTheme()} ${styles.theme}`}>
        <div className={styles.name}>{name}</div>
        <div className={styles.featureWrap}>
          {feature.map((c) => (
            <div key={c} className={styles.features}>
              {c}
            </div>
          ))}
        </div>

        <div className={styles.price}>
          <div>
            <span className={styles.label}>Entry price</span>
            <span className={styles.value}>{entryprice} </span>
          </div>
          <div>
            <span className={styles.label}>mark price</span>{" "}
            <span className={styles.value}>{marketprice}</span>
          </div>
        </div>

        <div className={styles.percentage}>{percentage}</div>
        <div className={styles.qr}>
        <img src={qr} alt="Qr Code" />
        </div>
    
      </div>
      <div className={styles.cardlogo} >
        <img src="/assets/images/trade/logo.png" alt="logo" / >
      </div>
    </motion.div>
  );
};

export default AIImageCard;
