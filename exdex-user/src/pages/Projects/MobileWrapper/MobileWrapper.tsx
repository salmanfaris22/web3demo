import React, { ReactNode } from "react";
import styles from "./MobileWrapper.module.scss";
import { Swiper, SwiperClass } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css"; 
import "swiper/css/navigation";
import "swiper/css/pagination";

const MobileWrapper = ({ children  ,  onSliderChange}: { children: ReactNode , onSliderChange?:(data : SwiperClass)=>void}) => {
  return (
    <div className={styles.mobileWrapper}>
      <Swiper
        
        className={"cardSwiper"}
        navigation
        onSlideChange={(s:SwiperClass)=>onSliderChange && onSliderChange(s)}
        breakpoints={{
          
          200: {
            slidesPerView: 1.3,
            spaceBetween: 20 // Show 1.5 slides under 890px width
          },
          768 : {
            slidesPerView:3.3,
            spaceBetween: 20
          },
          1000 :{
            slidesPerView : 5.3,
            spaceBetween: 25
          }
        }}
        modules={[Navigation]}
        loop={false}
        // pagination={{
        //   clickable : true,
        // }}

      >
        {children}
      </Swiper>
    </div>
  );
};

export default MobileWrapper;
