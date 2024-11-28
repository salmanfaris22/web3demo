import React from "react";
import styles from "./TicketCards.module.scss";
import { routers, TicketTypes, TTicketTypes } from "../../../common/Constants";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { goToIdPage } from "../../../utils/commonutils";
import TicketCardLoaders from "./TicketCardLoader";
import { IMAGE_URL } from "../../../config";

export type TTicketCard = {
  name: string;
  count: number;
  logo_path: string;
  id: number;
};

export interface TTicketCardsProps {
  ticketCard: TTicketCard[];
  isLoading: boolean;
  handleNavigation: (data: {
    subCategory: string;
    subCategoryId: string;
  }) => void;
}

const TicketCards = ({ ticketCard, isLoading }: TTicketCardsProps) => {
  const nav = useNavigate();

  if (isLoading) {
    return <TicketCardLoaders />;
  }

  return (
    <div className={styles.container}>
      {ticketCard.map((ticket: any) => {
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.1,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            viewport={{ once: true }}
            onClick={() => {
              nav(
                goToIdPage(
                  routers.TicketInfo,
                  ticket.id ? ticket.id.toString() : ticket.ID.toString()
                )
              );
            }}
            className={styles.ticketCardContiner}
            key={ticket.name}
          >
            <div className={styles.ticketCardInner}>
              <div className={styles.titleContainer}>
                <h2> {ticket.name} </h2>
                <div className={styles.iconContainer}>
                  <img
                    src={IMAGE_URL + "/" + ticket.logo_path}
                    alt={ticket.name}
                  />
                </div>
              </div>
              <div className={styles.articleCount}>
                {`${
                  ticket.count ? ticket.count : ticket.question_count
                } Articles`}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TicketCards;
