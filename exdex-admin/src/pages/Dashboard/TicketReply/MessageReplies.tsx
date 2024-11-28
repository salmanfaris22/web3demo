import React from "react";
import { convertISOToLongDateFormat } from "../../../utils/date";
import MainSectionTitle from "../../../common/Components/MainSectionTitle/MainSectionTitle";
import styles from "./TicketReply.module.scss";
import HTMLParser from "../../../common/Components/HTMLParser/HTMLParser";
import { Message } from "./TicketReply";
import { getFirstLetter } from "../../../utils/name";

const MessageReplies = ({ messages }: { messages: Message[] }) => {
  return (
    <div className={styles.detailContainer}>
      <div className={styles.messages}>
        {messages?.map((m, index) => {
          return (
            <div
              key={m.id}
              className={`${styles.messageRow} ${
                 styles.userMessage
              } `}
            >
              <div className={styles.date}>
                {convertISOToLongDateFormat(m.date)}
              </div>
              <div className={styles.messageContent}>
                <div className={styles.textContainer}>
                  <div className={styles.userName}>
                    <MainSectionTitle>{m.full_name || "User"}</MainSectionTitle>
                  </div>
                  <div className={styles.userContent}>
                    {HTMLParser(m.content)}
                  </div>
                  {m.attachment_urls && (
                    <div className={styles.attchments}>
                      {m.attachment_urls?.map((f: any) => {
                        return (
                          <div key={f} className={styles.attchment}>
                            <img
                              src="/assets/images/uploadFIle.svg"
                              alt="File"
                            />
                            <span>{f.substring(f.lastIndexOf("/") + 1)}</span>
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
                  style={{ backgroundImage: `url(${m.avatar_url})` }}
                >
                      {!m?.avatar_url &&
                      getFirstLetter(m.full_name)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageReplies;
