import React from "react";
import styles from "./RadioButtonGroup.module.scss";

export interface RadioOption<T> {
  label: string;
  value: T;
}

export interface RadioButtonGroupProps<T> {
  options: RadioOption<T>[];
  name: string;
  selectedValue: T;
  onChange: (value: T) => void;
  id: string;
  className?:string;
  layout? : "vertical"  | "horizontal"
}

const RadioButtonGroup = <T,>({
  options,
  name,
  selectedValue,
  onChange,
  id,
  className,
  layout = "horizontal"
}: RadioButtonGroupProps<T>) => {

  const getDynamicId = (index: number) => `radio-${id}-${index}`;

  return (
    <div className={`${styles.radioGroup} ${layout === "horizontal" ? styles.horizon : styles.vertical}   ${className}`}>
      {options.map((option, index) => {
 
        const isActive = selectedValue === option.value;

        return (
          <label key={String(option.value)} className={styles.radioLabel} htmlFor={getDynamicId(index)}>
            <div className={styles.radioWrapper}>
              <input
                id={getDynamicId(index)}
                type="radio"
                name={name}
                value={String(option.value)}
                checked={isActive}
                onChange={() => onChange(option.value)} 
                className={`${styles.radioInput}`}
              />
              <div className={`${styles.radioPlaceHolder} ${isActive ? styles.active : ""}`}>
                   <div></div>
              </div>
            </div>
            {option.label}
          </label>
        );
      })}
    </div>
  );
};

export default RadioButtonGroup;
