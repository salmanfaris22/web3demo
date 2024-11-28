import React from "react";
import styles from "./DexGemCard.module.scss";
import LazyImage from "../LazyImage/LazyImage";
import { getTenxImageWithBaseUrl } from "../../../utils/commonutils";
import Graph from "../../../pages/ProjectDetails/GraphDetails/Graph";
import { format } from "date-fns";

export interface IDexGemcard {
  name: string;
  thumbNail: string;
  growth: number;
  publishedOn: string;
  theme?:string;
}

const graphLabels = [
  { value: 1, low_range: 1, high_range: 10 },
  { value: 10, low_range: 10, high_range: 30 },
  { value: 30, low_range: 30, high_range: 50 },
  { value: 50, low_range: 50, high_range: 70 },
];

const DexGemCard = ({ publishedOn, name, thumbNail, growth, theme }: IDexGemcard) => {
  return (
    <div className={`${styles.container} ${theme ? styles[theme] : ''}`}>
      <div className={styles.dexListcardInner}>
        <div className={styles.dexContent}>
          <div className={styles.title}>{name}</div>
          <div className={styles.thumbNail}>
            <LazyImage key={name} src={getTenxImageWithBaseUrl(thumbNail)} />
          </div>
        </div>
        <div className={styles.graphWrapper}>
          <Graph
            maxValue={50}
            classNames={{
              graphContainer: styles?.graphContainer,
              valueLabel: styles?.valueLabel,
              topBall: styles?.topBall,
              graphLine: styles.graphLine,
              profileDown: styles.profileDown,
              graphLabel: styles?.graphLabel,
              profile: styles?.profile,
              graphValue: styles?.graphValue,
            }}
            projectData={{ growth: growth }}
            graphLabels={graphLabels}
          />
        </div>
        <div className={styles.publishedOn}>
          Published on {format(publishedOn, "dd MMM, yyyy")}
        </div>
      </div>
    </div>
  );
};

export default DexGemCard;
