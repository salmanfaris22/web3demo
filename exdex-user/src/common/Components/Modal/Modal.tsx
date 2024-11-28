import React from "react";
import classes from "./Modal.module.scss";
import ReactDOM from "react-dom";

interface ModalContentProps {
  children: React.ReactNode;
  closeBtn?: boolean;
  show: boolean;
  closeMethod: () => void;
  overflow?: boolean;
}

const ModalContent: React.FC<ModalContentProps> = ({
  children,
  closeBtn,
  show,
  closeMethod,
  overflow,
}) => {
  return (
    <div
      className={`${classes.modalOuter} ${show && classes.active} ${
        overflow && classes.overflowVisible
      }`}
    >
      <div className={classes.overlay} onClick={closeMethod}></div>
      <div className={classes.modalWrap}>
        {closeBtn && (
          <div className={classes.close} onClick={closeMethod}>
            <img src="/assets/images/close.png" alt="close" />
          </div>
        )}
        <div className={classes.modalBody}>{children}</div>
      </div>
    </div>
  );
};

interface ModalProps extends ModalContentProps {}

const Modal: React.FC<ModalProps> = ({
  children,
  closeBtn,
  show,
  closeMethod,
  overflow,
}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalContent
          children={children}
          closeBtn={closeBtn}
          show={show}
          closeMethod={closeMethod}
          overflow={overflow}
        />,
        document.getElementById("modal") as HTMLElement
      )}
    </>
  );
};

export default Modal;
