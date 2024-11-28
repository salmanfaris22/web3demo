import React from "react";
import classes from "./OverviewCard.module.scss";

interface OverviewCardProps {
  children: React.ReactNode;
  type?: string;
  borderRadius?: number;
  background?:string
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  children,
  type,
  borderRadius = 18,
  background
}) => {
  return (
    <div
      style={{ borderRadius: `${borderRadius}px` , ...(background && {background}) }}
      className={`${classes.cardOuter} ${
        type == "fullHeight" && classes.fullHeight
      }`}
    >
      {children}
    </div>
  );
};

export default OverviewCard;
