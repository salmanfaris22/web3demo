import Profile from "../../Components/Profile/Profile";
import Search from "../../Components/Search/Search";
import classes from "./Header.module.scss";
import { getUserDetails } from "../../../services/user";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../store/toastSlice";
import { useEffect } from "react";
import { selectToken, selectUser, setUser } from "../../../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      getDetails();
    }
  }, [token]);

  const getDetails = async () => {
    try {
      const response = await getUserDetails();
      if (response.status) {
        dispatch(setUser(response.data));
      }
    } catch (err: any) {
      try {
        if (err.response.data.error) {
          dispatch(
            showToast({
              message: err.response.data.error,
              type: "error",
              timeout: 5000,
            })
          );
        }
      } catch (e) {
        console.log(e);
      }
    } finally {
    }
  };

  return (
    <>
      <div className={classes.headerHeight}></div>
      <div className={classes.headerOuter}>
        <div className={classes.headerInner}>
          <div className={classes.headerMob}>
            <img src="/assets/images/sidebar/mobMenu.png" alt="menu" />
          </div>
          <div className={classes.headerLeft}>
            <div className={classes.logo}>
              <img src="/assets/images/logo.png" alt="ExDex" />
            </div>
          </div>
          <div className={classes.headerRight}>
            <div className={classes.notification}>
              <img
                src="/assets/images/header/notification.png"
                alt="notification"
              />
            </div>
            <Profile details={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
