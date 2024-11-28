import React, { useEffect, useRef, useState } from "react";
import styles from "./DexGemPicks.module.scss";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import FilterUI, { IFilters } from "../../common/Layout/FIlterUI/FilterUI";
import MaxScreen from "../../common/Layout/MaxScreen/MaxScreen";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useAPI";
import { getDexgemPickFilters } from "../../services/dexgemPicks";
import { useVisibility } from "../../hooks/useVtScroll";
import { CardDataProps } from "../AISignals/TradeCardRows/TradeCardsRow";
import { getExploreProjects } from "../../services/projects";
import InfiniteLoader from "../../common/UI/InfiniteLoader/InfiniteLoader";
import DataError from "../../common/UI/DataError/DataError";
import FadeComponent from "../../common/UI/Loader/Loader";
import DexGemCard from "../../common/Components/DexGemCard/DexGemCard";
import NoDataFound from "../../common/UI/NoDataFound/NoDataFound";

interface IDexGemProject {
  id: number;
  admin_id: number;
  name: string;
  description: string;
  status: string;
  thumbnail: string;
  banner: string;
  category: string;
  project_link: string;
  published_at: string;
  risk: string;
  heading: string;
  category_id: number;
  project_following: boolean;
  price: number;
  growth: number;
  price_change: number;
  analytics: {
    view_count: number;
    likes: number;
    dislike: number;
    users_rating: number;
    comment_count: number;
    user_viewed: boolean;
    user_like: number;
    published_at: string;
    watch_listed: boolean;
    watchlist_count: number;
    average: number;
  };
  base_currency_name: string;
  base_currency_image: string;
  market_id: number;
  is_suggested: boolean;
  website_link: string;
  investment_range: string;
}

interface GrowthRange {
  from: number;
  to: number;
  label: string;
}

interface InvestmentRange {
  from: number;
  to: number;
  label: string;
}

interface Filters {
  growth_ranges: GrowthRange[];
  investment_ranges: InvestmentRange[];
  qualification_filters: string[];
}

const DexGemPicks = () => {
  const { name, id } = useParams();

  const [cardData, setCardData] = useState<{
    data: IDexGemProject[] | null;
    total: number;
  }>({ data: null, total: 0 });

  const [filterConfig, setFilterConfig] = useState<{
    filters: IFilters[];
    page: number;
    isFetchMore: boolean;
    per_page: number;
  }>({
    filters: [],
    page: 1,
    isFetchMore: false,
    per_page: 25,
  });

  const {
    executeApi: exploreProjects,
    loading,
    error,
  } = useApi<
    {
      data: IDexGemProject[];
      page: number;
      per_page: number;
      total: number;
    },
    string
  >(getExploreProjects, {
    onComplete: (r) => {
      console.log(r);
      const list = filterConfig.isFetchMore
        ? (cardData?.data || [])?.concat(r.data as any)
        : r.data;
      setCardData({ data: list, total: r?.total });
    },
  });

  useEffect(() => {
    if (filterConfig.filters?.length > 0) {
      const filterUrl = constructFilters();
      exploreProjects(filterUrl);
    }
  }, [filterConfig.page, filterConfig.filters]);

  const {
    executeApi: getFiltersAPI,
    loading: filtersLoading,
    error: filterError,
  } = useApi<Filters>(getDexgemPickFilters, {
    onComplete: (data) => {
      setFilterConfig((prev) => ({ ...prev, filters: formattedFilters(data) }));
    },
  });

  const formattedFilters = (data: Filters) => {
    if (!data) {
      return [];
    }
    return [
      {
        filterKey: "investment_filter",
        category: "Investments",
        id: "investment",
        subCategory: data?.investment_ranges?.map((x) => {
          return {
            name: x.label,
            id: `${x.from}-${x.to}`,
            selected: false,
          };
        }),
      },
      {
        filterKey: "growth_filter",
        category: "Growth",
        id: "growth",
        subCategory: data?.growth_ranges?.map((x) => {
          return {
            name: x.label,
            id: `${x.from}-${x.to}`,
            selected: false,
          };
        }),
      },
      {
        filterKey: "qualification_filter",
        category: "Qualification",
        id: "qualification",
        subCategory: data?.qualification_filters?.map((x) => {
          return {
            name: x,
            id: x,
            selected: false,
          };
        }),
      },
    ];
  };

  const constructFilters = () => {
    let filterUrl = `?page=${filterConfig.page}&per_page=${filterConfig.per_page}&category_id=${id}`;
    filterConfig?.filters?.forEach((f) => {
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
    getFiltersAPI();
  }, []);

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

  return (
    <>
      <MaxScreen>
        <div className={`${styles.container} `}>
          <PageWrapper>
            <FilterUI
              filteredByCount={cardData?.data?.length || 0}
              filters={filterConfig.filters || []}
              apiLoading={loading}
              onFilterChange={handleFilterChange}
              title={`Explore Dex Gem Picks in ${name}`}
              description={`Discover all recommended projects in the ${name} category. Click "View All" to see our top AI-driven selections and insights for each project.`}
            >
              <div className={styles.watchListWrapper}>
                {loading &&
                  (!cardData?.data || cardData?.data.length === 0) && (
                    <div
                      style={{
                        width: "100%",
                        height: "80vh",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      <FadeComponent />{" "}
                    </div>
                  )}

                {!loading && cardData?.data?.length === 0 && (
                  <NoDataFound title="No Data found" />
                )}

                {error && (
                  <DataError
                    btnLabel="Retry"
                    title="Something went wrong"
                    btnProps={{
                      onClick: () => {
                        const filterUrl = constructFilters();
                        exploreProjects(filterUrl);
                      },
                    }}
                  />
                )}
                {cardData.data &&
                  !error &&
                  cardData?.data?.map((dexItem, index) => (
                    <div key={index} className={styles.watchListContiner}>
                      <DexGemCard
                        publishedOn={dexItem?.published_at}
                        growth={Number(dexItem?.growth)}
                        thumbNail={dexItem.thumbnail}
                        name={dexItem.name}
                      />
                    </div>
                  ))}
                {loading && (cardData?.data || [])?.length > 0 && (
                  <InfiniteLoader />
                )}
                <div ref={lazyContainerRef} className={styles.scrollEnd}></div>
              </div>
            </FilterUI>
          </PageWrapper>
        </div>
      </MaxScreen>
      <div className="gradientBgFixed"></div>
    </>
  );
};

export default DexGemPicks;
