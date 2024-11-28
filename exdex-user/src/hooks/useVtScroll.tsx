import { useState, useEffect, RefObject } from "react";

export const useVisibility = (
  nodeRef: RefObject<HTMLElement>,
  threshold = 0.2,
  rootMargin = "0px"
) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let observer: IntersectionObserver;
    const node = nodeRef.current;
    if (!node) return () => {};
    if (window.IntersectionObserver) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            try {
              setVisible(true);
            } catch {} // eslint-disable-line no-empty
            // observer.unobserve(node);
          } else {
            try {
              setVisible(false);
            } catch {} // eslint-disable-line no-empty
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      observer.observe(node);
    } else {
      setVisible(true);
    }
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(node);
      }
    };
  }, [nodeRef, threshold, rootMargin]);

  return visible;
};
