import React from "react";
import classes from "./Table.module.scss";

interface TableProps {
  children: React.ReactNode;
  noCollapse?:boolean
  className?:string
}

const Table: React.FC<TableProps> = ({ children , noCollapse , className}) => {
  return <table className={`${classes.table} ${noCollapse && classes.noCollapse}  ${className}`}>{children}</table>;
};

export default Table;
