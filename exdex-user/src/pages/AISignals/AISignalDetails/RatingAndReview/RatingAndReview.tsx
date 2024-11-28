import React from "react";
import styles from "./RatingAndReview.module.scss";
import { IAppreciationData } from "../AISignalDetails";

const RatingAndReview = ({
  users_rating,
  onUpdateRating,
  isViewMode,
}: Pick<IAppreciationData, "users_rating"> & {
  onUpdateRating?: (rating: number) => void;
  isViewMode?: boolean;
}) => {
  return (
    <div
      className={`${styles.rating__container} ${
        isViewMode && styles.ratingViewMode
      }`}
    >
      <h4>Rating and Reviewing</h4>
      <h6>Enter your rating</h6>
      <div className={styles.rating__stars}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <svg
            key={rating}
            width="27"
            height="25"
            viewBox="0 0 27 25"
            className={users_rating >= rating ? styles.selected : ""}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              if (onUpdateRating && !isViewMode) {
                onUpdateRating(rating);
              }
            }}
          >
            <path
              d="M13.5 0L16.5309 9.32827H26.3393L18.4042 15.0935L21.4351 24.4217L13.5 18.6565L5.5649 24.4217L8.59584 15.0935L0.660737 9.32827H10.4691L13.5 0Z"
              fill="rgba(217, 217, 217, 0.59)"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default RatingAndReview;
