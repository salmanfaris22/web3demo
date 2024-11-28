import React, { useEffect } from "react";
import styles from "./TicketDetails.module.scss";
import HelpCenterHeader from "../HelpCenter/HelpCenterHeader/HelpCenterHeader";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import pageWRapperStyle from "../HelpCenter/HelpCenter.module.scss";
import PopularQuestions, {
  IQuestion,
} from "../HelpCenter/PopularQuestions/PopularQuestions";
import Video from "../../common/Components/Video/Video";
import useApi from "../../hooks/useAPI";
import { getQnsBySubCatgory } from "../../services/helpcenter";
import { useParams } from "react-router-dom";

const TicketDetails = () => {
  const {
    executeApi: getPopularQn,
    loading: questionsLoading,
    data: questionData,
    // error: categoryError,
  } = useApi<
    {
      data: {
        questions: IQuestion[];
      };
    },
    { subCategoryId: string }
  >(getQnsBySubCatgory, {
    onComplete: (data) => {
      console.log(data);
    },
  });

  const params = useParams();

  useEffect(() => {
    if (params.id) getPopularQn({ subCategoryId: params.id });
  }, [params.id]);

  return (
    <div className={styles.container}>
      <HelpCenterHeader />
      <PageWrapper type="narrow" className={pageWRapperStyle.sectionWrapper}>
        <div className={styles.inforWrapper}>
          <div className={styles.title}>
            <h1>How Affiliate work’s here</h1>
          </div>
          <div className={styles.videoWrapper}>
            <Video poster="/assets/images/remove/qnVideoPoster.png" />
          </div>
        </div>
        <PopularQuestions isLoading={questionsLoading} questions={questionData?.data.questions || []} />
      </PageWrapper>
    </div>
  );
};

export default TicketDetails;
