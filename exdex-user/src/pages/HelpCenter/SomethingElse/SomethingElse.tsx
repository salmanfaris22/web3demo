import { motion } from "framer-motion";
import { TTicketCard } from "../TicketCards/TicketCards";
import styles from "./SomethingElse.module.scss";
import SomethingElseLoader from "./SomethingElseLoader";
import { IMAGE_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import { goToIdPage } from "../../../utils/commonutils";

export interface ISomethingElseProps {
  menuOptions: TTicketCard[];
  isDetailPage?: boolean;
  isLoading: boolean;
}

const SomethingElse = ({
  menuOptions,
  isDetailPage,
  isLoading,
}: ISomethingElseProps) => {
  const nav = useNavigate();

  if (isLoading) {
    return <SomethingElseLoader />;
  }
  return (
    <div className={styles.container}>
      {menuOptions && menuOptions.length > 0 && (
        <h2>Looking for something else?</h2>
      )}
      <div className={styles.somethingElseCardRow}>
        {menuOptions.map((menu:any, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.1 * index,
                delay: 0.1,
              }}
              className={`${styles.somethingElseCards} ${
                isDetailPage && styles.detailPage
              }`}
              key={menu.name}
              onClick={() => {
                nav(`/help-center/ticket/${menu.ID}`);
              }}
            >
              <div className={styles.somethingElseCardInner}>
                <div className={styles.iconWrapper}>
                  <div className={styles.imageContainer}>
                    <img
                      src={IMAGE_URL + "/" + menu.logo_path}
                      alt={menu.name}
                    />
                  </div>
                </div>
                <p>{menu.name}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SomethingElse;
