import React from "react";
import styles from "./DataError.module.scss";
import Button, { ButtonProps } from "../../Components/Button/Button";

const DataError = ({
  title = "Something Went wrong",
  btnLabel,
  btnProps,
}: {
  title?: string;
  btnProps: Omit<ButtonProps , "children">;
  btnLabel: string;
}) => {
  return (
    <div className={styles.container}>
      <svg
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 20L4 4.00003M20 4L4.00002 20"
          stroke="red"
          stroke-linecap="round"
          stroke-width="2"
        />
      </svg>
      <div>{title}</div>
       <div>Try again by clicking {btnLabel}</div>
      <Button {...btnProps} theme="neon">{btnLabel}</Button>
    </div>
  );
};

export default DataError;
