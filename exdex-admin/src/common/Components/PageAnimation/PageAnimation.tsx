import React, { useEffect, useState } from "react";
import classes from "./PageAnimation.module.scss";

interface PageAnimationProps {
  children: React.ReactNode;
  left?: boolean;
  top?: boolean;
  type?: string;
}

const PageAnimation: React.FC<PageAnimationProps> = ({
  children,
  left,
  top,
  type='normal',
}) => {
  const [PageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    const handleAnimation = () => {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        setPageLoaded(true);
        setTimeout(() => {
          document.body.style.overflow = "";
        }, 450);
      });
    };
    handleAnimation();
  }, []);

  return (
    <div
      className={`${classes.animation} ${left && classes.left} ${
        top && classes.top
      } ${type == 'full' && classes.fullHeight} ${PageLoaded && classes.animationClass}`}
    >
      {children}
    </div>
  );
};

export default PageAnimation;
