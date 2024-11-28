import { useEffect, useRef, useState } from "react";
import { Project } from "../../Projects/Projects";
import styles from "./Graph.module.scss"; // Import the CSS Module

const graphLabelsDef = [
  { value: 1, low_range: 1, high_range: 10 },
  { value: 10, low_range: 10, high_range: 30 },
  { value: 30, low_range: 30, high_range: 50 },
  { value: 50, low_range: 50, high_range: 70 },
  { value: 70, low_range: 70, high_range: 100 },
  { value: 100, low_range: 100, high_range: 200 },
];

const Graph = ({
  projectData,
  graphLabels = graphLabelsDef,
  classNames,
  maxValue = 100
}: {
  projectData: Pick<Project, "growth">;
  classNames?: {
    graphValue?: string;
    profileDown?: string;
    graphLine?: string;
    profile?: string;
    graphLabel?: string;
    topBall?:string,
    valueLabel?:string,
    graphContainer?:string
  };
  k?:string,
  maxValue?:number
  graphLabels?: { value: number; low_range: number; high_range: number }[];
}) => {
  const graphSectionRef = useRef(null);
  const tooltipRef = useRef(null);
  const [graphValue, setGraphValue] = useState(projectData.growth || 0);
  const [linePosition, setLinePosition] = useState(0);
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const labelsRef = useRef<HTMLUListElement>(null);
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setGraphValue(projectData.growth || 0);
  }, [projectData, graphSectionRef.current, tooltipRef.current]);

  useEffect(() => {
    if(graphLabels.length > 0  && graphValue){
      updateLinePosition();
      updateTooltipPosition();
    }

  }, [graphValue , graphLabels]);

  const updateLinePosition = () => {
    const ulRef = labelsRef.current;

    if (ulRef) {
      
  
        const activeItem = ulRef.querySelector(`.${styles.activeListItem}`);
        if (activeItem) {
          const position =
            graphValue === 0
              ? 0
              : //@ts-ignore
                activeItem.offsetLeft + activeItem.offsetWidth;

          setLinePosition(graphValue >= maxValue ? position - (lineRef?.current?.clientWidth || 0): position );
        }
      
    }
  };

  const updateTooltipPosition = () => {
    //@ts-ignore
    const parentWidth = graphSectionRef.current.clientWidth;
    //@ts-ignore
    const tooltipWidth = tooltipRef.current.clientWidth;
    const val = parentWidth * (graphValue / 100);
  
    const position =
      val >= parentWidth - tooltipWidth
        ? parentWidth - tooltipWidth 
        : val; 
  
    setTooltipLeft(position);
  };
  

  return (
    <div className={`${classNames?.graphContainer} ${styles.graph}`} ref={graphSectionRef}>
      <div
        className={styles.lineContainer}
        ref={lineRef}
        style={{ left: `${linePosition}px` ,...(graphValue >= maxValue &&{height : "100%"}) }}
      >
        <div style={{...(graphValue >= maxValue &&{display : "none"})}} className={`${classNames?.topBall} ${styles.topBall}`}></div>
        <hr className={`${classNames?.graphLine}  ${styles.horizontalLine}`} />
      </div>
      <div
        className={`${styles.profitImg}  ${classNames?.profile}`}
        ref={tooltipRef}
        style={{ left: `${tooltipLeft}px` }}
      >
        <div className={`${styles.totProf} ${classNames?.graphValue} `}>
          {graphValue || "0"}x
        </div>
        <div className={`${classNames?.valueLabel} ${styles.totMem}`}>Since published</div>
      </div>
      <div
        className={` ${classNames?.profileDown} ${styles.downArrow}`}
        style={{ left: `${linePosition}px` , ...(graphValue >= maxValue &&{display : "none"}) } }
      ></div>
      <img
        decoding="async"
        loading="eager"
        src="/assets/images/projects/graph.png"
        alt="graph"
        className={styles.graphImg}
      />
      <div className={` ${classNames?.graphLabel} ${styles.levelData}`}>
        <ul ref={labelsRef}>
          {graphLabels.map((i, index) => (
            <li
              key={index}
              className={
                graphValue >= i.low_range && graphValue < i.high_range || (index + 1 === graphLabels.length && graphValue >=i.value )
                  ? styles.activeListItem
                  : ""
              }
            >
              {i.value}x
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Graph;
