import { ReactNode, useEffect, useRef, useState } from "react";
import useApi from "../../../hooks/useAPI";
import useToast from "../../../hooks/useToast";
import {
  getActiveCard,
  getAppreciateDetails,
  getAppreciates,
  getSimilarMarket,
  getTradeView,
  IActiveCardParams,
  ISimilarMarketProps,
  IUpdateAppreciate,
  IUpdateRatingParams,
  updateAppreciation,
  updateRatings,
} from "../../../services/exdexCards";
import SimilarTechnicalAnalysis, {
  ISimilarTechData,
} from "../SimilarTechAnalysis/SimilarTechAnalysis";
import { CardDataProps } from "../TradeCardRows/TradeCardsRow";
import ActiveCards from "./ActiveCards/ActiveCards";
import styles from "./AISignalDetails.module.scss";
import ChartDetails, { TradeChartDetails } from "./ChartDetails/ChartDetails";
import Appreciate, {
  AppreciateProps,
} from "./ChartDetails/CommentsSection/Appreciate/Appriciate";
import CommentsSection from "./ChartDetails/CommentsSection/CommentsSection";
import PostComments from "./ChartDetails/PostComments/PostComments";
import RatingAndReview from "./RatingAndReview/RatingAndReview";

const DETAILS = "DETAILS"
export interface IAppreciationData {
  appreciate_count: number;
  comment_count: number;
  published_at: string; // You could change this to Date if you plan to convert the string to a Date object
  user_appreciated: boolean;
  user_viewed: boolean;
  users_rating: number;
  view_count: number;
}

const AISignalDetails = ({
  cardInfo,
  onCloseDetail,
}: {
  cardInfo: Pick<CardDataProps, "trading_view_id" | "market" | "card_type">;
  onCloseDetail: () => void;
}) => {
  const [data, setData] =
    useState<Pick<CardDataProps, "trading_view_id" | "market" | "card_type">>(
      cardInfo
    );
    

  useEffect(() => {
    setData(cardInfo);
  }, [cardInfo]);

  const { triggerToast } = useToast();

  const { data: tradeChartData, executeApi: getTradeAPI } = useApi<
    { data: { trading_view_list: TradeChartDetails } },
    string
  >(getTradeView);
  const { data: activeCardData, executeApi: getActiveCardAPI } = useApi<
    { data: CardDataProps[] },
    IActiveCardParams
  >(getActiveCard);
  const { data: appreciationData, executeApi: getAppreciateDetailsAPI } =
    useApi<
      {
        data: IAppreciationData;
      },
      string
    >(getAppreciateDetails);
  const { executeApi: updateRatingsAPI, loading: ratingLoading } = useApi<
    any,
    IUpdateRatingParams
  >(updateRatings, {
    onComplete(result) {
      getAppreciateDetailsAPI(String(data?.trading_view_id));
    },
  });

  const { executeApi: getAppreciations, data: appreciateData } = useApi<
    AppreciateProps,
    number
  >(getAppreciates, { keepBeforeRefresh: true });

  const { executeApi: updateAppreciationAPI } = useApi<any, IUpdateAppreciate>(
    updateAppreciation,
    {
      onComplete: () => {
        getAppreciations(data?.trading_view_id);
      },
    }
  );

  const { executeApi: getSimilarMarketAPI, data: similarData } = useApi<
    { data: ISimilarTechData[] },
    ISimilarMarketProps
  >(getSimilarMarket, {});

  const commentRef = useRef<ReactNode>();

  useEffect(() => {
    if (data?.trading_view_id) {
      getTradeAPI(String(data?.trading_view_id));
      getAppreciateDetailsAPI(String(data?.trading_view_id));
      getActiveCardAPI({ coinPair: data?.market, marketType: data?.card_type });
      getAppreciations(data?.trading_view_id);
      getSimilarMarketAPI({
        marketType: data?.card_type,
        view_id: data?.trading_view_id,
        market: data?.market,
      });
    }
  }, [data]);

  console.log(similarData?.data);

  return (
    <div  className={styles.smartcardPopup} onScroll={() => {}}>
      <div>
      <button
        type="button"
        className={styles.detail_popup_close_btn}
        onClick={onCloseDetail}
      >
        <img
          decoding="async"
          loading="eager"
          src="/assets/images/signal_cards/close.png"
          alt="close"
        />
      </button>
      {/* <SwiperProgress targetElemId={DETAILS} /> */}
      </div>
 

      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} id="progressBar"></div>
      </div>

      <div className={styles.smartCardContainer} id="card-detail">
        <div className={styles.smartCard__contentWrapper}>
          {tradeChartData?.data.trading_view_list && (
            <ChartDetails data={tradeChartData?.data.trading_view_list} />
          )}
          {/* <app-fundamental-analysis data={fundamentalDetails} /> */}
          {/* <app-latest-posts-view data={cardDetails} /> */}

          {
            <div className={styles.smartCard__disclaimer}>
              <div className={styles.smartCard__disclaimer__content}>
                <div className={styles.smartCard__disclaimer__icon}>
                  <img
                    decoding="async"
                    loading="eager"
                    src="./assets/images/signal_cards/disclaimer.png"
                    className={styles.disclaimer__arrow}
                    alt="Disclaimer"
                  />
                  <h5>Disclaimer</h5>
                </div>
                <span>
                  The information and publications are not meant to be, and do
                  not constitute, financial, investment, trading, or other types
                  of advice or recommendations supplied or endorsed by
                  TradingView. Read more in the{" "}
                  <a
                    className={styles.terms}
                    onClick={(e) => e.preventDefault()}
                  >
                    Terms of Use.
                  </a>
                </span>
              </div>
            </div>
          }

          <div className={styles.mobilecards}>
            <ActiveCards data={activeCardData?.data || []} />
          </div>

          <div className={styles.smartCard__disclaimer__tradingBorder}>
            <RatingAndReview
              onUpdateRating={(n) => {
                triggerToast("Adding your rating", "info");
                updateRatingsAPI({
                  ratings: n,
                  trading_view_id: data?.trading_view_id,
                });
              }}
              users_rating={appreciationData?.data.users_rating || 0}
            />
            <PostComments
              onSaveComment={() => {
                if (commentRef.current) {
                  //@ts-ignore
                  commentRef.current.resetAndRefresh();
                }
              }}
              trade_view_id={data?.trading_view_id}
              onTabSwitch={(s) => {}}
            />
            <CommentsSection
              trade_view_id={data?.trading_view_id}
              ref={commentRef}
            />
            {
              <div className={styles.desktopCards}>
                <ActiveCards data={activeCardData?.data || []} />
              </div>
            }
            {appreciateData?.data && (
              <Appreciate
                data={appreciateData?.data}
                saveAppreciation={(appStatus) => {
                  updateAppreciationAPI({
                    appreciate_state: appStatus,
                    trading_view_id: data?.trading_view_id,
                  });
                }}
              />
            )}
          </div>

          <SimilarTechnicalAnalysis
            data={similarData?.data || []}
            onSimilarTechClicked={(smdata) => {
              setData({
                trading_view_id: smdata.ID,
                market: smdata.CoinPair,
                card_type: smdata.Market,
              });
            }}
          />
        </div>
      </div>

      {/* {showLoader && <h1>Custom loader showing...</h1>}
      {showLoader && (
        <div
          className={styles.spinner}
          style={{ zIndex: 999999999999, backgroundColor: "rgba(0,0,0,0.1)" }}
        >
          Spinner
        </div>
      )} */}
    </div>
  );
};

export default AISignalDetails;
