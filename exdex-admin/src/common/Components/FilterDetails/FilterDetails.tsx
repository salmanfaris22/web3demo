import React, { useEffect, useRef, useState } from "react";
import PageAnimation from "../PageAnimation/PageAnimation";
import Search from "../Search/Search";
import classes from "./FilterDetails.module.scss";
import DatePicker from "../Datepicker/Datepicker";
import { convertISOToCustomFormat } from "../../../utils/date";
import Toggle from "../Toggle/Toggle";

interface FilterDetailsProps {
  searching?: boolean;
  searchResult?: any[];
  searchNameKey?: string;
  getSearchResult?: (val: any) => void;
  selectedItem?: (val: any) => void;
  isOnline?: string;
  exportMethod?: () => void;
  tabsArr: any[];
  triggerAction?: (val: any) => void;
  enableDate: boolean;
  enableSearch: boolean;
  handleDateSelect?: (val: any) => void;
  listDisplayKey?: string;
  showSuggestion?: boolean;
  activeIndex?: number;
  freeAccess?: boolean;
  freeAccessVal?: boolean;
  handleFreeAccess?: (val: any) => void;
  dexOnly?: boolean;
  dexOnlyVal?: boolean;
  handleDexOnlyAccess?: (val: any) => void;
  freeze?: boolean;
  freezeVal?: boolean;
  handleFreezeAccess?: (val: any) => void;
}

const FilterDetails: React.FC<FilterDetailsProps> = ({
  searching,
  searchResult,
  searchNameKey,
  getSearchResult,
  selectedItem,
  isOnline,
  exportMethod,
  triggerAction,
  tabsArr,
  enableDate,
  enableSearch,
  handleDateSelect,
  listDisplayKey = "full_name",
  showSuggestion = true,
  activeIndex = 0,
  freeAccess,
  freeAccessVal,
  handleFreeAccess,
  dexOnly,
  dexOnlyVal,
  handleDexOnlyAccess,
  freeze,
  freezeVal,
  handleFreezeAccess,
}) => {
  const [active, setActive] = useState(activeIndex);
  const [tabs, setTabs] = useState<any>([]);

  useEffect(() => {
    setTabs(tabsArr);
  }, [tabsArr]);

  const setTab = (index: number) => {
    if (tabs[index]["type"] == "tab") {
      setActive(index);
    }
    if (tabs[index]["type"] == "button") {
      if (tabs[index]["action"] == "trigger") {
        if (triggerAction) {
          triggerAction(tabs[index]["name"]);
        }
      }
    }
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
    if (handleDateSelect) {
      handleDateSelect({
        selection: {
          startDate: "",
          endDate: "",
        },
      });
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker((state) => !state);
  };

  const handleDateSelectMethod = (date: any) => {
    if (date.selection) {
      if (date.selection.startDate != date.selection.endDate) {
        setShowDatePicker(false);
        setDateFilter(date.selection);
        if (handleDateSelect) {
          handleDateSelect(date);
        }
      }
    }
  };
  return (
    <PageAnimation>
      <div className={classes.filterOuter}>
        <div className={classes.filterLeft}>
          {tabs.map((item: any, index: number) => (
            <div
              key={index}
              className={`${classes.filterBtn} ${
                active == index ? classes.active : ""
              }`}
              onClick={() => {
                setTab(index);
              }}
            >
              {item.hasImage && (
                <img
                  src={item.Imgurl ? item.Imgurl : "/assets/images/edit.png"}
                  alt={item.title}
                />
              )}
              {item.name}
            </div>
          ))}
          {isOnline && (
            <div className={`${classes.filterBtn} ${classes.statusBtn}`}>
              <div className={classes[isOnline]}></div>
              {isOnline}
            </div>
          )}
          {freeAccess && (
            <div className={classes.free}>
              <Toggle
                value={freeAccessVal === undefined ? false : freeAccessVal}
                onToggleChange={handleFreeAccess}
              ></Toggle>
              Free access
            </div>
          )}
          {dexOnly && (
            <div className={classes.free}>
              <Toggle
                value={dexOnlyVal === undefined ? false : dexOnlyVal}
                onToggleChange={handleDexOnlyAccess}
              ></Toggle>
              Only Dex token
            </div>
          )}
          {freeze && (
            <div className={classes.free}>
              <Toggle
                value={freezeVal === undefined ? false : freezeVal}
                onToggleChange={handleFreezeAccess}
              ></Toggle>
              Freeze
            </div>
          )}
        </div>

        <div className={classes.filterRight}>
          {exportMethod && (
            <div
              className={`${classes.filterBtn} ${classes.active}`}
              onClick={exportMethod}
            >
              Export
              <img src="/assets/images/downloadBlack.png" alt="download" />
            </div>
          )}
          {enableDate && (
            <div className={classes.dateWrap} ref={dateRef}>
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
                <DatePicker isRange={true} onSelect={handleDateSelectMethod} />
              )}
            </div>
          )}
          {enableSearch && (
            <div className={classes.search}>
              <Search
                placeholder="Search"
                searching={searching}
                searchResult={searchResult}
                searchNameKey={searchNameKey}
                getSearchResult={getSearchResult}
                selectedItem={selectedItem}
                showSuggestion={showSuggestion}
                listDisplayKey={listDisplayKey}
              />
            </div>
          )}

          {/* <div className={classes.filter}>
            <img src="/assets/images/filter2.png" alt="filter" />
            Filter
          </div> */}
        </div>
      </div>
    </PageAnimation>
  );
};

export default FilterDetails;
