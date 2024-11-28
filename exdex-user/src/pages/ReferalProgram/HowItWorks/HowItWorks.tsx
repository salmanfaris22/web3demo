import React from "react";
import styles from "./HowItWorks.module.scss";
import TimeLine from "../../../common/Components/TimeLine/TimeLine";
import PageWrapper from "../../../common/Components/PageWrapper/PageWrapper";
import { motion } from "framer-motion";

const timeLineData = [
  {
    title: "Refer",
    description: "Share your unique referral link with potential users.",
  },
  {
    title: "Subscribe",
    description:
      "When someone subscribes to any of our AI insights—such as AI Signals, Auto Trade, Dex Gem, Exdex Academy—or even engages in trading on our platform, you earn commission.",
  },
  {
    title: "Earn",
    description:
      "You receive commissions based on the specific product they subscribe to or use. Each product has its own commission structure. Discover the details of our diverse commission models and start maximizing your earnings. Sign up today to learn more and begin earning!",
  },
];

const HowItWorks = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoWrapper}>
        <h2>How it works</h2>
        <p>
          When you share your referral link, you can earn commissions based on
          the subscriptions and activities of those who join through your link.
          Here’s how it works:
        </p>
      </div>

      <div className={styles.timeLineContainer}>
        <div className={styles.timeLine}>
          <TimeLine timeLineItems={timeLineData} />
        </div>
        <div className={styles.timeLineBg}>
          <motion.img
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            src="/assets/images/refferal-program/aboutus.png"
            alt="About Us"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
