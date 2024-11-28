import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./Signal.module.scss";

const Signal = () => {
  return (
    <div className={classes.binaryWrap}>
      <OverviewCard type="fullHeight">
        <div className={classes.binaryInner}>
          <div className={classes.head}>AI Signal</div>
          <div className={classes.signalWrap}>
            <div className={classes.signalImg}>
              <img src="/assets/images/aiSig/aiSig1.png" alt="signal" />
            </div>
            <div className={classes.signalImg}>
              <img src="/assets/images/aiSig/aiSig2.png" alt="signal" />
            </div>
            <div className={classes.signalImg}>
              <img src="/assets/images/aiSig/aiSig3.png" alt="signal" />
            </div>
          </div>
        </div>
      </OverviewCard>
    </div>
  );
};

export default Signal;
