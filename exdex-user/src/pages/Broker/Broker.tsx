import React from "react";
import styles from "./Broker.module.scss";
import Banner from "./Banner/Banner";
import ProfitCalculator from "./ProfitCalculator/ProfitCalculator";
import WarrorSwiper from "./WarrorSwiper/WarrorSwiper";
import WhyExDex from "./WhyExDex/WhyExDex";

const Broker = () => {
  return (
    <div className={styles.container}>
      <Banner />
      <ProfitCalculator/>
      <WhyExDex/>
      <WarrorSwiper/>
    </div>
  );
};

export default Broker;
