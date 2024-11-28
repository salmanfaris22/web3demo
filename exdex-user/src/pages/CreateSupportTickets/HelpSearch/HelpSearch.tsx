import React, { useEffect, useState } from "react";
import styles from "./HelpSearch.module.scss";
import TextInput from "../../../common/Components/TextInput/TextInput";
import { useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useAPI";
import useDebounce from "../../../hooks/useDebounce";
import { searchTickets } from "../../../services/helpcenter";
import { goToIdPage } from "../../../utils/commonutils";
import { routers } from "../../../common/Constants";

const HelpSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce the search term with a 500ms delay

  const {
    executeApi: getQns,
    loading,
    data,
    error,
  } = useApi<any, string>(searchTickets, {
    onComplete: (data) => {
      console.log("Data loaded successfully:", data);
    },
    onError: (error) => {
      console.error("Error occurred:", error);
    },
  });

  useEffect(() => {
    if (debouncedSearchTerm) {
      getQns(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const [isOPen, setIsOpen] = useState(false);

  console.log(data);
  const helps = data?.data || [];
  console.log(helps);

  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <input
        onFocus={() => {
          setIsOpen(true);
        }}
        onBlur={() => {
          setTimeout(()=>{
            setIsOpen(false);
          },100)
        }}
        placeholder="Find an answer"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <img src="/assets/images/search.png" alt="Search" />
      {isOPen && debouncedSearchTerm.length > 0 && (
        <div className={styles.suggestions}>
          {loading && <div className={styles.lisItem}>Loading...</div>}
          {!loading && !error && helps?.length === 0 && (
            <div className={styles.lisItem}>No results found</div>
          )}
          {helps.map((x: any) => {
            return (
              <div
                onClick={() => {
                  navigate(goToIdPage(routers.ticketDetails , x.ticket_id));
                }}
                className={styles.lisItem}
              >
                {" "}
                {x.content}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HelpSearch;
