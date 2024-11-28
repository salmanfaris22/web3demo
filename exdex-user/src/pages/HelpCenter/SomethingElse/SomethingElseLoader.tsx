import { motion } from "framer-motion";
import styles from "./SomethingElse.module.scss";

const SomethingElseLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.somethingElseCardRow}>
        {Array.from({ length: 4 }).map((menu, index) => {
          return (
            <motion.div
            style={{opacity : ".5" }}
              className={`${styles.somethingElseCards}`}
              key={index}
            >
              <div className={styles.somethingElseCardInner}>
                <div style={{height : '120px'}} className={` skeleton`}>
                  <div className={styles.imageContainer}></div>
                </div>
                <p>{}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SomethingElseLoader;
