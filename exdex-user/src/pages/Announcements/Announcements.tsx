import { useEffect, useRef, useState } from "react";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import MaxScreen from "../../common/Layout/MaxScreen/MaxScreen";
import InfiniteLoader from "../../common/UI/InfiniteLoader/InfiniteLoader";
import FadeComponent from "../../common/UI/Loader/Loader";
import useApi from "../../hooks/useAPI";
import { useVisibility } from "../../hooks/useVtScroll";
import {
  getAllAnnouncements,
  IGetAllAnnouncementParam,
} from "../../services/announcements";
import { splitArrayIntoCustomPattern } from "../../utils/commonutils";
import styles from "./Announcements.module.scss";
import FirstRow from "./FirstRow/FirstRow";
import SecondRow from "./SecondRow/SecondRow";

interface Category {
  id: number;
  name: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface Announcement {
  id: number;
  name: string;
  status: "active" | "inactive"; // Use union type for status
  heading: string;
  description: string;
  thumbnail_url: string;
  banner_url: string;
  hashtags: string[] | null; // Optional array of strings
  category_id: number;
  Category: Category; // Nested object for category
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

interface AnnouncementsResponse {
  announcements: Announcement[];
  total: number;
  page: number;
  page_size: number;
}

const Announcements = () => {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    page_size: 30,
    isFetchMore: false,
  });

  const [cardData, setCardData] = useState<Announcement[]>([]);

  const {
    data,
    error,
    loading,
    executeApi: getAnnouncements,
  } = useApi<{ data: AnnouncementsResponse }, IGetAllAnnouncementParam>(
    getAllAnnouncements,
    {
      keepBeforeRefresh: true,
      onComplete: (r, fetchMore) => {
        const list =
          fetchMore === "fetchMore"
            ? cardData.concat(r.data.announcements)
            : r.data.announcements;
        setCardData(list);
      },
    }
  );

  const formattedData = splitArrayIntoCustomPattern(cardData || []);

  useEffect(() => {
    getAnnouncements(
      {
        page: pageConfig?.page,
        page_size: pageConfig.page_size,
      },
      pageConfig.isFetchMore ? "fetchMore" : ""
    );
  }, [...Object.values(pageConfig)]);

  const lazyContainerRef = useRef<HTMLDivElement>(null);
  const isVisible = useVisibility(lazyContainerRef);

  useEffect(() => {
    if (isVisible) {
      if (formattedData?.length > 0 && !loading) {
        console.log(
          data?.data.total || 0,
          pageConfig.page * pageConfig.page_size,
          "abc",
          data?.data.total || 0 > pageConfig.page * pageConfig.page_size
        );
        if ((data?.data.total || 0) > pageConfig.page * pageConfig.page_size) {
          setPageConfig({
            ...pageConfig,
            page: pageConfig.page + 1,
            isFetchMore: true,
          });
        }
      }
    }
  }, [isVisible]);

  return (
    <>
      <MaxScreen>
        <PageWrapper>
          <div className={`${styles.container} `}>
            <h1 className={styles.mainTitle}>Company Announcements</h1>
            {loading && (!formattedData || formattedData.length === 0) && (
              <div style={{ height: "100vh" }}>
                <FadeComponent />
              </div>
            )}
            {formattedData?.map((f, index) => {
              return index % 2 === 0 ? (
                <div className={styles.announcementsRow}>
                  {" "}
                  <FirstRow data={f} />{" "}
                </div>
              ) : (
                <div className={styles.announcementsRow}>
                  {" "}
                  <SecondRow data={f} />{" "}
                </div>
              );
            })}
          </div>
          {loading && formattedData.length > 0 && <InfiniteLoader />}
          <div ref={lazyContainerRef} className={styles.scrollEnd}></div>
        </PageWrapper>
      </MaxScreen>
      <div className="gradientBgFixed"></div>
    </>
  );
};

export default Announcements;
