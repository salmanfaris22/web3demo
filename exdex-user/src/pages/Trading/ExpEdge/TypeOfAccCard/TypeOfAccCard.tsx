import React from "react";
import styles from "./TypeOfAccCard.module.scss";
import TextCards from "../../TextCards/TextCards";
import { Swiper, SwiperSlide } from "swiper/react";
import { halfSlierConfig } from "../../../../common/Constants";

const data = [
  {
    key: "standardAccount",
    title: "Standard",
    description:
      "Our beginner-friendly account with no commissions on forex trading. Perfect for learning the ropes.",
  },
  {
    key: "crypto",
    title: "Crypto",
    description:
      "Access a wide range of cryptocurrencies and forex pairs with competitive spreads and advanced charting tools.",
  },
  {
    key: "ecnAccount",
    title: "ECN",
    description:
      "Experience superior execution and tight spreads with our ECN account. Ideal for scalpers and high-volume traders.",
  },
  {
    key: "primeAccount",
    title: "Prime",
    description:
      "Our most exclusive account with personalized service, negotiable commissions, and access to all platforms.",
  },
];

const TypeOfAccCard = () => {
  const getSides = (isMobile?: boolean) => {
    return data.map((d, i) => {
      const card = (
        <TextCards
          index={i}
          title={d.title}
          description={d.description}
          hasImage={false} // Assuming there are no images
          imageLink={undefined} // No image link provided
          btn="Open Account"
          theme="btnCard"
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

export default TypeOfAccCard;
