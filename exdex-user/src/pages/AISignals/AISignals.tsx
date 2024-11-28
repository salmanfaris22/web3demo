import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DataError from "../../common/UI/DataError/DataError";
import InfiniteLoader from "../../common/UI/InfiniteLoader/InfiniteLoader";
import useApi from "../../hooks/useAPI";
import useToast from "../../hooks/useToast";
import { useVisibility } from "../../hooks/useVtScroll";
import {
  addWatchList,
  getCards,
  getExchanges,
  getSmartCardInfo,
  getTopGainerInfo,
  getWatchlistAi
} from "../../services/exdexCards";
import { selectAiPlanStatus } from "../../store/authSlice";
import {
  initialFilterData,
  TradingSettings,
  useFilter,
} from "../../store/context/filterContext";
import AiPaymentTags from "./AiPaymentTags/AiPaymentTags";
import AISignalDetails from "./AISignalDetails/AISignalDetails";
import styles from "./AISignals.module.scss";
import HeightLightCards, {
  GainData,
  HCardData,
} from "./HeighlightCards/HeightLightCards";
import SmartCardFilter from "./SignalFilters/SignalFilters";
import SignalTabs from "./Signaltabs/SignalTabs";
import TradeCardsRow, { CardDataProps } from "./TradeCardRows/TradeCardsRow";
import { getQString, getTabUrlQ } from "./TradeCardRows/utils";

export const tabStyles: Record<
  string,
  {
    name: string;
    cardName: string;
    smartCardId: string;
    isComingSoon?: boolean;
    comingSoonImg?: string;
    comingSoonImgMob?: string;
  }
> = {
  futureMarket: {
    name: "Future",
    smartCardId: "Margin trade",
    cardName: "future",
  },
  spotMarket: {
    name: "Spot",
    cardName: "spot",
    smartCardId: "Spot market",
  },

  forexMarket: {
    name: "Forex",
    smartCardId: "Forex market",
    cardName: "forex",
  },
  commoditiesMarket: {
    name: "Commodities",
    smartCardId: "",
    cardName: "",
    isComingSoon: true,
    comingSoonImg: "/assets/images/signal_cards/commodities-ui.png",
    comingSoonImgMob: "/assets/images/signal_cards/commodities-ui-mob.png",
  },
  indicesMarket: {
    name: "Indices",
    smartCardId: "",
    cardName: "",
    isComingSoon: true,
    comingSoonImg: "/assets/images/signal_cards/indices-ui.png",
    comingSoonImgMob: "/assets/images/signal_cards/indices-ui-mob.png",
  },
  stockMarket: {
    name: "Stock",
    smartCardId: "",
    cardName: "",
    isComingSoon: true,
    comingSoonImg: "/assets/images/signal_cards/stock-ui.png",
    comingSoonImgMob: "/assets/images/signal_cards/stock-ui-mob.png",
  },
};

