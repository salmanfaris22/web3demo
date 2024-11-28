import React from "react";
import styles from "./NFTCard.module.scss";
import { motion } from "framer-motion";

const NFTBgCard = ({
  bgImg,
  footerText,
  title,
  className,
  noGraph,
}: {
  bgImg: string;
  footerText: string;
  title: string;
  className?: string;
  noGraph?: boolean;
}) => {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.4,
      delay: 0.2,
      ease: [0, 0.71, 0.2, 1.01],
    }}
    viewport={{ once: true }}
    className={styles.bgImgContainer}>
      <div className={styles.title}>{title}</div>
      <div
        className={`${styles.bgDiv} ${className} `}
        style={{ backgroundImage: `url(${bgImg})` }}
      ></div>
      {!noGraph && (
        <div className={styles.graphBg}>
          <img src="/assets/images/overview/comonGraph.png" alt="Graph" />
        </div>
      )}
      {!noGraph &&  <div className={styles.footerTextWrap}>
      <span className={styles.footerText}>
        <span>{footerText}</span> Since published
      </span>
      </div>}
    </motion.div>
  );
};

export default NFTBgCard;
