import React, { useEffect } from "react";
import styles from "./CryptoNews.module.scss";
import BannerNews from "./BannerNews/BannerNews";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import Seperator from "../../common/Components/Seperator/Seperator";
import SelectedNews from "./SelectedNews/SelectedNews";
import FeaturedNews from "./FeaturedNews/FeaturedNews";
import ScrollToTop from "../../common/Components/ScrollToTop/ScrollToTop";
import { getCrtyptoNews } from "../../services/cryptonews";
import useApi from "../../hooks/useAPI";
import MaxScreen from "../../common/Layout/MaxScreen/MaxScreen";

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url: string;
  published_at: string;
  time_ago: string;
  published_by: string;
  source_url: string;
}

export interface NewsResponse {
  "by_crypto-potato": NewsItem[];
  "by_news-today": NewsItem[];
  todays_news: NewsItem[];
}

const CryptoNews = () => {
  const { data, executeApi, loading, error } = useApi<{ data: NewsResponse }>(
    getCrtyptoNews
  );
  const newsData = data?.data;
  const news_today = data?.data["by_crypto-potato"];

  useEffect(() => {
    executeApi();
  }, []);

  return (
    <PageWrapper>
      <MaxScreen>
        <ScrollToTop />
        <div className={styles.container}>
          <BannerNews
            isLoading={loading}
            latestNews={newsData?.todays_news || []}
            bannerNews={newsData?.["by_news-today"]?.[0] || null}
          />
          <Seperator className={styles.seperator} />

          <SelectedNews
            isLoading={loading}
            error={Boolean(error)}
            onReload={() => {
              executeApi();
            }}
            selelectedNews={news_today || []}
          />
          <Seperator />
          <FeaturedNews />
        </div>
      </MaxScreen>
    </PageWrapper>
  );
};

export default CryptoNews;
