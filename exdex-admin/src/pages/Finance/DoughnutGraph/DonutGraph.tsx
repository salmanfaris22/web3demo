import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useAPI";
import { getTokenDistibution } from "../../../services/finance";
import FinanceTitle from "../FinanceTitle/FinanceTitle";
import FInanceWrapper from "../FinanceWrapper/FInanceWrapper";
import { Chart } from "./Chart";
import styles from "./DonutGraph.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);
const DonutGraph = () => {
  const [dexDistribution, setDexData] = useState<{
    data: number[];
    label: string[];
  }>({
    data: [],
    label: [],
  });
  const [exDistribution, setexData] = useState<{
    data: number[];
    label: string[];
  }>({
    data: [],
    label: [],
  });

  const { executeApi, loading, data, error } = useApi(getTokenDistibution, {
    onComplete: (data) => {
      const dexData: number[] = [];
      const dexLabel: string[] = [];
      const exLabel: string[] = [];
      const exData: number[] = [];
      data.data.forEach((x: any) => {
        dexData.push(x.total_dextoken);
        exData.push(x.total_excoin);
        dexLabel.push(`${x.country_name}`);
        exLabel.push(`${x.country_name}`);
      });
      console.log(dexData);
      setDexData({ data: dexData, label: dexLabel });
      setexData({ data: exData, label: exLabel });
    },
  });

  useEffect(() => {
    executeApi();
  }, []);

  return (
    <FInanceWrapper>
      <div className={styles.container}>
        <div className={styles.sections}>
          <FinanceTitle>Ex Coin Distrubition</FinanceTitle>

          <Chart data={exDistribution.data} label={exDistribution.label} />
        </div>
        <div className={styles.sections}>
          <FinanceTitle>Dex token Distrubition</FinanceTitle>
          <Chart data={dexDistribution.data} label={dexDistribution.label} />
        </div>
      </div>
    </FInanceWrapper>
  );
};

export default DonutGraph;
