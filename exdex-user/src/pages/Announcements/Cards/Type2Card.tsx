import React from "react";
import { IAnnounceCard } from "./Type1Card";
import styles from "./Cards.module.scss";
import { convertISOToLongDateFormat } from "../../../utils/date";
import HTMLParser from "../../../common/Components/HTMLParser/HTMLParser";
import { motion } from "framer-motion";
import { goToIdPage } from "../../../utils/commonutils";
import { routers } from "../../../common/Constants";
import { useNavigate } from "react-router-dom";

const Type2Card = ({
  id,
  thummbNail,
  heading,
  description,
  date,
  full
}: IAnnounceCard & {full? : boolean}) => {
  
    const nav = useNavigate()
    
  return (
    <motion.div   initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    onClick={()=>{
        nav( goToIdPage(routers.announceDetails , String(id)))
      }}
    viewport={{once : true}}
    transition={{
      duration: 0.2,
      delay: 0.2,
      ease: [0, 0.3, 0.2, 0.01],
    }} style={{...(full && {flex : "1" })}} className={`${styles.type2CardContainer}`}>
      <div className={styles.type2CardInner}>
        <div className={styles.imageContainer}>
          <img src={thummbNail} alt="thumbnail" loading="lazy" />
        </div>
        <div className={styles.typeCardContent}>
          <h2>{heading}</h2>
          <div className={styles.date}>{convertISOToLongDateFormat(date)}</div>
          <p>{HTMLParser(description)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Type2Card;
