import React, { useEffect, useState } from "react";
import classes from "./NumberInput.module.scss";

interface NumberProps {
  label: string;
  type: string;
  value: string | number | undefined;
  unit?: string;
  reverseunit?: string;
  theme?: string;
  step?: number;
  disabled?: boolean;
  updated: (val: string | number) => void;
  placeholder?: string;
  className?: string;
  minWidth?: string;
}

const NumberInput: React.FC<NumberProps> = ({
  label,
  value,
  type,
  unit,
  reverseunit,
  updated,
  theme = "normal",
  step = 1,
  disabled = false,
  placeholder,
  className,
  minWidth = "auto",
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string | number = event.target.value;
    if (type === "number") {
      newValue = parseInt(event.target.value, 10);
      if (newValue < 0 || isNaN(newValue)) {
        newValue = 0;
      }
    }
    updated(newValue);
  };

  const increment = () => {
    if (disabled) {
      return;
    }
    if (inputValue === undefined) {
      updated(10);
      return;
    }
    const newValue =
      typeof inputValue === "number"
        ? inputValue + (step ? step : 1)
        : parseInt(inputValue as string) + (step ? step : 1);
    updated(newValue);
  };

  const decrement = () => {
    if (disabled) {
      return;
    }
    if (inputValue === 0) {
      return;
    }
    const newValue =
      typeof inputValue === "number"
        ? inputValue - (step ? step : 1)
        : parseInt(inputValue as string) - (step ? step : 1);
    updated(newValue > 0 ? newValue : 0);
  };

  return (
    <div
      className={`${classes.numWrap} ${minWidth == "none" && classes.noMin} ${
        disabled && classes.disabled
      } ${unit && classes.unit}  ${theme === "white" && classes.whiteTheme} ${
        theme === "fontWeight" && classes.fontWeight
      } ${className}`}
    >
      <div className={classes.label}>{label}</div>
      <div className={classes.numberOut}>
        {type === "number" && (
          <div className={classes.minus} onClick={decrement}>
            -
          </div>
        )}
        <div className={classes.inputWrap}>
          {reverseunit && <span className={`${classes.unit} ${classes.revunit}`}>{reverseunit}</span>}
          <input
            type={type}
            placeholder=""
            value={inputValue}
            onChange={handleChange}
          />
          <div title={inputValue + ""} className={classes.actualVal}>
            {inputValue ? inputValue : placeholder ? placeholder : inputValue}
          </div>
          {unit && <span className={classes.unit}>{unit}</span>}
        </div>
        {type === "number" && (
          <div className={classes.plus} onClick={increment}>
            +
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberInput;
