import React from "react";
import classes from "./Menu.module.scss";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/toastSlice";

interface MenuItem {
  name: string;
  url: string;
  active: boolean;
  disabled?: boolean;
}

interface MenuProps {
  menu: MenuItem[];
  showMenu?: boolean;
}
const Menu: React.FC<MenuProps> = ({ menu, showMenu = false }) => {
  const dispatch = useDispatch();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    disabled?: boolean
  ) => {
    if (disabled) {
      e.preventDefault();
      dispatch(
        showToast({
          message: "Coming Soon...",
          type: "error",
          timeout: 5000,
        })
      );
    }
  };
  return (
    <div className={`${classes.menuWrap} ${showMenu && classes.showMenu}`}>
      <div className={classes.menuItems}>
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.url}
            className={({ isActive }) => (isActive ? classes.active : "")}
            onClick={(e) => handleClick(e, item.disabled)} // Handle click event
            title={item.disabled ? "Coming Soon" : item.name}
          >
            <div className={classes.menuItem}>{item.name}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Menu;
