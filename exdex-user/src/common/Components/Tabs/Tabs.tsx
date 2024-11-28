import React from "react";
import styles from "./Tabs.module.scss";

export interface ITabs{
  tabList: string[];
  activeIndex: number;
  onActiveIndex : (index : number)=>void;
  disabled : boolean;
  classNames? : {tabClass?: string , wrapper?:string}
}
const Tabs = ({
  tabList,
  activeIndex,
  onActiveIndex,
  disabled,
  classNames
}: ITabs) => {
  return (
    <div className={`${styles.tabWrapper} ${classNames?.wrapper}`}>
      {tabList.map((t, index) => {
        return (
          <button
            key={t}
            onClick={()=>{
              if(!disabled){
                onActiveIndex(index)
              }
            }}
            className={`${styles.tab} ${
              index === activeIndex && styles.selected
            } ${classNames?.tabClass}`}
          >
           {t}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
