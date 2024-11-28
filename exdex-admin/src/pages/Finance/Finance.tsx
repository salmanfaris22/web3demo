import React, { useEffect } from "react";
import styles from "./Finance.module.scss";
import PageAnimation from "../../common/Components/PageAnimation/PageAnimation";
import PageWrapper from "../../common/Layout/PageWrapper/PageWrapper";
import SectionOne from "./SectionOne/SectionOne";
import DonutGraph from "./DoughnutGraph/DonutGraph";
import TransactionHistory from "./TransactionHistory/TransactionHistory";
import { getTxnHistory } from "../../services/finance";
import useApi from "../../hooks/useAPI";

const Finance = () => {

  const { executeApi, loading, data, error } = useApi(getTxnHistory, {});

  useEffect(() => {
    executeApi();
  }, []);

  const txnData = data?.data;


  return (
    <div className={styles.container}>
      <PageAnimation>
        <PageWrapper>
          <section>
            <SectionOne onReload={()=>{
              executeApi()
            }} />
          </section>
          <section>
            <DonutGraph />
          </section>
          <section>
            <TransactionHistory onReload={()=>{
              executeApi()
            }}  data={txnData} loading={loading} error={Boolean(error)}  />
          </section>
        </PageWrapper>
      </PageAnimation>
      {/* <PageWrapper> */}
    </div>
  );
};

export default Finance;
