import React from "react";
import styles from "./Signalreport.module.scss";
import { MainTitle } from "../../../common/Components/MainTitle/MainTitle";
import MarketDataCard, {
  IMarketCardProps,
} from "./MarketDataCard/MarketDataCard";
import PageAnimation from "../../../common/Components/PageAnimation/PageAnimation";

const marketData: IMarketCardProps[] = [
  {
    marketName: "Forex Market",
    percentageChange: 21,
    text: "Check The Time Of Day When Forex Smart Cards Are Generated.",
    typeOfChange: "increase",
  },
  {
    marketName: "Crypto Spot Market",
    percentageChange: 3,
    text: "Check The Time Of Day When Crypto Spot Smart Cards Are Generated.",
    typeOfChange: "increase",
  },
  {
    marketName: "Crypto Future Market",
    percentageChange: 7,
    text: "Check The Time Of Day When Crypto Future Smart Cards Are Generated.",
    heightLight: true,
    typeOfChange: "increase",
  },
];

const Signalreport = () => {
  return (
    <PageAnimation>
      <div className={styles.container}>
        <div className={styles.aiRportContainer}>
          <div className={styles.reports}>
            <MainTitle>
              <h1>AI Signal Reports</h1>
            </MainTitle>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
              <br></br>
              eiusmod tempor incididunt ut labore et .
            </p>

            <div>
              <div>
                {marketData.map((x) => {
                  return <MarketDataCard key={x.marketName} {...x} />;
                })}
              </div>
            </div>
          </div>

          <div className={styles.marketGraph}>
            <img src="/assets/images/remove/radialgraph.png" alt="Graph" />
          </div>
        </div>
      </div>
    </PageAnimation>
  );
};

export default Signalreport;
