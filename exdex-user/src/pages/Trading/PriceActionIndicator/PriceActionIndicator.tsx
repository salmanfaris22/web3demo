import React from 'react';
import styles from './PriceActionIndicator.module.scss';

const PriceActionIndicator = () => {
  return (
    <div className={styles.heightLights}>
    <h2>Price Action Indicator</h2>
    <h3>Our code of honor</h3>
    <p>
      We have developed this Indicator on Tradingview to make your Trading
      life hassle free, it takes in 2 timeframes to detect High and Low
      values from which to draw the trend line of each timeframe.<br></br><br></br>
      Combination of 5 indicator to analysis every movement on your chart.
    </p>
  </div>
  );
};

export default PriceActionIndicator;
