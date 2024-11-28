import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../../common/Components/Button/Button";
import Checkbox from "../../../../common/Components/Checkbox/Checkbox";
import PageAnimation from "../../../../common/Components/PageAnimation/PageAnimation";
import PhoneInput from "../../../../common/Components/PhoneInput/PhoneInput";
import { API_URL } from "../../../../config";
import { register } from "../../../../services/auth";
import { selectEmail, setEmailStore } from "../../../../store/authSlice";
import { hideToastById, showToast } from "../../../../store/toastSlice";
import { isValidEmail } from "../../../../utils/emailValidator";
import classes from "../../Common.module.scss";
import VerifyEmailModal from "./modals/VerifyEmail/VerifyEmail";
import classes2 from "./Register.module.scss";

const Register = () => {
  const dispatch = useDispatch();
  const selectedEmail = useSelector(selectEmail);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Parse the query string
  const refferalCode = queryParams.get("code");
  const [refferal, setRefferal] = useState(refferalCode || "");
  const [terms, setTerms] = useState(false);
  const [btnText, setBtnText] = useState("Create account");
  const [showVerify, setShowVerify] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedEmail) {
      setEmail(selectedEmail);
    }
  }, [selectedEmail]);

  const redirect = (url: string) => {
    navigate(url);
  };

  const onConfirm = () => {
    registerMethod();
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
      case "confirm":
        setConfirm(value);
        break;
      case "name":
        setName(value);
        break;
      case "refferal":
        setRefferal(value);
        break;
    }
  };

  const registerMethod = async () => {
    if (!terms || btnText != "Create account") {
      return;
    }
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
    if (!name) {
      dispatch(
        showToast({
          message: "Name is required",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }

    if (!phone) {
      dispatch(
        showToast({
          message: "Phone number is required",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
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
    let data: any = {
      email: email,
      password: password,
      full_name: name,
      country_code: code,
      phone: phone,
    };
    if (refferal) {
      data["referral_code"] = refferal;
    }
    dispatch(
      showToast({
        message: "Registering, please wait...",
        type: "warning",
        timeout: 25000,
        id: 10,
      })
    );
    setBtnText("Creating...");
    try {
      const response = await register(data);
      if (response.status) {
        dispatch(setEmailStore(email));
        redirect("/login");
        // setShowVerify(true);
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
      setBtnText("Create account");
    }
  };

  const updatePhoneMethod = (data: any) => {
    if (data.phone) {
      setPhone(data.phone);
    }
    if (data.code) {
      setCode(data.code.code);
    }
  };

  const handleSocialLogin = (type: string) => {
    const url = `${API_URL}/auth/${type}`;
    // const url = `https://api-dev.exdex.com/api/auth/${type}`;
    window.open(url, "_blank");
  };

  return (
    <PageAnimation>
      <div className={`${classes.wrap} ${classes2.wrap2}`}>
        <div className={classes.authForm}>
          <div className={classes.head}>Create an account</div>
          <div
            className={`${classes.subHead} ${classes2.subHead2}`}
            onClick={() => {
              redirect("/login");
            }}
          >
            Already have an account?<span> Sign In</span>
          </div>
          <div className={`${classes.fieldWrap} ${classes2.fieldWrap2}`}>
            <div className={`${classes.label} ${classes2.label}`}>
              Email Address
            </div>
            <div className={classes.inputWrap}>
              <input
                value={email}
                type="email"
                id="email"
                placeholder="Email Address"
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={`${classes.fieldWrap} ${classes2.fieldWrap2}`}>
            <div className={classes.label}>Full Name</div>
            <div className={classes.inputWrap}>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={`${classes.fieldWrap} ${classes2.fieldWrap2}`}>
            <div className={classes.inputWrap}>
              <div className={classes2.phoneOut2}>
                <PhoneInput updatePhone={updatePhoneMethod} />
              </div>
            </div>
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
          <div className={`${classes.fieldWrap} ${classes2.fieldWrap2}`}>
            <div className={classes.label}>Refferal Code</div>
            <div className={classes.inputWrap}>
              <input
                type="text"
                id="refferal"
                value={refferal}
                placeholder="Refferal Code"
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div
            className={classes2.terms2}
            onClick={() => {
              console.log("hello");
              setTerms((terms) => !terms);
            }}
          >
            <div className={classes2.checkWrap}>
              <Checkbox
                responsive="invertBox"
                label={""}
                checked={terms}
                theme="square"
                onChange={(val) => {
                  console.log(val);
                }}
              />
            </div>
            <div className={classes2.lab}>
              I Agree <span>Terms and Conditions</span> and{" "}
              <span>Privacy Policy</span>
            </div>
          </div>
          <div className={`${classes.btnOuter} ${classes2.btnOuter2}`}>
            <Button
              type="full"
              onClick={onConfirm}
              disabled={btnText != "Create account" || !terms}
            >
              <div className={classes.authBtn}>{btnText}</div>
            </Button>
          </div>
          <div className={`${classes.or}`}>
            <span className={classes.orText}>Continue with</span>
          </div>
          <div className={`${classes.socialWrap} ${classes2.socialWrap2}`}>
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
        </div>
      </div>
      <VerifyEmailModal
        show={showVerify}
        onClose={() => {
          setShowVerify(false);
        }}
        onConfirm={() => {
          setShowVerify(false);
          redirect("/otp/verify");
        }}
      />
    </PageAnimation>
  );
};

export default Register;
