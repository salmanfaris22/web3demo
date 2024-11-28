import React from "react";
import styles from "./Regule.module.scss";
import TextCards from "../../TextCards/TextCards";
import { Swiper, SwiperSlide } from "swiper/react";
import { halfSlierConfig } from "../../../../common/Constants";

const data = [
  {
    key: "regulation1",
    title: "Regulations, Your Protection",
    description: "Ensuring broker compliance and your peace of mind",
    icon: null,
  },
  {
    key: "regulation2",
    title: "",
    description: "",
    icon: null,
    bg: "/assets/images/trade/reg.png",
  },
  {
    key: "regulation3",
    title: "",
    description: "",
    icon: null,
    bg: "/assets/images/trade/reg2.png",
  },
  {
    key: "regulation4",
    title:
      "Saint Lucia , Registered with Saint Lucia Certificate Of Incorporation",
    description: "",
    icon: null,
  },
];

const ReguleCard = () => {
  const getSides = (isMobile?: boolean) => {
    return data.map((d, i) => {
      const card = (
        <TextCards
          index={i}
          theme="white"
          title={d.title}
          description={d.description}
          hasImage={!!d.icon}
          imageLink={d.icon || undefined}
          bgImage={d.bg || undefined}
        />
      );
      return isMobile ? <SwiperSlide key={d.key}>{card}</SwiperSlide> : card;
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

export default ReguleCard;
