import React from "react";
import styles from "./NFTCard.module.scss";
import CalcBtn from "../../../../../common/Components/CalcBtns/CalcBtn";
import { motion } from "framer-motion";

const NFTCard = ({
  title,
  avatar,
  graph,
  publishDate,
  classNames,
}: {
  title: string;
  avatar: string;
  graph: string;
  publishDate: string;
  classNames?: { avatarClass?: string  , footer? : string , publish : string , btnGroup ?:string , graph?: string};
}) => {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.4,
      delay: 0.2,
      ease: [0, 0.71, 0.2, 1.01],
    }}
    viewport={{ once: true }}
    
    className={styles.container}>
      <div className={styles.sectionPadding}>
        <div className={styles.title}>{title}</div>
        <div className={`${styles.avatar} ${classNames?.avatarClass}`}>
          <img src={avatar} alt="Avatar" />
        </div>
      </div>
      <div className={`${styles.graph} ${classNames?.graph}`}>
        <img src={graph} alt="Graph" />
      </div>
      <div className={`${styles.sectionPadding} ${styles.nftFooter} ${classNames?.footer}`}>
        <CalcBtn
          className={`  ${styles.btnGroup} ${classNames?.btnGroup}`}
          selected={1}
          btnArray={[
            { label: "1x" },
            { label: "10x" },
            { label: "30x" },
            { label: "50x" },
          ]}
        />
        <div className={`${styles.publishedOn} ${classNames?.publish}`}>Published On: {publishDate}</div>
      </div>
    </motion.div>
  );
};

export default NFTCard;
