import {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  ClipboardEvent,
} from "react";
import Button from "../../../../common/Components/Button/Button";
import classes from "../../Common.module.scss";
import classes2 from "./Otp.module.scss";
import PageAnimation from "../../../../common/Components/PageAnimation/PageAnimation";
import { useNavigate, useParams } from "react-router-dom";
import CountdownTimer from "../../../../common/Components/CountdownTimer/CountdownTimer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  setOtpStore,
  setTenxToken,
  setToken,
} from "../../../../store/authSlice";
import { hideToastById, showToast } from "../../../../store/toastSlice";
import { isValidEmail } from "../../../../utils/emailValidator";
import { resendOtp, verify } from "../../../../services/auth";

const Otp = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const navigate = useNavigate();
  const [btnText, setBtnText] = useState("Verify");
  const [counter, setCounter] = useState({ min: 2, sec: 0 });
  const [expired, setExpired] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const forgotEmail = useSelector(selectEmail);

  useEffect(() => {
    if (!forgotEmail) {
      if (id == "verify") {
        redirect("/register");
      } else {
        redirect("/forgot");
      }
    }
  }, [forgotEmail]);

  const redirect = (url: any) => {
    navigate(url);
  };

  const onConfirm = async () => {
    if (!forgotEmail) {
      dispatch(
        showToast({
          message: "Email is required",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    if (!isValidEmail(forgotEmail)) {
      dispatch(
        showToast({
          message: "Email is not valid",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    if (!otp.join("")) {
      dispatch(
        showToast({
          message: "OTP is not valid",
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
        email: forgotEmail,
        otp: otp.join(""),
      };
      const response = await verify(data);
      if (response.status) {
        dispatch(setOtpStore(otp.join("")));
        dispatch(setToken(response.data.local_token));
        dispatch(setTenxToken(response.data.tenx_token));
        if (id == "verify") {
          redirect("/");
        } else {
          redirect("/reset");
        }
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
      setBtnText("Verify");
    }
  };

  const resendOtpMethod = async () => {
    if (!forgotEmail) {
      dispatch(
        showToast({
          message: "Email is required",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    if (!isValidEmail(forgotEmail)) {
      dispatch(
        showToast({
          message: "Email is not valid",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    dispatch(
      showToast({
        message: "Sending new otp, please wait...",
        type: "warning",
        timeout: 25000,
        id: 10,
      })
    );
    try {
      const data = {
        email: forgotEmail,
      };
      const response = await resendOtp(data);
      if (response.status) {
        dispatch(
          showToast({
            message: response.message,
            type: "success",
            timeout: 5000,
          })
        );
        setExpired(false);
        setCounter({ min: 0, sec: 0 });
        setTimeout(() => {
          setCounter({ min: 2, sec: 0 });
        }, 400);
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
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      onConfirm();
    } else if (event.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData("text").slice(0, 4); // Get the first 4 digits from the pasted data
    const newOtp = pasteData
      .split("")
      .map((char, index) => (index < 4 ? char : otp[index])); // Update otp array with pasted values

    setOtp(newOtp);
    // Focus on the last filled input
    const nextIndex = pasteData.length - 1;
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleExpire = () => {
    setExpired(true);
  };

  return (
    <PageAnimation>
      <div className={classes.wrap}>
        <div className={classes.authForm}>
          <img
            className={classes2.back}
            src="/assets/images/login/arrowLeft.png"
            alt="back"
            onClick={() => {
              redirect(-1);
            }}
          />
          <div className={classes.head}>Verify OTP</div>
          <div className={classes.subHead}>
            Please enter the OTP sent to your email address
          </div>
          <div className={classes.fieldWrap}>
            <div className={classes2.otpInput}>
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>
          </div>
          <div className={classes2.expires}>
            Expires in{" "}
            <span>
              <CountdownTimer
                initialMinutes={counter.min}
                initialSeconds={counter.sec}
                onExpire={handleExpire}
              />
            </span>
          </div>
          <div className={classes.btnOuter}>
            <Button
              type="full"
              onClick={onConfirm}
              disabled={btnText != "Verify" || expired}
            >
              <div className={classes.authBtn}>
                {expired ? "OTP Expired" : btnText}
              </div>
            </Button>
          </div>
          <div className={`${classes.or} ${classes.or2}`}>
            <span className={classes.orText}>Continue with</span>
          </div>
          <div className={classes.options}>
            <div
              className={`${classes.reset} ${classes.create}`}
              onClick={resendOtpMethod}
            >
              <span className={classes.dark}>Didn’t get OTP? </span>{" "}
              <span> Resend OTP</span>
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
        </div>
      </div>
    </PageAnimation>
  );
};

export default Otp;
