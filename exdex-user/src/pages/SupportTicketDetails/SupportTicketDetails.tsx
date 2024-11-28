import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackBtn from "../../common/Components/BackBtn/BackBtn";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import useApi from "../../hooks/useAPI";
import { getTicketDetialsById, submitReply } from "../../services/helpcenter";
import { convertISOToLongDateFormat, formatDate } from "../../utils/date";
import HelpBreadCrumb from "../CreateSupportTickets/HelpBreadCrumb/HelpBreadCrumb";
import MainSectionTitle from "../Forex/MainSectionTitle/MainSectionTitle";
import { ITicket } from "../SupportTicketList/SupportTicketList";
import SupportTicketListHead from "../SupportTicketList/SupportTicketListHead/SupportTicketListHead";
import styles from "./SupportTicketDetails.module.scss";
import HTMLParser from "../../common/Components/HTMLParser/HTMLParser";
import TextArea from "../../common/Components/TextArea/TextArea";
import FormSubmitBtns from "../../common/Components/FormSubmitBtns/FormSubmitBtns";
import FadeComponent from "../../common/UI/Loader/Loader";
import DataError from "../../common/UI/DataError/DataError";
import { motion } from "framer-motion";
import useToast from "../../hooks/useToast";
import { routers } from "../../common/Constants";
import { getFirstLetter } from "../../utils/name";

interface Message {
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
  ticket_details: ITicket;
  messages: Message[];
}

const SupportTicketDetails = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [onceLoaded, setOnceLoaded] = useState(false);
  const { executeApi, data, loading, error } = useApi<
    { data: ITicketDetailsData },
    string
  >(getTicketDetialsById, {
    onComplete: () => {
      setOnceLoaded(true);
    },
  });

  useEffect(() => {
    if (id) {
      executeApi(id as string);
    }
  }, [id]);

  const ticketDetails = data?.data?.ticket_details;
  const messages = data?.data?.messages || [];
  const { triggerToast } = useToast();

  const { executeApi: submitReplyAPI, loading: isSubmitLoading } = useApi<
    any,
    { content: string; id: string }
  >(submitReply, {
    onComplete: () => {
      setContent("");
      executeApi(id as string);
    },
    onError: () => {
      triggerToast("Something went wrong, try again", "error");
    },
  });

  const nav = useNavigate();

  return (
    <PageWrapper type="narrow">
      <div className={styles.container}>
        <div>
          <BackBtn />
          <div style={{ marginBottom: "28px" }}>
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
          </div>
          {loading && !onceLoaded && (
            <div style={{ height: "100vh" }}>
              <FadeComponent />
            </div>
          )}
          {!loading && error && (
            <DataError
              title="Something went wrong"
              btnLabel="Reload"
              btnProps={{
                onClick: () => {
                  executeApi(id as string);
                },
              }}
            />
          )}
          {!loading &&
            !error &&
            (ticketDetails || messages?.length > 0 || onceLoaded) && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate="once"
                viewport={{ once: true }}
                transition={{
                  ease: "easeIn",
                  duration: 0.3,
                  delay: 0.1,
                }}
              >
                <SupportTicketListHead>
                  <div className={styles.qnTitle}>
                    <MainSectionTitle title={ticketDetails?.title || ""} />
                    <div>
                      <HelpBreadCrumb
                        className={
                          ticketDetails?.status === "closed"
                            ? styles.closed
                            : ""
                        }
                        breadCrumbs={[
                          {
                            name: ticketDetails?.category || "",
                            url: "",
                          },
                          {
                            name: convertISOToLongDateFormat(
                              ticketDetails?.date || ""
                            ),
                            url: "",
                          },
                          {
                            name: ticketDetails?.status || "",
                            url: "",
                          },
                        ]}
                      />
                    </div>
                  </div>
                </SupportTicketListHead>
                <div className={styles.detailContainer}>
                  <div className={styles.messages}>
                    {messages?.map((m, index) => {
                      return (
                        <div
                          key={m.id}
                          className={`${styles.messageRow} ${
                            index === 0 && styles.userMessage
                          } `}
                        >
                          <div className={styles.date}>
                            {convertISOToLongDateFormat(m.date)}
                          </div>
                          <div className={styles.messageContent}>
                            <div className={styles.textContainer}>
                              <div className={styles.userName}>
                                <MainSectionTitle
                                  title={m.full_name || "User"}
                                />
                              </div>
                              <div className={styles.userContent}>
                                {HTMLParser(m.content)}
                              </div>
                              {/* {m.attachment_urls && (
                                <div className={styles.attchments}>
                                  {m.attachment_urls?.map((f) => {
                                    return (
                                      <div
                                      onClick={()=>{
                                        window.open(f)
                                      }}
                                      key={f} className={styles.attchment}>
                                        <img
                                          src="/assets/images/uploadFIle.svg"
                                          alt="File"
                                        />
                                        <span>
                                          {f.substring(f.lastIndexOf("/") + 1)}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )} */}
                                 {ticketDetails?.attachment_urls && index === 0 && (
                                <div className={styles.attchments}>
                                  {ticketDetails.attachment_urls?.map((f) => {
                                    return (
                                      <div
                                      onClick={()=>{
                                        window.open(f)
                                      }}
                                      key={f} className={styles.attchment}>
                                        <img
                                          src="/assets/images/uploadFIle.svg"
                                          alt="File"
                                        />
                                        <span>
                                          {f.substring(f.lastIndexOf("/") + 1)}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                            <div
                              className={`${styles.avatar}
                  ${m?.avatar_url ? "" : "noAvatar"}
                  `}
                              style={{
                                backgroundImage: `url(${m.avatar_url})`,
                              }}
                            >
                              {!m?.avatar_url && getFirstLetter(m.full_name)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className={styles.commentIp}>
                      <TextArea
                        infoText="Provide details/ feedbacks(if any) if your query is not solved"
                        rows={13}
                        value={content}
                        onChange={(e) => {
                          setContent(e.target.value.trim());
                        }}
                      />
                      <FormSubmitBtns
                        submitProps={{
                          children: isSubmitLoading
                            ? "Submitting..."
                            : "Submit Response",
                          onClick: () => {
                            submitReplyAPI({ content, id: String(id) });
                          },
                          isLoading: isSubmitLoading,
                          disabled:
                            isSubmitLoading || content.trim().length === 0,
                        }}
                        cancelProps={{
                          children: "Cancel",
                          onClick: () => {
                            nav(-1);
                          },
                          disabled: isSubmitLoading,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default SupportTicketDetails;
