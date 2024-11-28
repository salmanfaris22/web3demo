import { useEffect, useState } from "react";
import PageAnimation from "../../common/Components/PageAnimation/PageAnimation";
import Tab from "../../common/Components/Tab/Tab";
import classes from "./Academy.module.scss";
import AcademyCard from "./AcademyCard/AcademyCard";

const Academy = () => {
  const tabItems = [
    {
      label: "Basic Courses",
    },
    {
      label: "Intermediate Courses",
    },
    {
      label: "Advance Courses",
    },
  ];
  const beginnerCards = [
    {
      name: "Trading Basics: Your First Steps into the Financial Markets",
      duration: "2h 35m",
      views: 1200,
      rating: "4.0",
    },
    {
      name: "Intro to Trading: Understanding Markets, Charts, and Strategies",
      duration: "2h 35m",
      views: 1200,
      rating: "4.0",
    },
    {
      name: "Fundamentals of Trading: Learn to Navigate the Market",
      duration: "2h 35m",
      views: 1200,
      rating: "4.0",
    },
    {
      name: "Beginner’s Roadmap: Foundations of Financial Trading",
      duration: "2h 35m",
      views: 1200,
      rating: "4.0",
    },
  ];
  const intermediateCards = [
    {
      name: "Level Up Your Trading: Intermediate Analysis and Strategy",
      duration: "2h 35m",
      views: 1200,
      rating: "4.0",
    },
    {
      name: "Trading Insights: Mastering Charts and Building Strategies",
      duration: "2h 35m",
      views: 1200,
      rating: "4.0",
    },
    {
      name: "Next-Level Trading: From Analysis to Action",
      duration: "2h 35m",
      views: 1200,
      rating: "4.0",
    },
    {
      name: "Market Mastery: Essential Skills for Intermediate Traders",
      duration: "2h 35m",
      views: 1200,
      rating: "4.0",
    },
  ];
  const advancedCards = [
    {
      name: "Trading Pro: Advanced Techniques for the Experienced Trader",
      duration: "2h 35m",
      views: 1200,
      rating: "4.0",
    },
    {
      name: "The Complete Trader: Advanced Skills and Strategy Mastery",
      duration: "2h 35m",
      views: 1200,
      rating: "4.0",
    },
    {
      name: "Beyond Technicals: Advanced Trading Tactics and Psychology",
      duration: "2h 35m",
      views: 1200,
      rating: "4.0",
    },
    {
      name: "Expert Trading: Achieving Professional-Level Market Mastery",
      duration: "2h 35m",
      views: 1200,
      rating: "4.0",
    },
  ];
  const [currentTab, setCurrentTab] = useState(0);
  const [currentActive, setActiveTab] = useState(0);
  const [cards, setCards] = useState(beginnerCards);

  useEffect(() => {
    if (currentTab == 0) {
      setCards(beginnerCards);
    }
    if (currentTab == 1) {
      setCards(intermediateCards);
    }
    if (currentTab == 2) {
      setCards(advancedCards);
    }
  }, [currentTab]);

  const tabUpdate = (val: any) => {
    setCurrentTab(val);
  };

  return (
    <PageAnimation>
      <div className={classes.container}>
        <div className={classes.head}>We are coiming soon.....</div>
        <div className={classes.tabOuter}>
          <Tab
            items={tabItems}
            activeIndex={currentActive}
            onUpdate={tabUpdate}
            theme="lineBot"
          />
        </div>
        <div className={classes.cardOuter}>
          {cards.map((item, index) => (
            <div className={classes.cardItem}>
              <AcademyCard
                key={index}
                title={item.name}
                duration={item.duration}
                views={item.views}
                rating={item.rating}
              />
            </div>
          ))}
          <div className={classes.cardItem}></div>
          <div className={classes.cardItem}></div>
          <div className={classes.cardItem}></div>
        </div>
      </div>
      <div className={classes.bottom}></div>
    </PageAnimation>
  );
};

export default Academy;
