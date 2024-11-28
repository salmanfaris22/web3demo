import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./News.module.scss";
import { getForexNews, getNews } from "../../../../../services/overview";
import { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import { convertISOToLongDateFormat } from "../../../../../utils/date";
import SwiperCommon from "../../../../../common/Components/Slider/Slider";
import { Swiper, SwiperSlide } from "swiper/react";
import { halfSlierConfig } from "../../../../../common/Constants";

const News = () => {
  const [news, setNews] = useState([]);
  const [forexNews, setForexNews] = useState<any>([]);
  //loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewsMethod();
    getForexNewsMethod();
  }, []);

  const getNewsMethod = async () => {
    try {
      const response = await getNews();
      if (response.status) {
        setNews(response.data);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const getForexNewsMethod = async () => {
    try {
      const response = await getForexNews();
      if (response.status) {
        setForexNews(response.data);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const getForexNewsItems = (isMobile: boolean) => {
    if(!forexNews || !forexNews.length){
        return []
    }
    return forexNews.map((item: any, index: number) => {
      const NewsItem = (
        <div className={`${classes.newsBottom} `} key={index}>
          <div
            className={`${!isMobile && classes.deskTopSlider} ${
              classes.newsBottomItem
            }`}
            key={index}
            onClick={() => {
              redirect(item?.["news_url"]);
            }}
          >
            <div
              className={classes.image}
              style={{
                backgroundImage: `url(${item["image_url"]})`,
              }}
            ></div>
            <div className={classes.newsMidContent}>
              <div className={classes.newsDetails}>
                <div className={classes.newsDes}>{item["source"]}</div>
                <div className={classes.newsHead}>{item["title"]}</div>
              </div>
              <div className={classes.newsDes}>
                {convertISOToLongDateFormat(item["created_at"])}
              </div>
            </div>
          </div>
        </div>
      );
      return isMobile ? (
        <SwiperSlide key={item.image}>{NewsItem}</SwiperSlide>
      ) : (
        NewsItem
      );
    });
  };

  const redirect = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <>
      {!loading && (
        <PageAnimation>
          <div className={`fullHeightSwiper ${classes.binaryWrap}`}>
            <OverviewCard type="fullHeight">
              <div className={classes.binaryInner}>
                <div className={classes.head}>News</div>
                <div className={classes.newSection}>
                  {news && news.length > 0 && (
                    <div
                      className={`${classes.deskTopSlider} ${classes.newsTop}`}
                      onClick={() => {
                        redirect(news?.[0]?.["source_url"]);
                      }}
                    >
                      <div
                        className={classes.newsLeft}
                        style={{
                          backgroundImage: `url(${news?.[0]?.["image_url"]})`,
                        }}
                      ></div>
                      <div className={classes.newsRight}>
                        <div className={classes.newsDetails}>
                          <div className={classes.newsDes}>
                            {news?.[0]?.["source"]}
                          </div>
                          <div className={classes.newsHead}>
                            {news?.[0]?.["title"]}
                          </div>
                        </div>
                        <div className={classes.newsDes}>
                          {convertISOToLongDateFormat(
                            news?.[0]?.["created_at"]
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {news && news.length > 1 && (
                    <div
                      className={`${classes.deskTopSlider} ${classes.newsMiddle}`}
                      onClick={() => {
                        redirect(news?.[1]?.["source_url"]);
                      }}
                    >
                      {news[1] && (
                        <div className={classes.newsMidLeft}>
                          <div
                            className={classes.image}
                            style={{
                              backgroundImage: `url(${news[1]["image_url"]})`,
                            }}
                          ></div>
                          <div className={classes.newsMidContent}>
                            <div className={classes.newsDetails}>
                              <div className={classes.newsDes}>
                                {news[1]["source"]}
                              </div>
                              <div className={classes.newsHead}>
                                {news[1]["title"]}
                              </div>
                            </div>
                            <div className={classes.newsDes}>
                              {convertISOToLongDateFormat(
                                news[1]["created_at"]
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {news[2] && (
                        <div
                          className={classes.newsMidRight}
                          onClick={() => {
                            redirect(news?.[2]?.["source_url"]);
                          }}
                        >
                          <div
                            className={classes.image}
                            style={{
                              backgroundImage: `url(${news[2]["image_url"]})`,
                            }}
                          ></div>
                          <div className={classes.newsMidContent}>
                            <div className={classes.newsDetails}>
                              <div className={classes.newsDes}>
                                {news[2]["source"]}
                              </div>
                              <div className={classes.newsHead}>
                                {news[2]["title"]}
                              </div>
                            </div>
                            <div className={classes.newsDes}>
                              {convertISOToLongDateFormat(
                                news[2]["created_at"]
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className={`${classes.mobileSwiper}`}>
                    <Swiper {...halfSlierConfig}>
                      {news && news.length > 0 && (
                        <SwiperSlide>
                          <div
                            className={classes.newsTop}
                            onClick={() => {
                              redirect(news?.[0]?.["source_url"]);
                            }}
                          >
                            <div
                              className={classes.newsLeft}
                              style={{
                                backgroundImage: `url(${news?.[0]?.["image_url"]})`,
                              }}
                            ></div>
                            <div className={classes.newsRight}>
                              <div className={classes.newsDetails}>
                                <div className={classes.newsDes}>
                                  {news[0]["source"]}
                                </div>
                                <div className={classes.newsHead}>
                                  {news[0]["title"]}
                                </div>
                              </div>
                              <div className={classes.newsDes}>
                                {convertISOToLongDateFormat(
                                  news[0]["created_at"]
                                )}
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      )}
                      {news && news.length > 1 && (
                        <SwiperSlide>
                          <div
                            className={classes.newsMiddle}
                            onClick={() => {
                              redirect(news?.[1]?.["source_url"]);
                            }}
                          >
                            {news[1] && (
                              <div className={classes.newsMidLeft}>
                                <div
                                  className={classes.image}
                                  style={{
                                    backgroundImage: `url(${news?.[1]?.["image_url"]})`,
                                  }}
                                ></div>
                                <div className={classes.newsMidContent}>
                                  <div className={classes.newsDetails}>
                                    <div className={classes.newsDes}>
                                      {news[1]["source"]}
                                    </div>
                                    <div className={classes.newsHead}>
                                      {news[1]["title"]}
                                    </div>
                                  </div>
                                  <div className={classes.newsDes}>
                                    {convertISOToLongDateFormat(
                                      news[1]["created_at"]
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </SwiperSlide>
                      )}
                      {news && news.length > 2 && (
                        <SwiperSlide>
                          <div
                            className={classes.newsMiddle}
                            onClick={() => {
                              redirect(news?.[2]?.["source_url"]);
                            }}
                          >
                            {news[2] && (
                              <div className={classes.newsMidRight}>
                                <div
                                  className={classes.image}
                                  style={{
                                    backgroundImage: `url(${news[2]["image_url"]})`,
                                  }}
                                ></div>
                                <div className={classes.newsMidContent}>
                                  <div className={classes.newsDetails}>
                                    <div className={classes.newsDes}>
                                      {news[2]["source"]}
                                    </div>
                                    <div className={classes.newsHead}>
                                      {news[2]["title"]}
                                    </div>
                                  </div>
                                  <div className={classes.newsDes}>
                                    {convertISOToLongDateFormat(
                                      news[2]["created_at"]
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </SwiperSlide>
                      )}

                      {getForexNewsItems(true)}
                    </Swiper>
                  </div>

                  {forexNews && forexNews.length > 0 && (
                    <div className={classes.newsBottom}>
                      {getForexNewsItems(false)}
                    </div>
                  )}
                </div>
              </div>
            </OverviewCard>
          </div>
        </PageAnimation>
      )}
    </>
  );
};

export default News;
