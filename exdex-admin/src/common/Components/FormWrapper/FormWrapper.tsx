import React, { ReactNode } from "react";
import styles from "./FormWrapper.module.scss";

export interface IFormWrapper {
  label: string;
  id:string
  children: ReactNode;
  fullWidth?: boolean,
  wrapperClass?:string
}

const FormWrapper = ({ label, id, children , fullWidth = true , wrapperClass }: IFormWrapper) => {
  return (
    <div className={styles.container} id={id}>
      <label>{label}</label>
      <div  className={`${styles.inputWrapper} ${wrapperClass} ${!fullWidth && styles.halfWidth }`}>{children}</div>
    </div>
  );
};

export default FormWrapper;
