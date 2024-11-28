import React, { useEffect, useRef, useState } from "react";
import styles from "./AIWatchlist.module.scss";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import FilterUI from "../../common/Layout/FIlterUI/FilterUI";
import WatchListCard from "./WatchListCard/WatchListCard";
import MaxScreen from "../../common/Layout/MaxScreen/MaxScreen";
import useApi from "../../hooks/useAPI";
import { getAiSignalWatchList } from "../../services/watchList";
import { CardDataProps } from "../AISignals/TradeCardRows/TradeCardsRow";
import { convertPrice } from "../AISignals/TradeCardRows/utils";
import FadeComponent from "../../common/UI/Loader/Loader";
import InfiniteLoader from "../../common/UI/InfiniteLoader/InfiniteLoader";
import { useVisibility } from "../../hooks/useVtScroll";
import DataError from "../../common/UI/DataError/DataError";
import NoDataFound from "../../common/UI/NoDataFound/NoDataFound";

const filters = [
  {
    category: "Categories",
    id: "categories",
    filterKey: "categories",
    subCategory: [
      { name: "Crypto", id: "future" },
      { name: "Spot", id: "spot" },
      { name: "Forex", id: "forex" },
      { name: "Stock", id: "stock" },
      { name: "Indices", id: "indices" },
      { name: "Commodities", id: "commodities" },
    ],
  },
  {
    category: "Targets",
    id: "targets",
    filterKey: "target_hit_count",
    subCategory: [
      { name: "0 Target", id: "0" },
      { name: "1 Target", id: "1" },
      { name: "2 Target", id: "2" },
      { name: "3 Target", id: "3" },
      { name: "4 Target", id: "4" },
    ],
  },
  {
    category: "Position",
    id: "position",
    filterKey: "position",
    subCategory: [
      { name: "Short", id: "Short" },
      { name: "Long", id: "Long" },
    ],
  },
  {
    category: "Time Frame",
    id: "time_frame",
    filterKey: "time_frame",
    subCategory: [
      { name: "Short", id: "Short" },
      // { name: "Medium", id: "medium" },
      { name: "Long Term", id: "Long" },
    ],
  },
  {
    category: "Risk",
    id: "risk",
    filterKey: "risk_level",
    subCategory: [
      { name: "Low Risk", id: "Low" },
      { name: "Medium Risk", id: "Medium" },
      { name: "High Risk", id: "High" },
    ],
  },
  {
    category: "Stop Loss",
    id: "stop_loss",
    subCategory: [
      { name: "Stop Loss", id: "stop_loss" },
      { name: "Full Target", id: "full_target" },
    ],
  },
];

