import { useEffect } from "react";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import ScrollToTop from "../../common/Components/ScrollToTop/ScrollToTop";
import Seperator from "../../common/Components/Seperator/Seperator";
import MaxScreen from "../../common/Layout/MaxScreen/MaxScreen";
import useApi from "../../hooks/useAPI";
import { getForexNews } from "../../services/cryptonews";
import BannerNews from "./BannerNews/BannerNews";
import styles from "./CryptoNews.module.scss";
import FeaturedNews from "./FeaturedNews/FeaturedNews";
import SelectedNews from "./SelectedNews/SelectedNews";

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url: string;
  published_at: string;
  time_ago: string;
  published_by: string;
  source_url?: string;
}

export interface NewsResponse {
  "by_forex-news-source": NewsItem[];
  by_news_today: NewsItem[];
  todays_forex_news: NewsItem[];
}

const CryptoNews = () => {
  const { data, executeApi, loading, error } = useApi<{ data: NewsResponse }>(
    getForexNews
  );
  const newsData = data?.data;
  const news_today = data?.data["by_forex-news-source"];

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
            latestNews={newsData?.todays_forex_news || []}
            bannerNews={newsData?.["by_news_today"]?.[0] || null}
          />
          <Seperator className={styles.seperator} />

          <SelectedNews
            onReload={() => {
              executeApi();
            }}
            isLoading={loading}
            selelectedNews={news_today || []}
            error={Boolean(error)}
          />
          <Seperator />
          <FeaturedNews />
        </div>
      </MaxScreen>
    </PageWrapper>
  );
};

export default CryptoNews;
