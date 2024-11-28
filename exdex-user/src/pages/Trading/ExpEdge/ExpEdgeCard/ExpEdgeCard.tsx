import React, { ReactNode } from "react";
import styles from "./ExpEdgeCard.module.scss";
import { SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

export const ExpSwiperCard = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  return <SwiperSlide>{children}</SwiperSlide>;
};

const ExpEdgeCard = ({
  children,
  fullImg,
  index,
  className,
}: {
  children?: ReactNode;
  fullImg?: string;
  index: number;
  className?:string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        delay: index * 0.15,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className={`${styles.container} ${className}`}
    >
      {/* !Do not change this html structure */}
      <div style={{ backgroundImage: `url(${fullImg})` }}>{children}</div>
    </motion.div>
  );
};

export default ExpEdgeCard;
