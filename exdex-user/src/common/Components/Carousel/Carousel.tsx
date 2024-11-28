import React, { useEffect, useState } from "react";
import styles from "./Carousel.module.scss";




const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sixtyVwInPixels = window.innerWidth * 0.65;
  const slideMargin = 35;

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const calculateTranslateX = () => {
    if (activeIndex === 0) return 0;
    const offset =
      sixtyVwInPixels * 0.7 +
      (activeIndex - 1) * (sixtyVwInPixels + slideMargin);
    return offset;
  };

  const handleNavButtonClick = (index : number) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.carouselWrapper}
        style={{ transform: `translate3d(${-calculateTranslateX()}px, 0, 0)` }}
      >
        <div
          style={{
            background: "linear-gradient(97.84deg, rgba(0, 0, 0, 0) -4.65%, #145EB6 36.39%)",
            width: `${sixtyVwInPixels}px`,
            marginRight: `${slideMargin}px`,
          }}
          className={styles.carouselSlide}
        ></div>
        <div
          style={{
            background: "linear-gradient(97.84deg, rgba(0, 0, 0, 0) -4.65%, #434345 -4.64%)",
            width: `${sixtyVwInPixels}px`,
            marginRight: `${slideMargin}px`,
          }}
          className={styles.carouselSlide}
        ></div>
        <div
          style={{
            background: "linear-gradient(97.84deg, rgba(0, 0, 0, 0) -4.65%, #FFFFFF -4.64%)",
            width: `${sixtyVwInPixels}px`,
            marginRight: `${slideMargin}px`,
          }}
          className={styles.carouselSlide}
        ></div>
      </div>
      <div className={styles.carouselNav}>
      {Array.from({ length: 3 }, (_, index) => (
    <button 
    onClick={() => handleNavButtonClick(index)}
    key={index} className={`${styles.carouselBtn} ${activeIndex === index && styles.active}`}></button>
  ))}
      </div>
    </div>
  );
};

export default Carousel;
