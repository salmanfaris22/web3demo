import { useEffect, useRef, useState } from "react";
import DatePicker from "../../../../../common/Components/Datepicker/Datepicker";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import Search from "../../../../../common/Components/Search/Search";
import { convertISOToCustomFormat } from "../../../../../utils/date";
import classes from "./Filter.module.scss";

export const defaultTabs = [
  {
    name: "Overview",
  },
  {
    name: "Manage",
  },
  {
    name: "Edit",
    hasImage: "/assets/images/edit.png",
  },
];

const Filter = ({
  tabData = defaultTabs,
  onClick,
  viewConfig = { calender: true, filter: true, export: true, search: true },
  activeIndex = 0
}: {
  tabData?: { name: string; hasImage?: string }[];
  onClick?: (tab: string) => void;
  viewConfig?: {
    search: boolean;
    filter: boolean;
    calender: boolean;
    export: boolean;
  };
  activeIndex? : number
}) => {
  const [active, setActive] = useState(activeIndex);
  const [tabs, setTabs] = useState(tabData);
  const setTab = (index: number) => {
    setActive(index);
  };
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRef = useRef<any>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearDate = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    setDateFilter({
      startDate: "",
      endDate: "",
    });
  };

  const toggleDatePicker = () => {
    setShowDatePicker((state) => !state);
  };

  const handleDateSelect = (date: any) => {
    if (date.selection) {
      if (date.selection.startDate != date.selection.endDate) {
        setShowDatePicker(false);
        setDateFilter(date.selection);
      }
    }
  };
  return (
    <PageAnimation>
      <div className={classes.filterOuter}>
        <div className={classes.filterLeft}>
          {tabs.map((item, index: number) => (
            <div
              key={index}
              className={`${classes.filterBtn} ${
                active == index ? classes.active : ""
              }`}
              onClick={() => {
                setTab(index);
                onClick && onClick(item.name);
              }}
            >
              {item.hasImage && (
                <img src={item.hasImage.toString()} alt={item.name} />
              )}
              {item.name}
            </div>
          ))}
        </div>
        <div className={classes.filterRight}>
          {viewConfig.export && (
            <div className={`${classes.filterBtn} ${classes.active}`}>
              Export
              <img src="/assets/images/downloadBlack.png" alt="download" />
            </div>
          )}
          {viewConfig.calender && (
            <div className={classes.dateWrap}>
              <div className={classes.dateFilter} onClick={toggleDatePicker}>
                <img src="/assets/images/dateBlue.png" alt="date" />
                {dateFilter.startDate && dateFilter.endDate && (
                  <>
                    <span
                      title={`${dateFilter.startDate} - ${dateFilter.endDate}`}
                    >
                      {convertISOToCustomFormat(dateFilter.startDate)} -{" "}
                      {convertISOToCustomFormat(dateFilter.endDate)}
                    </span>
                    <img
                      onClick={clearDate}
                      className={classes.cross}
                      src="/assets/images/cross.png"
                      alt="close"
                    />
                  </>
                )}
              </div>
              {showDatePicker && (
                <DatePicker isRange={true} onSelect={handleDateSelect} />
              )}
            </div>
          )}

          {viewConfig?.search && (
            <div className={classes.search}>
              <Search placeholder="Search" />
            </div>
          )}
          {viewConfig?.filter && (
            <div className={classes.filter}>
              <img src="/assets/images/filter2.png" alt="filter" />
              Filter
            </div>
          )}
        </div>
      </div>
    </PageAnimation>
  );
};

export default Filter;
