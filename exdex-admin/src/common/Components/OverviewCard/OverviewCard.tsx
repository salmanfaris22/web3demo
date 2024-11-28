import React from "react";
import classes from "./OverviewCard.module.scss";

interface OverviewCardProps {
  children: React.ReactNode;
  type?: string;
  borderRadius?: number;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  children,
  type,
  borderRadius = 18,
}) => {
  return (
    <div
      style={{ borderRadius: `${borderRadius}px` }}
      className={`${classes.cardOuter} ${
        type == "fullHeight" && classes.fullHeight
      }`}
    >
      {children}
    </div>
  );
};

export default OverviewCard;
