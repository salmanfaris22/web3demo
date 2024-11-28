import React from "react";
import TradeCardsRow, { CardDataProps } from "../../TradeCardRows/TradeCardsRow";
import SwiperAuto from "../../../../common/Components/SwiperAuto/SwiperAuto";
import { SwiperSlide } from "swiper/react";
import styles from "./Activecards.module.scss"; // Import CSS module

const ActiveCards = ({ data }: { data: CardDataProps[] }) => {
  console.log(data, "datas");

  return (
    <>
      {data && <h4 className={styles.activeHeading}>Active smart card</h4>}
      {data && (
        <div className={styles.smartCard}>
          {data.length > 0 && (
            <div className={styles.slickWrapper}>
              <SwiperAuto >
                {[...data].map((smartCard, index) => (
                  <SwiperSlide key={index}>
                    <div className={styles.slide}>
                      <div className={styles.signalCard}>
                        <TradeCardsRow
                          index={index}
                          viewDetails={() => {}}
                          add={() => {}}
                          tradeBtn={() => {}}
                          isMobileView={false}
                          isUser={true}
                          data={smartCard}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </SwiperAuto>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ActiveCards;
