import Button from "../../../../common/Components/Button/Button";
import { TTicketCardsProps } from "../SubCategorySection/TicketCards/TicketCards";
import styles from "./LookingForSomethingElse.module.scss";



const LookingForSomethingElse = ({ ticketCard, handleNavigation , handleOnclick }: TTicketCardsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.somethingElseCards}>
        {ticketCard.map((x) => {
          return (
            <div className={styles.somethingElseOuter}>
              <div className={styles.somethingElseCard} onClick={()=>{
                    handleNavigation({
                      subCategory: x.name as string,
                      subCategoryId: x.id as string,
                    });
              }}>
                <div className={styles.somethingElseIcon}>
                  <div className={styles.delete}>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOnclick(x)
                      }}
                      theme="icon"
                    >
                      <img src="/assets/images/deleteWhite.png" alt="Delete" />
                    </Button>
                  </div>
                  <div className={styles.imageContainer}>
                    <img src={x.logo} alt={x.name} />
                  </div>
                </div>
                <div className={styles.footer}>{x.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LookingForSomethingElse;
