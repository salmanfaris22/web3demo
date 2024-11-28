import { useEffect, useState } from "react";
import SwiperCommon from "../../../common/Components/Slider/Slider";
import classes from "./GemText.module.scss";
import { SwiperSlide } from "swiper/react";
import DexGemCard from "../../../common/Components/DexGemCard/DexGemCard";
import {  getExploreProjectsWithoutToken } from "../../../services/projects";
import { showToast } from "../../../store/toastSlice";
import { useDispatch } from "react-redux";

export const breakpoints: any = {
  300: {
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
  },
};

const GemText = () => {
  const dispatch = useDispatch();
  const [gemArray, setGemArray] = useState<any>([]);

  useEffect(() => {
    getDexCards();
  }, []);

  const getDexCards = async () => {
    try {
      const response = await getExploreProjectsWithoutToken();
      setGemArray(response.data.data);
    } catch (err: any) {
      try {
        if (err.response.data.error) {
          dispatch(
            showToast({
              message: err.response.data.error,
              type: "error",
              timeout: 5000,
            })
          );
        }
      } catch (e) {
        console.log(e);
      }
    } finally {
    }
  };

  const handleSlideChange = (slideIndex: any) => {
    const currentIndex = slideIndex;
  };
  return (
    <div className={classes.gemWrap}>
      <div className={classes.gemOuter}>
        <div className={classes.gemLeft}>
          GEM detector in a class by itself.
        </div>
        <div className={classes.gemRight}>
          Dex Gem is an AI-powered algorithm that scans the market to identify
          promising tokens and coins with high growth potential before they
          surge in value. By leveraging advanced data analysis, Dex Gem finds
          hidden gems early, giving you a strategic edge in capturing investment
          opportunities ahead of the curve.
        </div>
      </div>
      <div className={classes.swiperContent}>
        <div className={classes.liveContent}>
          <div className={classes.liveTop}>
            <div className={classes.live}>Live</div>
            Real time result
          </div>
          <div className={classes.catTitle}>Number of categories</div>
          <div className={`${classes.catVal} ${classes.catVal2}`}>16</div>
          <div className={classes.catTitle}>PREDICTION ACCURACY</div>
          <div className={classes.catVal}>
            <img src="/assets/images/accuracy.png" alt="accuracy" />
            89%
          </div>
        </div>
        <div className={classes.swiperOut}>
          <SwiperCommon
            slidesPerview={6}
            spaceBetween={25}
            slidesPerGroup={6}
            pagination={false}
            breakpoints={breakpoints}
            dotPosition={"top"}
            arrows={false}
            normalArrows={true}
            onActiveIndexChange={handleSlideChange}
            mousewheel={true}
            sensitivity={1.5}
          >
            {gemArray &&
              gemArray.length > 0 &&
              gemArray.map((item: any, index: number) => (
                <SwiperSlide key={index}>
                  <div key={index} className={classes.cardOuter}>
                    <DexGemCard
                      publishedOn={item?.published_at}
                      growth={Number(item?.growth)}
                      thumbNail={item.thumbnail}
                      name={item.name}
                      theme="big"
                    />
                  </div>
                </SwiperSlide>
              ))}
          </SwiperCommon>
        </div>
      </div>
    </div>
  );
};

export default GemText;
