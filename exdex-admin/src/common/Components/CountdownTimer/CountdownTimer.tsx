import React, { useState, useEffect } from "react";
import classes from "./CountdownTimer.module.scss";

interface CountdownTimerProps {
  initialMinutes: number;
  initialSeconds: number;
  onExpire: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialMinutes = 0,
  initialSeconds = 0,
  onExpire,
}) => {
  const [[minutes, seconds], setTime] = useState([
    initialMinutes,
    initialSeconds,
  ]);
  let timerId: any = "";

  // Reset timer when initialMinutes or initialSeconds change
  useEffect(() => {
    setTime([initialMinutes, initialSeconds]);
  }, [initialMinutes, initialSeconds]);

  const tick = () => {
    if (minutes === 0 && seconds === 0) {
      clearInterval(timerId);
      onExpire();
    } else if (seconds === 0) {
      setTime([minutes - 1, 59]);
    } else {
      setTime([minutes, seconds - 1]);
    }
  };

  useEffect(() => {
    timerId = setInterval(tick, 1000);
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [minutes, seconds]); // Add minutes and seconds to dependencies

  return (
    <div className={classes.timerContainer}>
      <div className={classes.timer}>
        {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )}`}
      </div>
    </div>
  );
};

export default CountdownTimer;
