import React from "react";
import styles from "./BackBtn.module.scss";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <Button
        theme="icon"
        onClick={() => {
          nav(-1);
        }}
      >
        <span>&lt; Back</span>
      </Button>
    </div>
  );
};

export default BackBtn;
