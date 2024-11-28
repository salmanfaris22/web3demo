import React from "react";
import styles from "./LatestNews.module.scss";
import Seperator from "../../../../common/Components/Seperator/Seperator";
import { motion } from "framer-motion";
import { NewsItem } from "../../CryptoNews";

export interface INews {
  title: string;
  description: string;
  image: string;
  time: string;
}

export interface ILatestNewsProps {
  news: NewsItem;
  showSeperator: boolean;
  index: number;
}

const LatestNews = ({
  news: {
    image_url,
    title,
    content,
    time_ago,
    published_at,
    published_by,
    source_url,
  },
  showSeperator,
  index,
}: ILatestNewsProps) => {
  const redirect = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <motion.div
      key={Math.random()}
      initial={{ opacity: 0, x: -400, scale: 0.5 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 200, scale: 1.2 }}
      transition={{ duration: 0.6, type: "spring", delay: 0.1 * index }}
      className={styles.container}
      onClick={() => {
        redirect(source_url ? source_url : "");
      }}
    >
      <div className={styles.imagecontainer}>
        <img src={image_url} alt="Main news" />
      </div>
      <div>
        <div className={styles.By}>By {published_by}</div>
        <h3>{title}</h3>
        <p>{content}</p>
        <span>{time_ago}</span>
        {showSeperator && <Seperator />}
      </div>
    </motion.div>
  );
};

export default LatestNews;
