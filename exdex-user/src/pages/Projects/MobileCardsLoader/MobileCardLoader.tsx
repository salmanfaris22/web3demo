import React from "react";
import styles from "./MobileCardLoader.module.scss";
import ProjectCardLoader from "../ProjectCard/ProjectCardLoader";

const MobileCardLoader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    isLoading ?  <div className={styles.container}>
      <div className={styles.singles}>
        <ProjectCardLoader />
      </div>
      <div className={styles.singles}>
        <ProjectCardLoader />
      </div>
    </div> : null
  );
};

export default MobileCardLoader;
