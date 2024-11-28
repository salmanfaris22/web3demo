import React from "react";
import styles from "./Cards.module.scss";
import { convertISOToLongDateFormat } from "../../../utils/date";
import HTMLParser from "../../../common/Components/HTMLParser/HTMLParser";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../common/Constants";
import { goToIdPage } from "../../../utils/commonutils";

export interface IAnnounceCard {
  heading: string;
  description: string;
  date: string;
  id: number;
  thummbNail: string;
}

const Type1Card = ({
  heading,
  description,
  date,
  id,
  thummbNail,
}: IAnnounceCard) => {
  const nav = useNavigate()
  return (
    <motion.div   initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    onClick={()=>{
      nav( goToIdPage(routers.announceDetails , String(id)))
    }}
    transition={{
      duration: 0.2,
      delay: 0.2,
      ease: [0, 0.3, 0.2, 0.01],
    }}
    viewport={{ once: true }} className={styles.type1CardContainer}>
      <div
        className={styles.type1CardInner}
        style={{ backgroundImage: `url(${thummbNail})` }}
      >
        <div className={styles.typeCardContent}>
          <h2>{heading}</h2>
          <div className={styles.date}>{convertISOToLongDateFormat(date)}</div>
          <p>{HTMLParser(description)}</p>
        </div>
        <div className={styles.overlay}></div>
      </div>
    </motion.div>
  );
};

export default Type1Card;
