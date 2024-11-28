import { formatCurrency } from "../../../utils/currencyFormatter";
import classes from "./AcademyCard.module.scss";

interface AcademyProps {
  title: string;
  duration: string;
  views: number;
  rating: string;
}

const AcademyCard: React.FC<AcademyProps> = ({
  title,
  duration,
  views,
  rating,
}) => {
  return (
    <div className={classes.academyCard}>
      <div className={classes.academyImage}>
        <div className={classes.bookmark}>
          <img src="/assets/images/bookmark.png" alt="bookmark" />
        </div>
        <div className={classes.logo}>
          <img src="/assets/images/logo.png" alt="logo" />
        </div>
      </div>
      <div className={classes.details}>
        <div className={classes.title}>{title}</div>
        <div className={classes.det}>
          <div className={classes.detLeft}>
            <div className={classes.duration}>{duration}</div>
            <div className={classes.views}>
              <img src="/assets/images/eye2.png" alt="eye" />
              {formatCurrency(views, "en-US", "", 999)}
            </div>
          </div>
          <div className={classes.detRight}>
            {rating}
            <div className={classes.ratingImg}>
              <img src="/assets/images/star.png" alt="rating" />
              <img src="/assets/images/star.png" alt="rating" />
              <img src="/assets/images/star.png" alt="rating" />
              <img src="/assets/images/star.png" alt="rating" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyCard;
