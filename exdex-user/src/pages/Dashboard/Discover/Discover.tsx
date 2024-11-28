import Binary from "./Sections/Binary/Binary";
import classes from "./Discover.module.scss";
import BinaryDetailed from "./Sections/BinaryDetailed/BinaryDetails";
import History from "./Sections/History/History";
import UniLevel from "./Sections/UniLevel/UniLevel";
import Visits from "./Sections/Visits/Visits";
import Marketing from "./Sections/Marketing/Marketing";
import { useSelector } from "react-redux";
import { selectDiscoverLoad } from "../../../store/loadSectionsSlice";
import Bubbles from "./Sections/Bubbles/Bubbles";
import { selectPlanStatus } from "../../../store/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Discover = () => {
  const navigate = useNavigate();
  const loadSection = useSelector(selectDiscoverLoad);
  const planStatus = useSelector(selectPlanStatus);

  useEffect(() => {
    if (planStatus == "PLAN_NOT_PURCHASED") {
      navigate("/autotrade");
    }
    if (planStatus == "CONTRACT_NOT_SIGNED") {
      navigate("/participation-agreement");
    }
  }, [planStatus]);

  return (
    <div className={classes.discoverWrap}>
      {loadSection > -1 && (
        <>
          <div className={classes.disItemWrap}>
            <Visits />
          </div>
          <div className={classes.disItemWrap}>
            <Binary />
          </div>
        </>
      )}
      {loadSection > 1 && (
        <>
          <div className={classes.disItemWrap}>
            <BinaryDetailed />
          </div>
          <div className={classes.disItemWrap}>
            <Bubbles />
          </div>
          <div className={classes.disItemWrap}>
            <UniLevel />
          </div>
        </>
      )}
      {loadSection > 3 && (
        <div className={classes.disItemWrap}>
          <History />
        </div>
      )}
      {loadSection > 4 && (
        <div className={classes.disItemWrap}>
          <Marketing />
        </div>
      )}
    </div>
  );
};

export default Discover;
