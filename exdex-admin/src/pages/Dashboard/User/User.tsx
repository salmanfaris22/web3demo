import { Outlet } from "react-router-dom";
import Filter from "./Sections/Filter/Filter";
import FilterTable from "./Sections/FilterTable/FilterTable";
import OverviewSec from "./Sections/Overview/Overview";
import classes from "./User.module.scss";

const User = () => {
  return (
    <div className={classes.userOuter}>
      <Outlet />
    </div>
  );
};

export default User;
