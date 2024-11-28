import React from "react";
import { useEffect, useState } from "react";
import classes from "./Toast.module.scss";
import { useDispatch } from "react-redux";
import { removeToast } from "../../../store/toastSlice";

interface ToastInnerProps {
  msg: any;
}

const ToastInnerComponent: React.FC<ToastInnerProps> = ({ msg }) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setActive(true);
    const timer = setTimeout(() => {
      setActive(false);
      setTimeout(() => {
        dispatch(removeToast(msg.message));
      }, 500);
    }, msg.timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [msg, dispatch]);

  return (
    <div className={`${classes.toast} ${active && classes.active} ${classes[msg.type]}`}>
      {msg.type === "warning" && (
        <img src="/assets/images/warning.png" alt="warning" />
      )}
      {msg.type === "error" && (
        <img src="/assets/images/error.png" alt="error" />
      )}
      {msg.type === "success" && (
        <img src="/assets/images/success.png" alt="success" />
      )}
      {msg.message}
    </div>
  );
};

export default React.memo(ToastInnerComponent);
