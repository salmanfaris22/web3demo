import React from "react";
import styles from "./InsightsCard.module.scss";
import { motion } from "framer-motion";

const InsightsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      viewport={{once : true , amount : 0.1}}
      className={styles.container}
    >
      <div className={styles.insightsInner}>
        <h2>Maximize Your Impact with One Referral Link, Multiple Income Streams</h2>
        <div className={styles.imageWrapper}>
          <img src="/assets/images/impact/avatar-group.png" alt="Avatar"/>
        </div>
        <p>
        Promote ExDex and Unlock Diverse Earning Opportunities with Just One Referral
        </p>
      </div>
    </motion.div>
  );
};

export default InsightsCard;
