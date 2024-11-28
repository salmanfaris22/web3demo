import React, { useRef, useEffect } from "react";
import classes from "./DotPagination.module.scss";

interface DotPaginationProps {
  totalSlides: number;
  currentIndex: number;
  position?: string;
  onDotClick: (index: number) => void;
}

const DotPagination: React.FC<DotPaginationProps> = ({
  totalSlides,
  currentIndex,
  position = "normal",
  onDotClick,
}) => {
  const dots = Array.from({ length: totalSlides });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && position === "top") {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [totalSlides, position]);

  return (
    <div
      className={`${classes.customPagination} ${
        position === "top" ? classes.dotTop : ""
      }`}
      ref={containerRef}
    >
      <div className={classes.innerContainer}>
        {dots.map((_, index) => (
          <div
            key={index}
            className={`${classes.dot} ${
              currentIndex === index ? classes.active : ""
            }`}
            onClick={() => onDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DotPagination;
