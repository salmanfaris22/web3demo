import styles from "./TradeCardsRow.module.scss"; // Import your CSS module
import styles2 from "../ExdexCommon.module.scss";
import { CardDataProps } from "./TradeCardsRow";
import CustomToolTip from "../../../common/Components/ToolTip/ToolTip";

export const Targets = ({ data  , index}: { data: CardDataProps  , index:number }) => {

  const getDynamicId = (key:string)=>`target-${index}-${key}`

  return (
    <>
    
    <div className={styles["globalCard__bottom"]}>
      <div
        className={`${styles2["globalCard__target"]}  ${styles["globalCard__target"]}`}
      >
        Targets:
      </div>
      <div
        className={`${styles["globalCard__targetValueWrapper"]} ${styles2["globalCard__targetValueWrapper"]}`}
      >
        {data?.target_value_obj?.map(
          (targetData, index) =>
            targetData !== undefined && (
              <div
                key={index}
                className={`${styles["globalCard__targetValue"]} ${styles2["globalCard__targetValue"]}`}
              >
                  <CustomToolTip
        id={getDynamicId(String(targetData.targetValue))}
        message={targetData?.targetValue}
      />

<CustomToolTip
        id={getDynamicId(String(targetData.targetPercentage))}
        message={`${targetData?.targetPercentage}%`}
      />

                <div
                
                  className={`${styles["globalCard__targetLabel"]} ${styles2["globalCard__targetLabel"]} ${styles["cardEllipsis"]}`}
                >
                  TP {targetData.index + 1} &nbsp;
                </div>
                <div
                  className={`${styles["globalCard__targetsValPer"]} ${styles2["globalCard__targetsValPer"]}`}
                >
                  <div
                   data-tooltip-id={getDynamicId(String(`${targetData.targetValue}`))}
                    className={`${styles["globalCard__targetDesc"]} ${styles2["globalCard__targetDesc"]} ${styles["cardEllipsis"]}`}
                    title={String(targetData.targetValue)}
                  >
                    {targetData.targetValue} &nbsp;
                  </div>
                  {data?.card_type !== "Forex market" && (
                    <div
                    data-tooltip-id={getDynamicId(String(`${targetData.targetPercentage}`))}
                      className={`${styles["globalCard__targetPercentage"]} ${styles2["globalCard__targetPercentage"]} ${styles["cardEllipsis"]}`}
                      title={`(${targetData.targetPercentage}% )`}
                    >
                      ({targetData.targetPercentage}%)
                    </div>
                  )}
                  {data?.card_type === "Forex market" && (
                    <div
                      className={`${styles["globalCard__targetPercentage"]} ${styles["cardEllipsis"]}`}
                      title={`(${targetData.targetPip}${
                        targetData.targetPip === 0 || targetData.targetPip === 1
                          ? " PIP"
                          : " PIPS"
                      })`}
                    >
                      (
                      {targetData.targetPip?.toLocaleString(undefined, {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 18,
                      })}{" "}
                      {targetData.targetPip === 1 || targetData.targetPip === 0
                        ? "PIP"
                        : "PIPS"}
                      )
                    </div>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
    </>
  );
};
