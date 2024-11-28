import React from "react";
import classes from "./Loading.module.scss";

interface LoadingProps {
  theme?: string;
}

const Loading: React.FC<LoadingProps> = ({ theme }) => {
  return (
    <div
      className={`${classes.loading} ${theme == "dark" ? classes.dark : ""}`}
    >
      Loading...
    </div>
  );
};

export default Loading;
