import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../common/Constants";
import { goToIdPage } from "../../../utils/commonutils";
import styles from "./PopularQuestions.module.scss";
import PopularQuestionsLoader from "./PopularQuestionsLoader";

export type IQuestion = {
  CreatedAt: string;
  DeletedAt: string | null;
  ID: number;
  UpdatedAt: string;
  body: string;
  subcategory_id: string;
  title: string;
};

export interface IPopularQuestions {
  questions: IQuestion[];
  isLoading: boolean;
}

const PopularQuestions = ({ questions, isLoading }: IPopularQuestions) => {
  const nav = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate="once"
      viewport={{ once: true }}
      transition={{
        ease: "easeIn",
        duration: 0.4,
        delay: 0.1,
      }}
      className={styles.container}
    >
      {questions && questions.length > 0 && (
        <div className={styles.title}>
          <h2>Popular Questions</h2>
        </div>
      )}

      <div className={styles.questions}>
        {isLoading ? (
          <PopularQuestionsLoader />
        ) : (
          questions.map((qn) => {
            return (
              <div
                className={styles.question}
                key={qn.title}
                onClick={() => {
                  nav(goToIdPage(routers.QuestionInfo, qn.ID.toString()));
                }}
              >
                {qn.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                >
                  <path
                    d="M0.545006 11.686C0.381467 11.5224 0.289596 11.3006 0.289596 11.0692C0.289596 10.8379 0.381467 10.6161 0.545006 10.4525L4.8631 6.13441L0.545007 1.81631C0.386102 1.65179 0.298175 1.43143 0.300163 1.2027C0.30215 0.973978 0.393894 0.755184 0.555633 0.593444C0.717372 0.431705 0.936167 0.339962 1.16489 0.337975C1.39362 0.335988 1.61397 0.423914 1.7785 0.582819L6.71334 5.51766C6.87688 5.68125 6.96875 5.90309 6.96875 6.13441C6.96875 6.36572 6.87688 6.58757 6.71334 6.75115L1.7785 11.686C1.61491 11.8495 1.39307 11.9414 1.16175 11.9414C0.930438 11.9414 0.708594 11.8495 0.545006 11.686Z"
                    fill="#CCFC50"
                  />
                </svg>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default PopularQuestions;
