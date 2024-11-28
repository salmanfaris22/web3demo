import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import useApi from "../../../hooks/useAPI";
import useToast from "../../../hooks/useToast";
import {
  addProjectToWatchList,
  getPopularProjects,
} from "../../../services/projects";
import DeskTopWrapper from "../Maintabs/MobileWrapper/DesktopWrapper";
import MobileWrapper from "../MobileWrapper/MobileWrapper";
import ProjectCard from "../ProjectCard/ProjectCard";
import ProjectCardLoader from "../ProjectCard/ProjectCardLoader";
import { Project } from "../Projects";
import styles from "./PopularProjects.module.scss";

const PopularProjects = ({ categoryId }: { categoryId: number }) => {
  const [projectData, setProjectData] = useState<Project[]>([]);
  const { triggerToast } = useToast();

  const {
    loading,
    error,
    executeApi: getPopularAPI,
  } = useApi<{ data: { popular: Project[] } }, any>(getPopularProjects, {
    onComplete: (data) => {
      setProjectData(data?.data?.popular || []);
    },
    keepBeforeRefresh: true,
  });

  const { executeApi: addProjectToWatchListAPI } = useApi(
    addProjectToWatchList,
    {
      onComplete: (m) => {
        triggerToast(m.data.message, "success");
        getPopularAPI({ categoryId, config: { ...pageConfig } });
      },
      onError: () => {
        getPopularAPI({ categoryId, config: { ...pageConfig } });
      },
    }
  );

  const [pageConfig, setPageConfig] = useState({ page: 1, per_page: 15 });

  useEffect(() => {
    setProjectData([]);
    getPopularAPI({ categoryId, config: { ...pageConfig } });
  }, [categoryId]);

  return (
    <>
      <MobileWrapper>
        {projectData.map((p) => {
          return (
            <SwiperSlide key={p.id}>
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
      </MobileWrapper>
      <DeskTopWrapper>
        <div className={styles.popularProjectsWrap}>
          {loading &&
            projectData.length === 0 &&
            Array.from({ length: 4 }).map((_, i) => {
              return (
                <div key={`pop-${i}`} className={styles.cardWrap}>
                  {" "}
                  <ProjectCardLoader />
                </div>
              );
            })}

          {projectData?.map((p) => {
            return (
              <div className={styles.cardWrap} key={p.id}>
                <ProjectCard
                  growth={p.growth}
                  categoryId={categoryId}
                  projectId={p.id}
                  image={p.thumbnail}
                  name={p.name}
                  description={p.heading}
                  date={p.analytics.published_at}
                  watchListed={p.analytics.watch_listed}
                  onBookMarkClick={() => {
                    triggerToast("updating watchlist", "info");
                    addProjectToWatchListAPI({
                      category_id: categoryId,
                      project_id: p.id,
                      isOnWatchList: p.analytics.watch_listed,
                    });
                  }}
                />
              </div>
            );
          })}
        </div>
      </DeskTopWrapper>
    </>
  );
};

export default PopularProjects;
