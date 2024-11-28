import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface AnimationState {
  [key: string]: boolean;
}

const useScrollToSection = (animationComplete: AnimationState) => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sectionId = queryParams.get("id");

    if (sectionId) {
      const element = document.getElementById(sectionId);

      if (element && animationComplete[sectionId]) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        const waitForAnimation = () => {
          if (animationComplete[sectionId]) {
            element?.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        };

        const timeout = setTimeout(waitForAnimation, 400); // Delay to ensure animations are done
        return () => clearTimeout(timeout);
      }
    }
  }, [location, animationComplete]);
};

export default useScrollToSection;
