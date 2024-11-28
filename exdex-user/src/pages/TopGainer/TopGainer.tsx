import { MainTitle } from "../../common/Components/MainTitle/MainTitle";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import Heatmap from "../Dashboard/Overview/components/TreeMap/TreeMap";
import { generateAsymmetricData } from "../Dashboard/Overview/Overview";
import styles from "./TopGainer.module.scss";

const TopGainer = () => {
  return (
    <div className={styles.container}>
      <PageWrapper type="medium" addBgWrap>
        <MainTitle>
          <h1>Top Gainer</h1>
        </MainTitle>
        {/* <OverviewCard type="fullHeight"> */}
        <div className={styles.heatMapOuter}>
          <div className={styles.heatMapContainer}>
            <Heatmap data={generateAsymmetricData()} />
          </div>
        </div>
        <div className={styles.mostInvestedOn}>
          <MainTitle>
            <h2>Most Invested On</h2>
          </MainTitle>
          <div className={styles.mostInvestedOnRow}>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className={styles.mostInvestedCard}>
                <img src="/assets/images/signals/dex2.png" alt="signal card" />
              </div>
            ))}
          </div>
        </div>
        {/* </OverviewCard> */}
      </PageWrapper>
    </div>
  );
};

export default TopGainer;
