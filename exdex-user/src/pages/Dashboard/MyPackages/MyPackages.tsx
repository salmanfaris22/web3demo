import { useEffect, useState } from "react";
import Tab from "../../../common/Components/Tab/Tab";
import classes from "./MyPackages.module.scss";
import OverviewCard from "../../../common/Components/OverviewCard/OverviewCard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PageAnimation from "../../../common/Components/PageAnimation/PageAnimation";

const MyPackages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tabItems = [
    {
      label: "Upgrade package",
    },
    {
      label: "My packages",
    },
    {
      label: "Passive income history",
    },
  ];
  const [currentTab, setCurrentTab] = useState(1);
  const [currentActive, setActiveTab] = useState(1);
  const [isDetail, setIsDetail] = useState(false);

  useEffect(() => {
    setIsDetail(false);
    if (location) {
      if (location.pathname == "/package/history") {
        setCurrentTab(2);
        setActiveTab(2);
      }
      if (location.pathname.includes("/package/detail")) {
        setIsDetail(true);
      }
    }
  }, [location]);

  const redirect = (url: string) => {
    navigate(url);
  };

  const tabUpdate = (val: any) => {
    setCurrentTab(val);
    switch (val) {
      case 0:
        redirect("/autotrade");
        break;
      case 1:
        redirect("/package");
        break;
      case 2:
        redirect("/package/history");
        break;
    }
  };

  return (
    <PageAnimation>
      <div className={classes.packageWrap}>
        <OverviewCard>
          <div className={classes.packageInner}>
            <div className={classes.tabOut}>
              <Tab
                items={tabItems}
                activeIndex={currentActive}
                onUpdate={tabUpdate}
                theme="line"
              />
            </div>
            <div
              className={`${classes.packageBody} ${
                isDetail ? classes.detailBody : ""
              }`}
            >
              <Outlet />
            </div>
          </div>
        </OverviewCard>
      </div>
    </PageAnimation>
  );
};

export default MyPackages;
