import { useEffect, useState } from "react";
import useApi from "../../hooks/useAPI";
import {
  getSmartCardInfoDexGem,
  getTopComments,
  getTopGainerInfoDexGem,
} from "../../services/exdexCards";
import HeightLightCards, {
  DexTopGain,
  HDexCardData,
} from "../AISignals/HeighlightCards/HeightLightCards";
import DexPaymentTags from "./DexPaymentTags/DexPaymentTags";
import LatestProjects from "./LatestProjects/LatestProjects";
import MenuPage from "./MenuWrapper/MenuPage";
import OtherProjects from "./OtherProjects/OtherProjects";
import PopularProjects from "./PopularProjects/PopularProjects";
import styles from "./Projects.module.scss";
import TopProjects from "./TopProjects/TopProjects";
import { useSelector } from "react-redux";
import { selectDexPlanStatus } from "../../store/authSlice";

export interface Analytics {
  view_count: number;
  likes: number;
  dislike: number;
  users_rating: number;
  comment_count: number;
  user_viewed: boolean;
  user_like: number;
  published_at: string;
  watch_listed: boolean;
  watchlist_count: number;
  average: number;
}

export interface Project {
  id: number;
  admin_id: number;
  token: string;
  name: string;
  description: string;
  status: string;
  thumbnail: string;
  banner: string;
  category: string;
  project_link: string;
  hash_tag: string;
  risk: string;
  heading: string;
  category_id: number;
  project_following: boolean;
  price: number;
  growth: number;
  price_change: number;
  analytics: Analytics;
  base_currency_name: string;
  base_currency_image: string;
  market_id: number;
  is_suggested: boolean;
  website_link: string;
}

const Projects = () => {
  const [categoryId, setcategoryId] = useState(1);
  const [name, setName] = useState<string>();
  const isDexPurchased = useSelector(selectDexPlanStatus);
  //  const isDexPurchased  = true;

  const updateCategory = ({ id, name }: any) => {
    setcategoryId(id);
    setName(name);
  };

  const {
    data: smartCardData,
    executeApi,
    loading: smartCardLoading,
    error: smartCardsError,
  } = useApi<{ data: HDexCardData }, any>(getSmartCardInfoDexGem);

  const {
    data: topGainerData,
    executeApi: getTopGainerAPI,
    loading: topGainLoading,
  } = useApi<{ data: DexTopGain[] }, any>(getTopGainerInfoDexGem);

  const {
    data: topCommentData,
    executeApi: getTopCommentsAPI,
    loading: commentsLoading,
  } = useApi<{ data: any[] }, string>(getTopComments);

  const [isHighlight, setIsHighlight] = useState(true);

  useEffect(() => {
    if (categoryId) {
      executeApi(categoryId);
      getTopGainerAPI(categoryId);
    }
  }, [categoryId]);

  useEffect(() => {
    if (name) {
      getTopCommentsAPI(String(name));
    }
  }, [name]);

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <MenuPage onCategoryChange={updateCategory} />
        <div className={styles.hcardWrap}>
          <HeightLightCards
            showWatchList={false}
            cardName={name ? name : ""}
            type="project"
            data={{
              active_card: smartCardData?.data?.active_projects_count || 0,
              today_card: smartCardData?.data?.todays_projects_count || 0,
              win_card: smartCardData?.data?.winning_projects_count || 0,
              total_card: smartCardData?.data?.total_projects_count || 0,
            }}
            isForex={false}
            topComments={topCommentData?.data || []}
            dexTopGain={topGainerData?.data || []}
            isHighlight={isHighlight}
            onToggleHighLight={() => {
              setIsHighlight(!isHighlight);
            }}
          />
        </div>
        {!isDexPurchased && <DexPaymentTags />}
        {isDexPurchased && (
          <div className={styles.wrap}>
            <PopularProjects categoryId={categoryId} />
            <LatestProjects categoryId={categoryId} />
            <div className={styles.otherProjectWrap}>
              <OtherProjects categoryId={categoryId} />
            </div>
            <TopProjects categoryId={categoryId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
