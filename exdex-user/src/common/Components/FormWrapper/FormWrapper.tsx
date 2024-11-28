import React, { ReactNode } from "react";
import styles from "./FormWrapper.module.scss";

export interface IFormWrapper {
  label: string;
  id:string
  children: ReactNode;
  fullWidth?: boolean
}

const FormWrapper = ({ label, id, children , fullWidth = true }: IFormWrapper) => {
  return (
    <div className={styles.container} id={id}>
      <label>{label}</label>
      <div  className={`${styles.inputWrapper} ${!fullWidth && styles.halfWidth }`}>{children}</div>
    </div>
  );
};

export default FormWrapper;
