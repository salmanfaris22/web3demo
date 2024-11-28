import React from "react";
import styles from "./Banner.module.scss";
import PageWrapper from "../../../common/Components/PageWrapper/PageWrapper";
import Button from "../../../common/Components/Button/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../common/Constants";

const Banner = () => {
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.bannerWrap}>
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
          className={styles.bannerLeft}
        >
          <h1>
            Become an Exdex <br></br> Introducing Broker: Elevate Your Earnings
          </h1>

          <p>
            Join our IB program and unlock exceptional rewards as you grow. Earn
            cash bonuses, luxury experiences, and gain exclusive access to
            premium AI-powered tools. Start building your network today and
            enjoy unparalleled support on your journey to success with Exdex.
          </p>
          <Button
            theme="neon"
            onClick={() => {
              nav(routers.referal);
            }}
          >
            Become Introducer
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          animate="once"
          viewport={{ once: true }}
          transition={{
            ease: "easeIn",
            duration: 0.4,
            delay: 0.1,
          }}
          className={styles.bg}
        >
          <img src="/assets/images/ib/bannerWarrior.png" alt="Warrior" />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className={styles.blob}
      >
        <img src="/assets/images/ib/blob.png" alt="Blob" />
      </motion.div>
    </div>
  );
};

export default Banner;
