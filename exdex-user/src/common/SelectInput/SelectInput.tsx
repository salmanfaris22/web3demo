import React, { useEffect, useState, useRef } from "react";
import styles from "./SelectInput.module.scss";
import CaretIcon from "./CaretIcon/CaretIcon";

export interface ISelect {
  name: string;
  value: string;
}

export interface ISelectInput {
  options: any[];
  label?: string;
  value?: any;
  optionKey?: string;
  onChange: (value: unknown) => void;
  id?: string;
  className?:string;
  labelKey?: string
}

const SelectInput = ({
  options,
  label = "Select",
  value,
  optionKey = "name",
  id,
  className,
  labelKey,
  onChange,
}: ISelectInput) => {
  const [isOPen, setIsOpen] = useState(false);
  const [selectedValue, setValue] = useState(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const handleSelectionClick = (emitValue: unknown) => {
    onChange(emitValue);
    setTimeout(() => {
      setIsOpen(false);
    }, 10);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
    <div className={`${styles.container} ${className}`} id={id} ref={containerRef}>
      <div>
        <button onClick={() => setIsOpen(!isOPen)} type="button">
          {selectedValue ? labelKey ? selectedValue[labelKey] : selectedValue : label}
        </button>
        <div className={`${styles.dropDownCaret} ${isOPen && styles.openCaret}`}>
          <CaretIcon />
        </div>
      </div>
      {isOPen && (
        <div className={styles.lisBox} role="listBox">
          {options.map((option) => {
            return (
              <div
                onClick={() => handleSelectionClick(option)}
                className={`${styles.lisItem} ${option[optionKey] === value && styles.selectedListItem}`}
                key={option[optionKey]}
              >
                {option[optionKey]}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectInput;
