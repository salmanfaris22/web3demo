import React from "react";
import styles from "./LatestNews.module.scss";
import Seperator from "../../../../common/Components/Seperator/Seperator";
import { motion } from 'framer-motion';

const LatestNewsLoader = () => {
  return (
    <motion.div
      className={styles.container}
    >
      <div style={{minHeight : "100px"}} className={`${styles.imagecontainer} skeleton `}>
        {/* Image loader placeholder */}
      </div>
      <div style={{width :"80%"}}>
        <div   className={`${styles.By} skeleton`}></div>
        <div style={{width:"20%"}}  className="skeleton"></div>
        <div style={{width:"10%" }} className="skeleton"></div>
        <span className="skeleton"></span>
      </div>
    </motion.div>
  );
};

export default LatestNewsLoader;
