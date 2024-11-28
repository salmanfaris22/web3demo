import React from "react";
import styles from "./SelectedNews.module.scss";
import ReadMore from "../../../common/Components/ReadMore/ReadMore";
import { motion } from "framer-motion";
import { NewsItem } from "../CryptoNews";




const SelectedNewsLoader = () => {
  return (
    <motion.div className={styles.container}>
      {Array.from({length : 3})?.map((x) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate="once"
            viewport={{ once: true }}
            transition={{
              ease: "easeIn",
              duration: 0.4,
              delay: 0.1,
            }}
            className={styles.selectedNews}
          >
            <div className={`${styles.imageContainer} skeleton`}>
            </div>
            <div className={styles.selectedNewsInfo}>
            <div style={{width:"20%" , marginBottom : "40px"}} className="skeleton" ></div>
            <div style={{width:"80%" , marginBottom : "40px"}} className="skeleton" ></div>
            <div style={{width:"30%" , marginBottom : "40px"}} className="skeleton" ></div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default SelectedNewsLoader;
