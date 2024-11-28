import React from 'react';
import styles from './TradeCards.module.scss';

const TradeCards = () => {
  return (
    <div className={styles.container}>
     <div className={styles.tradeCardRow}>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className={styles.tradeCard}>
                <img src="/assets/images/remove/aiCard.png" alt="signal card" />
              </div>
            ))}
          </div>
    </div>
  );  
};

export default TradeCards;  
