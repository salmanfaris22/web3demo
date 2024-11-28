import { Outlet, useNavigate } from "react-router-dom";
import classes from "./NonAuth.module.scss";
import Header from "../../common/Layout/Header/Header";
import PageAnimation from "../../common/Components/PageAnimation/PageAnimation";
import { useSelector, useDispatch } from "react-redux";
import {
  clearUserAndToken,
  selectMenuState,
  selectTenxToken,
  selectToken,
  setTenxToken,
  setToken,
} from "../../store/authSlice";
import Footer from "../../common/Layout/Footer/Footer";
import ScrollToHeader from "../../common/Components/ScrollToHeader/ScrollToHeader";
import { useEffect } from "react";

const NonAuth = () => {
  const dispatch = useDispatch();
  const menuState = useSelector(selectMenuState);
  const token = useSelector(selectToken);
  const tenxToken = useSelector(selectTenxToken);

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
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <>
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

export default NonAuth;
