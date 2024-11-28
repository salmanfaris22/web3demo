import React, { useEffect, useState } from "react";
import styles from "./OurTeam.module.scss";
import useScrollToSection from "../hook/useScrollOnDone";
import { useLocation } from "react-router-dom";

const OurTeam = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sectionId = queryParams.get("id");
    
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (  
    <div className={styles.container}
    id="team"
    // onAnimationEnd={() => handleAnimationComplete("team")}
    >
      <h2>OUR TEAM</h2>
      <p>
        Exdex is powered by a diverse team of experts in finance, technology,
        and education. Our collective expertise allows us to create a platform
        that is not only technologically advanced but also user-friendly and
        accessible. From AI specialists and financial analysts to educators and
        support staff, our team is dedicated to helping our users succeed. We
        are passionate about driving innovation in the financial markets and
        committed to providing the best possible experience for our users.
      </p>
    </div>
  );
};

export default OurTeam;
