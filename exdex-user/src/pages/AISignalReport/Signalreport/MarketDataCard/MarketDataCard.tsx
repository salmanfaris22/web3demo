import React from 'react';
import styles from './MarketDataCard.module.scss';

export interface IMarketCardProps {
  marketName: string,
  percentageChange: number,
  text: string,
  heightLight?:boolean,
  typeOfChange : "increase" | "decrease" 
}

const MarketDataCard = ({marketName  , percentageChange , typeOfChange , text , heightLight} : IMarketCardProps) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.typeOfChange} ${heightLight && styles.heightLight}`} >
        {typeOfChange === "decrease" ? "-" : "+"}{percentageChange}
      </div>
      <div className={styles.reportContent}>
        <div className={styles.marketName}>
        {marketName}
        </div>
     
        <div className={`${styles.reportDescription} ${heightLight && styles.heightLight}`} >
           {text}
        </div>
      </div>
    </div>
  );
};

export default MarketDataCard;
