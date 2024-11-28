import React from "react";
import styles from "./AllInOne.module.scss";
import { motion } from "framer-motion";

const AllInOne = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wRow}>
        <div className={styles.warriorContainer}>
          <img src="/assets/images/trade/warrior/warriors.png" alt="Warriors" />
          <img
            src="/assets/images/trade/warrior/warriorsMobile.png"
            alt="Warriors"
          />
        </div>
        <motion.div
        className={styles.floatText}
        initial={{ x: -100 }} // Start with 0% width
        whileInView={{ x : 0  , }} // Animate to 100% width
        transition={{ duration: .8, ease: "easeInOut" }} // Smooth animation
        viewport={{ once: true, amount: 0.4 }} 
      >
        <h2>Exdex All in one Platform</h2>
      </motion.div>
      </div>
    </div>
  );
};

export default AllInOne;
