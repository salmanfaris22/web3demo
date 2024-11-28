import { motion } from "framer-motion"; // Import Framer Motion
import LazyImage from "../../../common/Components/LazyImage/LazyImage";
import styles from "./SliderGroupLeft.module.scss"; // Import CSS Module
import { Project } from "../../Projects/Projects";
import SwiperProgress from "../../../common/Components/SwiperProgress/SwiperProgress";
import { SCROLLDETECT } from "../ProjectDetails";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Set the stagger delay here
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const SideStickyGroup = ({
  projectData,
  moveToComments,
  reactToProject,
  addToWatchlist,
}: {
  projectData: Project;
  moveToComments: () => void;
  reactToProject: (appreciate_type: string, like: 1|2) => void;
  addToWatchlist: () => void;
}) => {
  return (
    <motion.div
      className={styles.sideStickyGroup}
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div className={styles.action} variants={fadeIn}>
        <div className={`${styles.item} c-pointer`}>
          <button onClick={moveToComments}>
            <LazyImage
              decoding="async"
              loading="eager"
              src="/assets/images/projects/comment.png"
              alt="comment"
            />
          </button>
        </div>
        <h5>{projectData?.analytics.comment_count}</h5>
      </motion.div>

      <motion.div className={styles.action} variants={fadeIn}>
        <div className={`${styles.item} c-pointer`}>
          <button onClick={(e) => reactToProject("like", 1)}>
            <LazyImage
              decoding="async"
              loading="eager"
              src={
                projectData?.analytics.user_like === 1
                  ? "/assets/images/signal_cards/liked_white.png"
                  : "/assets/images/projects/like.png"
              }
              alt="like"
            />
          </button>
        </div>
        <h5>{projectData?.analytics.likes}</h5>
      </motion.div>

      <motion.div className={styles.action} variants={fadeIn}>
        <div className={`${styles.item} c-pointer`}>
          <button onClick={(e) => reactToProject("like", 2)}>
            <LazyImage
              decoding="async"
              loading="eager"
              src={
                projectData?.analytics.user_like === 2
                  ? "/assets/images/projects/disliked_white.png"
                  : "/assets/images/projects/dislike.png"
              }
              alt="dislike"
            />
          </button>
        </div>
        <h5>{projectData?.analytics.dislike}</h5>
      </motion.div>

      <motion.div className={styles.action} variants={fadeIn}>
        <div className={styles.item}>
          <button>
            <LazyImage
              decoding="async"
              loading="eager"
              src="/assets/images/projects/views.png"
              alt="views"
            />
          </button>
        </div>
        <h5>{projectData?.analytics.view_count}</h5>
      </motion.div>

      <motion.div className={styles.action} variants={fadeIn}>
        <div
          className={`${styles.item} ${styles.bookmark} c-pointer ${
            projectData?.analytics.watch_listed ? styles.large : ""
          }`}
        >
          <button onClick={addToWatchlist}>
            <LazyImage
              decoding="async"
              loading="eager"
              src={
                projectData?.analytics.watch_listed
                  ? "/assets/images/projects/bookmark-fill.svg"
                  : "/assets/images/projects/bookmark.png"
              }
              alt="bookmark"
            />
          </button>
        </div>
        <h5>{projectData?.analytics.watchlist_count}</h5>
      </motion.div>
      <motion.div variants={fadeIn}>
        <SwiperProgress targetElemId={SCROLLDETECT} />
      </motion.div>
    </motion.div>
  );
};

export default SideStickyGroup;
