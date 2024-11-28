import React, { useEffect, useRef, useState } from "react";
import classes from "./SelectCoin.module.scss";
import { IMAGE_URL } from "../../../../../config";

interface SelectCoinProps {
  options: any[];
  suggestionList?: any[];
  keyName?: string;
  suggestionKey?: string;
  updateParent?: (param: any) => void;
}

const SelectCoin: React.FC<SelectCoinProps> = ({
  options,
  suggestionList,
  keyName = "name",
  suggestionKey = "name",
  updateParent,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const selectItem = (event: any, item: any) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedItem(item);
    setIsOpen(false);
  };

  useEffect(() => {
    if (updateParent) {
      updateParent(selectedItem);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (options && options.length) {
      setSelectedItem(options[0]);
    }
  }, [options]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${classes.selectOuter} ${isOpen && classes.active}`}
      ref={containerRef}
    >
      <div className={classes.container} onClick={toggleDropdown}>
        <div className={classes.topWrap}>
          <span className={classes.icon}>
            <img src={`${IMAGE_URL}/${selectedItem.logo}`} alt="coin" />
          </span>
          <span className={classes.mainText}>{selectedItem[keyName]}</span>
          <span className={classes.text}>{selectedItem[suggestionKey]}</span>
          <span className={classes.dropdown}>
            <img src="/assets/images/arrowDown.png" alt="arrow" />
          </span>
        </div>
        <div
          className={`${classes.optionsContainer} ${
            isOpen ? classes.open : ""
          }`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={classes.option}
              onClick={(event) => {
                selectItem(event, option);
              }}
            >
              <span className={classes.logoImg}>
                <img src={`${IMAGE_URL}/${option.logo}`} alt="coin" />
              </span>
              {option[suggestionKey]}{" "}
              <span className={classes.suggestionName}>{option[keyName]}</span>
            </div>
          ))}
        </div>
      </div>
      {suggestionList && (
        <div className={classes.suggestionList}>
          {suggestionList?.map((item, index) => (
            <div
              key={index}
              className={classes.suggestionListItem}
              onClick={(event) => {
                selectItem(event, item);
              }}
            >
              <img src={`${IMAGE_URL}/${item.logo}`} alt="coin" />
              <span>{item[suggestionKey]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectCoin;
