import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../common/Layout/Sidebar/Sidebar";
import ScrollToTop from "../../common/Components/ScrollToTop/ScrollToTop";

import classes from "./Dashboard.module.scss";
import Header from "../../common/Layout/Header/Header";
import PageAnimation from "../../common/Components/PageAnimation/PageAnimation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearUserAndToken,
  selectToken,
  setToken,
  selectMenuState,
  selectTenxToken,
  setTenxToken,
  setAiPlanStatus,
  setDexPlanStatus,
  selectTriggerPlans
} from "../../store/authSlice";
import { pingStatus } from "../../services/ping";
import Footer from "../../common/Layout/Footer/Footer";
import ScrollToHeader from "../../common/Components/ScrollToHeader/ScrollToHeader";
import { getAiDexPurchaseStatus } from "../../services/payment";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const tenxToken = useSelector(selectTenxToken);
  const menuState = useSelector(selectMenuState);
  const triggerPlanStatus = useSelector(selectTriggerPlans);

  const redirectLogin = () => {
    navigate("/");
  };
  useEffect(() => {
    if (!token) {
      try {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken && storedToken != "null") {
          dispatch(setToken(storedToken));
          if (!tenxToken) {
            try {
              const storedTenxToken = sessionStorage.getItem("tenxToken");
              if (storedTenxToken) {
                dispatch(setTenxToken(storedTenxToken + ""));
              }
            } catch (e) {
              console.log(e);
            }
          }
        } else {
          dispatch(clearUserAndToken());
          redirectLogin();
        }
      } catch (e) {
        redirectLogin();
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      getplanStatus();
      pingServer();
      let pingInterval = setInterval(() => {
        pingServer();
      }, 10000);
      return () => clearInterval(pingInterval);
    }
  }, [token]);

  const pingServer = async () => {
    try {
      const response = await pingStatus();
      if (response.status) {
      }
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    if (triggerPlanStatus) {
      getplanStatus();
    }
  }, [triggerPlanStatus]);

  const getplanStatus = async () => {
    try {
      const response = await getAiDexPurchaseStatus();
      if (response.status) {
        if (response.data) {
          dispatch(setAiPlanStatus(response.data.ai_signal_active));
          dispatch(setDexPlanStatus(response.data.dex_gem_active));
        }
      }
    } catch (err) {
    } finally {
    }
  };

  return (
    <>
      {/* <div className={classes.dashSide}>
        <PageAnimation left={true}>
          <Sidebar />
        </PageAnimation>
      </div> */}
      <ScrollToHeader />

      <div
        className={`${classes.bodyWrap} ${menuState && classes.overflowHidden}`}
      >
        <div className={classes.headerWrap}>
          <PageAnimation top={true}>
            <Header />
          </PageAnimation>
        </div>
        <main className={classes.dashboard}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
