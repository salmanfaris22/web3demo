import React from "react";
import styles from "./OtherProjects.module.scss";
import ProjectCardLoader from "../ProjectCard/ProjectCardLoader";

const OtherProjectsLoader = () => {
  return (
    <div className={styles.deskTopWrapper}>
      <div className={styles.desktopLoaderWrap}>
        <div className={styles.loader}>
          <ProjectCardLoader />
        </div>
        <div className={styles.loader}>
          <ProjectCardLoader />
        </div>
        <div className={styles.loader}>
          <ProjectCardLoader />
        </div>
        <div className={styles.loader}>
          <ProjectCardLoader />
        </div>
      </div>
    </div>
  );
};

export default OtherProjectsLoader;