const AISignals = () => {
  const isAiPurchased = useSelector(selectAiPlanStatus);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabName = queryParams.get("tab");

  const defaultTab = Object.values(tabStyles).find(
    (tab) => getTabUrlQ(tab.name) === String(tabName)
  );

  const [selectedTab, setSelectedTab] = useState(
    defaultTab ? defaultTab : tabStyles.spotMarket
  );
  const navigate = useNavigate();
  const { filterState, setFilterState } = useFilter();
  const { triggerToast } = useToast();
  const lazyContainerRef = useRef<HTMLDivElement>(null);
  const [cardData, setCardData] = useState<{
    result: CardDataProps[];
    total: number;
  }>({ result: [], total: 0 });
  const [isHighlight, setIsHighlight] = useState(true);
  const [selectedCard, setSelectedCard] = useState<null | CardDataProps>(null);
  const [viewData, setViewData] = useState<CardDataProps | null>(null);

  const {
    data: smartCardData,
    executeApi,
    loading: smartCardLoading,
    error: smartCardsError,
  } = useApi<{ data: HCardData }, string>(getSmartCardInfo);
  const {
    data: topGainerData,
    executeApi: getTopGainerAPI,
    loading: topGainLoading,
  } = useApi<{ data: GainData[] }, string>(getTopGainerInfo);
  

  const {
    data: watchlist,
    executeApi: getWatchListApi,
    loading: commentsLoading,
  } = useApi<{ data: any[] }, string>(getWatchlistAi);
  const {
    data: exchangeData,
    executeApi: getExchangesAPI,
    loading: exchangeLoading,
  } = useApi<{
    data: { result: string[] };
  }>(getExchanges);
  const {
    executeApi: getCardsAPI,
    loading: isCardDataLoading,
    error: cardsAPIError,
  } = useApi<
    {
      data: { result: CardDataProps[]; total: number };
    },
    string
  >(getCards, {
    onComplete: (r) => {
      const list = filterState.isFetchMore
        ? cardData.result.concat(r.data.result)
        : r.data.result;
      setCardData({ result: list, total: r.data.total });
    },
  });

  const { executeApi: addWatchListAPI } = useApi<
    { data: string },
    CardDataProps
  >(addWatchList, {
    onComplete: (d) => {
      triggerToast(d.data, "success");
      constructCardParams(filterState);
    },
  });

  useEffect(() => {
    const queryParam = getTabUrlQ(selectedTab.name);
    navigate(`?tab=${queryParam}`);
    if (!selectedTab?.isComingSoon) {
      executeApi(selectedTab.smartCardId);
      getTopGainerAPI(selectedTab?.smartCardId);
      getWatchListApi(selectedTab.smartCardId);
      getExchangesAPI();
      setIsHighlight(true);
    }
  }, [selectedTab, navigate]);

  useEffect(() => {
    if (filterState) {
      if (!filterState.isFetchMore) {
        setCardData({ result: [], total: 0 });
      }
      if (!selectedTab.isComingSoon) {
        constructCardParams(filterState);
      }
    }
  }, [filterState, selectedTab]);

  const constructCardParams = (settings: TradingSettings) => {
    let queryString = getQString(settings, selectedTab, tabStyles);
    getCardsAPI(queryString);
  };

  const updateBookmark = (cardsInfo: CardDataProps) => {
    addWatchListAPI(cardsInfo);
  };

  const isVisible = useVisibility(lazyContainerRef);

  useEffect(() => {
    if (isVisible) {
      if (cardData?.result && !isCardDataLoading) {
        if (
          cardData.total > filterState.currentPage * filterState.itemsPerPage &&
          cardData?.result.length > 0
        ) {
          setFilterState({
            ...filterState,
            currentPage: filterState.currentPage + 1,
            isFetchMore: true,
          });
        }
      }
    }
  }, [isVisible]);

  const getClass = () => {
    if (selectedTab.name === tabStyles.spotMarket.name) {
      return styles.cryptoSpot;
    }
    if (selectedTab.name === tabStyles.futureMarket.name) {
      return styles.futureMarket;
    }
    if (selectedTab.name === tabStyles.forexMarket.name) {
      return styles.forexMarket;
    }
  };

  return (
    <>
      <div className={styles.bgs}></div>
      <div className={`${styles.container} ${getClass()}`}>
        {viewData && (
          <AISignalDetails
            cardInfo={viewData}
            onCloseDetail={() => {
              setViewData(null);
            }}
          />
        )}

        <div className={styles.contentDiv}>
          {
            <>
              {" "}
              {/* <Search
                onEnter
                type="tradesignal"
                ipValue={filterState.search}
                onFocusOut
                handleOnChange={(v) => {
                  if (v !== filterState.search) {
                    setFilterState({
                      ...initialFilterData,
                      search: v,
                      isFetchMore: false,
                      currentPage: 1,
                    });
                  }
                }}
                placeholder="Search a card"
                cssClass={`${styles.searcher} ${styles.searcherDeskTop}`}
                inputType="search"
              /> */}
              <SignalTabs
                onTabSwitch={(tabName) => {
                  const selected = Object.values(tabStyles).find(
                    (tab) => tab.name === tabName
                  );
                  if (selected) {
                    setSelectedTab(selected);
                  }
                  setFilterState({
                    ...initialFilterData,
                    search: "",
                    card_type: selected?.smartCardId,
                    isFetchMore: false,
                    currentPage: 1,
                  });
                }}
              />
              {/* <Search
                onEnter
                type="tradesignal"
                ipValue={filterState.search}
                onFocusOut
                handleOnChange={(v) => {
                  if (v !== filterState.search) {
                    setFilterState({
                      ...initialFilterData,
                      search: v,
                      isFetchMore: false,
                      currentPage: 1,
                    });
                  }
                }}
                placeholder="Search a card"
                cssClass={`${styles.searcher} ${styles.searcherMob}`}
                inputType="search"
              /> */}
              {!selectedTab.isComingSoon ? (
                <>
                  {" "}
                  {/* selectedTab.cardName */}
                  <HeightLightCards
                    showWatchList={true}
                    cardName={''}
                    data={smartCardData?.data}
                    isForex={false}
                    topComments={[]}
                    watchList={watchlist?.data || []}
                    topGainData={topGainerData?.data || []}
                    isHighlight={isHighlight}
                    onToggleHighLight={() => {
                      setIsHighlight(!isHighlight);
                    }}
                  />
                  {!isAiPurchased && <AiPaymentTags />}
                </>
              ) : (
                <div className={styles.comingSoon}>
                  <img src={selectedTab.comingSoonImg} alt="Coming Soon" />
                  <img src={selectedTab.comingSoonImgMob} alt="Coming Soon" />
                  <div className={styles.textDiv}>Coming Soon</div>
                </div>
              )}
            </>
          }
          {isAiPurchased && !selectedTab.isComingSoon && (
            <div className={styles.cardSectionWrapper}>
              {exchangeData && exchangeData.data && (
                <SmartCardFilter
                  exchangesFilterDrpDown={exchangeData?.data?.result || []}
                  pairSearch={() => {}}
                  cardName={selectedTab.cardName}
                />
              )}
              <div
                className={`${styles.rows} ${styles.mobileSmartCard} ${styles.cardMinHeight}}`}
              >
                {cardsAPIError && !isCardDataLoading && (
                  <DataError
                    cssClass={{
                      container: styles.dataCardError,
                      text:
                        selectedTab.cardName !== tabStyles?.spotMarket.cardName
                          ? styles.blackText
                          : "",
                    }}
                    btnLabel="Reload"
                    btnProps={{
                      onClick: () => {
                        executeApi(selectedTab.smartCardId);
                      },
                    }}
                  />
                )}

                {cardData?.result.map((x, i) => {
                  return (
                    <div
                      className={styles.cardHolder}
                      onClick={() => {
                        if (!x.is_expired) {
                          setSelectedCard(x);
                        }
                      }}
                    >
                      <TradeCardsRow
                        index={i}
                        data={x}
                        isUser
                        viewDetails={(c) => {
                          if (c.trading_view_id) {
                            setViewData(c);
                          } else {
                            // triggerToast(
                            //   "Trading view is not available for the smart card.",
                            //   "error"
                            // );
                          }
                        }}
                        tradeBtn={(e) => {
                          e.stopPropagation();
                        }}
                        add={() => {
                          triggerToast("Updating watch list...", "info");
                          updateBookmark(x);
                        }}
                        isMobileView={false}
                      />
                    </div>
                  );
                })}
                {isCardDataLoading && <InfiniteLoader />}
                <div ref={lazyContainerRef} className={styles.scrollEnd}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AISignals;
