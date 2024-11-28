import React, { useState } from "react";
import styles from "./InfoCards.module.scss";
import { motion, Variants } from "framer-motion";

const InfoCards = () => {
  // Array of card data
  const cardsData = [
    {
      title: "Maximize Your Earnings with Every Referral",
      content: `When you share your Exdex referral link, you unlock the potential to earn from multiple products across our platform. Whether it's Auto Trade, IB, Exdex Academy, AI Smart Card, or Dex Gem, every referral can generate commissions from all of these innovative services. Share your link and watch your earnings multiply!`,
      image: "/assets/images/refferal-program/graphs.png",
    },
    {
      title: "Join the Fastest Growing Affiliate Marketing Platform",
      content: "",
      // image: null,
      image: "/assets/images/refferal-program/graphs.png",
    },
    {
      title: "Unlock Passive Income with Exdex",
      content: "",
     image: "/assets/images/refferal-program/graphs.png",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const winWidth = window.innerWidth;
  const isPc = winWidth > 768;

  // Determine the size based on hover state
  const getAnimProperty = (hov: boolean) => {
    return isPc
      ? { width: hov ? "50%" : "25%" }
      : { maxHeight: hov ? "800px" : "250px" };
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Text animation variants for the content
  const textVariants: Variants = isPc
    ? {
        visible: {
          display: "block",
          opacity: 1,
          transition: { duration: 0.4, delay: 0.3 },
        },
        hidden: { display: "none", opacity: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { display: "none", opacity: 0 },
        visible: {
          display: "block",
          opacity: 1,
          transition: { delay: 0.3 },
        },
      };

  const ImgVarient: Variants = {
    visible: {
      opacity: 1,
      transition: { duration: 0.4, delay: 0.3 },
    },
    hidden: { display: "none", opacity: 0, transition: { duration: 0 } },
  };

  const titleVariants: Variants = {
    visible: { opacity: 1, transition: { duration: 0.4, delay: 0.3 } },
    hidden: { opacity: 0, transition: { duration: 0 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      viewport={{ once: true, amount: 0.1 }}
      className={styles.container}
    >
      <div className={styles.infoCardWrapper}>
        {cardsData.map((card, index) => {
          const isHovered = index === hoveredIndex;
          const width = getAnimProperty(isHovered);

          return (
            <motion.div
              style={width}
              onMouseEnter={() => handleMouseEnter(index)}
              // onMouseLeave={handleMouseLeave}
              animate={width}
              transition={{ duration: isPc ? 0.3 : 0.2 }}
              key={index}
              className={styles.infoCard}
            >
              {/* Animate the title to disappear on hover and reappear on collapse */}
              {
                <motion.h2
                  variants={titleVariants}
                  initial="visible"
                  style={{ display: isHovered && isPc ? "none" : "block" }}
                  // animate={isHovered ? "hidden" : "visible"}
                >
                  {card.title}
                </motion.h2>
              }
              {isPc && (
                <motion.h2
                  variants={titleVariants}
                  initial="visible"
                  animate={isHovered ? "visible" : "hidden"}
                >
                  {card.title}
                </motion.h2>
              )}

              {/* Animate the content to appear only when hovered */}
              <motion.p
                variants={textVariants}
                initial="hidden"
                animate={isHovered ? "visible" : "hidden"}
              >
                {card.content}
              </motion.p>

              {card.image && (
                <motion.img
                  variants={ImgVarient}
                  src={card.image}
                  animate={isHovered ? "visible" : "hidden"}
                  alt="card image"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default InfoCards;
