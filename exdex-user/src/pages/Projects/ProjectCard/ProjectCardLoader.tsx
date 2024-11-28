import React from "react";
import styles from "./ProjectCard.module.scss";
import LazyImage from "../../../common/Components/LazyImage/LazyImage";
import { format } from "date-fns";

const ProjectCardLoader = () => {

    return (
      <div className={styles.projectCardWrap} >
        <div className={styles.imageWrap}>
          <div className={`wave-container ${styles.waveLoader}`}>
            <div className="wave"></div>
          </div>
        </div>
        <div className={styles.loading}>
          <div className={`wave-container ${styles.waveLoader}`}>
            <div className="wave"></div>
          </div>
        </div>
        <div className={styles.loading2}>
          <div className={`wave-container ${styles.waveLoader}`}>
            <div className="wave"></div>
          </div>
        </div>
        <div className={styles.cardsFooter}>
          <div className={styles.loading2}>
          <div className={`wave-container ${styles.waveLoader}`}>
            <div className="wave"></div>
          </div>
          </div>
          <div className={styles.cardFooterEelements}></div>
        </div>
      </div>
    );

};

export default ProjectCardLoader;
