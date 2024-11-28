import { useEffect, useState } from "react";
import SwiperCommon from "../../../common/Components/Slider/Slider";
import classes from "./AiText.module.scss";
import { SwiperSlide } from "swiper/react";
import DexGemCard from "../../../common/Components/DexGemCard/DexGemCard";
import { getExploreProjects } from "../../../services/projects";
import { showToast } from "../../../store/toastSlice";
import { useDispatch } from "react-redux";

export const breakpoints: any = {
  300: {
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
  },
};

const AiText = () => {
  const dispatch = useDispatch();
  const [gemArray, setGemArray] = useState<any>([]);

  const handleSlideChange = (slideIndex: any) => {
    const currentIndex = slideIndex;
  };
  return (
    <div className={classes.gemWrap}>
      <div className={classes.aiTitle}>
        <div className={classes.aiSmall}>With more than</div>
        <div className={classes.percent}>86%</div>
        <div className={classes.accu}>Accuracy</div>
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
        <div className={classes.cardWrapper}>
          <div className={classes.cardOut}>
            <img src="/assets/images/trade/cards1/card1.png" alt="card" />
          </div>
          <div className={classes.cardOut}>
            <img src="/assets/images/trade/cards1/card2.png" alt="card" />
          </div>
          <div className={classes.cardOut}>
            <img src="/assets/images/trade/cards1/card3.png" alt="card" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiText;
