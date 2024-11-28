import React, { ReactNode } from "react";
import styles from "./TradeCards.module.scss";
import ExpEdgeCard, { ExpSwiperCard } from "../ExpEdgeCard/ExpEdgeCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { halfSlierConfig } from "../../../../common/Constants";
const data = [
  {
    key: "account_managers",
    label: "Account Managers",
    count: "01", // Assuming this is the path to the icon
    description: "Upgradable IB Up to 3 level",
    icon: "/assets/images/trade/trade/1.png",
  },
  {
    key: "personal_account_managers",
    label: "Account Managers",
    count: "02", // Assuming this is the path to the icon
    description: "Personal Account Managers",
    icon: "/assets/images/trade/trade/2.png",
  },
  {
    key: "daily_forex_webinars",
    label: "",
    count: "03", // Assuming this is the path to the icon
    description: "Free Access to Daily Forex Webinars",
    icon: "/assets/images/trade/trade/3.png",
  },
  {
    key: "live_help",
    label: "Live Help",
    description: "24/7 Live Help",
    icon: "/assets/images/trade/trade/4.png",
  },
];

const TradeCards = () => {
  const getSides = (isMobile?: boolean) => {
    return (
      data.map((d, index) => {
        const card = (
          <ExpEdgeCard index={index}>
            <div
              className={`${styles.IconWrap} ${!d.count ? styles.center : ""}`}
            >
              {d.count && <div className={styles.count}>{d.count}</div>}
              <div className={`${styles.image}`}>
                <img src={d.icon} alt={d.description} />
              </div>
              <div className={styles.label}>{d.label}</div>
            </div>
            <div className={styles.mainInfo}>{d.description}</div>
          </ExpEdgeCard>
        );
        return isMobile ? <SwiperSlide>{card}</SwiperSlide> : card;
      }) || null
    );
  };

  return (
    <>
      <div className={styles.desktopSlider}>{getSides()}</div>
      <div className={styles.mobileSlider}>
        <Swiper
          centeredSlidesBounds={true}
          spaceBetween={15} // Adjust the space between slides
          slidesPerView={1.2} // Shows one full slide and part of the next
          centeredSlides={true}
        >
          {getSides(true)}
        </Swiper>
      </div>
    </>
  );
};

export default TradeCards;
