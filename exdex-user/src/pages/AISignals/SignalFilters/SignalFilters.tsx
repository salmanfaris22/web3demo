import React, { useState, useEffect } from "react";
import styles from "./SignalFilters.module.scss";
import styles2 from "../ExdexCommon.module.scss";
import { tabStyles } from "../AISignals";
import { useFilter } from "../../../store/context/filterContext";
import Toggle from "../../../common/Components/Toggle/Toggle";

interface SmartCardFilterProps {
  cardName: string;
  exchangesFilterDrpDown: string[];
  pairSearch: (data: any) => void;
}

const SmartCardFilter: React.FC<SmartCardFilterProps> = ({
  exchangesFilterDrpDown,
  ...res
}) => {
  const { filterState, setFilterState, resetFilters } = useFilter();
  const [toggleFilterBtn, setToggle] = useState(false);
  const [cardName, setCardName] = useState(res.cardName);
  useEffect(() => {
    console.log("Card name changed: ", cardName);
    setCardName(res.cardName);
  }, [res.cardName]);

  const changeFilter = (type?: string) => {
    let updatedState = { ...filterState, isReset: false, isFetchMore: false };

    if (type === "Long" || type === "Short") {
      updatedState = { ...updatedState, position: type };
    }

    if (type === "Short") {
      updatedState = {
        ...updatedState,
        isShortActive: true,
        isLongActive: false,
      };
    } else if (type === "Long") {
      updatedState = {
        ...updatedState,
        isLongActive: true,
        isShortActive: false,
      };
    }

    setFilterState(updatedState);
  };

  const resetFilter = () => {
    resetFilters();
  };

  const toggle = () => {
    setToggle(!toggleFilterBtn);
  };

  const onPairSearch = (pair: string) => {
    const updatedState = {
      ...filterState,
      activatedPair: pair,
      resetPageNo: false,
    };
    setFilterState({ ...filterState, ...updatedState });
  };

  //   useEffect(()=>{
  //    getMarketList({...filterState})
  //   } , [filterState])

  return (
    <>
      <ul
        className={`${styles.filterSection} ${styles.webView} ${
          cardName === tabStyles.spotMarket.cardName && styles.spotcard
        }`}
      >
        {toggleFilterBtn && (
          <>
            <select
              className={styles2.formControl}
              value={filterState.exchange}
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  exchange: e.target.value,
                  isFetchMore: false,
                })
              }
            >
              <option value="">Exchange Name</option>
              {exchangesFilterDrpDown.map((eachExc, index) => (
                <option key={index} value={eachExc}>
                  {eachExc}
                </option>
              ))}
            </select>

            <select
              className={styles2.formControl}
              value={filterState.timeframe}
              onChange={(e) => {
                setFilterState({
                  ...filterState,
                  timeframe: e.target.value,
                  isFetchMore: false,
                });
                // getMarketList({ ...filterState, timeframe: e.target.value });
              }}
            >
              <option value="">AI Projection</option>
              <option value="short">Short Term</option>
              <option value="long">Long Term</option>
            </select>

            <select
              className={styles2.formControl}
              value={filterState.riskType}
              onChange={(e) =>
                setFilterState({
                  ...filterState,
                  riskType: e.target.value,
                  isFetchMore: false,
                })
              }
            >
              <option value="">Risk</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <button className={styles.resetButton} onClick={resetFilter}>
              Reset Filter
            </button>
          </>
        )}

        {cardName !== tabStyles.spotMarket.cardName && (
          <div
            className={`${styles2.dFlex} ${styles2.gap3} ${styles.short_long_wrapper}`}
          >
            <span
              className={`${styles.short} ${
                filterState.isShortActive ? styles.activeShort : ""
              }`}
              onClick={() => changeFilter("Short")}
            >
              <span className="fa-solid fa-sort-down"></span> Short
            </span>
            <span
              className={`${styles.long} ${
                filterState.isLongActive ? styles.activeLong : ""
              }`}
              onClick={() => changeFilter("Long")}
            >
              <span className="fa-solid fa-sort-up"></span> Long
            </span>
          </div>
        )}
        <div
          className={`${styles2.dFlex} ${styles2.gap3} ${styles.btcPair_wrapper}`}
          hidden={cardName !== "spot"}
        >
          <span
            className={`${styles.pair} ${
              filterState.activatedPair === "btc" ? styles.activePair : ""
            }`}
            onClick={() => {
              onPairSearch("btc");
            }}
            onDoubleClick={() => onPairSearch("")}
          >
            BTC PAIR
          </span>
          <span
            className={`${styles.pair} ${
              filterState.activatedPair === "usdt" ? styles.activePair : ""
            }`}
            onClick={() => {
              onPairSearch("usdt");
            }}
            onDoubleClick={() => onPairSearch("")}
          >
            USDT PAIR
          </span>
        </div>
        <button
          className={`${styles.filter_btn} ${
            toggleFilterBtn ? styles.selected : ""
          }`}
          onClick={toggle}
        >
          <svg
            style={{ paddingRight: "0.5rem" }}
            width="2.5rem"
            height="1.5rem"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="filter-3-fill">
              <path
                id="Vector"
                d="M8.75 15.75H12.25V14H8.75V15.75ZM2.625 5.25V7H18.375V5.25H2.625ZM5.25 11.375H15.75V9.625H5.25V11.375Z"
                fill="white"
              />
            </g>
          </svg>
          Filters
        </button>
      </ul>

      <div className={styles.mobileView}>
        <div className={styles.filterRow}>
          {/* Similar elements for mobile view */}
          {cardName !== tabStyles.spotMarket.cardName && (
            <div
              className={`${styles2?.dFlex} ${styles2?.gap3} ${styles.short_long_wrapper}`}
            >
              <span
                className={`${styles.long} ${
                  filterState.isLongActive ? styles.activeLong : ""
                }`}
                onClick={() => changeFilter("Long")}
              >
                <span className="fa-solid fa-sort-up"></span> Long
              </span>
              <span
                className={`${styles.short} ${
                  filterState.isShortActive ? styles.activeShort : ""
                }`}
                onClick={() => changeFilter("Short")}
              >
                <span className="fa-solid fa-sort-down"></span> Short
              </span>
            </div>
          )}
          <div
            className={`${styles2.dFlex} ${styles2.gap3} ${styles.btcPair_wrapper}`}
            hidden={cardName !== "spot"}
          >
            <span
              className={`${styles.pair} ${
                filterState.activatedPair === "btc" ? styles.activePair : ""
              }`}
              onClick={() => {
                onPairSearch("btc");
              }}
              onDoubleClick={() => onPairSearch("")}
            >
              BTC PAIR
            </span>
            <span
              className={`${styles.pair} ${
                filterState.activatedPair === "usdt" ? styles.activePair : ""
              }`}
              onClick={() => {
                onPairSearch("usdt");
              }}
              onDoubleClick={() => onPairSearch("")}
            >
              USDT PAIR
            </span>
          </div>
          <div>
            <button
              className={`${styles.filter_btn} ${
                toggleFilterBtn ? styles.selected : ""
              }`}
              onClick={toggle}
            >
              <svg
                style={{ paddingRight: "0.5rem" }}
                width="2.5rem"
                height="1.5rem"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="filter-3-fill">
                  <path
                    id="Vector"
                    d="M8.75 15.75H12.25V14H8.75V15.75ZM2.625 5.25V7H18.375V5.25H2.625ZM5.25 11.375H15.75V9.625H5.25V11.375Z"
                    fill="white"
                  />
                </g>
              </svg>
              Filters
            </button>
          </div>
        </div>

        {toggleFilterBtn && (
          <div className={styles.filterElements}>
            <ul className={styles.filterSection}>
              <select
                className={styles2.formControl}
                value={filterState.exchange}
                onChange={(e) => {
                  setFilterState({
                    ...filterState,
                    exchange: e.target.value,
                    isFetchMore: false,
                  });
                }}
              >
                <option value="">Exchange Name</option>
                {exchangesFilterDrpDown.map((eachExc, index) => (
                  <option key={index} value={eachExc}>
                    {eachExc}
                  </option>
                ))}
              </select>

              <select
                className={styles2.formControl}
                value={filterState.timeframe}
                onChange={(e) => {
                  setFilterState({
                    ...filterState,
                    timeframe: e.target.value,
                    isFetchMore: false,
                  });
                  // getMarketList({ ...filterState, timeframe: e.target.value })
                }}
              >
                <option value="">AI Projection</option>
                <option value="short">Short Term</option>
                <option value="long">Long Term</option>
              </select>

              <select
                className={styles2.formControl}
                value={filterState.riskType}
                onChange={(e) =>
                  setFilterState({
                    ...filterState,
                    riskType: e.target.value,
                    isFetchMore: false,
                  })
                }
              >
                <option value="">Risk</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <button className={styles.resetButton} onClick={resetFilter}>
                Reset Filter
              </button>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default SmartCardFilter;
