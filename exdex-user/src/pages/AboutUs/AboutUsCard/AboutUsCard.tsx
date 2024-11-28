import React from "react";
import styles from "./AboutUsCard.module.scss";
import { motion } from "framer-motion";

export interface IAboutUscard {
  date: string;
  title: string;
  description: string;
  isFirst: boolean;
  isLast: boolean;
}

const AboutUsCard = ({
  date,
  title,
  description,
  isFirst,
  isLast,
}: IAboutUscard) => {
  return (
    <div className={styles.container}>
      <h2>{date}</h2>
      <h3>{title}</h3>
      <p>{description}</p>
      <motion.div
        className={`${styles.heighLight} ${isFirst && styles.first} ${
          isLast && styles.last
        }`}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className={styles.beam}></div>
      </motion.div>
    </div>
  );
};

export default AboutUsCard;
