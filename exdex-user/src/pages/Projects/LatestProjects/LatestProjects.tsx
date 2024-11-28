import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import useApi from "../../../hooks/useAPI";
import useToast from "../../../hooks/useToast";
import {
  addProjectToWatchList,
  getOtherProjects,
  getProjectSuggestions,
} from "../../../services/projects";
import DeskTopWrapper from "../Maintabs/MobileWrapper/DesktopWrapper";
import MobileWrapper from "../MobileWrapper/MobileWrapper";
import ProjectCard from "../ProjectCard/ProjectCard";
import { Project } from "../Projects";
import LatestProjectLong from "./LatestProjectLong/LatestProjectLong";
import LatestProjectLongLoader from "./LatestProjectLong/LatestProjectsLongLoader";
import styles from "./LatestProjects.module.scss";
import Tabs from "../../../common/Components/Tabs/Tabs";
import SuggestedProjects from "./SuggestedProjects/SuggestedProjects";
import MobileCardLoader from "../MobileCardsLoader/MobileCardLoader";
import Button from "../../../common/Components/Button/Button";
import ProjectCardLoader from "../ProjectCard/ProjectCardLoader";

const tabList = [
  {
    title: "Latest Projects",
    key: "latest_project",

    listKey: "latest_project",
  },
  {
    title: "Top Projects",
    key: "top_project",
    listKey: "top_project",
  },
  { title: "GEM", key: "gem", listKey: "gem" },
  {
    title: "Trending",
    key: "trending",

    listKey: "trending_project",
  },
  { title: "Low Risk", key: "low", listKey: "low_risk" },
  { title: "High Risk", key: "high", listKey: "high_risk" },
];

const tabTitles = tabList.map((t) => t.title);

