import { Outlet } from "react-router-dom";
import classes from "./Permission.module.scss";

const Permission = () => {
  return (
    <div className={classes.permissionOuter}>
      <Outlet />
    </div>
  );
};

export default Permission;
