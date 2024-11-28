import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import {
  TicketHelpTypes
} from "../../common/Constants";
import useApi from "../../hooks/useAPI";
import {
  getHelpCenterCategories,
  getPopularQns,
  getSubcategoryByCategory,
} from "../../services/helpcenter";
import { selectCategories, setCategories } from "../../store/helpCenterSlice";
import styles from "./HelpCenter.module.scss";
import HelpCenterHeader from "./HelpCenterHeader/HelpCenterHeader";
import PopularQuestions, {
  IQuestion,
} from "./PopularQuestions/PopularQuestions";
import SomethingElse from "./SomethingElse/SomethingElse";
import TicketCards, { TTicketCard } from "./TicketCards/TicketCards";

export const tickets: TTicketCard[] = [
  // { type: TicketTypes.SignalCard, count: 30 },
  // { type: TicketTypes.Metamask, count: 30 },
  // { type: TicketTypes.Affiliate, count: 0 },
  // { type: TicketTypes.BinanceSmarkChain, count: 30 },
  // { type: TicketTypes.TenCoins, count: 30 },
  // { type: TicketTypes.DepositAndWithDraw, count: 30 },
  // { type: TicketTypes.Swap, count: 30 },
  // { type: TicketTypes.Settings, count: 30 },
];

export const somethingElseMenu = Object.values(TicketHelpTypes).map((x) => {
  return { type: x };
});

export interface Subcategory {
  CreatedAt: string;
  DeletedAt: string | null;
  ID: number;
  UpdatedAt: string;
  category_id: string;
  logo_path: string;
  name: string;
  question_count: number;
  questions: IQuestion[] | null;
}

export interface Category {
  CreatedAt: string;
  DeletedAt: string | null;
  ID: number;
  UpdatedAt: string;
  card_type: number;
  name: string;
  subcategories: Subcategory[];
}

const HelpCenter = () => {
  const dispatch = useDispatch();
  const [generalCat, setGeneralCat] = useState<any>([]);
  const {
    executeApi,
    loading: categoryLoading,
    error: categoryError,
  } = useApi<{ data: Category[] }>(getHelpCenterCategories, {
    onComplete: (data) => {
      dispatch(setCategories(data.data));
    },
  });

  const {
    executeApi: getPopularQn,
    loading: questionsLoading,
    data: questionData,
    // error: categoryError,
  } = useApi<{
    data: {
      questions: IQuestion[];
    };
  }>(getPopularQns, {
    onComplete: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    executeApi();
    getPopularQn();
    getSomethingElse();
  }, []);

  const categoriesResponse: any = useSelector(selectCategories);
  const categories = categoriesResponse.subcategories
    ? categoriesResponse.subcategories
    : [];
  const popularQns = questionData?.data.questions;

  // const getCategory = (categoryKey: string): TTicketCard[] => {
  //   const subCategory =
  //     categories?.find((x: any) => x.name === categoryKey)?.subcategories || [];
  //   return subCategory.map((s: any) => ({
  //     name: s.name,
  //     count: s.question_count,
  //     id: s.ID,
  //     logo: `${IMAGE_URL}/${s.logo_path}`,
  //   }));
  // };

  const getSomethingElse = async () => {
    try {
      const response = await getSubcategoryByCategory(6 + "");
      if (response.status) {
        if (response.data) {
          setGeneralCat(response.data.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } else {
        console.error("Response status is false");
      }
    } catch (err) {
      console.error("Error fetching binary data:", err);
    } finally {
    }
  };

  return (
    <div className={styles.container}>
      <HelpCenterHeader />
      <PageWrapper type="narrow" className={styles.sectionWrapper}>
        <div className={styles.cardInner}>
          <TicketCards
            isLoading={categoryLoading}
            handleNavigation={() => {}}
            ticketCard={categories}
          />
          <PopularQuestions
            isLoading={questionsLoading}
            questions={popularQns || []}
          />
          <SomethingElse isLoading={categoryLoading} menuOptions={generalCat} />
        </div>
      </PageWrapper>
    </div>
  );
};

export default HelpCenter;
