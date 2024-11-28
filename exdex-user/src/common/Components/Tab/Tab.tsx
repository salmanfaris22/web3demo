import React, { useEffect, useState } from "react";
import classes from "./Tab.module.scss";

interface TabItem {
  label: string;
}

interface TabProps {
  items: TabItem[];
  activeIndex?: number;
  onUpdate: (val: any) => void;
  theme?: string;
}

const Tab: React.FC<TabProps> = ({
  items,
  activeIndex = 0,
  onUpdate,
  theme,
}) => {
  const [activeTab, setActiveTab] = useState(activeIndex);
  const [showOptions, setShowOptions] = useState(false);

  const handleTabClick = (index: number) => {
    setShowOptions(false);
    setActiveTab(index);
    onUpdate(index);
  };

  useEffect(() => {
    if (activeIndex) {
      setActiveTab(activeIndex);
    }
  }, [activeIndex]);

  const toggleOptions = () => {
    setShowOptions((state) => !state);
  };

  return (
    <div
      className={`${classes.tabOuter} ${theme ? classes[theme] : ""} ${
        showOptions ? classes.showPop : ""
      }`}
    >
      <div className={classes.activeTab} onClick={toggleOptions}>
        {items[activeTab].label}
        <img src="/assets/images/arrowGreen.png" alt="arrow" />
      </div>
      <div className={classes.tab}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${classes.tabItem} ${
              activeTab === index ? classes.active : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tab;
