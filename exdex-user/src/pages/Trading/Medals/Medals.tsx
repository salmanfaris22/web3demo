import React from "react";
import styles from "./Medals.module.scss";
import PageWrapper from "../../../common/Components/PageWrapper/PageWrapper";
import { motion } from "framer-motion";

const medalImages = [
  "assets/images/trade/medals/cmsavard1.png.webp.png",
  "assets/images/trade/medals/cmsavard2.png.webp.png",
  "assets/images/trade/medals/cmsavard3.png.webp.png",
  "assets/images/trade/medals/cmsavard4.webp.png",
  "assets/images/trade/medals/cmsaward5.webp.png",
  "assets/images/trade/medals/cmsavard6.webp.png",
  "assets/images/trade/medals/cmsavard7.webp.png"
];

const medalVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  hover: { scale: 1.1 }, // Optional hover animation
};

const Medals = () => {
  return (
    <PageWrapper>
      <div className={styles.container}>
        {medalImages.map((image, index) => (
          <motion.div
            key={index}
            variants={medalVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }} // Animate only once when in view
            className={styles.img}
            layout // Enable layout animations for smooth positioning
            transition={{
              delay: index * 0.1 // Add a delay based on the index
            }}
          >
            <motion.img
              initial={{ filter: "grayscale(100%)" }} // Optional grayscale filter initially
              animate={{ filter: "grayscale(0%)" }} // Remove grayscale filter on animation
              transition={{ duration: 0.5 }} // Adjust animation duration
              src={image}
              alt="award"
            />
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default Medals;