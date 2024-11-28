import React from "react";
import styles from "./AboutUs.module.scss";
import AboutUsInfo from "./AboutUsInfo/AboutUsInfo";
import OurTeam from "./OurTeam/OurTeam";
import RoadMap from "./RoadMap/RoadMap";


const AboutUs: React.FC = () => {
  return (
    <div className={styles.container}>
      <AboutUsInfo />
      <h2>Here is Our Road Map</h2>
      <RoadMap />
      <OurTeam />
    </div>
  );
};

export default AboutUs;
