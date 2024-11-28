import React, { useEffect, useState } from "react";
import styles from "./CalculatorInput.module.scss";

const ArrowIcon = ({
  isLeft,
  isFocused,
  onClick,
}: {
  isLeft?: boolean;
  isFocused: boolean;
  onClick: () => void;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="15"
    viewBox="0 0 10 15"
    fill="none"
    style={{
      transform: isLeft ? "rotate(180deg)" : "",
      fill: isFocused ? "#CCFC50" : "rgba(174, 229, 209, 1)",
      cursor: "pointer", // Make the arrows clickable
    }}
    onClick={onClick} // Handle clicks for increment or decrement
  >
    <path d="M3.98382 7.54092L9.71875 1.80599L8.08053 0.167774L0.707387 7.54092L8.08053 14.9141L9.71875 13.2758L3.98382 7.54092Z" />
  </svg>
);

const CalculatorInput = ({
  comission,
  label,
  onBlur,
}: {
  label: string;
  comission: number;
  onBlur?: (value: string) => void;
}) => {
  const [isFocused, setIsFocus] = useState(false);
  const [inputValue, setInputValue] = useState("0");

  useEffect(() => {
    if (onBlur) {
      onBlur(inputValue);
    }
  }, [inputValue]);

  const handleArrowClick = (increment: boolean) => {
    setInputValue((prevValue) => {
      const currentValue = parseInt(prevValue || "0", 10);
      const updatedValue = increment
        ? currentValue + 1
        : Math.max(currentValue - 1, 0);
      return updatedValue.toString();
    });
  };

  return (
    <div className={styles.levelInput}>
      <div>
        <div className={styles.levelName}>{label}</div>
        <div className={styles.comission}>
          {comission >= 10 ? comission : `${comission}`}% Commission
        </div>
      </div>
      <div>
        <ArrowIcon
          isFocused={isFocused}
          onClick={() => handleArrowClick(false)}
        />

        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        <ArrowIcon
          isLeft
          isFocused={isFocused}
          onClick={() => handleArrowClick(true)}
        />
      </div>
    </div>
  );
};

export default CalculatorInput;
