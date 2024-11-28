import { Outlet, useNavigate } from "react-router-dom";
import classes from "./Auth.module.scss";
import { getCountryCode } from "../../services/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, setCountryCodes, setToken } from "../../store/authSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
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
          redirect("/overview");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      redirect("/overview");
    }
  }, []);

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
        <div className={classes.logo}>
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