const AIWatchlist: React.FC = () => {
  const [cardData, setCardData] = useState<{
    data: CardDataProps[] | null;
    total: number;
  }>({ data: null, total: 0 });

  const formattedFilters = filters.map((filter) => ({
    ...filter,
    subCategory: filter.subCategory.map((sub) => ({
      ...sub,
      selected: false,
    })),
  }));

  const [filterConfig, setFilterConfig] = useState({
    filters: formattedFilters,
    page: 1,
    isFetchMore: false,
    per_page: 10,
  });

  const constructFilters = () => {
    let filterUrl = `?page=${filterConfig.page}&per_page=${filterConfig.per_page}`;
    filterConfig.filters.forEach((f) => {
      if (f.filterKey) {
        const selectedItems = f.subCategory.filter((sc) => sc.selected);
        if (selectedItems && selectedItems.length) {
          filterUrl =
            filterUrl +
            `&${f.filterKey}=${selectedItems.map((si) => si.id).join(",")}`;
        }
      }
    });

    console.log(filterUrl);
    return filterUrl;
  };

  const lazyContainerRef = useRef<HTMLDivElement>(null);
  const isVisible = useVisibility(lazyContainerRef);

  useEffect(() => {
    const filterUrl = constructFilters();
    getWatchList(filterUrl);
  }, [filterConfig.page, filterConfig.filters]);

  const handleFilterChange = ({
    categoryId,
    subCategoryId,
    state,
  }: {
    categoryId: string;
    subCategoryId: string;
    state: boolean;
  }) => {
    setCardData((prev) => ({ ...prev, data: [] }));
    setFilterConfig((prevConfig) => ({
      ...prevConfig,
      page: 1,
      isFetchMore: false,
      filters: prevConfig.filters.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            subCategory: category.subCategory.map((sub) => {
              if (sub.id === subCategoryId) {
                return { ...sub, selected: state };
              }
              return sub;
            }),
          };
        }
        return category;
      }),
    }));
  };

  useEffect(() => {
    if (isVisible) {
      console.log(
        isVisible,
        cardData.total > filterConfig.page,
        filterConfig.per_page
      );
      if (cardData?.data && !loading) {
        if (
          cardData.total > filterConfig.page * filterConfig.per_page &&
          cardData?.data.length > 0
        ) {
          setFilterConfig({
            ...filterConfig,
            page: filterConfig.page + 1,
            isFetchMore: true,
          });
        }
      }
    }
  }, [isVisible]);

  const {
    executeApi: getWatchList,
    loading,
    error,
  } = useApi<
    {
      data: {
        result: CardDataProps[];
        page: number;
        per_page: number;
        total: number;
      };
    },
    string
  >(getAiSignalWatchList, {
    onComplete: (r) => {
      console.log(r);
      const list = filterConfig.isFetchMore
        ? (cardData?.data || []).concat(r.data.result as any)
        : r.data.result;
      setCardData({ data: list, total: r.data?.total });
    },
  });

  console.log(cardData?.data);

  return (
    <div className={styles.mainWarpper}>
      <MaxScreen>
        <div className={`${styles.container}`}>
          <PageWrapper>
            <FilterUI
              apiLoading={loading}
              filteredByCount={cardData?.data?.length || 0}
              filters={filterConfig.filters}
              onFilterChange={handleFilterChange}
              title="Your AI Signal Watchlist"
              description="Keep track of your selected signals with real-time insights and updates."
            >
              <div className={styles.watchListWrapper}>
                {!loading && cardData?.data?.length === 0 && (
                  <NoDataFound title="No Data found" />
                )}
                {loading &&
                  (!cardData?.data || cardData?.data.length === 0) && (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      <FadeComponent />{" "}
                    </div>
                  )}
                {error && (
                  <DataError
                    btnLabel="Retry"
                    title="Something went wrong"
                    btnProps={{
                      onClick: () => {
                        const filterUrl = constructFilters();
                        getWatchList(filterUrl);
                      },
                    }}
                  />
                )}
                {cardData.data &&
                  !error &&
                  cardData?.data?.map((watchItem, index) => (
                    <div className={styles.watchListContiner}>
                      <WatchListCard
                        key={index}
                        refferalCode={watchItem?.referral_code}
                        heading={watchItem.card_type}
                        coin={watchItem.market}
                        entryPrice={convertPrice(Number(watchItem.entry_from))}
                        marketPrice={convertPrice(Number(watchItem.price))}
                        percentage={
                          Number(watchItem.current_percentage) > 0
                            ? `+${watchItem.current_percentage}`
                            : Number(watchItem.current_percentage) < 0
                            ? `-${watchItem?.current_percentage}`
                            : watchItem?.current_percentage
                        }
                      />
                    </div>
                  ))}
                {loading && (cardData?.data || []).length > 0 && (
                  <InfiniteLoader />
                )}
                <div ref={lazyContainerRef} className={styles.scrollEnd}></div>
              </div>
            </FilterUI>
          </PageWrapper>
        </div>
      </MaxScreen>
      <div className="gradientBgFixed"></div>
    </div>
  );
};

export default AIWatchlist;
