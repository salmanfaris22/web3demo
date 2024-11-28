import classes from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={classes.sideBar}>
      <div className={classes.sideBarIcon}>
        <img
          className={classes.des}
          src="/assets/images/sidebar/menu.png"
          alt="menu"
        />
        <img
          className={classes.mob}
          src="/assets/images/sidebar/mobMenu.png"
          alt="menu"
        />
      </div>
    </div>
  );
};

export default Sidebar;
