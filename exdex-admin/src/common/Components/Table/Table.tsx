import React from "react";
import classes from "./Table.module.scss";

interface TableProps {
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ children }) => {
  return <table className={classes.table}>{children}</table>;
};

export default Table;
