import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import { getFirstLetter } from "../../../../../utils/name";
import classes from "./TeamCard.module.scss";

interface TeamCardModel {
  name: string;
  members: number;
  image: string;
  expanded: boolean;
  onToggle: () => void;
  showToggle: boolean;
  showArrow: boolean;
}

const TeamCard: React.FC<TeamCardModel> = ({
  name,
  members,
  image,
  expanded = false,
  onToggle,
  showToggle,
  showArrow,
}) => {
  return (
    <div className={classes.wrap}>
      <PageAnimation left={true}>
        <div className={classes.cardOuter}>
          <div className={`${classes.image} ${showArrow && classes.showBefore}`}>
            <div
              className={classes.imageBg}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div className={classes.imageName}>{getFirstLetter(name)}</div>
          </div>
          <div className={classes.details}>
            <div className={classes.name}>{name}</div>
            <div className={classes.members}>{members} members</div>
          </div>
          {showToggle && (
            <div className={classes.expandCollapse} onClick={onToggle}>
              {expanded ? (
                <img src="/assets/images/minus.png" alt="minus" />
              ) : (
                <img src="/assets/images/plus.png" alt="plus" />
              )}
            </div>
          )}
        </div>
      </PageAnimation>
    </div>
  );
};

export default TeamCard;
