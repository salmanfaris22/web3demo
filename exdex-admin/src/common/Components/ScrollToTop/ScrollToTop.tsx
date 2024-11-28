import React, { useEffect, RefObject } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  containerRef: RefObject<HTMLDivElement>;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ containerRef }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth", // Optional, for smooth scrolling
      });
    }
  }, [pathname, containerRef]);

  return null;
};

export default ScrollToTop;
