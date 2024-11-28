import React from "react";
import styles from "./CountCard.module.scss";
import { motion } from "framer-motion";

const avatars =[
  'avatar1.png',
  'avatar2.png',
  'avatar3.png',
  'avatar4.png'
]

const CountCard = () => {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.5,
      delay: 0.2,
      ease: [0, 0.71, 0.2, 1.01],
    }}
    viewport={{once : true , amount : 0.1}}
      className={styles.container}
    >
               {avatars.map((src, index) => (
        <motion.img
          key={index}
          src={`assets/images/affiliation/earnings/${src}`}
          alt="Avatar"
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            delay: 0.8 + index * 0.2,  // Delay the appearance of each image
          }}
          viewport={{ once: true, amount: "some" }}
          className={styles[`avatar${index + 1}`]}
        />
      ))}
      
      <div className={styles.countCardInner}>
        <div>
          <h2>Real-Time Earnings Over $100,000 Paid to Influencers</h2>
          <p>
            Get Paid Instantly as You Grow Your Network and Watch Your Earnings
            Skyrocket!
          </p>
        </div>
      </div>

    </motion.div>
  );
};

export default CountCard;
