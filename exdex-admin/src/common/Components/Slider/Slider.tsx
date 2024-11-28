import React, { useState, useEffect } from "react";
import { Swiper } from "swiper/react";
import "swiper/css";
import DotPagination from "./DotPagination/DotPagination";
import classes from "./Slider.module.scss";

interface SwiperProps {
  children: React.ReactNode;
  pagination: boolean;
  type?: string;
  goTo?: any;
  animation?: boolean;
  breakpoints?: any;
  slidesPerview?: number;
  spaceBetween?: number;
  slidesPerGroup?: number;
  dotPosition?: string;
  arrows?: boolean;
  onActiveIndexChange?: (index: number) => void;
}

const SwiperCommon: React.FC<SwiperProps> = ({
  children,
  pagination,
  type,
  goTo,
  animation,
  breakpoints,
  slidesPerview = 2.8,
  spaceBetween = 50,
  slidesPerGroup = slidesPerview,
  dotPosition = "normal",
  arrows = false,
  onActiveIndexChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [dynamicSlidesPerGroup, setDynamicSlidesPerGroup] = useState(
    Math.floor(slidesPerGroup)
  );

  const totalSlides = React.Children.count(children);
  const totalPages = Math.ceil(totalSlides / dynamicSlidesPerGroup);

  const handleDotClick = (index: number) => {
    if (index >= 0 && index < React.Children.count(children)) {
      setCurrentIndex(index);
      if (swiperInstance) {
        swiperInstance.slideTo(index * dynamicSlidesPerGroup);
      }
    }
  };

  const handleArrowClick = (direction: string) => {
    if (!swiperInstance) return;
    if (direction === "left") {
      swiperInstance.slidePrev();
    } else if (direction === "right") {
      swiperInstance.slideNext();
    }
  };

  useEffect(() => {
    if (swiperInstance) {
      const updateSlidesPerViewAndGroup = () => {
        if (swiperInstance.params) {
          setDynamicSlidesPerGroup(
            Math.floor(
              swiperInstance.params.slidesPerGroup ||
                swiperInstance.params.slidesPerView
            )
          );
        }
      };
      swiperInstance.on("breakpoint", updateSlidesPerViewAndGroup);
      updateSlidesPerViewAndGroup();
      return () => {
        swiperInstance.off("breakpoint", updateSlidesPerViewAndGroup);
      };
    }
  }, [swiperInstance]);

  useEffect(() => {
    if (currentIndex !== -1 && onActiveIndexChange) {
      onActiveIndexChange(currentIndex);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(goTo);
    }
  }, [goTo]);

  return (
    <div
      className={`${classes.relative} ${type == "full" ? "fullSlider" : ""} ${
        animation ? "animationSlide" : ""
      }`}
    >
      <Swiper
        onSwiper={(swiper: any) => setSwiperInstance(swiper)}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerview}
        slidesPerGroup={slidesPerGroup}
        onSlideChange={(swiper: any) => {
          setCurrentIndex(swiper.activeIndex);
        }}
        initialSlide={currentIndex}
        breakpoints={breakpoints}
      >
        {children}
      </Swiper>
      {pagination && (
        <DotPagination
          totalSlides={totalPages}
          position={dotPosition}
          currentIndex={Math.ceil(currentIndex / dynamicSlidesPerGroup)}
          onDotClick={handleDotClick}
        />
      )}
      {arrows && (
        <div className={classes.swiperArrow}>
          <div
            className={classes.left}
            onClick={() => {
              handleArrowClick("left");
            }}
          >
            <img src="/assets/images/left.png" alt="left" />
          </div>
          <div className={classes.center}>
            <img src="/assets/images/sliderMenu.png" alt="all" />
          </div>
          <div
            className={classes.left}
            onClick={() => {
              handleArrowClick("right");
            }}
          >
            <img
              className={classes.rotate}
              src="/assets/images/left.png"
              alt="left"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SwiperCommon;
