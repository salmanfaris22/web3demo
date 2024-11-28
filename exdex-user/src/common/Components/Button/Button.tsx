import React from "react";
import classes from "./Button.module.scss";

export interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  theme?:
    | "light"
    | "neon"
    | "danger"
    | "icon"
    | "material-danger"
    | "bordered"
    | "black";
  type?: string;
  inlineStyle?: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  isLoading?: boolean;
}

export const BtnSpinner = () => {
  return <div className={classes.spinner}></div>;
};

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  theme = "normal",
  type = "normal",
  onClick,
  inlineStyle,
  className,
  isLoading,
}) => {
  const getThemeClass = () => {
    if (theme === "light") {
      return classes.light;
    }
    if (theme === "black") {
      return classes.black;
    }
    if (theme === "neon") {
      return classes.neon;
    }
    if (theme === "danger") {
      return classes.danger;
    }
    if (theme === "icon") {
      return classes.icon;
    }
    if (theme === "bordered") {
      return classes.bordered;
    }
    if (theme === "material-danger") {
      return classes.materialDanger;
    }

    return "";
  };

  return (
    <button
      style={inlineStyle}
      disabled={disabled}
      className={`${classes.button} ${className} ${
        disabled && classes.disabled
      } ${getThemeClass()} ${type == "full" && classes.full}
     ${isLoading && classes.loading}
      `}
      onClick={onClick}
    >
      {children} {isLoading && <BtnSpinner />}
    </button>
  );
};

export default Button;
