import React from "react";
import styles from "./MostImpactfulDriver.module.scss";
import DottedLineGraph from "../../../common/Components/DottedLineGraph/DottedLineGraph";
import ImpactCard, { IImpactCardProps, ImpactText } from "./ImpactCard/ImpactCard";

const impactData: IImpactCardProps[] = [
  {
    text: ImpactText.ForexGrowthRate,
    percentage: 60,
    percentageChange: 3,
    typeOfChange: "increase",
  },
  {
    text: ImpactText.SpotGrowthRate,
    percentage: 80,
    percentageChange: 7,
    typeOfChange: "decrease",
    theme: "light",
  },
  {
    text: ImpactText.FutureGrowthRate,
    percentage: 70,
    percentageChange: 7,
    typeOfChange: "increase",
  },
];

const MostImpactfulDriver = () => {
  return (
    <div className={styles.container}>
      <h2>Most Impactful SocialDrivers</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do .</p>
      <div className={styles.graphWrapper}>
        <div className={styles.cardWrapper}>
        {impactData.map((im)=>
        <ImpactCard key={im.text} {...im} />)}
        </div>
        <div className={styles.graph}>
        <DottedLineGraph />
        </div>
      </div>
    </div>
  );
};

export default MostImpactfulDriver;
