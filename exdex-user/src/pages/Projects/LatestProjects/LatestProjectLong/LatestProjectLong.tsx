import React from "react";
import styles from "./LatestProjectLong.module.scss";
import LazyImage from "../../../../common/Components/LazyImage/LazyImage";
import { format } from "date-fns";
import { getTenxImageWithBaseUrl } from "../../../../utils/commonutils";
import GrowthIndicator from "../../PopularProjects/GrowthIndicator/GrowthIndicator";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../../common/Constants";

export interface ILatestProject {
  image: string;
  name: string;
  description: string;
  date: string;
  onBookMarkClick: () => void;
  watchListed: boolean;
  className?: string;
  growth: number;
  projectId:number;
  categoryId:number
}

const LatestProjectLong = (props: ILatestProject) => {

  const navigate = useNavigate()

  return (
    <div    
    className={`${styles.container} ${props.className}`}>
      <div className={styles.image}
          onClick={() =>
            navigate(
              routers.projectDetails
                .replace(":id", String(props.projectId))
                .replace(":categoryId", String(props.categoryId))
            )
          }
      >
        <LazyImage src={getTenxImageWithBaseUrl(props.image)} alt={"Post"} />
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.growthContainer}>
          <GrowthIndicator growth={props.growth} />
        </div>
        <div>
          <h6>{props.name}</h6>
          <p>{props.description}</p>
        </div>
        <div className={styles.cardsFooter}>
          <div className={styles.cardFooterEelements}>
            <img
              decoding="async"
              loading="eager"
              src="/assets/images/projects/arrowDownWhite.png"
              alt="Time"
            />
            {format(props.date, "HH:mm a")}
          </div>
          <div className={styles.cardFooterEelements}>
            <img
              decoding="async"
              loading="eager"
              src="/assets/images/projects/calendar.png"
              alt="Date"
            />
            {format(props.date, "dd MMM, yyyy")}
          </div>
          <div className={styles.cardFooterEelements}>
            <button onClick={props.onBookMarkClick}>
              {props.watchListed ? (
                <div className="fa-solid fa-bookmark"></div>
              ) : (
                <div className="fa-regular fa-bookmark"></div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestProjectLong;
