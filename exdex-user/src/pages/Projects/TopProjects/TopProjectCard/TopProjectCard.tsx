import React from "react";
import styles from "./TopProjectCard.module.scss";
import { format } from "date-fns";
import LazyImage from "../../../../common/Components/LazyImage/LazyImage";
import GrowthIndicator from "../../PopularProjects/GrowthIndicator/GrowthIndicator";
import { getTenxImageWithBaseUrl } from "../../../../utils/commonutils";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../../common/Constants";


export interface ITopProjectCard {
  image: string;
  name: string;
  heading?: string;
  date: string;
  onBookMarkClick?: () => void;
  watchListed?: boolean;
  cssClass?: { images?: string };
  projectId: number;
  categoryId: number;
  classNames?: { fooetr?: string; title?: string };
}

const TopProjectCard = (props: ITopProjectCard) => {

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
    
    className={styles.container}>
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
                src="/assets/images/projects/arrowDownWhite.png"
                alt="Time"
              />
              <span>{format(props.date, "HH:mm a")}</span>
            
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProjectCard;
