import PageWrapper from "../../../common/Components/PageWrapper/PageWrapper";
import ReadMore from "../../../common/Components/ReadMore/ReadMore";
import styles from "./BlogBanner.module.scss";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useRef, useState } from "react";
import { Blog } from "../BlogsListing";
import HTMLParser from "../../../common/Components/HTMLParser/HTMLParser";
import { convertISOToLongDateFormat } from "../../../utils/date";
import { useNavigate } from "react-router-dom";
import { goToIdPage } from "../../../utils/commonutils";
import { routers } from "../../../common/Constants";
SwiperCore.use([Autoplay, Pagination]);

const BlogBanner = ({
  bannerData,
  isLoading,
}: {
  bannerData: Blog[];
  isLoading: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleSlideChange = (swiper: any) => {
    console.log(swiper);
    setCurrentPage(swiper.realIndex);
  };

  const handlePageCountClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index); // Navigate to the clicked slide
      setCurrentPage(index); // Update the current page state
    }
  };

  const nav = useNavigate();

  return (
    <PageWrapper className={styles.bannerContainer}>
      {isLoading && (
        <div
          style={{ opacity: 0.3 }}
          className={`${styles.blogBanner} skeleton`}
        ></div>
      )}
      {!isLoading && bannerData.length > 0 && (
        <Swiper
          onSwiper={(swiper: any) => (swiperRef.current = swiper)}
          slidesPerView={1}
          loop={true}
          autoplay={{
            // delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSlideChange={handleSlideChange}
          speed={1200}
        >
          {bannerData.map((bdata) => {
            return (
              <SwiperSlide>
                <div
                  className={styles.blogBanner}
                  style={{
                    backgroundImage: `url(${bdata?.banner_url})`,
                  }}
                  onClick={() => {
                    nav(goToIdPage(routers.blogDetails, String(bdata.id)));
                  }}
                >
                  <div className={styles.blogOverlay}>
                    <h1>{HTMLParser(bdata?.name)}</h1>
                    <span className={styles.date}>
                      {convertISOToLongDateFormat(bdata?.created_at)}
                    </span>
                    <p>{HTMLParser(bdata?.description)}</p>
                    <div className={styles.readMore}>
                      <ReadMore />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      {bannerData.length > 0 && (
        <div className={styles.swiperPaginate}>
          {Array.from({ length: bannerData.length }).map((_, index) => {
            return (
              <div
                onClick={() => handlePageCountClick(index)}
                key={index}
                className={`${styles.pageCount} ${
                  index === currentPage ? styles.active : ""
                }`}
              >
                {index + 1}
                <div className={styles.activeLine}></div>
              </div>
            );
          })}
        </div>
      )}
    </PageWrapper>
  );
};

export default BlogBanner;
