import { useEffect, useState } from "react";
import classes from "./Toggle.module.scss";

interface ToggleProps {
  showImage?: boolean;
  value: boolean;
  /**
   * @deprecated Use `onToggleChange` instead.
   */
  toggled?: (val: boolean) => any;
  theme?: "mini";
  onToggleChange?: (val: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({
  showImage,
  value,
  toggled,
  theme,
  onToggleChange,
}) => {
  const [toggle, setToggle] = useState<boolean>(value);

  const toggleHandler = () => {
    if (onToggleChange) {
      onToggleChange && onToggleChange(!toggle);
    } else {
      setToggle((state: boolean) => !state);
    }
  };

  useEffect(() => {
    if (onToggleChange) {
      setToggle(value);
    }
  }, [value]);

  useEffect(() => {
    toggled && toggled(toggle);
  }, [toggle]);

  const getTheme = () => {
    if (theme === "mini") {
      return classes.mini;
    }
  };

  return (
    <div
      className={`${classes.toggle} ${
        toggle ? classes.dark : ""
      } ${getTheme()}`}
      onClick={toggleHandler}
    >
      <div className={`${classes.toggleDot}`}></div>
      {showImage && (
        <div className={classes.togImage}>
          <img src="/assets/images/theme.png" alt="theme" />
        </div>
      )}
    </div>
  );
};

export default Toggle;
