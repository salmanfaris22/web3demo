import { useLocation } from "react-router-dom";
import { tabStyles } from "../AISignals";
import styles from "./SignalTab.module.scss";
import { motion } from "framer-motion";

const SignalTabs = ({
  onTabSwitch,
}: {
  onTabSwitch: (tab: string) => void;
}) => {
  const location = useLocation();

  const handleNavigation = (tab: string) => {
    onTabSwitch(tab);
  };

  const isActive = (tabName: string) => {
    const queryParam = new URLSearchParams(location.search);
    return queryParam.get("tab") === tabName.replace(/\s+/g, "-").toLowerCase(); // Check if the current query param matches the tab
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14, // Set the stagger delay here
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0,  transition: { duration: 0.2 ,  } },
  };

  return (
    <motion.section
    initial="hidden"
      animate="show"
      variants={staggerContainer}
      className={`${styles.smartcard_filters} ${styles.smart_card_wrapper}`}
    >


      <motion.button
        variants={fadeIn}
        className={`${styles.filter_btn} ${styles.future} ${
          isActive(tabStyles.futureMarket.name) ? styles.active : ""
        }`}
        id="future"
        onClick={() => handleNavigation(tabStyles.futureMarket.name)}
      >
        {tabStyles.futureMarket.name}
      </motion.button>

      <motion.button
        variants={fadeIn}
        className={`${styles.filter_btn} ${styles.spot} ${
          isActive(tabStyles.spotMarket.name) ? styles.active : ""
        }`}
        id="spot"
        onClick={() => handleNavigation(tabStyles.spotMarket.name)}
      >
        {tabStyles.spotMarket.name}
      </motion.button>

      <motion.button
        variants={fadeIn}
        className={`${styles.filter_btn} ${styles.forex} ${
          isActive(tabStyles.forexMarket.name) ? styles.active : ""
        }`}
        id="forex"
        onClick={() => handleNavigation(tabStyles.forexMarket.name)}
      >
        {tabStyles.forexMarket.name}
      </motion.button>

      <motion.button
        variants={fadeIn}
        className={`${styles.filter_btn} ${styles.commodit} ${
          isActive(tabStyles.commoditiesMarket.name) ? styles.active : ""
        }`}
        id="commodities"
        onClick={() => handleNavigation(tabStyles.commoditiesMarket.name)}
      >
        {tabStyles.commoditiesMarket.name}
      </motion.button>

      <motion.button
        variants={fadeIn}
        className={`${styles.filter_btn} ${styles.stock} ${
          isActive(tabStyles.stockMarket.name) ? styles.active : ""
        }`}
        id="stock"
        onClick={() => handleNavigation(tabStyles.stockMarket.name)}
      >
        {tabStyles.stockMarket.name}
      </motion.button>

      <motion.button
        variants={fadeIn}
        className={`${styles.filter_btn} ${styles.indicies} ${
          isActive(tabStyles.indicesMarket.name) ? styles.active : ""
        }`}
        id="indices"
        onClick={() => handleNavigation(tabStyles.indicesMarket.name)}
      >
        {tabStyles.indicesMarket.name}
      </motion.button>
    </motion.section>
  );
};

export default SignalTabs;
