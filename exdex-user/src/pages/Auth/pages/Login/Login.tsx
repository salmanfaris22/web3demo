import { useEffect, useState } from "react";
import Button from "../../../../common/Components/Button/Button";
import classes from "../../Common.module.scss";
import classes2 from "./Login.module.scss";
import PageAnimation from "../../../../common/Components/PageAnimation/PageAnimation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideToastById, showToast } from "../../../../store/toastSlice";
import { isValidEmail } from "../../../../utils/emailValidator";
import { login } from "../../../../services/auth";
import {
  setEmailStore,
  setHasFormSubmitted,
  setTenxToken,
  setToken,
} from "../../../../store/authSlice";
import { API_URL } from "../../../../config";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [btnText, setBtnText] = useState("Sign In");
  const [ipDetails, setIpDetails] = useState<any>({
    country: "",
    ip: "",
    latitude: "",
    longitude: "",
  });

  const navigate = useNavigate();

  const redirect = (url: string) => {
    navigate(url);
  };

  const onConfirm = async () => {
    if (step < 2) {
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
      setStep((state) => state + 1);
      dispatch(setEmailStore(email));
    } else {
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
      setBtnText("Signing In...");
      dispatch(
        showToast({
          message: "Signing In, please wait...",
          type: "warning",
          timeout: 25000,
          id: 10,
        })
      );
      try {
        const data = {
          email: email,
          password: password,
        };
        if (ipDetails.country) {
          Object.assign(data, ipDetails);
        }
        const response = await login(data);
        if (response.status) {
          dispatch(setToken(response.data.local_token));
          if (response.data.tenx_token) {
            dispatch(setTenxToken(response.data.tenx_token));
          }
          dispatch(setHasFormSubmitted(response.data.form_submitted))
          redirect("/overview");
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
            if (err.response.data.error.toLowerCase() == "email not verified") {
              redirect("/otp/verify");
            }
          }
        } catch (e) {
          console.log(e);
        }
      } finally {
        dispatch(hideToastById(10));
        setBtnText("Sign In");
      }
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
      case "password":
        setPassword(value);
        break;
    }
  };

  const handleSocialLogin = (type: string) => {
    const url = `${API_URL}/auth/${type}`;
    window.open(url, "_blank");
  };

  return (
    <PageAnimation>
      <div className={classes.wrap}>
        <div className={classes.authForm}>
          {step == 2 && (
            <img
              className={classes2.back}
              src="/assets/images/login/arrowLeft.png"
              alt="back"
              onClick={() => {
                setStep(1);
              }}
            />
          )}

          <div className={classes.head}>
            {step == 1 && "Sign In"}
            {step == 2 && "Enter your password"}
          </div>
          <div className={classes.subHead}>
            {step == 1 && (
              <div
                onClick={() => {
                  redirect("/register");
                }}
              >
                New user? <span>Create an account</span>
              </div>
            )}
            {step == 2 && "Please enter the details to continue"}
          </div>
          {step == 1 && (
            <div className={classes.fieldWrap}>
              <div className={classes.label}>Email Address</div>
              <div className={classes.inputWrap}>
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
          {step == 2 && (
            <div className={classes.fieldWrap}>
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
          )}

          <div className={classes.btnOuter}>
            <Button
              type="full"
              theme="black"
              onClick={onConfirm}
              disabled={btnText != "Sign In"}
            >
              <div className={classes.authBtn}>
                {step == 1 && "Continue"}
                {step == 2 && btnText}
              </div>
            </Button>
          </div>
          {step == 2 && (
            <div className={classes.keep}>
              Keep me <span>Logged In</span> with Exdex account
            </div>
          )}
          <div className={`${classes.or} ${step == 2 && classes.or2}`}>
            <span className={classes.orText}>Continue with</span>
          </div>
          {step == 1 && (
            <div className={classes.socialWrap}>
              <div
                className={classes.socialItem}
                onClick={() => {
                  handleSocialLogin("google");
                }}
              >
                <img src="/assets/images/login/google.png" alt="google" />
                <span>Sign in with Google</span>
              </div>
              <div
                className={classes.socialItem}
                onClick={() => {
                  handleSocialLogin("facebook");
                }}
              >
                <img src="/assets/images/login/fb.png" alt="facebook" />
                <span>Sign in with Facebook</span>
              </div>
            </div>
          )}
          {step == 2 && (
            <div className={classes.options}>
              <div
                className={classes.reset}
                onClick={() => {
                  redirect("/forgot");
                }}
              >
                Reset your password
              </div>
              <div
                className={classes.create}
                onClick={() => {
                  redirect("/register");
                }}
              >
                Don’t have an account?
                <span> Sign Up</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageAnimation>
  );
};

export default Login;
