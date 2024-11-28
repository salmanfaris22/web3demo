import React from "react";
import styles from "./SelectedNews.module.scss";
import ReadMore from "../../../common/Components/ReadMore/ReadMore";
import { motion } from "framer-motion";
import { NewsItem } from "../CryptoNews";
import SelectedNewsLoader from "./SelectedNewsLoader";
import DataError from "../../../common/UI/DataError/DataError";
import NoDataFound from "../../../common/UI/NoDataFound/NoDataFound";

const SelectedNews = ({
  selelectedNews,
  isLoading,
  error,
  onReload,
}: {
  selelectedNews: NewsItem[];
  isLoading: boolean;
  error: boolean;
  onReload: () => void;
}) => {
  const redirect = (url: string) => {
    window.open(url, "_blank");
  };

  if (isLoading) {
    return <SelectedNewsLoader />;
  }

  if (error) {
    return (
      <DataError
        title="Someting went wrong"
        btnLabel="reload news "
        btnProps={{
          onClick: () => {
            onReload();
          },
        }}
      />
    );
  }

  if (!isLoading && !error && selelectedNews?.length === 0) {
    return <NoDataFound title="Sorry  no news found" />;
  }

  return (
    <motion.div className={styles.container}>
      {selelectedNews?.map((x) => {
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
            <div className={styles.imageContainer}>
              <img src={x.image_url} alt="News" />
            </div>
            <div className={styles.selectedNewsInfo}>
              <h2>{x.published_by}</h2>
              <h3>{x.title}</h3>
              <p>{x.content}</p>
              <ReadMore link={x.source_url} />
              <div className={styles.uploadedOn}> {x.time_ago}</div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default SelectedNews;
