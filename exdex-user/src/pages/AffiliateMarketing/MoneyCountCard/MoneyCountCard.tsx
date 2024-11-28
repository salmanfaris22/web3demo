import React from "react";
import styles from "./MoneyCountCard.module.scss";
import { motion } from "framer-motion";

const MoneyCountCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className={styles.container}
      viewport={{once : true , amount : 0.1}}
    >
      <div className={styles.moneyCardInner}> 
        <div>
          <h2>Join the Fastest Growing Influencer Network Today</h2>
          <h3>$53,73000</h3>
          <p>Thousands of Influencers Are Already Boosting Their Earnings with ExDex – Don’t Miss Out!</p>
        </div>
        <div className={styles.avatarContainer}>
          <img src="/assets/images/affiliation/avatar1.png"/>
          <img src="/assets/images/affiliation/avatar2.png"/>
          <img src="/assets/images/affiliation/avatar3.png"/>
        </div>
      </div>
    </motion.div>
  );
};

export default MoneyCountCard;
