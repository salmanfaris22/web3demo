import React from "react";
import styles from "./AISignalReport.module.scss";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import Signalreport from "./Signalreport/Signalreport";
import MostImpactfulDriver from "./MostImpactfulDriver/MostImpactfulDriver";
import TradeCards from "./TradeCards/TradeCards";

const AISignalReport = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
      <div className={styles.signalReport}>
        <Signalreport />
        <MostImpactfulDriver />
        <TradeCards />
      </div>
      </div>
 
    </div>
  );
};

export default AISignalReport;
