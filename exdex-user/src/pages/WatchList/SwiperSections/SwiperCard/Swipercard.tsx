import React from "react";
import styles from "./SwiperCard.module.scss";
import LazyImage from "../../../../common/Components/LazyImage/LazyImage";
import { useNavigate } from "react-router-dom";
function Swipercard({
  bg,
  title,
  descript,
  clicked,
}: {
  bg: string;
  title: string;
  descript: string;
  clicked: () => void;
}) {
  return (
    <div className={styles.container} onClick={clicked}>
      <div className={styles.bgImage}>
        <LazyImage
          src={"https://tenx-prod-123.s3.eu-west-2.amazonaws.com/" + bg}
        />
      </div>
      <h2>{title}</h2>
      <p>{descript}</p>
    </div>
  );
}

export default Swipercard;
