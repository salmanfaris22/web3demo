import React from "react";
import styles from "./LevelInfo.module.scss";
import PageWrapper from "../../../common/Components/PageWrapper/PageWrapper";
import { motion } from "framer-motion";

const commissionRates = [
  {
    name: "Level 1",
    percentage: "10%",
  },
  {
    name: "Level 2",
    percentage: "8%",
  },
  {
    name: "Level 3",
    percentage: "6%",
  },
  {
    name: "Level 4",
    percentage: "4%",
  },
  {
    name: "Level 5",
    percentage: "2%",
  },
];

const LevelInfo = () => {
  return (
    <div className={styles.container}>
      <PageWrapper type="narrow">
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
        >
          <h2>Earn from Every Level with Our Unilevel Marketing Program</h2>
          <p>
            At Exdex, our Unilevel Marketing Program is designed to maximize
            your earnings through multiple levels of commissions. Here’s how it
            works:
          </p>{" "}
          <p>
            AI Smart Card: Get access to cutting-edge trading signals generated
            by our advanced AI. Dex Gem: Discover high-potential crypto projects
            for long-term investment through AI-generated insights.
          </p>{" "}
          <p>
            Our subscription model offers a 5-level commission structure:
            <br></br>
            Level 1: 10% commission<br></br>
            Level 2: 8% commission<br></br>
            Level 3: 6% commission<br></br>
            Level 4: 4% commission<br></br>
            Level 5: 2% commission<br></br>
          </p>
          <p>
            {" "}
            The more you refer, the more you earn from each level as your
            network grows. Start sharing today and benefit from ongoing passive
            income with Exdex!
          </p>
        </motion.div>
        <div className={styles.levelInfo}>
          {commissionRates.map((commission, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                viewport={{ once: true, amount: 0.3 }}
                className={styles.levelCard}
                key={commission.percentage}
              >
                <div className={styles.levelName}>
                  {commission.name}
                  <img
                    src="/assets/images/refferal-program/dollarIcon.png"
                    alt="Dollar icon"
                  />
                </div>
                <div className={styles.comission}>
                  <div className={styles.comissionPercentage}>
                    {commission.percentage}
                  </div>
                  <div className={styles.comissionFooter}>
                    Commission
                    <img
                      src="/assets/images/refferal-program/arrow.png"
                      alt="arrow icon"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </PageWrapper>
    </div>
  );
};

export default LevelInfo;
