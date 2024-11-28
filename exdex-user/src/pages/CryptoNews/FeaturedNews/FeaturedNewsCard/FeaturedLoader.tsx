import React from "react";
import styles from "./FeaturedNewsCard.module.scss";
import ReadMore from "../../../../common/Components/ReadMore/ReadMore";
import { motion } from "framer-motion";
import { NewsItem } from "../../CryptoNews";

const FeaturedNewsCardLoader = () => {
 
    return (
      <motion.div className={styles.container}>
        <div  key={""} className={`${styles.imageContiner} skeleton`}></div>
        <h3 style={{width : "40%"}} className="skeleton"></h3>
        <h4 className="skeleton"></h4>
        <p style={{width : "20%"}} ></p>
        <h4 className="skeleton"></h4>
      </motion.div>
    );

};

export default FeaturedNewsCardLoader;
