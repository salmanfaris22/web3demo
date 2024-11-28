import React, { useEffect, useState } from "react";
import classes from "./Toggle.module.scss";

interface ToggleProps {
  showImage?: boolean;
  value: boolean;
     /** 
   * @deprecated Use `onToggleChange` instead. 
   */
  toggleSwitch: (toggle: boolean) => void;
  theme?:"signalSwitch";
  onToggleChange? : (val : boolean)=>void
}

const Toggle: React.FC<ToggleProps> = ({ showImage, value, toggleSwitch  , onToggleChange , theme}) => {
  const [toggle, setToggle] = useState(value);
  const toggleHandler = () => {
    if(onToggleChange){
      onToggleChange && onToggleChange(!toggle)
    }else{
      setToggle((state: boolean) => !state);
    }
  };

  useEffect(()=>{
    if(onToggleChange){
      setToggle(value)
    }
  } ,[value])

  const getTheme = ()=>{
    if(theme === "signalSwitch"){
      return classes.signalSwitch
    }
  }

  useEffect(() => {
    if(!onToggleChange){
      toggleSwitch(toggle);
    }
  }, [toggle]);

  return (
    <div
      className={`${classes.toggle} ${toggle ? classes.dark : ""}  ${getTheme()}`}
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
