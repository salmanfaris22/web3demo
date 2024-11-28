import Marquee from "react-fast-marquee";
import styles from "./TradingPairMarque.module.scss";
const tradingPairs = [
  {
    pair: "GBPUSD",
    bid: "1.31092",
    ask: "1.31071",
    direction: "up",
    tradeAction: "Trade",
  },
  {
    pair: "WTI",
    bid: "65.654",
    ask: "65.615",
    direction: "down",
    tradeAction: "Trade",
  },
  {
    pair: "ETHUSD",
    bid: "2331.05",
    ask: "2324.13",
    direction: "down",
    tradeAction: "Trade",
  },
  {
    pair: "#US30",
    bid: "40629.44",
    ask: "40626.44",
    direction: "down",
    tradeAction: "Trade",
  },
  {
    pair: "GOLD",
    bid: "2522.14",
    ask: "2521.78",
    direction: "down",
    tradeAction: "Trade",
  },
  {
    pair: "BTCUSD",
    bid: "56367.68",
    ask: "56292",
    direction: "down",
    tradeAction: "Trade",
  },
];



const TradingPairMarque = () => {
  return (
    <Marquee  autoFill pauseOnHover speed={70}>
      {tradingPairs.map((tCard) => {
        return (
          <div key={tCard.pair} className={styles.tradeCard}>
            <div
              className={`${
                tCard.direction === "up" ? styles.up : styles.down
              } ${styles.sign}`}
            >
              <img src="/assets/images/arrowBlack.png" alt="arrow"/>
            </div>
            <div>
              <div className={styles.pair}>{tCard.pair}</div>
              <div className={styles.bidAsk}>
                {tCard.bid}/{tCard.ask}
              </div>
            </div>
            <button className={styles.tradeBtn}>Trade</button>
          </div>
        );
      })}
    </Marquee>

  );
};

export default TradingPairMarque;
