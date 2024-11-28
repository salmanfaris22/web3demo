import React, { useEffect, useState } from "react";
import classes from "./Tab.module.scss";

interface TabItem {
  label: string;
  image?: string;
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

  useEffect(() => {
    setActiveTab(activeIndex);
  }, [activeIndex]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onUpdate(index);
  };

  return (
    <div className={`${classes.tabOuter} ${theme ? classes[theme] : ""}`}>
      <div className={classes.tab}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${classes.tabItem} ${
              activeTab === index ? classes.active : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            {item.image && <img src={item.image} alt={item.label} />}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tab;
