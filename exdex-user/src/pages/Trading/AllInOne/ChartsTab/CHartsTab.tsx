import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./CHartsTab.module.scss";
import { formatCurrency } from "../../../../utils/currencyFormatter";
import Button from "../../../../common/Components/Button/Button";
import TableChart from "../../../../common/Components/TableChart/TableChart";
import TradingPairMarque from "../TradingPairMarque/TradingPairMarque";
import useApi from "../../../../hooks/useAPI";
import { getPopular } from "../../../../services/trade";
import Loader from "../../../../common/UI/Loader/Loader";
import { IMAGE_URL } from "../../../../config";

const tabs = [
  { tab: "Popular", key: "popular" , disabled : true },
  { tab: "Forex", key: "forex" },
  { tab: "Crypto CFDs", key: "crypto" },
  { tab: "Metals", key: "metals", isNew: true  , disabled : true},
  { tab: "Indices", key: "indices" , disabled : true },
  { tab: "Futures", key: "futures" , disabled : true },
  { tab: "Energy", key: "energy" , disabled : true },
  { tab: "Shares", key: "shares" , disabled : true },
];

export type TabKeys = (typeof tabs)[number]["key"];

interface TCurrencyPair {
  id: number;
  symbol: string;
  current_price: number;
  _: number;
  price_change_percentage_24h: number;
  change_direction: "positive" | "negative";
  created_at: string;
  updated_at: string;
  historical_data: number[];
  logo_url: string;
  base_logo?: string;
  quote_logo?: string;
}

const CHartsTab = () => {
  const [activeIndex, setActive] = useState(1);
  const { executeApi, data, loading } = useApi<
    { data: TCurrencyPair[] },
    TabKeys
  >(getPopular);
  const apiRes = data?.data;
  const parentRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    executeApi("crypto");
  }, []);

  const updateLeftPosition = () => {
    const calculatedLeft = parentRef.current?.getBoundingClientRect().x || 0;
    setLeft(calculatedLeft);
  };


  useLayoutEffect(() => {
    updateLeftPosition();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateLeftPosition);
    window.addEventListener("orientationchange", updateLeftPosition);

    return () => {
      window.removeEventListener("resize", updateLeftPosition);
      window.removeEventListener("orientationchange", updateLeftPosition);
    };
  }, []);

  return (
    <div className={styles.container} ref={parentRef}>
      <div className={styles.tabRow}>
        {tabs.map((t, i) => {
          return (
            <button
              disabled={t.disabled}
              onClick={() => {
                setActive(i);
                executeApi(t.key);
              }}
              className={` ${activeIndex === i && styles.activeBtn} ${
                styles.tabSingle
              }
              ${t.disabled && "disabledLink"}
              `}
              key={t.key}
            >
              {t.tab}
              {/* {t.isNew && <div className={styles.new}>new</div>} */}
            </button>
          );
        })}
      </div>
      <div className={styles.tradeMarque} style={{ left: left * -1 }}>
        <TradingPairMarque />
      </div>
      {loading && (
        <div className={styles.tableState}>
          <Loader />
        </div>
      )}

      {!loading && apiRes && (
        <table>
          <tr>
            <th>Name</th>
            <th>Last Price(USD)</th>
            <th>Change</th>
            <th>Last 24h</th>
            <th>Action</th>
          </tr>
          {apiRes?.map((crypto) => (
            <tr key={crypto.id}>
              <td>
                <div
                  className={`${styles.icon} ${
                    crypto.quote_logo && styles.qtLogo
                  }`}
                >
                  {crypto?.logo_url ? (
                    <div
                      style={{ backgroundImage: `url(${crypto.logo_url})` }}
                      className={styles.logo}
                      aria-label={crypto.symbol}
                    />
                  ) : (
                    <>
                      {crypto.base_logo && (
                        <div
                          style={{
                            backgroundImage: `url(${IMAGE_URL as string}${
                              crypto.base_logo
                            })`,
                          }}
                          className={`${styles.fxLogo1} ${styles.logo}`}
                          aria-label={crypto.symbol}
                        />
                      )}
                      {crypto.quote_logo && (
                        <div
                          style={{
                            backgroundImage: `url(${IMAGE_URL as string}${
                              crypto.quote_logo
                            })`,
                          }}
                          className={`${styles.fxLogo2} ${styles.logo}`}
                          aria-label={crypto.symbol}
                        />
                      )}
                    </>
                  )}
                </div>
                {crypto.symbol}
              </td>
              <td>${formatCurrency(crypto.current_price)}</td>
              <td
                className={`${
                  crypto.price_change_percentage_24h < 0 && styles.low
                }`}
              >
                {formatCurrency(crypto.price_change_percentage_24h)}%
              </td>
              <td>
                <div className={styles.graph}>
                  <TableChart
                    data={crypto.historical_data.map((x) => String(x)) || []}
                    isDetailedChart={false}
                    showArea={true}
                    showAxis={false}
                    useGradient={true}
                    customColors={{
                      lineColor: "#e0350b",
                      gradientStart: "rgba(240, 0, 204, 0)",
                      gradientEnd: "rgba(43, 45, 52, 0.074)",
                    }}
                  />
                </div>
              </td>
              <td>
                <Button theme="neon">Trade</Button>
              </td>
            </tr>
          ))}
        </table>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className={styles.viewMore}>
          {/* View More
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_4205_5938)">
              <path
                d="M7.96094 15.536L15.0329 8.46399M15.0329 8.46399H9.37611M15.0329 8.46399V14.1209"
                stroke="#EA5954"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_4205_5938">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg> */}
        </div>
      </div>
    </div>
  );
};

export default CHartsTab;
