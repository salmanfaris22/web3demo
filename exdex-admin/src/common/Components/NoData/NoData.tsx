import React from "react";
import classes from "./NoData.module.scss";

interface NoDataProps {
  title: string;
  description: string;
}

const NoData: React.FC<NoDataProps> = ({
  title = "No Data",
  description = "",
}) => {
  return (
    <div className={classes.noData}>
      <div className={classes.noDatInner}>
        {/* <img src="/assets/images/noData.png" alt="nodata" /> */}
        <div className={classes.title}>{title}</div>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default NoData;
