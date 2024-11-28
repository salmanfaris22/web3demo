import React from "react";
import styles from "./ProjectCard.module.scss";
import LazyImage from "../../../common/Components/LazyImage/LazyImage";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import router from "../../../routes";
import { routers } from "../../../common/Constants";
import GrowthIndicator from "../PopularProjects/GrowthIndicator/GrowthIndicator";
import { getTenxImageWithBaseUrl } from "../../../utils/commonutils";

export interface IProjectCard {
  image: string;
  name: string;
  description?: string;
  date: string;
  onBookMarkClick?: () => void;
  watchListed?: boolean;
  cssClass?: { images?: string };
  projectId: number;
  categoryId: number;
  classNames?: { fooetr?: string };
  growth:number
}

const ProjectCard = ({
  image,
  name,
  description,
  date,
  onBookMarkClick,
  watchListed,
  cssClass,
  projectId,
  categoryId,
  classNames,
  growth

}: IProjectCard) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.projectCardWrap}

    >
      <div className={`${styles.imageWrap} ${cssClass?.images}`}       onClick={() =>
        navigate(
          routers.projectDetails
            .replace(":id", String(projectId))
            .replace(":categoryId", String(categoryId))
        )
      }>
        <LazyImage src={getTenxImageWithBaseUrl(image)} />
      </div>
      <div className={styles.cardNameContainer}>
        <h6 className={styles.cardName}>{name} </h6> <GrowthIndicator growth={growth} />
      </div>

      {description && <p>{description} </p>}
      <div className={`${classNames?.fooetr} ${styles.cardsFooter}`}>
        <div className={styles.cardFooterEelements}>
          <img
            decoding="async"
            loading="eager"
            src="/assets/images/projects/arrowDownWhite.png"
            alt="Time"
          />
          {format(date, "HH:mm a")}
        </div>
        <div className={styles.cardFooterEelements}>
          <img
            decoding="async"
            loading="eager"
            src="/assets/images/projects/calendar.png"
            alt="Date"
          />
          {format(date, "dd MMM, yyyy")}
        </div>
        {watchListed !== undefined && (
          <div className={styles.cardFooterEelements}>
            <button onClick={onBookMarkClick}>
              {watchListed ? (
                <div className="fa-solid fa-bookmark"></div>
              ) : (
                <div className="fa-regular fa-bookmark"></div>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
