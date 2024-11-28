import React, { useEffect, useRef, useState } from "react";
import styles from "./RoadMap.module.scss";
import AboutUsCard from "../AboutUsCard/AboutUsCard";

interface AboutUsData {
  title: string;
  description: string;
  date: string;
}

const heightCorrection = [19.4, 19.56, 22.5, 19.1, 19.7];

const aboutUs: AboutUsData[] = [
  {
    title: "The Planting Period – Laying the Foundations",
    description:
      "In 2025, Exdex enters the planting period, the year of introducing our revolutionary platform to the world. During this time, we are focused on building awareness, cultivating a deep understanding of our unique all-in-one financial ecosystem, and establishing a strong foundation for growth.",
    date: "2025",
  },
  {
    title: "The Cultivation Period – Global Expansion and Training",
    description:
      "In 2026, we shift into the cultivation period. This is the year of global expansion as Exdex spreads its roots across new markets. Training becomes crucial as we prepare our growing community to harness the full potential of the platform.",
    date: "2026",
  },
  {
    title:
      "The Harvesting Period – Recognition, Branding, and Celebrating Success",
    description:
      "2027 marks the harvesting period. With global reach established and a strong community in place, this is the year Exdex is recognized as a leading player in the financial markets. We begin reaping the benefits of our earlier efforts as the platform achieves widespread brand recognition and user adoption.",
    date: "2027",
  },
  {
    title: "The Establishing Period – Stability and Innovation",
    description:
      "2028 is the year of establishing and stabilizing our place in the global financial market. This period is marked by the long-awaited launch of our revolutionary product, a financial tool that we’ve been meticulously developing for five years.",
    date: "2028",
  },
  {
    title: "The Exponential Growth Period – Breakthrough Year",
    description:
      "In 2029, the time for exponential growth has arrived. The platform experiences unprecedented user adoption and financial growth as we launch our second revolutionary product, another game-changer in the financial markets.",
    date: "2029",
  },
  {
    title:
      "The Dominance Period – Entering the Top Five of the Financial World",
    description:
      "2030 is the year when Exdex solidifies its position as one of the top five financial platforms in the world. We aim to revolutionize the financial market further with the launch of our third revolutionary product—one that will fundamentally change the meaning of assets and money as we know them.",
    date: "2030",
  },
];
const RoadMap = () => {
  const elementRef = useRef<SVGSVGElement | null>(null);
  const [height, setHeight] = useState<number>(0);
  const [elemHeights, setElemHeights] = useState<number[]>([]);

  const updateHeight = () => {
    if (elementRef.current) {
      const boundingRect = elementRef.current.getBoundingClientRect();
      const actualHeights = heightCorrection.map((x) => {
        return (x / 100) * boundingRect.height;
      });
      console.log(actualHeights);
      setElemHeights(actualHeights);
      setHeight(boundingRect.height / 5);
    }
  };

  useEffect(() => {
    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        resizeObserver.unobserve(elementRef.current);
      }
    };
  }, []);
  return (
    <>
      <div className={styles.svgContainer} style={{ marginTop: `${height}px` }}>
        <svg
          ref={elementRef}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 1682 1951"
          fill="none"
        >
          <path
            d="M9.05288 1H1506.12C1739.61 1 1738.98 377.215 1506.12 377.215H188.198C-59.5086 377.215 -57.6056 758.396 188.198 758.396H1506.12C1738.98 758.396 1739.61 1196.69 1506.12 1196.69H188.198C-61.4154 1196.69 -60.779 1568.56 188.198 1568.56H1506.12C1738.98 1568.56 1738.98 1949.74 1506.12 1949.74H449.082"
            stroke="white"
            strokeOpacity="0.82"
            strokeWidth="1.90307"
            strokeDasharray="44.4 25.37"
          />
        </svg>

        {aboutUs.map((item, index) => {
          const eleWidth =
            elementRef.current?.getBoundingClientRect().width || 0;
          console.log(document.getElementById(`abt-us-${index - 1}`));
          const top =
            index === 0
              ? -height
              : index === 1
              ? 0
              : elemHeights.slice(0, index - 1).reduce((a, b) => a + b, 0);
          const alignment =
            index === 0
              ? { left: "0px" }
              : index % 2 > 0
              ? { left: "20%" }
              : { left: "10%" };
          const width =
            index % 2 > 0
              ? eleWidth - eleWidth * 0.3
              : eleWidth - eleWidth * 0.2;
          const actHeight = index === 0 ? height : elemHeights[index - 1];
          return (
            <div
              id={`abt-us-${index}`}
              key={index}
              className={styles.aboutUsWrapper}
              style={{
                top: `${top}px`,
                ...alignment,
                height: `${actHeight}px`,
                width: `${width}px`,
              }}
            >
              <AboutUsCard
                isFirst={index === 0}
                isLast={index === aboutUs.length - 1}
                title={item.title}
                description={item.description}
                date={item.date}
              />
            </div>
          );
        })}
        <div className={styles.line}></div>
      </div>
    </>
  );
};

export default RoadMap;
