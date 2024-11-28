import React, { useState } from "react";
import styles from "./SimilarTechicalAnalysis.module.scss"; // CSS Module import
import ChartDetails from "../AISignalDetails/ChartDetails/ChartDetails";
import CandleChart from "../AISignalDetails/ChartDetails/CandleChart/CandleChart";
import { calculateTimeAgo } from "../../../utils/commonutils";
export interface ISimilarTechData {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  AdminId: number;
  Market: string;
  CoinPair: string;
  Position: string;
  Name: string;
  Heading: string;
  Description: string;
  Code: string;
  FilePath: string;
  Keyword: string;
  TotalLike: number;
  TotalDislike: number;
  TotalComment: number;
  TotalUpdate: number;
  Status: string;
  CardId: number;
  BaseCurrency: string;
  QuoteCurrency: string;
  Id: number;
}

const SimilarTechnicalAnalysis = ({
  data,
  onSimilarTechClicked,
}: {
  data: ISimilarTechData[];
  onSimilarTechClicked: (data: ISimilarTechData) => void;
}) => {
  const [readMore, setReadMore] = useState(false);

  const isValidChart = (chartData: any) => {
    return (
      chartData?.includes("TradingView.chart") ||
      chartData?.includes("TradingView.widget")
    );
  };

  const navToDetailedView = (similar: any) => {
    onSimilarTechClicked(similar);
  };

  const readMoreLess = () => {
    setReadMore(!readMore);
  };

  return (
    <div className={styles.similarContainer}>
      {data && data.length > 0 ? (
        <div className={styles.similarContainerWrapper}>
          {data.map(
            (similar: any, i: any) =>
              isValidChart(similar?.Code) && (
                <div key={i} className={styles.similarContainerContent}>
                  <div
                    className={styles.similarContainerHeader}
                    onClick={() => navToDetailedView(similar)}
                  >
                    <div className={styles.similarContainerHeading}>
                      <div className={styles.similarContainerTitle}>
                        {similar?.Heading}
                      </div>
                      <div className={styles.similarContainerSymbol}>
                        {similar?.CoinPair}
                        <div className={styles.similarContainerCurrPosition}>
                          {similar?.Position === "Short" && (
                            <span className={styles.short}>
                              <span className="fa-solid fa-sort-down"></span>{" "}
                              Short
                            </span>
                          )}{" "}
                          {similar?.Position === "Long" && (
                            <span className={styles.long}>
                              <span className="fa-solid fa-sort-up"></span> Long
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={styles.similarContainerChart}
                    onClick={() => navToDetailedView(similar)}
                  >
                    {/* Assuming you have a CandleChart component in React */}
                    <CandleChart
                      Id={`tradingView_${similar?.ID}`}
                      code={similar.Code}
                      coin_pair={similar.CoinPair}
                      isSimilarTech={true}
                    />
                    {/* <CandleChart isSimilarTech={true} Id={`tradingView_${similar?.ID}`} tradingWidgetData={similar?.Code} /> */}
                  </div>

                  <div
                    className={styles.similarContainerInfo}
                    onClick={() => navToDetailedView(similar)}
                  >
                    <div className={styles.similarContainerHours}>
                      {calculateTimeAgo(similar?.CreatedAt)}
                    </div>
                    <div className={styles.similarContainerLikeComment}>
                      <div className={styles.similarContainerLike}>
                        <span>
                          <img
                            src="/assets/images/signal_cards/heart-white.png"
                            alt="tech analysis"
                            className={styles.heartLogo}
                          />
                        </span>
                        <span>{similar?.TotalLike}</span>
                      </div>
                      <div className={styles.similarContainerComment}>
                        <span>
                          <img
                            src="/assets/images/signal_cards/comment-white.png"
                            alt="tech analysis"
                            className={styles.commentLogo}
                          />
                        </span>
                        <span>{similar?.TotalComment}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${styles.similarContainerDesc} ${
                      readMore ? styles.seeMore : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: similar?.Description }}
                  ></div>

                  <span
                    className={styles.similarContainerReadMore}
                    onClick={() => readMoreLess()}
                  >
                    {readMore ? <p>Read less</p> : <p>Read more</p>}
                  </span>
                </div>
              )
          )}
        </div>
      ) : (
        <div>No similar technical analysis found!</div>
      )}
    </div>
  );
};

export default SimilarTechnicalAnalysis;
