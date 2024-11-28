import React, { useState } from "react";
import "swiper/css"; // basic Swiper styles
import "swiper/css/pagination";
import styles from "./HighlightWrapper.module.scss"; // Import the CSS Module
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import Toggle from "../../../common/Components/Toggle/Toggle";
import { getImageWithBaseUrl } from "../../../utils/commonutils";
SwiperCore.use([Autoplay, Pagination]);

export interface GainData {
  market: string;
  total_pip?: number;
  total_percentage?: number;
}

export interface HCardData {
  active_card: number;
  today_card: number;
  win_card: number;
  total_card: number;
  expired_card?: number;
}

export interface HDexCardData {
  active_projects_count: number;
  todays_projects_count: number;
  total_projects_count: number;
  winning_projects_count: number;
}

interface HighlightWrapperProps {
  cardName: string;
  data?: HCardData;
  topGainData?: GainData[];
  topComments: any[];
  watchList?: any;
  isForex: boolean;
  isHighlight: boolean;
  onToggleHighLight: () => void;
  type?: "card" | "project";
  dexTopGain?: DexTopGain[];
  showWatchList?: boolean;
}

export interface DexTopGain {
  ID: number;
  CreatedAt: string; // Consider using Date if you plan to parse this string into a date object
  UpdatedAt: string;
  DeletedAt?: string | null; // Nullable type
  Name: string;
  Thumbnail: string;
  project_status: "Active" | "Inactive" | "Completed"; // Enum type (assuming possible statuses)
  Heading: string;
  Description: string;
  ProjectLink: string;
  CategoryId: number;
  Banner: string;
  HashTag: string;
  Token: string;
  AdminId: number;
  Risk?: string;
  MarketId: number;
  Growth: number;
  InitialPrice: number;
  IsSuggested: boolean;
  WebsiteLink?: string;
}

