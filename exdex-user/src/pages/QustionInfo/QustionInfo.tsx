import React, { useEffect } from "react";
import styles from "./QustionInfo.module.scss";
import HTMLParser from "../../common/Components/HTMLParser/HTMLParser";
import { htmlData } from "./data";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import { Category, somethingElseMenu } from "../HelpCenter/HelpCenter";
import SomethingElse from "../HelpCenter/SomethingElse/SomethingElse";
import { IQuestion } from "../HelpCenter/PopularQuestions/PopularQuestions";
import useApi from "../../hooks/useAPI";
import {
  getHelpCenterCategories,
  getQnByQnId,
} from "../../services/helpcenter";
import { useParams } from "react-router-dom";
import APILoader from "../../common/UI/APILoader/APILoader";
import { selectCategories, setCategories } from "../../store/helpCenterSlice";
import { useDispatch, useSelector } from "react-redux";
import { TTicketCard } from "../HelpCenter/TicketCards/TicketCards";
import { IMAGE_URL } from "../../config";
import { CardNames } from "../../common/Constants";

const QustionInfo = () => {
  const {
    executeApi,
    loading: questionsLoading,
    data: questionData,
    // error: categoryError,
  } = useApi<
    {
      data: IQuestion;
    },
    string
  >(getQnByQnId, {
    onComplete: (data) => {
      console.log(data);
    },
  });

  const dispatch = useDispatch();

  const {
    executeApi: getSomethingElse,
    loading: categoryLoading,
    error: categoryError,
  } = useApi<{ data: Category[] }>(getHelpCenterCategories, {
    onComplete: (data) => {
      dispatch(setCategories(data.data));
    },
  });

  const params = useParams();

  const categoriesResponse: any = useSelector(selectCategories);
  const categories = categoriesResponse.subcategories
    ? categoriesResponse.subcategories
    : [];
  useEffect(() => {
    if (params.id) executeApi(params.id);
  }, [params.id]);

  const getCategory = (categoryKey: string): TTicketCard[] => {
    const subCategory =
      categories?.find((x:any) => x.name === categoryKey)?.subcategories || [];
    return subCategory.map((s:any) => ({
      name: s.name,
      count: s.question_count,
      id: s.ID,
      logo_path: `${IMAGE_URL}/${s.logo_path}`,
    }));
  };

  useEffect(() => {
    if (!categories || categories.length === 0) {
      getSomethingElse();
    }
  }, [categories]);

  return (
    <div className={styles.container}>
      {questionsLoading ? (
        <APILoader text="Loading Question..." />
      ) : (
        <PageWrapper type="narrow">
          <div className={styles.contentContainer}>
            <h1>{questionData?.data?.title}</h1>

            {HTMLParser(questionData?.data.body || "")}
            <SomethingElse
              isLoading={categoryLoading}
              menuOptions={getCategory(CardNames.somrthingElse) || []}
              isDetailPage
            />
          </div>
        </PageWrapper>
      )}
    </div>
  );
};

export default QustionInfo;
