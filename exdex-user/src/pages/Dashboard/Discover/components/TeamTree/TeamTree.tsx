import React, { useEffect, useState } from "react";
import TeamCard from "../TeamCard/TeamCard";
import classes from "./TeamTree.module.scss";

interface TeamTreeProps {
  data: any;
  level: number;
  getChildren: (data: any) => void;
}

const TeamTree: React.FC<TeamTreeProps> = ({ data, level, getChildren }) => {
  const [expanded, setExpanded] = useState(false);
  console.log(data, level);

  const toggleExpand = () => {
    if (level < 3) {
      setExpanded(!expanded);
    }
  };

  useEffect(() => {
    if (expanded) {
      getChildren(data);
    }
  }, [expanded]);

  return (
    <div className={classes.treeNode}>
      <TeamCard
        name={data.full_name}
        members={data.member_count}
        image={data.avatar_url}
        expanded={expanded}
        onToggle={toggleExpand}
        showToggle={level < 3 && data.member_count > 0}
        showArrow={level > 1 ? true : false}
      />
      <div
        className={`${classes.childNodeWrap} ${
          level == 1 ? classes.childNodeWrapPos : ""
        }`}
      >
        {expanded && data.children && (
          <div
            className={`${classes.childNodes} ${
              level == 1 ? classes.childNodePos : ""
            } ${level == 2 ? classes.childNodePos2 : ""} ${
              data.children && data.children.length > 1 && classes.hasBefore
            }`}
          >
            {data.children.map((child: any, index: number) => (
              <TeamTree
                key={index}
                data={child}
                level={level + 1}
                getChildren={getChildren}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamTree;
