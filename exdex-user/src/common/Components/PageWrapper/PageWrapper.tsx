import React, { ReactNode } from "react";
import classes from "./PageWrapper.module.scss";

const PageWrapper = ({
  children,
  type,
  className,
  addBgWrap,
}: {
  children: ReactNode;
  type?: "narrow" | "medium";
  className?: string;
  addBgWrap?: boolean;
}) => {
  const getClass = () => {
    if (type === "medium") {
      return classes.medium;
    }
    if (type === "narrow") {
      return classes.narrow;
    }
    return "";
  };

  const getWrapper = () => (addBgWrap ? <div className={classes.wrapperBg}>{children}</div> : children);

  return (
    <div className={`${classes.container} ${getClass()}  ${className}`}>
      {getWrapper()}
    </div>
  );
};

export default PageWrapper;
