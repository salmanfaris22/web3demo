import classes from "./DetailCards.module.scss";

interface DetailCardProps {
  title: string;
  val: string;
  icon: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ title, val, icon }) => {
  return (
    <div className={classes.detailOuter}>
      <div className={classes.icon}>
        <img src={icon} alt="icons" />
      </div>
      <div className={classes.details}>
        <div className={classes.title}>{title}</div>
        <div className={classes.val}>{val}</div>
      </div>
    </div>
  );
};

export default DetailCard;
