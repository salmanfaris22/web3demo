import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../../common/Components/Button/Button";
import styles from "./TicketCards.module.scss";

export type TTicketCard = {
  name: string;
  count: number;
  logo: string;
  id: string;
};

export interface TTicketCardsProps {
  ticketCard: TTicketCard[];
  handleOnclick: (data: TTicketCard) => void;
    handleNavigation: (data: {
      subCategory: string;
      subCategoryId: string;
    }) => void;
}

const TicketCards = ({
  ticketCard,
  handleOnclick,
  handleNavigation,
}: TTicketCardsProps) => {
  const { cardType, category, categoryId } = useParams();
  const nav = useNavigate();

  return (
    <div className={styles.container}>
      {ticketCard.map((ticket) => {
        // const { title, icon } = getTicketFromType(ticket.type);
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
            className={styles.ticketCardContiner}
            key={ticket.name}
          >
            <div className={styles.ticketCardInner}>
              <div className={styles.delete}>
                <Button
                  onClick={(e) => {
         
                  handleOnclick(ticket)
                  }}
                  theme="icon"
                >
                  <img src="/assets/images/deleteWhite.png" alt="Delete" />
                </Button>
              </div>

              <div className={styles.titleContainer}>
                <h2> {ticket.name} </h2>
                <div className={styles.iconContainer}>
                  <img src={ticket.logo} alt={ticket.name} />
                </div>
              </div>
              <div
                className={styles.articleCount}
                onClick={() => {
                  handleNavigation({
                    subCategory: ticket.name as string,
                    subCategoryId: ticket.id as string,
                  });
                }}
              >
                {`${ticket.count} Articles`}
                <img src="/assets/images/goArrowDark.png" alt="Go" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TicketCards;
