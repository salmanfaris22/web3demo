import React, { useEffect, useState } from "react";
import styles from "./OtherProjects.module.scss";
import { Project } from "../Projects";
import useToast from "../../../hooks/useToast";
import useApi from "../../../hooks/useAPI";
import {
  addProjectToWatchList,
  getSimilarProjects,
} from "../../../services/projects";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProjectCard from "../ProjectCard/ProjectCard";
import Tabs from "../../../common/Components/Tabs/Tabs";
import OtherProjectsLoader from "./OtherProjectsLoader";
import MobileCardLoader from "../MobileCardsLoader/MobileCardLoader";
import ProjectCardLoader from "../ProjectCard/ProjectCardLoader";

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

const OtherProjects = ({ categoryId }: { categoryId: number }) => {
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
    { data: { similar_project: { [key: string]: Project[] }; total: number } },
    any
  >(getSimilarProjects, {
    onComplete: (d, key) => {
      const activeListkey = similarProjectFilter[activeIndex].listKey;
      const apiData = d?.data?.similar_project?.[activeListkey];
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
      executeApi({
        projectType: selectedtab.listKey,
        ...pageConfig,
        categoryId,
      },'refresh');
    }
  }, [categoryId, activeIndex]);

  return (
    <div className={styles.container}>
      <h4>Other Projects</h4>
      <div className={styles.tabWrap}>
        <Tabs
          tabList={tabs}
          activeIndex={activeIndex}
          onActiveIndex={setActive}
          disabled={suggestionLoading}
        />
      </div>
      {/* Loader for desktop */}
      {suggestionLoading && data.length === 0 && <OtherProjectsLoader />}
      <MobileCardLoader isLoading={suggestionLoading && data.length === 0} />
      <Swiper
        onSlideChange={(sw: SwiperClass) => {
          const {
            activeIndex: slideActiveIndex,
            slides: allSlides,
            params,
            ...s
          } = sw;

          console.log(params, s);
          const slidesPerView =
            params.slidesPerView === "auto"
              ? sw.slidesPerViewDynamic()
              : params.slidesPerView;
          const triggerIndex = allSlides.length - (slidesPerView || 0) - 2;
          console.log(slideActiveIndex, triggerIndex);
          if (
            slideActiveIndex >= triggerIndex &&
            !suggestionLoading &&
            data.length > 0 &&
            data.length + 1 < total
          ) {
            console.log(
              similarProjectFilter[activeIndex]?.listKey,
              similarProjectFilter,
              slideActiveIndex
            );
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
        modules={[Navigation]}
        loop={false}
      >
        {data.map((p) => {
          return (
            <SwiperSlide>
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
      </Swiper>
    </div>
  );
};

export default OtherProjects;
