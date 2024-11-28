import React from "react";
import { Announcement } from "../Announcements";
import styles from "./Cards.module.scss";
import { convertISOToLongDateFormat } from "../../../utils/date";
import HTMLParser from "../../../common/Components/HTMLParser/HTMLParser";
import ReadMore from "../../../common/Components/ReadMore/ReadMore";
import { motion } from "framer-motion";
import { routers } from "../../../common/Constants";
import { goToIdPage } from "../../../utils/commonutils";
import { useNavigate } from "react-router-dom";


const Type3Single = ({ data }: { data: Announcement[] }) => {

    const nav = useNavigate()
  return (
    <div className={styles.type3CardSingle}>
      {data.map(({ name, description, updated_at , id }) => {
        return (
          <motion.div
          onClick={()=>{
            nav( goToIdPage(routers.announceDetails , String(id)))
          }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{once : true}}
            transition={{
              duration: 0.2,
              delay: 0.2,
              ease: [0, 0.3, 0.2, 0.01],
            }}
            className={styles.type3CardInner}
          >
            <div className={styles.typeCardContent}>
              <h2>{HTMLParser(name)}</h2>
              <div className={styles.date}>
                {convertISOToLongDateFormat(updated_at)}
              </div>
              <p>{HTMLParser(description)}</p>
              <div className={styles.readmoreWrap}>
                <ReadMore />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Type3Single;
