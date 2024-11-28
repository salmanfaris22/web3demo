import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "./BigLetterSection.module.scss";
import { motion } from "framer-motion";

const BigLetterSection = () => {
  const oddDiv1Ref = useRef<HTMLDivElement>(null);
  const oddDiv3Ref = useRef<HTMLDivElement>(null);
  const oddDiv5Ref = useRef<HTMLDivElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleImageLoad = () => {
    // Check if all images have loaded
    if (
      oddDiv1Ref.current &&
      oddDiv3Ref.current &&
      oddDiv5Ref.current &&
      !imagesLoaded
    ) {
      setImagesLoaded(true); // Update state when images are loaded
    }
  };

  useLayoutEffect(() => {
    const adjustTopMargin = () => {
      if (oddDiv1Ref.current) {
        const height = oddDiv1Ref.current?.offsetHeight;
        console.log("Height:", height);
        const topMargin = height / 2 - height / 5 / 2;

        // Apply the same top margin to all odd divs
        oddDiv1Ref.current.style.top = `${topMargin}px`;
        if (oddDiv3Ref.current) oddDiv3Ref.current.style.top = `${topMargin}px`;
        if (oddDiv5Ref.current) oddDiv5Ref.current.style.top = `${topMargin}px`;
      }
    };

    adjustTopMargin();
  }, [imagesLoaded]); // Adjust whenever ref is assigned

  const letterVariants = {
    hidden: { opacity: 0, scale: 0.8 }, // Initial hidden state with opacity 0 and scaled down
    visible: { opacity: 1, scale: 1 }, // Visible state with full opacity and normal scale
  };

  const viewportMargin = '70%'; // Adjust the margin as needed

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.ltr}
        ref={oddDiv1Ref}
        initial={{ opacity: 0, x : -100}}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.4,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        viewport={{ once: true }}
      >
        <div className={styles.big}>
          <img
            src="/assets/images/trade/Bigs/1.png"
            alt="1"
            onLoad={handleImageLoad}
          />
        </div>
        <div className={styles.textBox}>
          <div>
            <div className={styles.main}>4+</div>
            <div className={`${styles.sub} ${styles.red}`}>
              multi-asset trading
            </div>
            <div className={`${styles.descript} ${styles.red}`}>
              Trade across forex, crypto, and stocks, all in one platform.
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className={styles.ltr}
        initial={{ opacity: 0, y : 100}}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        viewport={{ once: true }}
      >
        <div className={styles.big}>
          <img src="/assets/images/trade/Bigs/2.png" alt="2" />
        </div>
        <div className={styles.textBox}>
          <div>
            <div className={styles.sub}>AI-Powered Signals</div>
            <div className={`${styles.descript}`}>
              AI-Powered Signals <br></br> Get real-time, AI-driven trading{" "}
              <br></br> insights to optimize your strategy.
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className={styles.ltr}
        ref={oddDiv3Ref}
        initial={{ opacity: 0, y : -100}}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.6,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        viewport={{ once: true }}
      >
        <div className={styles.big}>
          <img src="/assets/images/trade/Bigs/3.png" alt="3" onLoad={handleImageLoad} />
        </div>
        <div className={styles.textBox}>
          <div>
            <div className={styles.main}>5-star</div>
            <div className={`${styles.sub} ${styles.red}`}>
              Crypto Gem Detector
            </div>
            <div className={`${styles.descript} ${styles.red}`}>
              Leverage AI to discover high-potential, long-term crypto projects.
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className={styles.ltr}
        initial={{ opacity: 0, y : 100}}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.9,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        viewport={{ once: true }}
      >
        <div className={styles.big}>
          <img src="/assets/images/trade/Bigs/4.png" alt="4" />
        </div>
        <div className={styles.textBox}>
          <div>
            <div className={`${styles.sub} ${styles.white}`}>Auto Trade</div>
            <div className={`${styles.descript} ${styles.white}`}>
              Automate your trading with <br></br> advanced algorithms and AI-powered
              strategies.
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className={styles.ltr}
        ref={oddDiv5Ref}
        initial={{ opacity: 0, x : 100}}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.12,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        viewport={{ once: true }}
      >
        <div className={styles.big}>
          <img src="/assets/images/trade/Bigs/5.png" alt="5" onLoad={handleImageLoad} />
        </div>
        <div className={styles.textBox}>
          <div>
            <div className={`${styles.sub} ${styles.white}`}>Social Dex</div>
            <div className={`${styles.descript} ${styles.white}`}>
              A Web3 social network for traders and investors to connect,
              share insights, and grow..
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BigLetterSection;