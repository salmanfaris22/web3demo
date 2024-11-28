import React from "react";
import styles from "./FeaturedNewsCard.module.scss";
import ReadMore from "../../../../common/Components/ReadMore/ReadMore";
import { motion } from "framer-motion";
import { NewsItem } from "../../CryptoNews";

export interface IFeaturedNews {
  createdBy: string;
  title: string;
  description: string;
  image: string;
}

export interface IFeaturedNewsCard {
  news: NewsItem;
}

const FeaturedNewsCard = ({
  news: { time_ago, title, content, image_url, source_url },
}: IFeaturedNewsCard) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      viewport={{ once: true }}
      className={styles.container}
    >
      <div className={styles.imageContiner}>
        <img src={image_url} alt="News" />
      </div>
      <h3>crypo potato</h3>
      <h4>{title}</h4>
      <p>{content}</p>
      <ReadMore link={source_url} />
    </motion.div>
  );
};

export default FeaturedNewsCard;
