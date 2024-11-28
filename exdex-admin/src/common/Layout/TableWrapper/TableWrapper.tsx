import React, { ReactNode } from "react";
import styles from "./TableWrapper.module.scss";

const TablePageWrapper = ({
  title,
  children,
  actiontemplate,
}: {
  title?: string | ReactNode;
  children: ReactNode;
  actiontemplate?: ReactNode;
}) => {
  return (
    <div className={styles.container}>
      {title && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          {typeof title === "string" ? <h1>{title}</h1> : title}
          {actiontemplate && actiontemplate}
        </div>
      )}

      {children}
    </div>
  );
};

export default TablePageWrapper;
