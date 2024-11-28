import { useEffect, useState } from "react";
import Button from "../../../../common/Components/Button/Button";
import classes from "../../Common.module.scss";
import classes2 from "./Verify.module.scss";
import PageAnimation from "../../../../common/Components/PageAnimation/PageAnimation";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideToastById, showToast } from "../../../../store/toastSlice";
import { setToken } from "../../../../store/authSlice";

const Verify = () => {
  const dispatch = useDispatch();
  const [btnText, setBtnText] = useState("Verifyig...");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      redirect("");
      return;
    }
    dispatch(setToken(id));
    redirect("/overview");
  }, [id]);

  const redirect = (url: string) => {
    navigate(url);
  };

  return (
    <PageAnimation>
      <div className={classes.wrap}>
        <div className={classes.authForm}>
          <div className={classes.head}>Verifying...</div>
          <div className={`${classes.btnOuter} ${classes2.btnOuter}`}>
            <Button type="full" disabled={true}>
              <div className={classes.authBtn}>{btnText}</div>
            </Button>
          </div>
        </div>
      </div>
    </PageAnimation>
  );
};

export default Verify;
