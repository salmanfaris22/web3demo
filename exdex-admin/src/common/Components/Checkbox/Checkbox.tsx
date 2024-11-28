import React, { useEffect } from "react";
import classes from "./Checkbox.module.scss";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: any) => any; 
  responsive?: string;
  theme?: string;
  disabled?:boolean
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  responsive,
  theme,
  onChange,
  disabled
}) => {
  useEffect(() => {
    console.log(checked);
  }, [checked]);

  return (
    <div
      className={`${classes.checkboxContainer} ${
        responsive === "invertBox" ? classes.invertBox : ""
      } ${theme ? classes[theme] : ""} ${disabled ? classes.disabled : ""}`}
    >
      <label className={classes.checkboxLabel}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={classes.checkboxInput}
        />
        <span className={classes.customCheckbox}></span>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
