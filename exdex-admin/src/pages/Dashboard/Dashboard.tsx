import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../common/Layout/Sidebar/Sidebar";
import ScrollToTop from "../../common/Components/ScrollToTop/ScrollToTop";

import classes from "./Dashboard.module.scss";
import Header from "../../common/Layout/Header/Header";
import PageAnimation from "../../common/Components/PageAnimation/PageAnimation";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearUserAndToken,
  selectToken,
  setPermission,
  setToken,
} from "../../store/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const token = useSelector(selectToken);
  const redirectLogin = () => {
    navigate("/");
  };
  useEffect(() => {
    if (!token) {
      try {
        const storedToken = sessionStorage.getItem("token");
        if (!storedToken) {
          dispatch(clearUserAndToken());
          redirectLogin();
        }
        dispatch(setToken(storedToken + ""));
        const storedPermissions = sessionStorage.getItem("permissions");
        try {
          if (storedPermissions) {
            dispatch(setPermission(JSON.parse(storedPermissions)));
          }
        } catch (e) {}
      } catch (e) {
        redirectLogin();
        console.log(e);
      }
    }
  }, []);

  return (
    <>
      <ScrollToTop containerRef={containerRef} />

      <div className={classes.bodyWrap} ref={containerRef}>
        <PageAnimation top={true}>
          <Header />
        </PageAnimation>
        <main className={classes.dashboard}>
          <div className={classes.dashSide}>
            <PageAnimation left={true}>
              <Sidebar />
            </PageAnimation>
          </div>
          <div className={classes.contentWrap}>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
