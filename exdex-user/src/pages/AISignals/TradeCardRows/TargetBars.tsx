import { CardDataProps } from "./TradeCardsRow";
import { getTimeZone } from "./utils";
import styles from "./TradeCardsRow.module.scss"; // Import your CSS module
import styles2 from "../ExdexCommon.module.scss";

export const TargetBars = ({data} : {data:CardDataProps}) => {
    const timeZone = getTimeZone(
      data?.created_at,
      data?.final_target_hit_at,
      data?.any_target_hit_at
    );

    return (
      <>
        {" "}
        <div className={`${styles["globalCard__total"]}`}>
          <div
            className={`${styles["globalCard__percentage"]} ${styles2["globalCard__percentage"]} `}
          >
            {data?.card_type !== "Forex market" && timeZone !== 0 && (
              <span title={`${data.total_percentage}%`}>
                {data.total_percentage?.toLocaleString(undefined, {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 18,
                })}{" "}
                %
              </span>
            )}
            {data?.card_type === "Forex market" && timeZone !== 0 && (
              <span
                title={`${data.total_pip}${
                  data.total_pip === 1 || data.total_pip === 0
                    ? " PIP"
                    : " PIPS"
                }`}
              >
                {data.total_pip?.toLocaleString(undefined, {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 18,
                })}{" "}
                {data.total_pip === 1 || data.total_pip === 0 ? "PIP" : "PIPS"}
              </span>
            )}
          </div>
          <div
            className={`${styles["globalCard__days"]} ${styles2["globalCard__days"]}`}
          >
            {timeZone !== 0 && (
              <span title={timeZone !== undefined ? `In ${timeZone}` : ""}>
                In {timeZone}
              </span>
            )}
          </div>
        </div>
        {data?.isSignalCardCreated !== "adminCreateHideLine" && (
          <ul
            className={`${styles["globalCard__linesWrapper"]} ${styles2["globalCard__linesWrapper"]}`}
          >
            {data?.target_value_obj?.map((targetData, i) =>
              targetData.targetValue !== undefined ? (
                <li
                  key={i}
                  className={`${styles["globalCard__labelWrapper"]} ${styles2["globalCard__labelWrapper"]}`}
                >
                  <span
                    className={`${styles["globalCard__line"]} ${
                      styles2["globalCard__line"]
                    } ${
                      targetData.targetBarPercentage !== "100"
                        ? styles2.inactive
                        : ""
                    }`}
                  />
                  <label>{i + 1}</label>
                </li>
              ) : null
            )}
          </ul>
        )}
      </>
    );
  };