import { useEffect, useRef, useState } from "react";
import CandleChart from "./CandleChart/CandleChart";
import styles from "./ChartDetails.module.scss";

export interface TradeChartDetails {
  id: number;
  admin_id: number;
  market: string;
  coin_pair: string;
  name: string;
  heading: string;
  description: string;
  code: string;
  keyword: string[];
  status: "Active" | "Inactive" | string; // Allows for future status options
  updated_at: string; // ISO 8601 formatted date string
  created_at: string; // ISO 8601 formatted date string
  position: string;
}

const ChartDetails = ({ data }: { data: TradeChartDetails }) => {
  const [readMore, setReadMore] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);

  const readMoreLess = () => setReadMore((prev) => !prev);

  // To check if the description needs "Read more" logic
  const [showReadMore, setShowReadMore] = useState(false);

  useEffect(() => {
    if (descRef.current) {
      setShowReadMore(
        descRef.current.offsetHeight < descRef.current.scrollHeight
      );
    }
  }, [data]);

  // console.log(styles , "st")

  return (
    <div className={styles.chartDetailContainer}>
      <div className={styles.chartDetail__header}>
        <h4 className={styles.line_clamp}>
          {data?.heading.length > 200
            ? data?.heading.slice(0, 200) + "..."
            : data?.heading}
        </h4>
        <p className={styles.chartDetail__position}>
          {data?.position === "Short" && (
            <span className={styles.short}>
              <span className="fa-solid fa-sort-down"></span> Short
            </span>
          )}
          {data?.position === "Long" && (
            <span className={styles.long}>
              <span className="fa-solid fa-sort-up"></span> Long
            </span>
          )}
        </p>
      </div>

      <div className={styles.chartDetail__coinpair}>
        <span>
          {data?.name} ({data?.coin_pair})
        </span>
        {/* Uncomment if price needs to be shown
        <span className={styles.chartDetailPrice}>
          {data?.position === 'Long' ? (
            <span className={styles.long}>50,000</span>
          ) : (
            <span className={styles.short}>-5,000</span>
          )}
        </span>
        */}
      </div>

      {data?.code && (
        <div className={styles.candleChart}>
          <CandleChart code={data.code} coin_pair={data?.coin_pair} />
        </div>
      )}

      <div className={styles.chartDetail__keywords}>
        {data?.keyword?.map((keyword, index) =>
          keyword ? (
            <div
              key={index}
              className={styles.chartDetailChips}
              title={keyword}
            >
              {keyword}
            </div>
          ) : null
        )}
      </div>

      <div className={styles.chartDetail__desc}>
        <h4 className={styles.line_clamp}>{data?.heading}</h4>
        <p
          ref={descRef}
          className={`${readMore ? styles.seeMore : ""}`}
          dangerouslySetInnerHTML={{ __html: data?.description }}
        />
        {showReadMore && (
          <span className={styles.chartDetail__readMore} onClick={readMoreLess}>
            {readMore ? "Read less" : "Read more"}
          </span>
        )}
      </div>

      <hr className={styles.desktopHr} />
    </div>
  );
};

export default ChartDetails;
