import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserDetails, getUserPlanStatus } from "../../../services/user";
import {
  selectPlanStatus,
  selectToken,
  selectUser,
  setMenuActive,
  setPlanStatus,
  setUser,
} from "../../../store/authSlice";
import { showToast } from "../../../store/toastSlice";
import Menu from "../../Components/Menu/Menu";
import PageAnimation from "../../Components/PageAnimation/PageAnimation";
import Profile from "../../Components/Profile/Profile";
import { bookMarkRoutes, routers } from "../../Constants";
import classes from "./Header.module.scss";

export const HEADER = "APP_HEADER";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const planStatus = useSelector(selectPlanStatus);
  const location = useLocation();
  const user = useSelector(selectUser);
  const [showMenu, setShowMenu] = useState(false);
  const [showBookmark, setShowBookmark] = useState(false);
  const [menuItems, setMenuItems] = useState<any>([]);

  useEffect(() => {
    dispatch(setMenuActive(showMenu));
  }, [showMenu]);

  const bookMarkedPages = [routers.projects, routers.aiSignal];

  useEffect(() => {
    setShowMenu(false);
    if (bookMarkedPages.includes(location.pathname)) {
      setShowBookmark(true);
    } else {
      setShowBookmark(false);
    }
  }, [location]);

  useEffect(() => {
    if (token) {
      getPlanStatus();
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setMenuItems([
        {
          name: "Sign Up",
          url: "/register",
          active: false,
        },
        {
          name: "Sign In",
          url: "/login",
          active: false,
        },
      ]);
    } else {
      // CONTRACT_NOT_SIGNED  = "CONTRACT_NOT_SIGNED"
      // 	PLAN_NOT_PURCHASED   = "PLAN_NOT_PURCHASED"
      // 	CONTRACT_SIGNED      = "CONTRACT_SIGNED"
      switch (planStatus) {
        case "PLAN_NOT_PURCHASED":
          setMenuItems([
            {
              name: "Overview",
              url: "/overview",
              active: false,
            },
            {
              name: "Auto Trade",
              url: "/autotrade",
              active: false,
            },

            // {
            //   name: "Trade",
            //   url: "/test",
            //   disabled: true,
            //   active: false,
            // },
            {
              name: "AI Signal",
              disabled: false,
              url: "/ai-signal",
              active: false,
            },
            {
              name: "Dexgem",
              disabled: false,
              url: "/dexgem",
              active: false,
            },
            // {
            //   name: "Trade GPT",
            //   disabled: true,
            //   url: "/gpt",
            //   active: false,
            // },
            // {
            //   name: "Social DEX",
            //   disabled: true,
            //   url: "/sdex",
            //   active: false,
            // },
            {
              name: "Academy",
              disabled: false,
              url: "/academy",
              active: false,
            },
          ]);
          break;
        case "CONTRACT_NOT_SIGNED":
          setMenuItems([
            {
              name: "Overview",
              url: "/overview",
              active: false,
            },
            {
              name: "Dashboard",
              url: "/participation-agreement",
              active: false,
            },
            {
              name: "Auto Trade",
              url: "/autotrade",
              active: false,
            },
            // {
            //   name: "Trade",
            //   url: "/test",
            //   disabled: true,
            //   active: false,
            // },
            {
              name: "AI Signal",
              disabled: false,
              url: "/ai-signal",
              active: false,
            },
            {
              name: "Dexgem",
              disabled: false,
              url: "/dexgem",
              active: false,
            },
            // {
            //   name: "Trade GPT",
            //   disabled: true,
            //   url: "/gpt",
            //   active: false,
            // },
            // {
            //   name: "Social DEX",
            //   disabled: true,
            //   url: "/sdex",
            //   active: false,
            // },
            {
              name: "Academy",
              disabled: false,
              url: "/academy",
              active: false,
            },
          ]);
          break;
        case "CONTRACT_SIGNED":
          setMenuItems([
            {
              name: "Overview",
              url: "/overview",
              active: false,
            },
            {
              name: "Dashboard",
              url: "/dashboard",
              active: false,
            },
            {
              name: "Auto Trade",
              url: "/autotrade",
              active: false,
            },
            // {
            //   name: "AI Signal",
            //   url: routers.aiSignalReport,
            //   active: false,
            // },
            // {
            //   name: "Academy",
            //   url: "",
            //   active: false,
            // },
            // {
            //   name: "Trade",
            //   url: "/test",
            //   disabled: true,
            //   active: false,
            // },
            {
              name: "AI Signal",
              disabled: false,
              url: "/ai-signal",
              active: false,
            },
            {
              name: "Dexgem",
              disabled: false,
              url: "/dexgem",
              active: false,
            },
            // {
            //   name: "Trade GPT",
            //   disabled: true,
            //   url: "/gpt",
            //   active: false,
            // },
            // {
            //   name: "Social DEX",
            //   disabled: true,
            //   url: "/sdex",
            //   active: false,
            // },
            {
              name: "Academy",
              disabled: false,
              url: "/academy",
              active: false,
            },
          ]);
          break;
        default:
          setMenuItems([
            {
              name: "Overview",
              url: "/overview",
              active: false,
            },
            {
              name: "Auto Trade",
              url: "/autotrade",
              active: false,
            },
            // {
            //   name: "Trade",
            //   url: "/test",
            //   disabled: true,
            //   active: false,
            // },
            {
              name: "AI Signal",
              disabled: false,
              url: "/ai-signal",
              active: false,
            },
            {
              name: "Dexgem",
              disabled: false,
              url: "/dexgem",
              active: false,
            },
            // {
            //   name: "Trade GPT",
            //   disabled: true,
            //   url: "/gpt",
            //   active: false,
            // },
            // {
            //   name: "Social DEX",
            //   disabled: true,
            //   url: "/sdex",
            //   active: false,
            // },
            {
              name: "Academy",
              disabled: false,
              url: "/academy",
              active: false,
            },
          ]);
      }
      getDetails();
    }
  }, [token, planStatus]);

  const toggleMenu = () => {
    setShowMenu((state) => !state);
  };

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
  const getPlanStatus = async () => {
    try {
      const response = await getUserPlanStatus();
      if (response.status) {
        dispatch(setPlanStatus(response.data));
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

  const goTo = (url: string) => {
    navigate(url);
  };

  return (
    <>
      <div className={classes.headerHeight}></div>
      <div className={classes.headerOuter} id={HEADER}>
        <div className={classes.headerInner}>
          <div className={classes.headerMob} onClick={toggleMenu}>
            <img src="/assets/images/sidebar/mobMenu.png" alt="menu" />
          </div>
          <div
            className={`${classes.headerLeft} ${
              token && classes.headerLeftAlign
            }`}
          >
            <div
              className={classes.logo}
              onClick={() => {
                goTo(routers.trade);
              }}
            >
              <img
                src="/assets/images/logo.svg"
                alt="ExDex"
                className="cursor"
              />
              <div className={classes.beta}>BETA</div>
            </div>
            <div className={classes.menu}>
              {showMenu && (
                <PageAnimation left={true}>
                  <div className={classes.overlay} onClick={toggleMenu}></div>
                </PageAnimation>
              )}
              <div className={classes.menuWrapper}>
                <Menu menu={menuItems} showMenu={showMenu} />
              </div>
            </div>
          </div>
          <div className={classes.headerRight}>
            {/* <div className={classes.headerMid}>
              <Search placeholder="Search" type="card" />
            </div> */}
            {/* <div className={classes.notification}>
              <img
                src="/assets/images/header/notification.png"
                alt="notification"
              />
            </div> */}
            {/* <div className={classes.bookmark} onClick={()=>{
              goTo('/checkout/autotrade/cart')
            }}>
              <img src="/assets/images/header/cart.png" alt="cart" />
            </div> */}
            {showBookmark && (
              <div
                className={classes.bookmark}
                onClick={() => {
                  goTo(bookMarkRoutes[location.pathname]);
                }}
              >
                <img src="/assets/images/header/bookmark.png" alt="bookmark" />
              </div>
            )}

            {/* <div className={classes.bookmark}>
              <img src="/assets/images/header/wallet.png" alt="wallet" />
            </div> */}
            {token && <Profile details={user} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
