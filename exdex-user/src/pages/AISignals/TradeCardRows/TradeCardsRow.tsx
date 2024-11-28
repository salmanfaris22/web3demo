import React, { useEffect } from "react";
import styles2 from "../ExdexCommon.module.scss";
import { Targets } from "./Targest";
import { TargetBars } from "./TargetBars";
import styles from "./TradeCardsRow.module.scss"; // Import your CSS module
import { convertPrice, convertToLocalTime } from "./utils";
import { Tooltip } from "react-tooltip";
import CustomToolTip from "../../../common/Components/ToolTip/ToolTip";
export interface CardDataProps {
  id: string;
  card_type: string;
  is_expired: boolean;
  is_updated: boolean;
  watch_list_status: number;
  price: number;
  quote_currency: string;
  market: string;
  exchange: string;
  created_at: string;
  risk_status: string;
  leverage?: number;
  time_frame?: string;
  entry_from?: number;
  entry_to?: number;
  stop_value?: number;
  stop_loss_percentage?: number;
  stop_loss_pip?: number;
  position?: string;
  target_value_obj?: Array<{
    index: number;
    targetPercentage: string;
    targetValue: string;
    targetBarPercentage?: string;
    targetPip?: number;
  }>;
  total_percentage?: number;
  total_pip?: number;
  final_target_hit_at: number | null;
  any_target_hit_at: number | null;
  isSignalCardCreated: any;
  trading_view_id: number;
  current_percentage : string
  referral_code : string
}

interface CardProps {
  data: CardDataProps;
  isUser: boolean;
  isMobileView: boolean;
  viewDetails: (data: CardDataProps) => void;
  tradeBtn: (event: React.MouseEvent) => void;
  add: () => void;
  index: number;
}

