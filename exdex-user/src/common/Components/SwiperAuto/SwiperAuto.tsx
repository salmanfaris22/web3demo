import { ReactNode } from "react";

import "swiper/css"; // basic Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination"; // pagination styles
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import styles from "./SwiperAuto.module.scss";

const SwiperAuto = ({ children }: { children: ReactNode }) => {
  return (
    <Swiper
    className={"cardSwiper autoSwiper"}
      navigation
      spaceBetween={0}
      slidesPerView={1}
      modules={[Navigation]}
      loop={false}
      speed={300}

      pagination={{
        clickable: true,
        bulletActiveClass: styles.swiperPaginationBulletActive, // Custom bullet class
        bulletClass: styles.swiperPaginationBullet,
        modifierClass: styles.swiperMod,
       
      }}
      style={{ width: "100%", height: "auto" }}
    >
      {children}
    </Swiper>
  );
};

export default SwiperAuto;