const HeightLightCards: React.FC<HighlightWrapperProps> = ({
  cardName,
  data,
  topGainData,
  topComments,
  isForex,
  isHighlight,
  type = "card",
  onToggleHighLight,
  dexTopGain,
  showWatchList,
  watchList,
}: HighlightWrapperProps) => {
  const labelType = type === "card" ? "Cards" : "Projects";

  return (
    <div className={styles.highlightWrapper}>
      <div className={styles.toggleWrapper}>
        <div className={styles.toggle}>
          <span className={styles.spotHighlightLabel}>Highlights</span>
          <div className={`${styles.formCheck} ${styles.formSwitch}`}>
            <Toggle
              value={isHighlight}
              onToggleChange={(e) => {
                console.log(e);
                onToggleHighLight();
              }}
              toggleSwitch={(e) => {}}
            />
          </div>
        </div>
      </div>

      {isHighlight && (
        <div className={styles.highlightCardsWrapper}>
          {/* Card 1: Smart Card Info */}
          <div className={`${styles.highlightCard} ${styles.infoCard}`}>
            <div className={styles.title}>
              {cardName ? cardName : "Smart Card"} Info
            </div>
            <div className={styles.eachValue}>
              <div className={styles.name}>Active {labelType}</div>
              <div className={styles.value}>
                {data?.active_card?.toFixed(2) || "0.00"}
              </div>
            </div>
            <div className={styles.eachValue}>
              <div className={styles.name}>Today's {labelType}</div>
              <div className={styles.value}>
                {data?.today_card?.toFixed(2) || "0.00"}
              </div>
            </div>
            <div className={styles.eachValue}>
              <div className={styles.name}>Win {labelType}</div>
              <div className={styles.value}>
                {data?.win_card?.toFixed(2) || "0.00"}
              </div>
            </div>
            {data?.expired_card && (
              <div className={styles.eachValue}>
                <div className={styles.name}>Expired</div>
                <div className={styles.value}>
                  {data?.expired_card?.toFixed(2) || "0.00"}
                </div>
              </div>
            )}
            <div className={styles.eachValue}>
              <div className={styles.name}>Total {labelType}</div>
              <div className={styles.value}>
                {data?.total_card?.toFixed(2) || "0.00"}
              </div>
            </div>
          </div>

          {/* Card 2: Top Gainer */}
          {type === "project" && (
            <div className={`${styles.highlightCard} ${styles.topGainerCard}`}>
              <div className={styles.title}>
                <div className={styles.fire}>
                  <img src="/assets/images/signal_cards/fire.png" alt="fire" />
                </div>
                Top Gainer
              </div>
              {dexTopGain?.map((gainData, i) => (
                <div className={styles.eachValue} key={i}>
                  <div className={styles.name}>
                    {i + 1}.
                    <img
                      className={styles.icon}
                      src="/assets/images/signal_cards/fire.png"
                      alt="fire"
                    />
                    {gainData.Name}
                  </div>
                  <div className={styles.value}>
                    {`${Number(gainData.Growth)}X`}

                    <div className={styles.arrow}>
                      <img
                        src="/assets/images/signal_cards/uparrow.png"
                        alt="up-arrow"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {type === "card" && (
            <div className={`${styles.highlightCard} ${styles.topGainerCard}`}>
              <div className={styles.title}>
                <div className={styles.fire}>
                  <img src="/assets/images/signal_cards/fire.png" alt="fire" />
                </div>
                Top Gainer
              </div>
              {topGainData?.map((gainData, i) => (
                <div className={styles.eachValue} key={i}>
                  <div className={styles.name}>
                    {i + 1}.
                    <img
                      className={styles.icon}
                      src="/assets/images/signal_cards/fire.png"
                      alt="fire"
                    />
                    {gainData.market}
                  </div>
                  <div className={styles.value}>
                    {isForex ? (
                      <>
                        {Number(gainData.total_pip)?.toFixed(2) || "0.00"}
                        <span>
                          {gainData.total_pip && gainData.total_pip > 1
                            ? "PIPS"
                            : "PIP"}
                        </span>
                      </>
                    ) : (
                      `${
                        Number(gainData.total_percentage)?.toFixed(2) || "0.00"
                      }%`
                    )}
                    <div className={styles.arrow}>
                      <img
                        src="/assets/images/signal_cards/uparrow.png"
                        alt="up-arrow"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Card 3: Top Community Post */}
          {!showWatchList && (
            <div
              className={`${styles.highlightCard} ${styles.topCommunityPost}`}
            >
              {topComments.length > 0 ? (
                <div className={styles.col12}>
                  <Swiper
                    className="autoSwiper"
                    spaceBetween={2}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                      // delay: 3500,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    speed={1600}
                    pagination={{
                      clickable: true,
                      bulletActiveClass: styles.swiperPaginationBulletActive, // Custom bullet class
                      bulletClass: styles.swiperPaginationBullet,
                      modifierClass: styles.swiperMod,
                    }}
                    style={{ width: "100%", height: "auto" }}
                  >
                    {topComments.map((comment, index) => (
                      <SwiperSlide>
                        <div key={index} className={styles.tenxComment}>
                          <div className={styles.tenxCommentHead}>
                            <div className={styles.w20}>
                              <img
                                src="/assets/images/signal_cards/user-star.png"
                                alt="star"
                              />
                            </div>
                            <p>Top Community Post</p>
                          </div>

                          <div className={styles.tenxCommentContent}>
                            <div className={styles.w20}>
                              <img
                                className={styles.tenxCommentImage}
                                src={
                                  comment.profile_pic
                                    ? comment.profile_pic
                                    : "/assets/images/signal_cards/profile_img.jpg"
                                }
                                alt="profile"
                              />
                            </div>

                            <div className={styles.tenxCommentDetails}>
                              <div className={styles.proName}>
                                <p className={styles.name}>
                                  {comment.user_name}
                                </p>
                                <img
                                  src="/assets/images/signal_cards/verified-tick.png"
                                  alt="verified"
                                />
                              </div>

                              <div className={styles.tenxCommentData}>
                                {comment.comment}
                              </div>

                              <div className={styles.tenxCommentStats}>
                                <div
                                  className={`${styles.tenxCommentDate} ${styles.tenxCommentItem}`}
                                >
                                  {new Date(comment.created_at).toLocaleString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </div>

                                <div className={styles.seperator}></div>

                                <div
                                  className={`${styles.tenxCommentLike} ${styles.tenxCommentItem}`}
                                >
                                  <img
                                    src="/assets/images/signal_cards/like.png"
                                    alt="like"
                                  />
                                  <p>{comment.total_like}</p>
                                </div>

                                <div className={styles.seperator}></div>

                                <div
                                  className={`${styles.tenxCommentCom} ${styles.tenxCommentItem}`}
                                >
                                  <img
                                    src="/assets/images/signal_cards/comm.png"
                                    alt="comment"
                                  />
                                  <p>{comment.total_comment}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <div className={styles.noData}>
                  <div className={styles.tenxCommentHead}>
                    <div className={styles.w20}>
                      <img
                        src="/assets/images/signal_cards/user-star.png"
                        alt="star"
                      />
                    </div>
                    <p>Top Community Post</p>
                  </div>
                  <div>No Post Available</div>
                </div>
              )}
            </div>
          )}

          {/* Card 4: watch list */}
          {showWatchList && (
            <div className={`${styles.highlightCard} ${styles.infoCard}`}>
              <div className={styles.title}>
                <img
                  className={styles.book}
                  src="/assets/images/header/bookmark.png"
                  alt="watchlist"
                />
                My watch list
              </div>
              <div className={styles.eachValue}>
                <div className={styles.name}>Active {labelType}</div>
                <div className={styles.value}>
                  {watchList?.activeCount?.toFixed(2) || "0.00"}
                </div>
              </div>
              <div className={styles.eachValue}>
                <div className={styles.name}>Today's {labelType}</div>
                <div className={styles.value}>
                  {watchList?.todayCount?.toFixed(2) || "0.00"}
                </div>
              </div>
              <div className={styles.eachValue}>
                <div className={styles.name}>Win {labelType}</div>
                <div className={styles.value}>
                  {watchList?.winCount?.toFixed(2) || "0.00"}
                </div>
              </div>

              <div className={styles.eachValue}>
                <div className={styles.name}>Total {labelType}</div>
                <div className={styles.value}>
                  {watchList?.total?.toFixed(2) || "0.00"}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeightLightCards;
