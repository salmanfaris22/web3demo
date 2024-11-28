import React from "react";
import styles from './InfoCards.module.scss'

const DataValues = ({ value, label , theme}: { value: string; label: string  , theme?:"red" | "neon" | "lightGreen"}) => {

  const getTheme = ()=>{
    if(theme === "red"){
      return styles.red
    }
    if(theme === "neon"){
      return styles.neon
    }

    if(theme === "lightGreen"){
      return styles.lightGreen
    }
    return ""
  }

  return (
    <div className={`${styles.dataValues}`}>
      <div className={`${getTheme()} ${styles.dataValueValue}`}>{value}</div>
      <div className={styles.dataValueLabel} >{label}</div>
    </div>
  );
};

export default DataValues;
