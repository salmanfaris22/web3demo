import { motion } from "framer-motion";
import { useState } from "react";
import useScrollToSection from "../hook/useScrollOnDone";
import styles from "./AboutUsInfo.module.scss";

const AboutUsInfo = () => {

  const [animationComplete, setAnimationComplete] = useState<{
    [key: string]: boolean;
  }>({
    abtUs: false,
    vision: false,
    mission: false,
    values: false,
  });

  useScrollToSection(animationComplete);

  const handleAnimationComplete = (section: string) => {
    setAnimationComplete((prev) => ({ ...prev, [section]: true }));
  };

  return (
    <div className={styles.container}>
      <motion.div
         id="abtUs"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        animate="once"
        viewport={{ once: true }}
        transition={{
          ease: "easeIn",
          duration: 0.3,
          delay: 0.1,
        }}
        className={styles.about}
        onAnimationComplete={() => handleAnimationComplete("abtUs")}
      >
        <h1>About Us</h1>
        <p>
          Exdex is at the forefront of transforming the financial markets
          through innovation and technology. We provide an all-in-one platform
          that caters to traders and investors of all levels, combining
          AI-driven insights, automated trading solutions, and comprehensive
          educational resources. Our goal is to make financial success
          accessible to everyone, regardless of experience or background.
        </p>
        <button>Subscribe Newsletter</button>
      </motion.div>
      <motion.div
        id="vision"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        animate="once"
        viewport={{ once: true }}
        transition={{
          ease: "easeIn",
          duration: 0.3,
          delay: 0.1,
        }}
        className={styles.about}
        onAnimationComplete={() => handleAnimationComplete("vision")}
      >
        <h1>OUR VISION</h1>
        <p>
          Our vision is to create a world where financial markets are open,
          transparent, and profitable for everyone. We aim to empower
          individuals with the tools, knowledge, and resources they need to
          achieve financial independence and success in a rapidly evolving
          digital economy.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        animate="once"
        viewport={{ once: true }}
        transition={{
          ease: "easeIn",
          duration: 0.3,
          delay: 0.1,
        }}
        className={styles.about}
        id="mission"
        onAnimationComplete={() => handleAnimationComplete("mission")}
      >
        <h1>OUR MISSION </h1>
        <p>
          Our mission is to democratize access to advanced financial tools and
          resources. By integrating cutting-edge AI technology with
          user-friendly design, we strive to provide a seamless trading
          experience that enables users to make informed decisions, maximize
          profits, and achieve their financial goals.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        animate="once"
        viewport={{ once: true }}
        transition={{
          ease: "easeIn",
          duration: 0.3,
          delay: 0.1,
        }}
        className={styles.about}
        id="values"
        onAnimationComplete={() => handleAnimationComplete("values")}
      >
        <h1>OUR VALUES </h1>
        <p>
          Innovation: We are committed to staying ahead of the curve by
          continuously enhancing our platform with the latest technology and
          features to meet the changing needs of our users. Integrity:
          Transparency and trust are the foundations of our business. We adhere
          to the highest standards of regulatory compliance and ethical
          practices, ensuring our users can trade with confidence. Education: We
          believe that knowledge is power. Exdex Academy is dedicated to
          providing high-quality educational resources that empower our users to
          become skilled and informed traders. User-Centric Design: Our platform
          is built with the user in mind, ensuring a seamless, intuitive
          experience that makes trading and investing accessible to everyone.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutUsInfo;
