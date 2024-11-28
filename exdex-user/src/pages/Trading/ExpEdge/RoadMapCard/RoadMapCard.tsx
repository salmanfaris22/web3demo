import { Swiper, SwiperSlide } from "swiper/react";
import { halfSlierConfig } from "../../../../common/Constants";
import TextCards from "../../TextCards/TextCards";
import styles from "./RoadMapCard.module.scss";
import ExpEdgeCard from "../ExpEdgeCard/ExpEdgeCard";
import GPTMeter from "./GPTMeter";
import TextArea from "../../../../common/Components/TextArea/TextArea";
import Button from "../../../../common/Components/Button/Button";

const GptCard = () => {
  return (
    <ExpEdgeCard index={2} className={styles.gptCard}>
      <div className={styles.gptContainer}>
        <h2>Trade GPT</h2>
        <div className={styles.meter}>
          <GPTMeter />
          <div>Mostly Bearish</div>
          <div className={styles.readings}>
            <div>
              4<div>Bearish</div>
            </div>
            <div>
              2<div>Neutral</div>
            </div>
            <div>
              1<div>Bullish</div>
            </div>
          </div>
        </div>
        <div className={styles.title}>
          Explain about the market price of BTC
        </div>
        <div className={styles.textArea}>
          <TextArea
            rows={7}
            value={`# Make a price analysis report of BTC based on data today, make it easy-understanding, key-findings and insights focused on different reports and news.
The current price of Bitcoin (BTC) is 63,049 USD — `}
          />
          <div className={styles.footer}>
            <div className={styles.text}>Ask me about the markets .....</div>
            <Button>
              Send
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
<path d="M10.9754 0.471475C11.0004 0.409009 11.0065 0.340577 10.993 0.274664C10.9795 0.208752 10.9469 0.148256 10.8993 0.100679C10.8517 0.0531009 10.7912 0.0205327 10.7253 0.00701182C10.6594 -0.00650909 10.591 -0.000388145 10.5285 0.0246158L0.52781 4.02504H0.527122L0.216383 4.14879C0.157528 4.17226 0.106308 4.21155 0.0683801 4.26231C0.0304521 4.31307 0.00729258 4.37332 0.00145966 4.43642C-0.00437326 4.49951 0.00734748 4.56299 0.0353272 4.61984C0.0633069 4.6767 0.106457 4.72471 0.16001 4.75858L0.441875 4.93732L0.442563 4.9387L3.87651 7.1235L6.06131 10.5574L6.06268 10.5588L6.24142 10.8407C6.2754 10.894 6.32344 10.937 6.38025 10.9648C6.43706 10.9926 6.50044 11.0042 6.56341 10.9983C6.62638 10.9924 6.68651 10.9692 6.73716 10.9313C6.78782 10.8935 6.82705 10.8423 6.85053 10.7836L10.9754 0.471475ZM9.71524 1.77081L4.56329 6.92275L4.41549 6.69039C4.3884 6.64774 4.35226 6.6116 4.30962 6.58451L4.07725 6.43671L9.2292 1.28476L10.039 0.960958L9.71524 1.77081Z" fill="white"/>
</svg> */}
            </Button>
          </div>
        </div>
      </div>
    </ExpEdgeCard>
  );
};

const BannerCard = () => {
  return (
    <ExpEdgeCard index={3} className={styles.bgCardWrap}>
      <div className={styles.bannerCard}>
        <div className={styles.bg}></div>
        <div className={styles.infoSec}>
          <div className={styles.enrollWrap}>
            <div className={styles.enroll}>1,233 Enrolled</div>
            <div className={`${styles.enroll} ${styles.date} `}>2h 35m</div>
          </div>
          <div className={styles.title}>
            The Basics of Blockchain: Ethereum, Bitcoin, & More
          </div>
          <div className={styles.author}>Alan Ghoski</div>
          <div className={styles.amtWrap}>
            <span className={styles.amt}>$100</span>
            <span className={`${styles.amt} ${styles.amtSlash}`}>$257</span>
          </div>
        </div>
        <div className={styles.registerFooter}>
          <div>
          <span>
            <span className={styles.register}>Register</span> on or before{" "}
            <span className={styles.date}>20-01-2025</span>
          </span>
          </div>
       
        </div>
      </div>
    </ExpEdgeCard>
  );
};
const InfoCard = ()=>{
  return ( <ExpEdgeCard key={4} index={4} className={styles.userCardWrap}>
    <div className={styles.userCard}>
      <div className={styles.proPic}>
        <img src="/assets/images/trade/userGold.png" alt="User" />
        <div className={styles.content}>
          <p>
            if Price stays above 2635, then next target is 2660 and 2678
            and below that 2625.
          </p>
          <p>
            -POSSIBILITY-1Wait (as geopolitical situation are worsening )
          </p>
          <p>
            -POSSIBILITY-2Wait (as geopolitical situation are worsening)
          </p>
        </div>
      </div>
    <div className={styles.shadows} ></div>

    </div>

  </ExpEdgeCard>)
}

const RoadMapCard = () => {
  const getSlides = (isMobile: boolean) => {
    const textCard = isMobile ? (
      <SwiperSlide>
        {" "}
        <TextCards
          index={0}
          title={"Your Trading Style, Your Choice"}
          description={"3 account types to suit every trader"}
        />
      </SwiperSlide>
    ) : (
      <TextCards
        index={1}
        title={"Your Trading Style, Your Choice"}
        description={"3 account types to suit every trader"}
      />
    );
    

    return (
      <>
        {textCard}
      {isMobile ? <SwiperSlide> <GptCard /></SwiperSlide> : <GptCard/> }
      {isMobile ? <SwiperSlide> <BannerCard /></SwiperSlide> : <BannerCard/> }
      {isMobile ? <SwiperSlide> <InfoCard /></SwiperSlide> : <InfoCard/> }
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.desktopSlider}>{getSlides(false)}</div>
      <div className={styles.mobileSlider}>
        <Swiper {...halfSlierConfig}>{getSlides(true)}</Swiper>
      </div>
    </div>
  );
};



export default RoadMapCard;