const TradeCardsRow: React.FC<CardProps> = ({
  data,
  isUser,
  isMobileView,
  viewDetails,
  tradeBtn,
  add,
  index,
}: CardProps) => {
  const getCardTypeClass = () => {
    if (data.card_type === "Forex market") return styles2.forex_card_wrap;
    if (data.card_type === "Margin trade") return styles2.future_card_wrap;
    if (data.card_type === "Spot market") return styles2.spot_card_wrap;
    return "";
  };

  const generateDynamicId = (text: string) => `${data?.id}-${text}`;
  const stopLossPercentage = `${Number(data.stop_loss_percentage)?.toFixed(
    2
  )}%`;

  return (
    <div
      className={`${styles.globalCard} xts ${getCardTypeClass()}`}
      onClick={() => viewDetails(data)}
    >
      <CustomToolTip
        id={generateDynamicId("onData")}
        message={`${data.exchange}`}
      />
      <CustomToolTip
        id={generateDynamicId("coinPair")}
        message={`${data.market}`}
      />
      <CustomToolTip
        id={generateDynamicId("currentPrice")}
        message={`${data.price} - ${data.quote_currency}`}
      />
      <CustomToolTip
        id={generateDynamicId("usdtPrice")}
        message={`${data.price} USDT`}
      />
      <CustomToolTip
        id={generateDynamicId("createdOn")}
        message={convertToLocalTime(data.created_at)}
      />
      <CustomToolTip
        id={generateDynamicId("risk")}
        message={data.risk_status}
      />

      <CustomToolTip
        id={generateDynamicId("leverage")}
        message={data.leverage}
      />

      <CustomToolTip
        id={generateDynamicId("aiProject")}
        message={data.time_frame === "Long" ? "Long term" : "Short term"}
      />
      {data?.entry_from && (
        <CustomToolTip
          id={generateDynamicId("entryFrom")}
          message={`${convertPrice(Number(data.entry_from))} - ${convertPrice(
            Number(data.entry_to)
          )}`}
        />
      )}
      <CustomToolTip
        id={generateDynamicId("nonForexStopLoss")}
        message={data?.stop_loss_percentage}
      />
      {data.stop_value && (
        <CustomToolTip
          id={generateDynamicId("stopvalue")}
          message={data.stop_value}
        />
      )}
      {data.quote_currency && (
        <CustomToolTip
          id={generateDynamicId("qtCurrency")}
          message={data.quote_currency}
        />
      )}

      <CustomToolTip id={"Coming Soon"} message={"Coming Soon"} />

      <div
        className={`${styles2.globalCard__container} ${
          styles.globalCard__container
        }  ${isUser ? styles.isUser : ""} ${
          data.is_expired ? styles.expGrayOut : ""
        }`}
      >
        <div className={styles.globalCard__left}>
          {/* Header */}
          <div className={styles.globalCard__header}>
            <div className={styles.globalCard__content}>
              <div
                data-tooltip-id={generateDynamicId("onData")}
                className={`${styles.globalCard__title} ${styles2.globalCard__title} ${styles.cardEllipsis}`}
                title={data.exchange}
              >
                On {data.exchange}
              </div>
              <div
                data-tooltip-id={generateDynamicId("coinPair")}
                className={`${styles.globalCard__desc} ${styles2.globalCard__desc}`}
                title={data.market}
              >
                {data.market}
              </div>
            </div>

            {/* Buttons */}
            <div className={styles.globalCard__contentBtn}>
              {data.is_expired && !isMobileView && (
                <button
                  className={`${styles.expired_btn} web-view`}
                  onClick={tradeBtn}
                >
                  <img
                    src="./assets/images/signal_cards/expired_btn.png"
                    alt="exp"
                  />
                  <span className={styles.cardEllipsis}>Expired</span>
                </button>
              )}
              {!data.is_expired && data.is_updated && !isMobileView && (
                <button
                  className={`${styles.updateBtn} web-view`}
                  onClick={tradeBtn}
                >
                  <img
                    src="./assets/images/signal_cards/updated_arrow_smart_card.png"
                    alt="updated"
                  />
                  <span>Updated</span>
                </button>
              )}
              <button
                className={`${styles.trade_btn} ${styles2.trade_btn}`}
                data-tooltip-id="Coming Soon"
                onClick={tradeBtn}
              >
                Trade
              </button>
              <button
                className={styles.bookmark_btn}
                onClick={(e) => {
                  e.stopPropagation();
                  add();
                }}
              >
                <div
                  className={
                    data.watch_list_status !== 1
                      ? "fa-regular fa-bookmark"
                      : "fa-solid fa-bookmark"
                  }
                ></div>
              </button>
            </div>
          </div>
          <div className={styles.createdWrap}>
            <div className={styles.globalCard__content}>
              <div
                className={`${styles.globalCard__title} ${styles2.globalCard__title} `}
              >
                Current Price
              </div>
              <div
                className={`${styles.globalCard__desc} ${styles2.globalCard__desc}`}
              >
                {data.card_type === "Spot market" && (
                  <span
                    data-tooltip-id={generateDynamicId("currentPrice")}
                    className={styles.cardEllipsis}
                  >
                    {convertPrice(Number(data.price))} {data.quote_currency}
                  </span>
                )}
                {data.card_type === "Margin trade" && (
                  <span
                    data-tooltip-id={generateDynamicId("usdtPrice")}
                    className={styles.cardEllipsis}
                    title={`${data.price} USDT`}
                  >
                    {convertPrice(Number(data.price))} USDT
                  </span>
                )}
                {data.card_type === "Forex market" && (
                  <span
                    className={styles.cardEllipsis}
                    data-tooltip-id={generateDynamicId("currentPrice")}
                  >
                    {convertPrice(Number(data.price))} {data.quote_currency}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.globalCard__content}>
              <div
                className={`${styles.globalCard__title} ${styles2.globalCard__title} `}
              >
                Created On
              </div>
              <div
                className={`${styles.globalCard__desc} ${styles2.globalCard__desc}`}
              >
                <span
                  className={styles.cardEllipsis}
                  data-tooltip-id={generateDynamicId("createdOn")}
                >
                  {convertToLocalTime(data.created_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className={styles.globalCard__middle}>
            {data.card_type !== "Spot market" && (
              <div className={styles.globalCard__riskStatus}>
                {data.position === "Short" && (
                  <button className={styles.short}>
                    <span className="fa-solid fa-sort-down"></span> Short
                  </button>
                )}
                {data.position === "Long" && (
                  <button className={styles.long}>
                    <span className="fa-solid fa-sort-up"></span> Long
                  </button>
                )}
              </div>
            )}
            <div className={styles.globalCard__riskStatus}>
              <div
                className={`${styles.globalCard__riskLabel} ${styles2.globalCard__riskLabel}`}
              >
                Risk:
              </div>
              <div
                className={`${styles.globalCard__riskDesc} ${styles2.globalCard__riskDesc}`}
                data-tooltip-id={generateDynamicId("risk")}
              >
                {data.risk_status}
              </div>
            </div>
            {data.card_type !== "Spot market" &&
              data.card_type !== "Forex market" && (
                <div className={styles.globalCard__riskStatus}>
                  <div
                    className={`${styles.globalCard__riskLabel} ${styles2.globalCard__riskLabel}`}
                  >
                    Leverage:
                  </div>
                  <div
                    data-tooltip-id={generateDynamicId("leverage")}
                    className={`${styles.globalCard__riskDesc} ${styles2.globalCard__riskDesc}`}
                  >
                    {data.leverage}x
                  </div>
                </div>
              )}
            <div className={styles.globalCard__riskStatus}>
              <div
                className={`${styles.globalCard__riskLabel} ${styles2.globalCard__riskLabel}`}
              >
                {/* AI projection: */}
                Time Frame:
              </div>
              <div
                data-tooltip-id={generateDynamicId("aiProject")}
                className={`${styles.globalCard__riskDesc} ${styles2.globalCard__riskDesc}`}
              >
                {data.time_frame === "Long" ? "Long term" : "Short term"}
              </div>
            </div>
          </div>

          {/* Stop Loss Section */}
          <div
            className={`${styles.globalCard__entryStopLoss} ${styles2.globalCard__entryStopLoss}`}
          >
            <div
              className={`${styles.globalCard__entry} ${styles2.globalCard__entry} ${styles.entryWrap}`}
            >
              <span> Entry: </span>{" "}
              <span data-tooltip-id={generateDynamicId("entryFrom")}>
                {" "}
                {convertPrice(Number(data.entry_from))} -
                {convertPrice(Number(data.entry_to))}
              </span>
            </div>
            <div
              className={`${styles.globalCard__stopLoss} ${styles.stopLossWrapper} ${styles2.globalCard__stopLoss}`}
            >
              Stop Loss:{" "}
              <div className={styles.stopLossWrap}>
                <span data-tooltip-id={generateDynamicId("stopvalue")}>
                  {data.stop_value}&nbsp;
                </span>{" "}
                <span data-tooltip-id={generateDynamicId("qtCurrency")}>
                  {data.quote_currency}&nbsp;
                </span>
                {data.card_type !== "Forex market" && (
                  <span
                    className={styles.cardEllipsis}
                    data-tooltip-id={generateDynamicId("nonForexStopLoss")}
                  >
                    ({stopLossPercentage})
                  </span>
                )}
                {data.card_type === "Forex market" && (
                  <span className={styles.cardEllipsis}>
                    <span>({convertPrice(Number(data.stop_loss_pip))}</span>
                    <span> {data.stop_loss_pip === 1 ? "PIP" : "PIPS"})</span>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.targetWrap}>
            {<Targets index={index} data={data} />}
            <div className={styles.globalCard__right}>
              <TargetBars data={data} />
            </div>
          </div>
        </div>

        {/* Right Section */}
      </div>
    </div>
  );
};

export default TradeCardsRow;
