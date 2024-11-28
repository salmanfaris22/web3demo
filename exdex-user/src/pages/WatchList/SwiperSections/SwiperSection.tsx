import React, { useRef } from "react";
import styles from "./SwiperSecrion.module.scss";
import { Project } from "../../Projects/Projects";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Swipercard from "./SwiperCard/Swipercard";
import { useNavigate } from "react-router-dom";

const SwiperSection = ({ name, data }: { name: string; data: Project[] }) => {
  const navigate = useNavigate();
  const goTo = (url: string) => {
    navigate(url);
  };
  const swiperRef = useRef<any>(null);
  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext(); // Move to the next slide (right)
    }
  };
  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev(); // Move to the previous slide (left)
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoWrap}>
        <div className={styles.title}>{name}</div>
        <div className={styles.description}>
          Watch the latests workshops from the leading Experts
        </div>
        <div className={styles.swiperArrow}>
          <div
            className={styles.left}
            onClick={() => {
              goPrev();
            }}
          >
            <img src="/assets/images/left.png" alt="left" />
          </div>
          <div className={styles.center}>
            <img src="/assets/images/sliderMenu.png" alt="all" />
          </div>
          <div
            className={styles.left}
            onClick={() => {
              goNext();
            }}
          >
            <img
              className={styles.rotate}
              src="/assets/images/left.png"
              alt="left"
            />
          </div>
        </div>
      </div>
      <div className={styles.contentWrap}>
        <Swiper
          ref={swiperRef}
          className={"cardSwiper"}
          //   navigation
          //   modules={[Navigation]}
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
              slidesPerView: 5.3,
              spaceBetween: 25,
            },
          }}
          speed={300}
        >
          {data.map((d) => {
            return (
              <SwiperSlide key={d.id}>
                <Swipercard
                  bg={d.thumbnail}
                  title={d.name}
                  descript={d.heading}
                  clicked={() => {
                    goTo(`/dexgem/${d.id}/${d.category_id}`);
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperSection;
