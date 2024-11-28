import { useEffect, useState } from "react";
import Button from "../../../../common/Components/Button/Button";
import classes from "../../Common.module.scss";
import classes2 from "./Reset.module.scss";
import PageAnimation from "../../../../common/Components/PageAnimation/PageAnimation";
import { useNavigate } from "react-router-dom";
import { reset } from "../../../../services/auth";
import { useDispatch } from "react-redux";
import { hideToastById, showToast } from "../../../../store/toastSlice";

const Reset = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [btnText, setBtnText] = useState("Reset password");

  const navigate = useNavigate();

  const redirect = (url: string) => {
    navigate(url);
  };

  const onConfirm = () => {
    resetMethod();
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onConfirm();
    }
  };

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    switch (id) {
      case "password":
        setPassword(value);
        break;
      case "confirm":
        setConfirm(value);
        break;
    }
  };

  const resetMethod = async () => {
    if (!password) {
      dispatch(
        showToast({
          message: "Password is required",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    if (password != confirm) {
      dispatch(
        showToast({
          message: "Passwords doesnt match",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    const data = {
      new_password: password,
    };
    dispatch(
      showToast({
        message: "Resetting password, please wait...",
        type: "warning",
        timeout: 25000,
        id: 10,
      })
    );
    setBtnText("Resetting...");
    try {
      const response = await reset(data);
      if (response.status) {
        redirect("/login");
      }
    } catch (err: any) {
      try {
        if (err.response.data.error) {
          dispatch(
            showToast({
              message: err.response.data.error,
              type: "error",
              timeout: 5000,
            })
          );
        }
      } catch (e) {
        console.log(e);
      }
    } finally {
      dispatch(hideToastById(10));
      setBtnText("Reset password");
    }
  };

  return (
    <PageAnimation>
      <div className={`${classes.wrap} ${classes2.wrap2}`}>
        <div className={classes.authForm}>
          <div className={classes.head}>Reset Password</div>
          <div
            className={`${classes.subHead} ${classes2.subHead2}`}
            onClick={() => {
              redirect("/login");
            }}
          >
            Already have an account?<span> Sign In</span>
          </div>

          <div className={`${classes.fieldWrap} ${classes2.fieldWrap2}`}>
            <div className={classes.label}>Password</div>
            <div className={classes.inputWrap}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
              />
              <div
                className={classes.eyeLine}
                onClick={() => {
                  setShowPassword((state) => !state);
                }}
              >
                <img src="/assets/images/login/eye.png" alt="eye" />
                {showPassword && <span className={classes.line}></span>}
              </div>
            </div>
          </div>
          <div className={`${classes.fieldWrap} ${classes2.fieldWrap2}`}>
            <div className={classes.label}>Confirm Password</div>
            <div className={classes.inputWrap}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm"
                placeholder="Password"
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
              />
              <div
                className={classes.eyeLine}
                onClick={() => {
                  setShowConfirmPassword((state) => !state);
                }}
              >
                <img src="/assets/images/login/eye.png" alt="eye" />
                {showConfirmPassword && <span className={classes.line}></span>}
              </div>
            </div>
          </div>
          <div className={`${classes.btnOuter} ${classes2.btnOuter}`}>
            <Button
              type="full"
              onClick={onConfirm}
              disabled={btnText != "Reset password"}
            >
              <div className={classes.authBtn}>{btnText}</div>
            </Button>
          </div>
        </div>
      </div>
    </PageAnimation>
  );
};

export default Reset;
