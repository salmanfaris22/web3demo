import React from "react";
import styles from "./LevelButton.module.scss";

export interface ILevelBtn {
  label: string;
  amount: number;
  isActive: boolean;
  onClick: (label: string) => void;
}

const LevelButton = ({ label, amount, isActive, onClick }: ILevelBtn) => {
  return (
    <div className={`${styles.container} ${isActive && styles.active}`}>
      <div className={styles.levelName}>{label}</div>
      <button
        onClick={() => {
          onClick(label);
        }}
      >
        {amount ? `$${amount}` : <span className={styles.dot}>*</span>}
      </button>
    </div>
  );
};

export default LevelButton;
