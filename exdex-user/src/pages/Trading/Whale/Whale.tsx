import classes from "./Whale.module.scss";

const Whale = () => {
  return (
    <div className={classes.whaleOuter}>
      <div className={classes.whaleImage}>
        <img src="/assets/images/trade/whale/whale.png" alt="whale" />
      </div>
      <div className={classes.whale}>Swimming along whale</div>
      <div className={classes.chart}></div>
    </div>
  );
};

export default Whale;
