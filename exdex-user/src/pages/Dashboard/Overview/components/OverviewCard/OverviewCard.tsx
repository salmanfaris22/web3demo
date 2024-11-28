import React from "react";
import classes from "./OverviewCard.module.scss";

interface OverviewCardProps {
  children: React.ReactNode;
  type?: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ children, type }) => {
  return (
    <div
      className={`${classes.cardOuter} ${
        type == "fullHeight" && classes.fullHeight
      }`}
    >
      {children}
    </div>
  );
};

export default OverviewCard;
