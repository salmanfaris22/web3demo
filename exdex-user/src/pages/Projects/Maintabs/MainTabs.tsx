import React from "react";
import styles from "./MainTabs.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { routers } from "../../../common/Constants";

const MainTabs = () => {
  const { pathname } = useLocation();

  const locationId = pathname.split("/")[1];

  const navigate = useNavigate();

  return (
    <div className={styles.tabWrapper}>
      <div className={styles.navLinks}>
        <div
          onClick={() => {
            navigate(routers.projects);
          }}
          className={`${styles.navLink}  ${
            locationId === "dexgem" && styles.selected
          }`}
        >
          10x Gem
        </div>
        <div
          onClick={() => {
            navigate(routers.watchlist);
          }}
          className={`${styles.navLink} ${
            locationId === "watchlist" && styles.selected
          }`}
        >
          Watch list
        </div>
      </div>
    </div>
  );
};

export default MainTabs;
