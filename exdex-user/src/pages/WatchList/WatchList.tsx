import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import LazyImage from "../../common/Components/LazyImage/LazyImage";
import Search from "../../common/Components/Search/Search";
import FadeComponent from "../../common/UI/Loader/Loader";
import useApi from "../../hooks/useAPI";
import { getWatchList } from "../../services/watchList";
import { selectDexPlanStatus } from "../../store/authSlice";
import DexPaymentTags from "../Projects/DexPaymentTags/DexPaymentTags";
import { Project } from "../Projects/Projects";
import SwiperSection from "./SwiperSections/SwiperSection";
import WatchCard from "./WatchCards/WatchCard";
import styles from "./WatchList.module.scss";
import { useNavigate } from "react-router-dom";

const WatchList = () => {
  const isDexPurchased = useSelector(selectDexPlanStatus);
  const navigate = useNavigate();
  const [rightCardData, setRightCardData] = useState<Project[]>([]);
  const [categories, setCategories] = useState([]);
  const [leftCardData, setLeftCardData] = useState<Project[]>([]);
  const scrollItems = 50;

  const ensureMinLength = (data: any) => {
    while (data.length < scrollItems && data.length >= 4) {
      data = [...data, ...data]; // Duplicate the array
    }
    return data.slice(0, scrollItems); // Limit to scrollItems length
  };

  const { data, executeApi, loading, error } = useApi<{
    data: {
      top_growth: Project[];
      category_data: {
        [key: string]: { category_id: number; projects: Project[] };
      };
    };
  }>(getWatchList, {
    onComplete: (d) => {
      if (d?.data?.top_growth) {
        const leftData = d?.data?.top_growth?.slice(1, 10);
        const rightData = d?.data?.top_growth?.slice(10, 20);
        setLeftCardData(leftData);
        setRightCardData(rightData);
      }
    },
  });

  useEffect(() => {
    if (isDexPurchased) {
      executeApi();
    }
  }, [isDexPurchased]);

  const bannerdata = data?.data?.top_growth[0];

  if (loading) {
    return (
      <div className={styles.loading}>
        <FadeComponent />
      </div>
    );
  }

  const goTo = (url: string) => {
    navigate(url);
  };

  return (
    <div className={styles.container}>
      {/* <Search type="tradesignal" placeholder="Search 10x Gem" /> */}
      {/* <MainTabs /> */}
      <div className={styles.innerContainer}>
        {isDexPurchased ? (
          <>
            {bannerdata && (
              <div
                className={styles.banner}
                onClick={() => {
                  console.log(bannerdata);
                  goTo(`/dexgem/${bannerdata.id}/${bannerdata.category_id}`);
                }}
              >
                <LazyImage
                  src={
                    "https://tenx-prod-123.s3.eu-west-2.amazonaws.com/" +
                    bannerdata.thumbnail
                  }
                />
                <div className={styles.title}>{bannerdata.name}</div>
                <div className={styles.subTitle}>{bannerdata.heading}</div>
              </div>
            )}

            <div className={styles.marq1}>
              {leftCardData.length > 0 && (
                <Marquee autoFill direction="right">
                  {leftCardData?.map((l) => {
                    return (
                      <WatchCard
                        key={l.id}
                        bg={l.thumbnail}
                        name={l.name}
                        clicked={() => {
                          goTo(`/dexgem/${l.id}/${l.category_id}`);
                        }}
                      />
                    );
                  })}
                </Marquee>
              )}
            </div>
            <div className={`${styles.marq2} ${styles.marq2Desktop}`}>
              {rightCardData.length > 0 &&
                rightCardData?.map((l) => {
                  return (
                    <WatchCard
                      key={l.id}
                      bg={l.thumbnail}
                      name={l.name}
                      clicked={() => {
                        goTo(`/dexgem/${l.id}/${l.category_id}`);
                      }}
                    />
                  );
                })}
            </div>
            <div className={`${styles.marq2} ${styles.marq2Mob}`}>
              {rightCardData.length > 0 && (
                <Marquee autoFill direction="right">
                  {rightCardData?.map((l) => {
                    return (
                      <WatchCard
                        key={l.id}
                        bg={l.thumbnail}
                        name={l.name}
                        clicked={() => {
                          goTo(`/dexgem/${l.id}/${l.category_id}`);
                        }}
                      />
                    );
                  })}
                </Marquee>
              )}
            </div>
            <div>
              {Object.keys(data?.data?.category_data || {}).map((category) => {
                return (
                  <div className={styles.sect} key={category}>
                    <SwiperSection
                      name={category}
                      data={data?.data?.category_data[category]?.projects || []}
                    />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <DexPaymentTags />
        )}
      </div>
    </div>
  );
};

export default WatchList;
