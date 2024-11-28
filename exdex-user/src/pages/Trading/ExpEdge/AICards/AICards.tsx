import React from "react";
import styles from "./AICards.module.scss";
import TextCards from "../../TextCards/TextCards";
import ExpEdgeCard from "../ExpEdgeCard/ExpEdgeCard";
import AIImageCard, { IAICard } from "../AIImageCard/AIImageCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { halfSlierConfig } from "../../../../common/Constants";

const aiCards: IAICard[] = [
  {
    name: "FUTURES",
    feature: ["Long", "20x", "MINAUSDT"],
    entryprice: 0.5783,
    marketprice: 0.7723,
    percentage: "+570.05%",
    type: "green",
    qr: "/assets/images/trade/qr/3.svg",
  },
  {
    name: "SPOT",
    feature: ["LINKBTC"],
    entryprice: 0.000286,
    marketprice: 0.000444,
    percentage: "+48.72%",
    type: "black",
    qr: "/assets/images/trade/qr/1.svg",
  },
  {
    name: "FOREX",
    feature: ["Long", "CHFJPY"],
    entryprice: 168.763,
    marketprice: 170.723,
    percentage: "+196 PIPS",
    type: "white",
    qr: "/assets/images/trade/qr/2.svg",
  },
];

const AICards = () => {
  const getSlides = (isMobile: boolean) => {
    const textCard = isMobile ? (
      <SwiperSlide>
        {" "}
        <TextCards
          index={0}
          title={"AI Signals, Pinpoint Accuracy"}
          description={"Trade with confidence using our intelligent insights"}
        />
      </SwiperSlide>
    ) : (
      <TextCards
        index={1}
        title={"AI Signals, Pinpoint Accuracy"}
        description={"Trade with confidence using our intelligent insights"}
      />
    );

    const sliers = aiCards.map((c, index) => {
      return isMobile ? (
        <SwiperSlide>
          <AIImageCard {...c} index={index + 2} />
        </SwiperSlide>
      ) : (
        <AIImageCard {...c} index={index + 2} />
      );
    });

    return (
      <>
        {textCard}
        {sliers}
      </>
    );
  };

  return (
    <>
      <div className={styles.desktopSlider}>{getSlides(false)}</div>
      <div className={styles.mobileSlider}>
        <Swiper {...halfSlierConfig}>{getSlides(true)}</Swiper>
      </div>
    </>
  );
};

export default AICards;
