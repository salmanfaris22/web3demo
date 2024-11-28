import Carousel from "../../common/Components/Carousel/Carousel";
import CountDownCounter from "../../common/Components/CountDownCounter/CountDownCounter";
import styles from "./AffiliateMarketing.module.scss";
import CountCard from "./CountCard/CountCard";
import InsightsCard from "./InsightsCard/InsightsCard";
import MoneyCountCard from "./MoneyCountCard/MoneyCountCard";
import ProfitCalculator from "./ProfitCalculator/ProfitCalculator";
import SignupCard from "./SignupCard/SignupCard";
import SliderCard from "./SliderCard/SliderCard";

const AffiliateMarketing = () => {
  return (
    <div className={styles.container}>
      <Carousel />
      <h1> Trusted by global influencers</h1>
      <div className={styles.counterWrapper}>
        <CountDownCounter
          infoText="Global crypto affiliates"
          from={0}
          to={100}
          duration={1}
        />
        <CountDownCounter
          infoText="Countries/regions covered"
          from={0}
          to={120}
          duration={1}
        />
        <CountDownCounter
          infoText="Potential earnings (USDT/month)"
          from={3000000}
          to={4000000}
          duration={1}
        />
      </div>

      <div className={styles.affiliateCardsWrapper}>
        <div className={styles.sections}>
          <MoneyCountCard />
          <InsightsCard />
        </div>
        <div className={styles.sections}>
          <CountCard />
          <SliderCard />
        </div>
        <div className={styles.calculator}>
        <h2>Profit Calculator</h2>
        <p>Discover Your Earning Potential with Our Enhanced Affiliate Commission Programs</p>
        <ProfitCalculator /> 
        </div>

        <SignupCard />
      </div>
    </div>
  );
};

export default AffiliateMarketing;
