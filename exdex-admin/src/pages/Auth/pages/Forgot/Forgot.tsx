import { useEffect, useState } from "react";
import Button from "../../../../common/Components/Button/Button";
import classes from "../../Common.module.scss";
import PageAnimation from "../../../../common/Components/PageAnimation/PageAnimation";
import { useNavigate } from "react-router-dom";
import { hideToastById, showToast } from "../../../../store/toastSlice";
import { forgot } from "../../../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { isValidEmail } from "../../../../utils/emailValidator";
import { selectEmail, setEmailStore } from "../../../../store/authSlice";

const Forgot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [btnText, setBtnText] = useState("Continue");
  const forgotEmail = useSelector(selectEmail);

  const redirect = (url: string) => {
    navigate(url);
  };

  useEffect(() => {
    if (forgotEmail) {
      setEmail(forgotEmail);
    }
  }, [forgotEmail]);

  const onConfirm = async () => {
    if (!email) {
      dispatch(
        showToast({
          message: "Email is required",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    if (!isValidEmail(email)) {
      dispatch(
        showToast({
          message: "Email is not valid",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    setBtnText("Verifying...");
    dispatch(
      showToast({
        message: "Verifying, please wait...",
        type: "warning",
        timeout: 25000,
        id: 10,
      })
    );
    try {
      const data = {
        email: email,
      };
      const response = await forgot(data);
      if (response.status) {
        dispatch(setEmailStore(email));
        redirect("/otp/reset");
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
      setBtnText("Continue");
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onConfirm();
    }
  };

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    switch (id) {
      case "email":
        setEmail(value);
        break;
    }
  };
  return (
    <PageAnimation>
      <div className={classes.wrap}>
        <div className={classes.authForm}>
          <div className={classes.head}>Forgot password</div>
          <div className={classes.subHead}>
            Please enter the email address that is associated with your 4XBROKER
            account
          </div>
          <div className={classes.fieldWrap}>
            <div className={classes.label}>Email Address</div>
            <div className={classes.inputWrap}>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Email Address"
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={classes.btnOuter}>
            <Button
              type="full"
              onClick={onConfirm}
              disabled={btnText != "Continue"}
            >
              <div className={classes.authBtn}>{btnText}</div>
            </Button>
          </div>
          <div className={classes.options}>
            <div
              className={classes.create}
              onClick={() => {
                redirect("/");
              }}
            >
              Back to
              <span> Sign In</span>
            </div>
          </div>
        </div>
      </div>
    </PageAnimation>
  );
};

export default Forgot;
