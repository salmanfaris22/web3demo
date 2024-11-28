import React from "react";
import styles from "./WatchCard.module.scss";
import LazyImage from "../../../common/Components/LazyImage/LazyImage";

const WatchCard = ({
  name,
  bg,
  clicked,
}: {
  name: string;
  bg: string;
  clicked: () => void;
}) => {
  return (
    <div
      className={styles.watchCard}
      style={{
        backgroundImage: `url(${
          "https://tenx-prod-123.s3.eu-west-2.amazonaws.com/" + bg
        })`,
      }}
      onClick={clicked}
    >
      <div className={styles.name}>{name}</div>
    </div>
  );
};

export default WatchCard;
