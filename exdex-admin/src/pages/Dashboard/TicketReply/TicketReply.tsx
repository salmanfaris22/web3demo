import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb, {
  BreadcrumbSection,
} from "../../../common/Components/Breadcrumb/Breadcrumb";
import FormSubmitBtns from "../../../common/Components/FormSubmitBtns/FormSubmitBtns";
import MainSectionTitle from "../../../common/Components/MainSectionTitle/MainSectionTitle";
import { QuilEditor } from "../../../common/Components/QuilEditor/QuilEditor";
import MainWrapper from "../../../common/Layout/PageWrapper/PageWrapper";
import TablePageWrapper from "../../../common/Layout/TableWrapper/TableWrapper";
import { routes } from "../../../constants/routes";
import useApi from "../../../hooks/useAPI";
import useToast from "../../../hooks/useToast";
import {
  getTicketsById,
  IReplyTicketAPIP,
  replyTicket,
} from "../../../services/tickets";
import { replacePlaceholders } from "../../../utils/commonUtils";
import { Ticket } from "../Tickets/Tickets";
import MessageReplies from "./MessageReplies";
import styles from "./TicketReply.module.scss";
import FadeComponent from "../../../common/UI/Loader/Loader";
import DataError from "../../../common/UI/DataError/DataError";

export interface Message {
  id: number;
  ticket_id: number;
  user_id: number;
  content: string;
  date: string;
  created_at: string;
  full_name: string;
  avatar_url: string;
  attachment_urls: string[];
}

interface ITicketDetailsData {
  ticket_details: Ticket;
  messages: Message[];
}
const TicketReply = () => {
  const { ticketId, userId } = useParams();
  const { triggerToast } = useToast();

  const { data, loading, executeApi, error } = useApi<
    { data: ITicketDetailsData },
    string
  >(getTicketsById);

  const sections: BreadcrumbSection[] = [
    { label: "Tickets", link: routes.tickets },
    {
      label: `support tickets`,
      link: replacePlaceholders(routes.userTickets, {
        id: String(userId),
      }),
    },
    {
      label: `support ticket detail`,
    },
  ];

  const navigate = useNavigate();

  const { loading: replyLoading, executeApi: reply } = useApi<
    any,
    IReplyTicketAPIP
  >(replyTicket, {
    onComplete: (m) => {
      triggerToast(m.message, "success");
      navigate(
        replacePlaceholders(routes.userTickets, {
          id: String(userId),
        })
      );
    },
    onError: (e) => {
      triggerToast(e, "error");
    },
  });
  const [replyValue, setReplyValue] = useState("");

  console.log(data);

  useEffect(() => {
    if (ticketId) {
      executeApi(ticketId);
    }
  }, [ticketId]);

  const ticketDetails = data?.data.ticket_details;
  const messages = data?.data?.messages?.filter((_, i) => i !== 0) || [];

  return (
    <div className={styles.container}>
      {loading && <FadeComponent />}
      {error && (
        <DataError
          btnLabel="Reload Details"
          btnProps={{
            onClick: () => {
              getTicketsById(String(ticketId));
            },
          }}
        />
      )}

      {ticketDetails && !loading && (
        <MainWrapper>
          <TablePageWrapper title={null}>
            <div className={styles.breadCrumb}>
              <Breadcrumb sections={sections} />
            </div>
            <MainSectionTitle>
              {ticketDetails?.full_name} Support ticket details
            </MainSectionTitle>
            <div className={styles.infoWrap}>
              <div className={styles.infoContainer}>
                <div className={styles.label}>Category</div>
                <div className={styles.value}>{ticketDetails?.category}</div>
              </div>
              <div className={styles.infoContainer}>
                <div className={styles.label}>Subject</div>
                <div className={styles.value}>{ticketDetails?.title}</div>
              </div>
              <div className={styles.infoContainer}>
                <div className={styles.label}>Description</div>
                <div className={styles.value}>{ticketDetails?.description}</div>
              </div>
              <div className={styles.attchments}>
                {ticketDetails?.attachment_urls?.map((f) => {
                  return (
                    <div
                      key={f}
                      className={styles.attchment}
                      onClick={() => {
                        window.open(f);
                      }}
                    >
                      <img src="/assets/images/uploadFIle.svg" alt="File" />
                      <span>{f.substring(f.lastIndexOf("/") + 1)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.replyWrap}>
              <MainSectionTitle>
                {ticketDetails?.status === "open"
                  ? `Give ticket response for ${
                      ticketDetails?.full_name || "User"
                    }`
                  : `Ticket response for ${ticketDetails?.full_name || "User"}`}
              </MainSectionTitle>

              {ticketDetails?.status === "open" ? (
                <div className={styles.replyEditor}>
                  <div className={styles.replyLabel}>Response</div>
                  <div className={styles.eritorWrap}>
                    <QuilEditor
                    
                      modules={["image"]}
                      theme=""
                      value={replyValue}
                      handleOnChange={(e) => {
                        setReplyValue(e);
                      }}
                    />
                  </div>
                </div>
              ) : (
                <MessageReplies messages={messages} />
              )}
            </div>
            {ticketDetails?.status === "open" && (
              <FormSubmitBtns
                submitProps={{
                  children: replyLoading ? "Submitting..." : "Submit",
                  onClick: () => {
                    reply({ id: String(ticketId), content: replyValue });
                  },
                  isLoading: replyLoading,
                  disabled: replyLoading || !replyValue,
                }}
                cancelProps={{
                  children: "Cancel",
                  onClick: () => {
                    navigate(-1);
                  },
                  disabled: replyLoading,
                }}
              />
            )}
          </TablePageWrapper>
        </MainWrapper>
      )}
    </div>
  );
};

export default TicketReply;
