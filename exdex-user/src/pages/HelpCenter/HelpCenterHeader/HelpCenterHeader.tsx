import React from "react";
import styles from "./HelpCenterHeader.module.scss";
import HelpSearch from "../HelpSearch/HelpSearch";
import { NavLink } from "react-router-dom";
import { routers } from "../../../common/Constants";

const HelpCenterHeader = () => {
  return (
    <div className={styles.container}>
      <h1>Help Center</h1>
      <h2>How Can we Help?</h2>
      <div className={styles.searchWrap}>
        <HelpSearch />
      </div>
      <div className={styles.myHelpTickets}>
        <NavLink to={routers.tickets}>My Support Tickets</NavLink>
      </div>
    </div>
  );
};

export default HelpCenterHeader;
