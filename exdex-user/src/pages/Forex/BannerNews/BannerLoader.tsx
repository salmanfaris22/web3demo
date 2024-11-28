import { motion } from "framer-motion";
import ReadMore from "../../../common/Components/ReadMore/ReadMore";
import styles from "./BannerNews.module.scss";
import LatestNewsLoader from "./LatestNews/LatestNewsLoader";
import SectionTitle from "../SectionTitle/SectionTitle";

const BannerNewsLoader = () => {
  return (
    <div>
              <SectionTitle title="By News Today" />
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.section}
        >
          <h2 className="skeleton" style={{width : "20%"}}></h2>
          <div className={`${styles.mainImage} skeleton`}></div>
          <div style={{width:"80%"}}  className={`skeleton ${styles.mainDescription}`}>
            <p></p>
          </div>
          <div className={styles.time}></div>
        </motion.div>
        <motion.div
          className={`${styles.section} ${styles.latest} seperatorGroup`}
        >
          <h2>Todays Latest news</h2>
          {Array.from({ length: 3}).map((props, index) => {
            return <LatestNewsLoader key={index} />;
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default BannerNewsLoader;
