import React, { ReactNode } from "react";
import styles from "./DataTable.module.scss";
import Pagination from "../Pagination/Pagination";
import { ReactPaginateProps } from "react-paginate";


const DataTable = ({
  children,
  pageProps,
  hasPagination
}: {
  children: ReactNode;
  pageProps?: ReactPaginateProps;
  hasPagination? : boolean
}) => {
  return (
    <div className={styles.container}>
      {children}
      <Pagination {...(pageProps as ReactPaginateProps)} />
    </div>
  );
};

export default DataTable;