const LatestProjects = ({ categoryId }: { categoryId: number }) => {
  const [activeIndex, setActive] = useState(0);
  const [data, setData] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [pageConfig, setPageConfig] = useState({ page: 1, per_page: 12 });

  const { loading, error, executeApi } = useApi<
    { data: { other_proj: { [key: string]: Project[] }; total: number } },
    any
  >(getOtherProjects, {
    onComplete: (d,key) => {
      const activeListkey = tabList[activeIndex].listKey;
      console.log(activeListkey);
      const apiData = d?.data?.other_proj?.[activeListkey];
      if (apiData) {
        if (key == "refresh") {
          setData(apiData);
        } else {
          setData([...data, ...apiData]);
        }
        setTotal(d.data?.total || 0);
      }
    },
    keepBeforeRefresh: true,
  });
  const {
    data: suggestionsData,
    loading: suggestionLoading,
    error: suggestionError,
    executeApi: getSuggestionsAPI,
  } = useApi<{ data: { suggested_project: Project[] } }, any>(
    getProjectSuggestions
  );

  const { triggerToast } = useToast();

  useEffect(() => {
    if (categoryId) {
      setData([]);
      const selectedtab = tabList[activeIndex];
      setPageConfig({ ...pageConfig, per_page: 12 });
      executeApi(
        {
          projectType: selectedtab.key,
          ...pageConfig,
          per_page: 12,
          categoryId,
        },
        "refresh"
      );
    }
  }, [categoryId, activeIndex]);
  useEffect(() => {
    getSuggestionsAPI({
      ...{ page: 1, per_page: 12 },
      categoryId,
    });
  }, [categoryId]);

  const { executeApi: addProjectToWatchListAPI } = useApi(
    addProjectToWatchList,
    {
      onComplete: (m) => {
        triggerToast(m.data.message, "success");
        executeApi({
          projectType: tabList[activeIndex].listKey,
          categoryId,
          ...pageConfig,
        });
      },
      onError: () => {},
    }
  );

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <div className={styles.content}>
          <div className={styles.tabWrap}>
            <Tabs
              tabList={tabTitles}
              activeIndex={activeIndex}
              onActiveIndex={setActive}
              disabled={loading}
            />
          </div>
          <MobileCardLoader isLoading={loading && data.length === 0} />
          <MobileWrapper
            onSliderChange={(sw) => {
              const {
                activeIndex: slideActiveIndex,
                slides: allSlides,
                params,
                ...s
              } = sw;

              console.log(params, s, "s");

              const slidesPerView =
                params.slidesPerView === "auto"
                  ? sw.slidesPerViewDynamic()
                  : params.slidesPerView;
              const triggerIndex = allSlides.length - (slidesPerView || 0) - 2;
              console.log(slideActiveIndex, triggerIndex);
              if (
                slideActiveIndex >= triggerIndex &&
                !loading &&
                data.length > 0 &&
                data.length + 1 < total
              ) {
                const pageConfigData = {
                  ...pageConfig,
                  page: pageConfig.page + 1,
                };
                setPageConfig({ ...pageConfig, ...pageConfigData });
                executeApi({
                  projectType: tabList[activeIndex]?.listKey,
                  ...pageConfigData,
                  categoryId,
                });
              }
            }}
          >
            {data.map((p) => {
              return (
                <SwiperSlide>
                  <ProjectCard
                    growth={p.growth}
                    classNames={{ fooetr: styles.mobileProjectCard }}
                    categoryId={categoryId}
                    projectId={p.id}
                    date={p?.analytics?.published_at}
                    watchListed={p?.analytics?.watch_listed}
                    image={p.thumbnail}
                    name={p.name}
                    description={p.heading}
                    onBookMarkClick={() => {
                      triggerToast("updating watchlist", "info");
                      addProjectToWatchListAPI({
                        category_id: categoryId,
                        project_id: p.id,
                        isOnWatchList: p.analytics.watch_listed,
                      });
                    }}
                  />
                </SwiperSlide>
              );
            })}
            {data?.length > 0 && loading && (
              <>
                <SwiperSlide>
                  <div className={styles.loader}>
                    <ProjectCardLoader />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={styles.loader}>
                    <ProjectCardLoader />
                  </div>
                </SwiperSlide>{" "}
              </>
            )}
          </MobileWrapper>

          <DeskTopWrapper>
            {loading &&
              data.length === 0 &&
              Array.from({ length: 10 }).map((_, i) => {
                return <LatestProjectLongLoader key={i} />;
              })}
            {data.map((p, i) => {
              return (
                <LatestProjectLong
                  growth={p.growth}
                  projectId={p.id}
                  categoryId={categoryId}
                  date={p?.analytics?.published_at}
                  watchListed={p?.analytics?.watch_listed}
                  image={p.thumbnail}
                  name={p.name}
                  description={p.heading}
                  className={i === data.length - 1 ? "noBorder" : ""}
                  onBookMarkClick={() => {
                    triggerToast("updating watchlist", "info");
                    addProjectToWatchListAPI({
                      category_id: categoryId,
                      project_id: p.id,
                      isOnWatchList: p.analytics.watch_listed,
                    });
                  }}
                />
              );
            })}
            {data && data.length > 0 && data.length + 1 < total && (
              <div
                className={styles.viewMore}
                onClick={() => {
                  setPageConfig({
                    ...pageConfig,
                    page: pageConfig.page + 1,
                  });
                  executeApi({
                    projectType: tabList[activeIndex].listKey,
                    ...{ ...pageConfig, page: pageConfig.page + 1 },
                    categoryId,
                  });
                }}
              >
                {/* <Button isLoading={loading} disabled={loading} theme="bordered">
                  View more
                </Button> */}
              </div>
            )}
          </DeskTopWrapper>
        </div>
        <div className={styles.content}>
          <SuggestedProjects
            categoryId={categoryId}
            loading={suggestionLoading}
            data={suggestionsData?.data.suggested_project || []}
          />
        </div>
      </div>
    </div>
  );
};

export default LatestProjects;
