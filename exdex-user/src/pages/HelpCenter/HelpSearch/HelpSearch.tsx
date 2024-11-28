import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useAPI";
import useDebounce from "../../../hooks/useDebounce";
import { getALlQns, QnAPIParams } from "../../../services/helpcenter";
import styles from "./HelpSearch.module.scss";

interface GetQuestionsResponse {
  data: {
    limit: number;
    page: number;
    questions: { title: string; ID: string }[];
    total_count: number;
  };
}

const HelpSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce the search term with a 500ms delay

  const {
    executeApi: getQns,
    loading,
    data,
    error,
  } = useApi<GetQuestionsResponse, QnAPIParams>(getALlQns, {
    onComplete: (data) => {
      console.log("Data loaded successfully:", data);
    },
    onError: (error) => {
      console.error("Error occurred:", error);
    },
  });

  useEffect(() => {
    if (debouncedSearchTerm) {
      getQns({ search: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm]);

  const [isOPen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <input
        onFocus={() => {
          setIsOpen(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setIsOpen(false);
          }, 500);
        }}
        placeholder="Find an answer"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M11.0385 2.71289C15.8424 2.71289 19.7411 6.61165 19.7411 11.4155C19.7411 16.2193 15.8424 20.1181 11.0385 20.1181C6.2347 20.1181 2.33594 16.2193 2.33594 11.4155C2.33594 6.61165 6.2347 2.71289 11.0385 2.71289ZM11.0385 18.1842C14.7778 18.1842 17.8072 15.1547 17.8072 11.4155C17.8072 7.67531 14.7778 4.6468 11.0385 4.6468C7.29835 4.6468 4.26985 7.67531 4.26985 11.4155C4.26985 15.1547 7.29835 18.1842 11.0385 18.1842ZM19.2432 18.2528L21.9787 20.9874L20.6104 22.3556L17.8759 19.6201L19.2432 18.2528Z"
          fill="#AEAEAE"
        />
      </svg>
      {isOPen && debouncedSearchTerm.length > 0 && (
        <div className={styles.suggestions}>
          {loading && <div className={styles.lisItem}>Loading...</div>}
          {!loading && !error && data?.data.questions.length === 0 && (
            <div className={styles.lisItem}>No results found</div>
          )}
          {data?.data.questions.map((x) => {
            return (
              <div
                key={x.ID}
                onClick={() => {
                  navigate(`/help-center/questions/${x.ID}`);
                }}
                className={styles.lisItem}
              >
                {" "}
                {x.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HelpSearch;
