import React, { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import OverviewCard from "../../../../../common/Components/OverviewCard/OverviewCard";
import classes from "./FilterTable.module.scss";

interface FilterTableProps {
  filterArr: any[];
  filterChanged: (val: any) => void;
}

const FilterTable: React.FC<FilterTableProps> = ({
  filterArr,
  filterChanged,
}) => {
  const [filter, setFilterArr] = useState(filterArr);
  const [activeFilter, setActiveFilter] = useState(0);

  const setActiveFilterMethod = (index: number) => {
    setActiveFilter(index);
    filterChanged(index);
  };

  return (
    <div className={classes.filterOuter}>
      <PageAnimation>
        <OverviewCard>
          <div className={classes.filter}>
            {filter.map((item, index: number) => (
              <div
                className={`${classes.filterItem} ${
                  activeFilter == index ? classes.active : ""
                }`}
                key={item.name}
                onClick={() => {
                  setActiveFilterMethod(index);
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </OverviewCard>
      </PageAnimation>
    </div>
  );
};

export default FilterTable;
