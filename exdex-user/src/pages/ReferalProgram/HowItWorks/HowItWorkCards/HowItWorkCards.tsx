import React from "react";
import styles from "./HowItWorkCards.module.scss";
import { motion } from "framer-motion";

export interface IHowItWorkCard {
  title: string;
  description: string;
  theme?: "light" | "dark";
}

export interface IHowItWorksCardsProps {
  cardInfo: IHowItWorkCard[];
  cardSet2?: boolean;
}

const HowItWorkCards = ({ cardInfo, cardSet2 }: IHowItWorksCardsProps) => {
  return (
    <div className={`${styles.container} ${cardSet2 && styles.cardSet2}`}>
      {cardInfo.map((card , index) => {
        return (
          <motion.div
           key={card.title}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.1 * index,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            viewport={{ once: true, amount: 0.3 }}
            className={`${card.theme === "light" && styles.cardLightTheme} ${
              styles.howItWorkCard
            }  `}
          >
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <div className={styles.learnMore}>
              Learn more
              <img
                src="/assets/images/refferal-program/arrow.png"
                alt="Arrow icon"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HowItWorkCards;
