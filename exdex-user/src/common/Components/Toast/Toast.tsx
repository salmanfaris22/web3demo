import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import classes from "./Toast.module.scss";
import ToastInnerComponent from "./ToastInnerComponent";

const ToastComponent = () => {
  const messages = useSelector((state: any) => state.toast.messages);
  return (
    <div className={classes.toastContainer}>
      {messages.map((msg: any) => (
        <ToastInnerComponent key={msg.message} msg={msg} />
      ))}
    </div>
  );
};

const Toast = () => {
  const toastContainer = document.getElementById("toast");
  if (!toastContainer) {
    return null;
  }
  return <>{ReactDOM.createPortal(<ToastComponent />, toastContainer)}</>;
};

export default Toast;
