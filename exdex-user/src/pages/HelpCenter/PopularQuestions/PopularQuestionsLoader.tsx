import { motion } from "framer-motion";
import styles from "./PopularQuestions.module.scss";

const PopularQuestionsLoader = () => {
  return (
    <motion.div className={styles.container}>
      <div className={styles.questions}>
        {Array.from({ length: 8 }).map((qn, index) => {
          return (
            <div
              className={styles.question}
              style={{ border: "none", opacity: "0.6" }}
            >
              <div
                className="skeleton"
                style={{ width: `${Math.random() * index + 2 * 50}%` }}
              ></div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PopularQuestionsLoader;
