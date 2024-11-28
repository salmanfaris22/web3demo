import SwiperCore from "swiper";
import "swiper/css"; // basic Swiper styles
import "swiper/css/pagination"; // pagination styles
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./WarrorSwiper.module.scss";
SwiperCore.use([Autoplay, Pagination]);

const rewards = [
  {
    tier: "Entry-Level Milestone",
    title: "Start-Up Bonus",
    reward: "$500 Cash Bonus",
    requirements: "3,000 Lots",
    additionSupport: " 1 Month Free Access to AI Signals",
    additionalInfo:
      "Kickstart your journey with Exdex by reaching 3,000 lots traded. Receive a $500 cash bonus and enjoy a complimentary one-month access to our AI-powered trading signals to enhance your trading strategies.",
    theme: "lightGreen",
    img: "/assets/images/ib/slider/w1.png",
  },
  {
    tier: "Mid-Tier Incentive",
    title: "Technology Upgrade",
    reward: "Choice of iPhone 14 or $1,500 Trading Credit",
    requirements: "7,000 Lots",
    additionSupport: "3 Month Free Access to AI Signals",
    additionalInfo:
      "levate your trading experience upon reaching 7,000 lots traded. Choose between the latest iPhone 15 or a $1,500 trading credit. Plus, gain three months of free access to our AI signals to stay ahead in the market.",
    theme: "orange",
    img: "/assets/images/ib/slider/w2.png",
    // Assuming gray color theme from the background
  },
  {
    tier: "High-Tier Reward",
    title: "Luxury Experience",
    reward: "Luxury City Vacation for Two",
    requirements: "25,000 Lots",
    additionSupport: "6 Month Free Access to AI Signals",
    description:
      "weekend getaway to a luxury city destination, including five-star accommodations.",
    additionalInfo:
      "Celebrate your success with a luxury city vacation for two when you reach 25,000 lots traded. Enjoy a weekend in a top-tier city with five-star accommodations. Additionally, receive six months of free access to our AI signals to continue enhancing your trading.",
    theme: "green",
    img: "/assets/images/ib/slider/w3.png",
    // Assuming a darker gray color theme from the background
  },
  {
    tier: "Elite Reward",
    title: "Global Explore",
    reward: "All-Expenses-Paid International Vacation for Two",
    requirements: "100,000 Lots",
    description:
      "Experience a dream destination like Paris, Tokyo, or the Maldives.",
    additionalInfo:
      "Upon trading 100,000 lots, embark on an all-expenses-paid international vacation for two to a dream destination of your choice. Gain one year of free access to both our AI signals and Dex Gem services to empower your trading decisions.",
    theme: "dark",
    img: "/assets/images/ib/slider/w4.png", // Assuming an even darker gray color theme from the background
  },
  {
    tier: "Ultimate Reward",
    title: "Super Car Challenge",
    reward: "Win a Supercar (Worth $150,000)",
    requirements: "200,000 Lots",
    description:
      "A high-performance supercar like a Porsche 911 or equivalent.",
    additionalInfo:
      "Achieve the pinnacle of success by trading 200,000 lots and win a high-performance supercar valued at $150,000. Enjoy lifetime free access to our AI signals and Dex Gem services, ensuring you have the tools to maintain your trading excellence.",
    theme: "black",
    img: "/assets/images/ib/slider/w5.png", // Assuming the darkest color theme from the background
  },
];

function WarrorSwiper() {
  const getTheme = (theme: string) => {
    switch (theme) {
      case "lightGreen":
        return styles.lightGreen;
      case "orange":
        return styles.orange;
      case "green":
        return styles.green;
      case "dark":
        return styles.dark;
      case "black":
        return styles.black;
      default:
        return styles.default;
    }
  };

  return (
    <div className={`${styles.container} autoSwiper`}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          // delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter : true
        }}
        speed={1200}
        pagination={{
          clickable: true,
          bulletActiveClass: styles.swiperPaginationBulletActive, // Custom bullet class
          bulletClass: styles.swiperPaginationBullet,
          modifierClass: styles.swiperMod,
        }}
        style={{ width: "100%", height: "auto" }}
      >
        {rewards.map((reward) => (
          <SwiperSlide key={reward.tier}>
            <div className={`${styles.slide} ${getTheme(reward.theme)}`}>
              <div>
                <h2>{reward.tier}</h2>
                <h3>{reward.title}</h3>
                <div className={styles.subInfo}>
                  <div>
                    Reward: <span>{reward.reward}</span>
                  </div>
                  {reward?.description && (
                    <div>
                      Description: <span>{reward.description}</span>
                    </div>
                  )}
                  <div>
                    Requirement: <span>{reward.requirements}</span>
                  </div>
                  <div>
                    Additional Support: <span>{reward.additionSupport}</span>
                  </div>
                </div>
                <div>{reward.additionalInfo}</div>
              </div>
              <div className={styles.warrior}>
                <img src={reward.img} alt={reward.tier} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default WarrorSwiper;
