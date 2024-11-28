import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import useApi from "../../../hooks/useAPI";
import useToast from "../../../hooks/useToast";
import {
  addProjectToWatchList,
  getTopViewProjects,
} from "../../../services/projects";
import Tabs from "../../../common/Components/Tabs/Tabs";
import MobileCardLoader from "../MobileCardsLoader/MobileCardLoader";
import { Project } from "../Projects";
import TopProjectCard from "./TopProjectCard/TopProjectCard";
import TopProjectcardLoader from "./TopProjectCard/TopProjectcardLoader";
import TopProjectsLoader from "./TopProjectsLoader";
import styles from "./TopProjectsLoader.module.scss";
import ProjectCard from "../ProjectCard/ProjectCard";

const similarProjectFilter = [
  {
    title: "Latest Projects",
    key: "latest",

    listKey: "latest_project",
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

const tabs = similarProjectFilter.map((f) => f.title);

const TopProjects = ({ categoryId }: { categoryId: number }) => {
  const [activeIndex, setActive] = useState(0);
  const [data, setData] = useState<Project[]>([]);
  const [pageConfig, setPageConfig] = useState({ page: 1, per_page: 15 });
  const [total, setTotal] = useState(0);

  const { triggerToast } = useToast();

  const {
    loading: suggestionLoading,
    error: suggestionError,
    executeApi,
  } = useApi<
    { data: { view_project: { [key: string]: Project[] }; total: number } },
    any
  >(getTopViewProjects, {
    onComplete: (d, key) => {
      console.log(key);
      const activeListkey = similarProjectFilter[activeIndex].listKey;
      const apiData = d?.data?.view_project?.[activeListkey];
      if (apiData) {
        console.log(data);
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

  const { executeApi: addProjectToWatchListAPI } = useApi(
    addProjectToWatchList,
    {
      onComplete: (m) => {
        triggerToast(m.data.message, "success");
        executeApi({
          projectType: similarProjectFilter[activeIndex].listKey,
          categoryId,
          ...pageConfig,
        });
      },
      onError: () => {},
    }
  );

  useEffect(() => {
    if (categoryId) {
      setData([]);
      const selectedtab = similarProjectFilter[activeIndex];
      executeApi(
        {
          projectType: selectedtab.listKey,
          ...pageConfig,
          per_page: 15,
          page: 0,
          categoryId,
        },
        "refresh"
      );
    }
  }, [categoryId, activeIndex]);

  return (
    <div className={styles.container}>
      <h4>Top Viewed Projects</h4>
      <div className={styles.tabWrap}>
        <Tabs
          tabList={tabs}
          activeIndex={activeIndex}
          onActiveIndex={setActive}
          disabled={suggestionLoading}
        />
      </div>
      {/* Loader for desktop */}
      {suggestionLoading && data.length === 0 && <TopProjectsLoader />}
      {suggestionLoading && (
        <MobileCardLoader isLoading={suggestionLoading && data.length === 0} />
      )}
      <Swiper
        onSlideChange={(sw: SwiperClass) => {
          const { activeIndex, slides: allSlides, params } = sw;
          const slidesPerView =
            params.slidesPerView === "auto"
              ? sw.slidesPerViewDynamic()
              : params.slidesPerView;
          const triggerIndex = allSlides.length - (slidesPerView || 0) - 2;
          if (
            activeIndex >= triggerIndex &&
            !suggestionLoading &&
            data.length > 0 &&
            data.length + 1 < total
          ) {
            const pageConfigData = { ...pageConfig, page: pageConfig.page + 1 };
            setPageConfig({ ...pageConfig, ...pageConfigData });
            executeApi({
              projectType: similarProjectFilter[activeIndex]?.listKey,
              ...pageConfigData,
              categoryId,
            });
          }
        }}
        className={"cardSwiper overflwoSwiper"}
        navigation
        modules={[Navigation]}
        loop={false}
        breakpoints={{
          200: {
            slidesPerView: 1.5,
            spaceBetween: 20, // Show 1.5 slides under 890px width
          },
          768: {
            slidesPerView: 3.3,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        }}
      >
        {data.map((p) => {
          return (
            <SwiperSlide>
              {/* <TopProjectCard
                projectId={p.id}
                categoryId={categoryId}
                date={p?.analytics?.published_at}
                watchListed={p?.analytics?.watch_listed}
                image={p.thumbnail}
                heading={p.heading}
                name={p.name}
                // description={p.heading}
                onBookMarkClick={() => {
                  triggerToast("updating watchlist", "info");
                  addProjectToWatchListAPI({
                    category_id: categoryId,
                    project_id: p.id,
                    isOnWatchList: p.analytics.watch_listed,
                  });
                }}
              /> */}
              <ProjectCard
                growth={p.growth}
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
        {data?.length > 0 && suggestionLoading && (
          <>
            {" "}
            <SwiperSlide>
              <TopProjectcardLoader />
            </SwiperSlide>
            <SwiperSlide>
              <TopProjectcardLoader />
            </SwiperSlide>{" "}
          </>
        )}
      </Swiper>
    </div>
  );
};

export default TopProjects;
