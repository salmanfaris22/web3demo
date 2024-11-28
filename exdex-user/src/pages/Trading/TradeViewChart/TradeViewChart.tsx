import React, { useEffect, useState } from "react";
import PageWrapper from "../../../common/Components/PageWrapper/PageWrapper";
import styles from "./TradeViewChart.module.scss";
import ChartComponent from "./ChartComponent";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";

SwiperCore.use([Autoplay, Pagination]);

const TradeViewChart = () => {
  const [symbolMap, setSymbolMap] = useState({
    g1: true,
    g2: false,
    g3: false,
    g4: false,
    g5: false,
    g6: false,
  });


  useEffect(() => {
    let i = 0;
    const keys = Object.keys(symbolMap);

    const interval = setInterval(() => {
      if (i < keys.length - 1) {
        i += 1; 

        setSymbolMap((prevMap) => ({
          ...prevMap,
          [keys[i]]: true,
        }));
      } else {
        clearInterval(interval); 
      }
    }, 2000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <PageWrapper className={styles.pageContainer}>
      <div className={`${styles.graphsContainer} ${styles.desktopSwiper}`}>
        <motion.div
          initial={{
            x: -100,
            y: -100,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.4,
              ease: [0.42, 0, 0.58, 1],
            },
          }}
          viewport={{
            once: true,
          }}
          className={styles.graphWrapper}
        >
          <div className={styles.graphBg}>
            <ChartComponent loadSymbol={symbolMap.g1} symbol={"BINANCE:BTCUSDT"} />
          </div>
        </motion.div>
        <motion.div
          initial={{
            y: -100,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.4,
              ease: [0.42, 0, 0.58, 1],
            },
          }}
          viewport={{
            once: true,
          }}
          className={styles.graphWrapper}
        >
          <div className={styles.graphBg}>
            <ChartComponent  loadSymbol={symbolMap.g2} symbol="FXOPEN:XAUUSD" />
          </div>
        </motion.div>
        <motion.div
          initial={{
            x: 100,
            y: -100,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.4,
              ease: [0.42, 0, 0.58, 1],
            },
          }}
          viewport={{
            once: true,
          }}
          className={styles.graphWrapper}
        >
          <div className={styles.graphBg}>
            <ChartComponent  loadSymbol={symbolMap.g3} symbol="NASDAQ:NVDA" />
          </div>
        </motion.div>
        <motion.div
          initial={{
            x: -100,
            y: 100,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.4,
              ease: [0.42, 0, 0.58, 1],
            },
          }}
          viewport={{
            once: true,
          }}
          className={styles.graphWrapper}
        >
          <div className={styles.graphBg}>
            <ChartComponent  loadSymbol={symbolMap.g4} symbol="FX:EURUSD" />
          </div>
        </motion.div>
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.4,
              ease: [0.42, 0, 0.58, 1],
            },
          }}
          viewport={{
            once: true,
          }}
          className={styles.graphWrapper}
        >
          <div className={styles.graphBg}>
            <ChartComponent  loadSymbol={symbolMap.g5} symbol="GBPUSD" />
          </div>
        </motion.div>
        <motion.div
          initial={{
            x: 100,
            y: 100,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.4,
              ease: [0.42, 0, 0.58, 1],
            },
          }}
          viewport={{
            once: true,
          }}
          className={styles.graphWrapper}
        >
          <div className={styles.graphBg}>
            <ChartComponent  loadSymbol={symbolMap.g6} symbol="BINANCE:SOLUSDT" />
          </div>
        </motion.div>
        <motion.div
          initial={{
            x: 100,
            y: 100,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
              delay: 0.5,
              // ease: [0.42, 0, 0.58, 1],
            },
          }}
          viewport={{
            once: true,
          }}
          className={styles.monitorStand}
        ></motion.div>
        <div className={styles.blurBg}></div>
      </div>
      <div className={`${styles.mobileSwiper} autoSwiper`}>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{
            // delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1200}
          pagination={{
            clickable: true,
            bulletActiveClass: styles.swiperPaginationBulletActive, // Custom bullet class
            bulletClass: styles.swiperPaginationBullet,
            modifierClass: styles.swiperMod,
          }}
          style={{ width: "100%", height: "auto" }}
        >
          <SwiperSlide>
            <div className={styles.graphBg}>
              <ChartComponent  loadSymbol={symbolMap.g1}   symbol={"BINANCE:BTCUSDT"} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.graphBg}>
              <ChartComponent  loadSymbol={symbolMap.g2}  symbol="FXOPEN:XAUUSD" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.graphBg}>
              <ChartComponent  loadSymbol={symbolMap.g3}  symbol="NASDAQ:NVDA" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.graphBg}>
              <ChartComponent  loadSymbol={symbolMap.g4}  symbol="FX:EURUSD" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.graphBg}>
              <ChartComponent  loadSymbol={symbolMap.g5}  symbol="GBPUSD" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.graphBg}>
              <ChartComponent  loadSymbol={symbolMap.g6}  symbol="BINANCE:SOLUSDT" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </PageWrapper>
  );
};

export default TradeViewChart;
