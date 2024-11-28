import React from "react";
import classes from "./Button.module.scss";

export interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  theme?: "light" | "neon" | "danger" | "icon" | "material-danger" | "bordered";
  type?: string;
  inlineStyle?: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  className?: string;
}

export const BtnSpinner = ({ className }: { className?: string }) => {
  return <div className={`${classes.spinner} ${className}`}></div>;
};

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  theme = "normal",
  type = "normal",
  onClick,
  inlineStyle,
  isLoading,
  className,
}) => {
  const getThemeClass = () => {
    if (theme === "light") {
      return classes.light;
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
    if (theme === "material-danger") {
      return classes.materialDanger;
    }
    if (theme === "bordered") {
      return classes.bordered;
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
