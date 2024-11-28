import React, { ReactNode } from "react";
import styles from "./SupportTicketListHead.module.scss";

const SupportTicketListHead = ({ children }: { children: ReactNode }) => {
  return <div className={styles.ticketHeader}>{children}</div>;
};

export default SupportTicketListHead;
