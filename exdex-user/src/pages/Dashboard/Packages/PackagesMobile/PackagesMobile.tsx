import React from "react";
import styles from "./PackagesMobile.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import CardWrapper from "../InfoCards/CardWrapper";
import DataValues from "../InfoCards/DataValues";
import GaugeChart from "../../../../common/Components/GaugeChartt/GaugeChart";
import PackageDetails from "../InfoCards/PackageDetails/PackageDetails";
import History from "../../MyPackages/pages/History/History";
import Button from "../../../../common/Components/Button/Button";
import CloseIcon from "../../../../common/Components/Icons/CloseIcon";

const PackagesMobile = ({
  header,
  onClose,
}: {
  header: string;
  onClose: () => void;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.closeIcon}>
          <Button theme="icon" onClick={onClose}>
            <CloseIcon />
          </Button>
        </div>
        <div className={styles.header}>{header}</div>
        <div>
          <Swiper
            breakpoints={{
              200: {
                slidesPerView: 2.3,
                spaceBetween: 20, // Show 1.5 slides under 890px width
              },
              768: {
                slidesPerView: 3.3,
                spaceBetween: 20,
              },
              1000: {
                slidesPerView: 5.3,
                spaceBetween: 25,
              },
            }}
            modules={[Navigation]}
            loop={false}
            // pagination={{
            //   clickable : true,
            // }}
          >
            <SwiperSlide>
              <CardWrapper title="NFT Price" data={[10, 20, 80]}>
                <div className={styles.dataValueWrapper}>
                  <DataValues theme="red" value="99$" label="Lowest" />
                  <DataValues theme="lightGreen" value="99$" label="Current" />
                  <DataValues value="99$" theme="neon" label="Highest" />
                </div>
              </CardWrapper>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.infoCardContainer}>
                <CardWrapper title="Popularity">
                  <GaugeChart value={3} maxValue={6} />
                </CardWrapper>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.infoCardContainer}>
                <CardWrapper title="Daily Passive income" data={[10, 20, 80]}>
                  <div className={styles.dataValueWrapper}>
                    <DataValues theme="red" value="$1.75" label="Lowest" />
                    <DataValues
                      theme="lightGreen"
                      value="2.5$"
                      label="Average"
                    />
                    <DataValues theme="neon" value="99$" label="Highest" />
                  </div>
                </CardWrapper>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.infoCardContainer}>
                <CardWrapper title="Weekly Passive income" data={[10, 20, 80]}>
                  <div className={styles.dataValueWrapper}>
                    <DataValues theme="red" value="$1.75" label="Lowest" />
                    <DataValues
                      theme="lightGreen"
                      value="2.5$"
                      label="Average"
                    />
                    <DataValues theme="neon" value="99$" label="Highest" />
                  </div>
                </CardWrapper>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.infoCardContainer}>
                <CardWrapper title="Monthly Passive income" data={[10, 20, 80]}>
                  <div className={styles.dataValueWrapper}>
                    <DataValues theme="red" value="$1.75" label="Lowest" />
                    <DataValues
                      theme="lightGreen"
                      value="2.5$"
                      label="Average"
                    />
                    <DataValues theme="neon" value="99$" label="Highest" />
                  </div>
                </CardWrapper>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className={styles.packageDetailWrap}>
          <PackageDetails />
        </div>
        <div className={styles.historyWrapper}>
          <History overviewPage />
        </div>
      </div>
    </div>
  );
};

export default PackagesMobile;
