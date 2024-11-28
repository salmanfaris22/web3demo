import React from "react";
import classes from "./SignalCard.module.scss";

interface SignalProps {
  style?: any;
}

const SignalCard: React.FC<SignalProps> = ({ style }) => {
  return <div className={classes.signalCard} style={style}></div>;
};

export default SignalCard;
