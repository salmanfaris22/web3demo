import React from "react";
import classes from "./MobileCard.module.scss";

interface MobilCardProps {
  children: React.ReactNode;
  onClick : ()=>void
}

const MobileCard: React.FC<MobilCardProps> = ({ children , onClick }) => {
  return <div className={classes.outer} onClick={onClick}>{children}</div>;
};

export default MobileCard;
