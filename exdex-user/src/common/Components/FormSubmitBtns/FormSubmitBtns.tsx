import React from "react";
import styles from "./FormSubmitBtns.module.scss";
import Button, { ButtonProps } from "../Button/Button";

const FormSubmitBtns = ({
  submitProps,
  cancelProps,
}: {
  submitProps: ButtonProps;
  cancelProps: ButtonProps;
}) => {
  const { children, ...rest } = submitProps;
  const { children: cancelChildren, ...cRest } = cancelProps;
  return (
    <div className={styles.container}>
      <Button  {...cRest} theme="bordered" >{cancelChildren} </Button>
      <Button {...rest} theme="neon">{children} </Button>
    </div>
  );
};

export default FormSubmitBtns;
