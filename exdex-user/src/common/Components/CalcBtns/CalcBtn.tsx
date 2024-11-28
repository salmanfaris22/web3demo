import React from "react";
import styles from "./CalcBtn.module.scss";
import Button, { ButtonProps } from "../Button/Button";

const CalcBtn = ({
  btnArray,
  selected,
  className
}: {
  btnArray: Omit<ButtonProps, "children"> &
    {
      label: string;
    }[];
    selected : number;
    className? : string
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {btnArray.map(({ label, ...b },i) => {
        return <Button {...b} className={selected === i ? styles.calcBtnSelected : ""} key={i}> {label}</Button>;
      })}
    </div>
  );
};

export default CalcBtn;
