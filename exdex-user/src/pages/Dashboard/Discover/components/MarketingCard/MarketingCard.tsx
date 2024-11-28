import classes from "./MarketingCard.module.scss";

interface MarketingCardProps {
  title: string;
  image: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const MarketingCard: React.FC<MarketingCardProps> = ({ title, image }) => {
  return (
    <div className={classes.marketCard}>
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className={classes.detail}>{title}</div>
      <div className={classes.coming}>Coming Soon</div>
      {/* <div className={classes.optionsWrap}>
        <div className={classes.option}>
          <img src="/assets/images/download.png" alt="download" />
        </div>
        <div className={classes.option}>
          <img src="/assets/images/share.png" alt="share" />
        </div>
      </div> */}
    </div>
  );
};

export default MarketingCard;
