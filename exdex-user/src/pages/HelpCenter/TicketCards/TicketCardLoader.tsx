import { motion } from "framer-motion";
import styles from "./TicketCards.module.scss";

const TicketCardLoaders = () => {
  return (
    <div className={styles.container}>
      {Array.from({ length: 4 }).map((ticket, index) => {
        return (
          <motion.div className={styles.ticketCardContiner} key={index}>
            <div
              className={styles.ticketCardInner}
              style={{ background: "rgb(174 229 209 / 37%)" }}
            >
              <div className={styles.titleContainer}>
                <div className="skeleton" style={{ width: "80px" }}></div>
                <div className={styles.iconContainer}>
                  <div style={{ width: "50%" }} className="skeleton"></div>
                </div>
              </div>
              <div className={styles.articleCount}>
                <div className="skeleton"></div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TicketCardLoaders;
