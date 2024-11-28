import ReadMore from "../../../common/Components/ReadMore/ReadMore";
import { NewsItem } from "../CryptoNews";
import SectionTitle from "../SectionTitle/SectionTitle";
import BannerNewsLoader from "./BannerLoader";
import styles from "./BannerNews.module.scss";
import LatestNews, { INews } from "./LatestNews/LatestNews";
import { motion } from "framer-motion";

const BannerNews = ({
  latestNews,
  bannerNews,
  isLoading,
}: {
  latestNews: NewsItem[];
  bannerNews: NewsItem | null;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <BannerNewsLoader />;
  }

  return (
    <div>
      <SectionTitle title="By News Today" />
      <div className={styles.container}>
        {bannerNews && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles.section}
          >
            <h2>{bannerNews?.title}</h2>
            <div
              className={styles.mainImage}
              style={{ backgroundImage: `url(${bannerNews?.image_url})` }}
            ></div>
            <div className={styles.mainDescription}>
              <p>{bannerNews?.content}</p>
            </div>
            <div className={styles.time}>{bannerNews?.time_ago}</div>
            <ReadMore
              link={bannerNews.source_url ? bannerNews.source_url : ""}
            />
          </motion.div>
        )}
        <motion.div
          transition={{
            transition: { staggerChildren: 0.07, delayChildren: 0.2 },
          }}
          className={`${styles.section} ${styles.latest} seperatorGroup`}
        >
          <h2>Todays Latest news</h2>
          {latestNews.map((props, index) => {
            return (
              <LatestNews
                index={index}
                news={props}
                showSeperator={!(index === latestNews.length - 1)}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default BannerNews;
