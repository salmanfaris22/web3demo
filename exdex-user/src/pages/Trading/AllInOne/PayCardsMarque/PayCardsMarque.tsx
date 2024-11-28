import React from 'react';
import styles from './PayCardsMarque.module.scss';
import Marquee from 'react-fast-marquee';

const PayCardsMarque = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
       <Marquee autoFill>
        <div className={styles.cardWrap} > <img src='/assets/images/trade/cards/1.png' alt='Payment cards' /></div>
        <div className={styles.cardWrap} > <img src='/assets/images/trade/cards/2.png'  alt='Payment cards'/></div>
        <div className={styles.cardWrap} > <img src='/assets/images/trade/cards/3.png' alt='Payment cards' /></div>
        <div className={styles.cardWrap} > <img src='/assets/images/trade/cards/4.png' alt='Payment cards' /></div>
        <div className={styles.cardWrap} > <img src='/assets/images/trade/cards/5.png' alt='Payment cards' /></div>
         </Marquee>

      </div>
    </div>
  );
};

export default PayCardsMarque;
