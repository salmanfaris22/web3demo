import Ellipse from "./Ellipse/Ellipse";
import HowItWorkCards, {
  IHowItWorkCard,
} from "./HowItWorks/HowItWorkCards/HowItWorkCards";
import HowItWorks from "./HowItWorks/HowItWorks";
import InfoCards from "./InfoCards/InfoCards";
import LevelInfo from "./LevelInfo/LevelInfo";
import styles from "./ReferalProgram.module.scss";
import VideoIntro from "./VideoIntro/VideoIntro";

const howItWorksCard1: IHowItWorkCard[] = [
  {
    title: "Boost Your Income With Every Referral",
    description:
      "Share your unique referral link and start earning commissions from every subscription and activity on Exdex. From AI Signals to Auto Trade, every pro 377.23 x 35.64 can generate ongoing income for you.",
    theme: "light",
  },
  {
    title: "Leverage Our Diverse Product Range",
    description:
      "Our platform offers a variety of products, each with its own commission structure. By sharing your link, you can earn from subscriptions to AI insights, auto trading, and more—making every referral an opportunity.",
    theme: "light",
  },
  {
    title: "Enjoy Passive Income Streams",
    description:
      "Once you refer your link, you can earn passive income from ongoing subscriptions and activities. Share your link and let your network generate continuous revenue for you.",
  },
];
const howItWorksCard2: IHowItWorkCard[] = [
  {
    title: "Unlock Unlimited Earning Potential",
    description:
      "With Exdex, there's no cap on your earnings. Share your referral link and earn commissions from multiple products and services. The more you share, the more you can earn—it's that simple!",
  },
  {
    title: "Capitalize On Cutting-Edge AI Insights",
    description:
      "Refer others to our AI-driven tools like AI Signals and Dex Gem, and earn commissions while helping them access top-notch trading insights. Your referral efforts translate into real earnings for you.",
  },
  {
    title: "Benefit From Our 5-Level Commission Structure",
    description:
      "Our unilevel marketing program rewards you through five levels of commissions. Refer your link and earn from every level of your network's subscriptions and activities, maximizing your income potential.",
  },
];

const ReferalProgram = () => {
  return (
    <div className={styles.container}>
      <VideoIntro />
      <div className={styles.ellips1}>
        <Ellipse />
      </div>
      <InfoCards />
      <LevelInfo />
      <div className={styles.howItWorksCardsContainer}>
        <HowItWorks />
      </div>
      {/* <PageWrapper narrow> */}
      <div className={styles.howItWorksCardsContainer}>
        <div className={styles.howItWorksCards}>
          <HowItWorkCards cardInfo={howItWorksCard1} />
        </div>
        <div className={styles.howItWorksCards}>
          <HowItWorkCards cardInfo={howItWorksCard2} cardSet2 />
        </div>
      </div>
      {/* </PageWrapper> */}
    </div>
  );
};

export default ReferalProgram;
