import React from "react";
import styles from "./FullProjectCard.module.scss";
import LazyImage from "../../../../../common/Components/LazyImage/LazyImage";
import { format } from "date-fns";
import GrowthIndicator from "../../../PopularProjects/GrowthIndicator/GrowthIndicator";
import { getTenxImageWithBaseUrl } from "../../../../../utils/commonutils";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../../../common/Constants";

export interface IFulllProjectCard {
  image: string;
  name: string;
  heading?: string;
  date: string;
  onBookMarkClick?: () => void;
  watchListed?: boolean;
  cssClass?: { images?: string };
  projectId: number;
  categoryId: number;
  classNames?: { fooetr?: string; title?: string , container?:string };
  growth:number
}

const FullProjectCard = (props: IFulllProjectCard) => {

  const navigate = useNavigate()

  return (
    <div 
    onClick={() =>
      navigate(
        routers.projectDetails
          .replace(":id", String(props.projectId))
          .replace(":categoryId", String(props.categoryId))
      )
    }
    
    className={`${styles.container} ${props.classNames?.container}`}>
      <div className={`${styles.imageWrap}`}>
        <LazyImage
          src={
            getTenxImageWithBaseUrl(props.image)
          }
        />
      </div>
      <div className={styles.linerdBg}></div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <div className={`${styles.title} ${props.classNames?.title}`}>
            {props.heading}
          </div>
          <div className={`${props.classNames?.fooetr} ${styles.cardsFooter}`}>
            <div className={styles.cardFooterEelements}>
            <img
                decoding="async"
                loading="eager"
                src="/assets/images/projects/calendar.png"
                alt="Date"
              />
             <span>  {format(props.date, "dd MMM, yyyy")}</span>
              <GrowthIndicator   growth={props.growth} />
            </div>
            <div className={styles.cardFooterEelements}>
            <img
                decoding="async"
                loading="eager"
                src="/assets/images/projects/arrowDownWhite.png"
                alt="Time"
              />
              <span>{format(props.date, "HH:mm a")}</span>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullProjectCard;
