import { useEffect, useState } from "react";
import Pagination from "../../../common/Components/Pagination/Pagination";
import DataError from "../../../common/UI/DataError/DataError";
import NoDataFound from "../../../common/UI/NoDataFound/NoDataFound";
import useApi from "../../../hooks/useAPI";
import { getFeaturedForexNews } from "../../../services/cryptonews";
import { getPageDetails } from "../../../utils/commonutils";
import { NewsItem } from "../CryptoNews";
import MainSectionTitle from "../MainSectionTitle/MainSectionTitle";
import styles from "./FeaturedNews.module.scss";
import FeaturedNewsCardLoader from "./FeaturedNewsCard/FeaturedLoader";
import FeaturedNewsCard from "./FeaturedNewsCard/FeaturedNewsCard";

const FeaturedNews = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const { executeApi, data, loading , error } = useApi<
    { data: { items: NewsItem[]; total_items: number } },
    any
  >(getFeaturedForexNews);

  useEffect(() => {
    executeApi({ page, pageSize });
  }, [page]);

  const latestNews = data?.data?.items;

  const { page: calcPage, pageCount: calcPageCount } = getPageDetails(
    data?.data.total_items || 0,
    Number(pageSize),
    Number(page)
  );

  return (
    <div className={styles.container}>
      <div className={styles.title} >
      <MainSectionTitle  id="CryptoFeature" title="Featured News"/>
      </div>
      <div className={styles.newsWrapper}>
      {loading &&
          Array.from({ length: 8 }).map((_, index) => {
            return (
              <div className={styles.newsContainer}>
                <FeaturedNewsCardLoader />
              </div>
            );
          })}
        {!loading && Boolean(error) && (
          <DataError
            title="Something went wrong"
            btnLabel="Reload featured news"
            btnProps={{
              onClick: () => {
                executeApi({ page, pageSize });
              },
            }}
          />
        )}

        {!loading && !Boolean(error) &&  latestNews?.length === 0 && <NoDataFound title="Sorry no featured news found" /> }

        {!loading &&
          latestNews?.map((x) => {
            return (
              <div className={styles.newsContainer} key={x.title}>
                <FeaturedNewsCard news={{ ...x }} />
              </div>
            );
          })}
        {!loading &&
          latestNews?.map((x) => {
            return (
              <div className={styles.newsContainer} key={x.title}>
                <FeaturedNewsCard news={{ ...x }} />
              </div>
            );
          })}
      </div>
      {latestNews && latestNews?.length > 0 && <Pagination
        containerClassName="CustomPaginationSimple"
        pageCount={calcPageCount}
        initialPage={calcPage}
        onPageChange={(e) => {
          console.log(e);
          setPage(e.selected + 1);
          // scrollToElementWithMargin("CryptoFeature");
        }}
      />}
    </div>
  );
};

export default FeaturedNews;
