import React from "react";
import styles from "./TextCards.module.scss";
import ExpEdgeCard from "../ExpEdge/ExpEdgeCard/ExpEdgeCard";
import Button from "../../../common/Components/Button/Button";

const TextCards = ({
  title,
  description,
  hasImage,
  imageLink,
  fullImg,
  index,
  bgImage,
  theme,
  btn,
}: {
  hasImage?: boolean;
  title?: string;
  description?: string;
  imageLink?: string;
  fullImg?: string;
  index: number;
  bgImage?: string;
  theme?: string;
  btn?: string;
}) => {
  return (
    <ExpEdgeCard index={index} fullImg={bgImage ? bgImage : ""}>
      <div className={`${styles.container} ${theme ? styles[theme] : ""}`}>
        <div>
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
          {hasImage && <img src={imageLink} />}
          {btn && (
            <Button type="full">
              <div className={styles.btn}>Open Account</div>
            </Button>
          )}
        </div>
      </div>
    </ExpEdgeCard>
  );
};

export default TextCards;
