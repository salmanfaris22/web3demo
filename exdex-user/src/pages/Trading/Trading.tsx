import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import AiText from "./AiText/AiText";
import AllInOne from "./AllInOne/AllInOne";
import AssetsMarque from "./AllInOne/AssetsMarque/AssetsMarque";
import CHartsTab from "./AllInOne/ChartsTab/CHartsTab";
import PayCardsMarque from "./AllInOne/PayCardsMarque/PayCardsMarque";
import BackGround from "./Backgrounds/BackGround";
import BackGround2 from "./Backgrounds2/BackGround2";
import BarGraphs from "./BarGraphs/BarGraphs";
import BigLetterSection from "./BigLetterSection/BigLetterSection";
import ExpEdge from "./ExpEdge/ExpEdge";
import GemText from "./GemText/GemText";
import Medals from "./Medals/Medals";
import TradeViewChart from "./TradeViewChart/TradeViewChart";
import styles from "./Trading.module.scss";
import Whale from "./Whale/Whale";

const Trading = () => {
  return (
    <div className={styles.container}>
      <BackGround>
        <div className={styles.tradeViewWrap}>
          <TradeViewChart />
        </div>
        {/* <PriceActionIndicator/> */}
        <div className={styles.glitterContainer}>
          <PageWrapper className={styles.content}>
            <div className={styles.allInViewWrap}>
              {/* <PriceActionIndicator /> */}
              <AllInOne />
              <CHartsTab />
            </div>
          </PageWrapper>
          <div className={styles.glitterWrap}>
            <div className={styles.glitter}></div>
          </div>
        </div>
      </BackGround>
      <BackGround2>
        <div className={styles.frame}>
          <BarGraphs />
        </div>
      </BackGround2>

      <div className={styles.gradWrap2}>
        <PayCardsMarque />
        <ExpEdge />
      </div>
      <div className={styles.gradWrap}>
        <Medals />
        <AssetsMarque />
        <BigLetterSection />
      </div>
      <div className={styles.whale}>
        <Whale />
      </div>
      <div className={styles.gemWrap}>
        <GemText />
      </div>
      <div className={styles.gemWrap2}>
        <AiText />
      </div>
      <div className={styles.gemWrap3}>
      </div>
    </div>
  );
};

export default Trading;
