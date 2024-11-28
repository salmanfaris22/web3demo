import React from "react";
import classes from "./Menu.module.scss";
import { NavLink } from "react-router-dom";

interface MenuItem {
  name: string;
  url: string;
  active: boolean;
  icon: string;
  iconHover: string;
}

interface MenuProps {
  menu: MenuItem[];
}
const Menu: React.FC<MenuProps> = ({ menu }) => {
  return (
    <div className={classes.menuWrap}>
      <div className={classes.menuItems}>
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.url}
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            <div className={classes.menuItem}>
              <div className={classes.imgWrap}>
                <img className={classes.img} src={item.icon} />
                <img className={classes.hover} src={item.iconHover} />
              </div>
              <div className={classes.nameItem}>{item.name}</div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Menu;
