import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "../../common/Components/BackBtn/BackBtn";
import Button from "../../common/Components/Button/Button";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import { routers } from "../../common/Constants";
import DataError from "../../common/UI/DataError/DataError";
import FadeComponent from "../../common/UI/Loader/Loader";
import NoDataFound from "../../common/UI/NoDataFound/NoDataFound";
import useApi from "../../hooks/useAPI";
import { getCurrentUserTicket } from "../../services/helpcenter";
import { goToIdPage } from "../../utils/commonutils";
import { convertISOToLongDateFormat } from "../../utils/date";
import HelpBreadCrumb from "../CreateSupportTickets/HelpBreadCrumb/HelpBreadCrumb";
import MainSectionTitle from "../Forex/MainSectionTitle/MainSectionTitle";
import styles from "./SupportTicketList.module.scss";
import SupportTicketListHead from "./SupportTicketListHead/SupportTicketListHead";

export interface ITicket {
  id: number;
  title: string;
  full_name: string;
  category: string;
  user_id: number;
  date: string;
  status: string;
  created_at: string;
  attachment_urls: string[];
}

const SupportTicketList = () => {
  const { data, executeApi, loading, error } = useApi<{ data: ITicket[] }>(
    getCurrentUserTicket
  );

  useEffect(() => {
    executeApi();
  }, []);

  const tickets = data?.data || [];

  const itemVariants = {
    hiddenLeft: { opacity: 0, x: -100 },
    hiddenRight: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const navigate = useNavigate();

  return (
    <PageWrapper type="narrow">
      <div className={styles.container}>
        <div>
          <BackBtn />
          <SupportTicketListHead>
            <div>
              <HelpBreadCrumb
                breadCrumbs={[
                  {
                    name: "Help Center",
                    url: routers.helpCenter,
                  },
                  {
                    name: "Support Tickets",
                    url: "",
                  },
                ]}
              />
              <MainSectionTitle title="Support Tickets" />
            </div>
            <div className={styles.ticketListAdd}>
              <Button
                theme="neon"
                onClick={() => {
                  navigate(routers.createTicket);
                }}
              >
                Raise Ticket{" "}
              </Button>
            </div>
          </SupportTicketListHead>
          <div className={styles.ticketBody}>
            {loading && <FadeComponent />}
            {error && (
              <DataError
                btnProps={{
                  onClick: () => {
                    executeApi();
                  },
                }}
                title="Something went wrong"
                btnLabel="Reload my tickets"
              />
            )}
            {tickets.length === 0 && !loading && !error && (
              <NoDataFound title="Sorry no  tickets found" />
            )}
            {tickets.map((t, index) => {
              const isOdd = index % 2 !== 0;
              return (
                <motion.div
                  className={styles.ticketRow}
                  key={t.id}
                  variants={itemVariants}
                  initial={isOdd ? "hiddenLeft" : "hiddenRight"}
                  animate="visible"
                  onClick={() => {
                    navigate(goToIdPage(routers.ticketDetails, String(t.id)));
                  }}
                >
                  <div className={styles.title}>
                    <div className={styles.text}>{t.title}</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M13.1766 11.9993L8.22656 7.04928L9.64056 5.63528L16.0046 11.9993L9.64056 18.3633L8.22656 16.9493L13.1766 11.9993Z"
                        fill="#A2A2A2"
                      />
                    </svg>
                  </div>
                  <div className={styles.ticketDetails}>
                    <div>{t.category}</div>
                    <div>{convertISOToLongDateFormat(t.created_at)}</div>
                    <div>{t.status}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SupportTicketList;
