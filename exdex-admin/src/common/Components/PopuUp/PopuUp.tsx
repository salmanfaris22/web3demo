import React, { ReactNode } from "react";
import styles from "./PopuUp.module.scss";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  header: string | ReactNode;
}

const PopUp: React.FC<PopupProps> = ({ isOpen, onClose, children, header }) => {
  if (!isOpen) return null;
  

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.headerWrap}>
          {header}
          <button className={styles.closeButton} onClick={onClose}>
             <img src="/assets/images/closeIcon.png" alt="close icon"/>
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default PopUp;
