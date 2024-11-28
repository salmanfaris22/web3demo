import React from "react";
import { motion } from "framer-motion";
import styles from "./Like.module.scss";

const Like = ({
  liked,
  onLike,
  likes,
}: {
  liked: boolean;
  onLike: () => void;
  likes: number;
}) => {
  return (
    <>
      <button className={styles.container} onClick={onLike}>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          initial={{ scale: 1, rotate: 0 }}
          animate={{
            scale: liked ? 1 : 1,
            rotate: liked ? 360 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <motion.path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.5 14.2555L16.4077 9.4233V4.68945H17.6731C18.8467 4.68945 19.9723 5.15557 20.8023 5.98531C21.6323 6.81505 22.0988 7.94046 22.0991 9.11408V11.4981H30.025V20.6537C30.025 22.4595 29.3077 24.1913 28.0308 25.4682C26.7539 26.745 25.0221 27.4624 23.2163 27.4624H11.5V14.2555ZM8.65 14.2013H4.375V27.4624H8.65V14.2013Z"
            fill={liked ? "#CCFD51" : "rgb(247 242 242 / 25%)"}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{
              opacity: liked ? 1 : 0.8,
              scale: liked ? 0.9 : 0.9,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </button>
   {  <div className={styles.likes}>{likes }</div>}
    </>
  );
};

export default Like;
