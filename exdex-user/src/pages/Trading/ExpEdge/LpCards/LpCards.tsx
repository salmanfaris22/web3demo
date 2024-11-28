import React, { ReactNode } from "react";
import styles from "./LpCards.module.scss";
import TextCards from "../../TextCards/TextCards";
import { Swiper, SwiperSlide } from "swiper/react";
import { halfSlierConfig } from "../../../../common/Constants";

const data = [
  {
    key: "liquidity",
    title: "",
    description: "",
    icon: "/assets/images/trade/LP/lp1.png",
  },
  {
    key: "lp1",
    title: "",
    description: "",
    icon: "",
    bg: "/assets/images/trade/LP/jp.png",
  },
  {
    key: "lp2",
    title: "",
    description: "",
    icon: "",
    bg: "/assets/images/trade/LP/jp2.png",
  },
  {
    key: "lp3",
    title: "",
    description: "",
    icon: "",
    bg: "/assets/images/trade/LP/jp3.png",
  },
];

const LpCards = () => {
  const getSides = (isMobile?: boolean) => {
    return data.map((d, index) => {
      const card = (
        <TextCards
          title={d.title}
          description={d.description}
          hasImage={!!d.icon}
          imageLink={d.icon || undefined}
          bgImage={d.bg || undefined}
          index={index}
        />
      );
      return isMobile ? <SwiperSlide>{card}</SwiperSlide> : card;
    });
  };

  return (
    <>
      <div className={styles.desktopSlider}>{getSides()}</div>
      <div className={styles.mobileSlider}>
        <Swiper {...halfSlierConfig}>{getSides(true)}</Swiper>
      </div>
    </>
  );
};

export default LpCards;
