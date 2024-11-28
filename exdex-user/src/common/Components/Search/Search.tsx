import React, { HTMLInputTypeAttribute, useEffect, useState } from "react";
import classes from "./Search.module.scss";

interface SearchProps {
  placeholder: string;
  type?: "dark" | "light" | "tradesignal" | "card";
  cssClass?: string;
  inputType?: HTMLInputTypeAttribute;
  handleOnChange?: (value: string) => void;
  onEnter?: boolean;
  onFocusOut?: boolean;
  fireOnOnChange?: boolean
  ipValue?:string
}
const Search: React.FC<SearchProps> = ({
  placeholder,
  type = "light",
  cssClass,
  inputType = "text",
  handleOnChange,
  onEnter,
  onFocusOut,
  ipValue,
  fireOnOnChange = true
}) => {
  const [value, setValue] = useState(ipValue || "");

  useEffect(() => {
    setValue(ipValue || "");
  }, [ipValue]);

  const emitChange = () => {
    if (handleOnChange) {
      handleOnChange(value);
    }
  };

  const getStylesfromtype = () => {
    if (type === "dark") {
      return classes.dark;
    }
    if (type === "tradesignal") {
      return classes.tradeSignal;
    }
    if (type === "card") {
      return classes.lightcard;
    }
  };

  return (
    <div className={`${classes.search} ${getStylesfromtype()} ${cssClass}`}>
      <input
        type={inputType}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) {
            emitChange();
          }
        }}
        onBlur={() => {
          if (onFocusOut) {
            emitChange();
          }
        }}
        onInput={(e) => {
          const v = (e.target as HTMLInputElement).value;
          setValue(v);
  

          // If cleared, trigger handleOnChange
          if (v === "" || (fireOnOnChange && !onEnter && !onFocusOut)) {
            if(handleOnChange){
              handleOnChange(v);
            }
          }
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Search;
