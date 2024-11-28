import React from "react";
import style from "./BlogCard.module.scss";
import LazyImage from "../../../common/Components/LazyImage/LazyImage";
import ReadMore from "../../../common/Components/ReadMore/ReadMore";
import { convertISOToLongDateFormat } from "../../../utils/date";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { goToIdPage } from "../../../utils/commonutils";
import { routers } from "../../../common/Constants";

export interface IBlogCard {
  image: string;
  date: string;
  status: "active" | "inactive";
  description: string;
  id: number;
}

const BlogCard = ({ image, date, status, description, id }: IBlogCard) => {
  const nav = useNavigate();

  return (
    <motion.div
      onClick={() => {
        nav(goToIdPage(routers.blogDetails, String(id)));
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate="once"
      viewport={{ once: true }}
      transition={{
        ease: "easeIn",
        duration: 0.1,
        delay: 0.1,
      }}
      className={style.blogCardWrap}
    >
      <div className={style.blogInner}>
        <div className={style.blogImage}>
          <LazyImage src={image} alt="thumbnail" />
        </div>
        <div className={style.dateTypeWrap}>
          <div className={style.type}>
            Article
            {/* {status === "active" ? "Active" : "Inactive"} */}
          </div>
          <div className={style.date}>{convertISOToLongDateFormat(date)}</div>
        </div>
        <div className={style.description}>{description}</div>
        <ReadMore />
      </div>
    </motion.div>
  );
};

export default BlogCard;
