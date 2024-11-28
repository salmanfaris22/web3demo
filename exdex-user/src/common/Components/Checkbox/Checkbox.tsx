import React, { useEffect } from "react";
import classes from "./Checkbox.module.scss";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  responsive?: string;
  theme?: string;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  responsive,
  theme, 
  disabled = false,
  onChange,
}) => {
  
  useEffect(() => {
    console.log(checked);
  }, [checked]);

  return (
    <div
      className={`${classes.checkboxContainer} ${
        responsive === "invertBox" ? classes.invertBox : ""
      } ${theme === "normal" ? classes.normal : ""}  ${
        theme === "square" ? classes.square : ""
      } ${theme === "darkCheck" ? classes.darkCheck : ""} ${
        disabled ? classes.disabled : ""
      }`}
      title={disabled ? "Coming soon" : ""}
    >
      <label className={classes.checkboxLabel}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={classes.checkboxInput}
        />
        <span className={classes.customCheckbox}></span>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
