import { Outlet, useNavigate } from "react-router-dom";
import classes from "./Auth.module.scss";
import { getCountryCode } from "../../services/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlanStatus,
  selectTenxToken,
  selectToken,
  setCountryCodes,
  setPlanStatus,
  setTenxToken,
  setToken,
} from "../../store/authSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const tenxToken = useSelector(selectTenxToken);
  const planStatus = useSelector(selectPlanStatus);

  const navigate = useNavigate();

  useEffect(() => {
    getCountryCodeMethod();
  }, []);

  useEffect(() => {
    if (!token) {
      try {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
          dispatch(setToken(storedToken + ""));
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
          redirect("/");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      redirect("/");
    }
   
  }, []);

  useEffect(() => {
    if (!planStatus) {
      try {
        const storedPlanStatus = sessionStorage.getItem("planStatus");
        if (storedPlanStatus) {
          dispatch(setPlanStatus(storedPlanStatus + ""));
        } else {
          dispatch(setPlanStatus("PLAN_NOT_PURCHASED"));
        }
      } catch (e) {
        console.log(e);
        dispatch(setPlanStatus("PLAN_NOT_PURCHASED"));
      }
    }
  }, [planStatus]);

  const redirect = (url: string) => {
    navigate(url);
  };

  const getCountryCodeMethod = async () => {
    try {
      const response = await getCountryCode();
      if (response.status) {
        dispatch(setCountryCodes(response.data));
      }
    } catch (err) {
    } finally {
    }
  };

  return (
    <div className={classes.globalOuter}>
      <div className={classes.authWrap}>
        <div
          className={classes.logo}
          onClick={() => {
            redirect("/");
          }}
        >
          <img src="/assets/images/logo2.png" alt="logo" />
        </div>
        <div className={classes.authLeft}>
          <div className={classes.imgWrap}>
            {/* <img src="/assets/images/login.png" alt="greeny" /> */}
          </div>
        </div>
        <div className={classes.authRight}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
