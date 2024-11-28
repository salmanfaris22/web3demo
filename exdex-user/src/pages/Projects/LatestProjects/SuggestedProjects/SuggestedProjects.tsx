import { SwiperSlide } from "swiper/react";
import DeskTopWrapper from "../../Maintabs/MobileWrapper/DesktopWrapper";
import MobileCardLoader from "../../MobileCardsLoader/MobileCardLoader";
import MobileWrapper from "../../MobileWrapper/MobileWrapper";
import { Project } from "../../Projects";
import FullProjectCard from "./FullProjectCards/FullProjectCard";
import styles from "./SuggestedProjects.module.scss";
import SuggestedProjectsLoader from "./SuggestedProjectsLoader";

const SuggestedProjects = ({
  data,
  loading,
  categoryId,
}: {
  data: Project[];
  loading: boolean;
  categoryId: number;
}) => {
  return (
    <div className={styles.container}>
      <h4>Suggested Projects</h4>
      <MobileCardLoader isLoading={loading} />
      <DeskTopWrapper>
        <div className={styles.suggestedProjects}>
          {loading && <SuggestedProjectsLoader />}
          {data.map((p, index) => {
            return (
              <div
                className={`${styles.cardWraps} ${
                  (index === 0 || index % 5 === 0) && styles.fullWidth
                } `}
              >
                <FullProjectCard
                  growth={p.growth}
                  classNames={{
                    container:
                      index !== 0 && index % 5 !== 0
                        ? styles.miniCardContainer
                        : "",
                    title:
                      index !== 0 && index % 5 !== 0 ? styles.miniCard : "",
                    fooetr:
                      index !== 0 && index % 5 !== 0
                        ? styles.miniCardFooter
                        : "",
                  }}
                  cssClass={{ images: styles.imgWrap }}
                  date={p?.analytics?.published_at}
                  image={p.thumbnail}
                  name={p.name}
                  heading={p.heading}
                  projectId={p.id}
                  categoryId={categoryId}
                />
              </div>
            );
          })}
        </div>
      </DeskTopWrapper>
      <MobileWrapper>
        {data.map((p, index) => {
          return (
            <SwiperSlide key={`suggested -${p.id}`}>
              <div className={`${styles.cardWraps} `}>
                <FullProjectCard
                  growth={p.growth}
                  cssClass={{ images: styles.imgWrap }}
                  date={p?.analytics?.published_at}
                  image={p.thumbnail}
                  name={p.name}
                  heading={p.heading}
                  categoryId={categoryId}
                  projectId={p.id}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </MobileWrapper>
    </div>
  );
};

export default SuggestedProjects;
