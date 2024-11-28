import { useState } from "react";
import Button from "../../../common/Components/Button/Button";
import PageWrapper from "../../../common/Components/PageWrapper/PageWrapper";
import AICards from "./AICards/AICards";
import styles from "./ExpEdge.module.scss";
import LpCards from "./LpCards/LpCards";
import ReguleCard from "./ReguleCards/Regule";
import RoadMapCard from "./RoadMapCard/RoadMapCard";
import TradeCards from "./TradeCards/TradeCards";
import TypeOfAccCard from "./TypeOfAccCard/TypeOfAccCard";
import "swiper/css";
import "swiper/css/pagination";

const navs = [
  { key: "trade", label: "Trade" },
  { key: "lp", label: "Liquidity Provider" },
  { key: "regulle", label: "Regulle" },
  { key: "type_of_acc", label: "Type Of Account" },
  { key: "ai_insight", label: "AI Insight" },
  { key: "road_map", label: "Product" },
];

const ExpEdge = () => {
  const [activeIndex, setActive] = useState(0);
  return (
    <div className={styles.container}>
      <h2>Experience the Exdex Edge</h2>
      <p>Innovative Features Delivering Exceptional Trading Results</p>
      <PageWrapper className={styles.pageWrapper}>
        <div className={styles.tabWrapper}>
          <div className={styles.nav}>
            {navs.map((n, i) => {
              return (
                <div key={n.key} className={styles.navOuter}>
                  <Button
                    className={`${i === activeIndex && styles.active}`}
                    onClick={() => setActive(i)}
                    theme="light"
                    key={n.key}
                  >
                    {n.label}
                  </Button>
                </div>
              );
            })}
          </div>
          <div className={styles.cardsRow}>
            {activeIndex === 0 && <TradeCards />}
            {activeIndex === 1 && <LpCards />}
            {activeIndex === 2 && <ReguleCard />}
            {activeIndex === 3 && <TypeOfAccCard />}
            {activeIndex === 4 && <AICards />}
            {activeIndex === 5 && <RoadMapCard />}
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default ExpEdge;
