import { useEffect, useState } from "react";
import Button from "../../../../common/Components/Button/Button";
import classes from "../../Common.module.scss";
import classes2 from "./Verify.module.scss";
import PageAnimation from "../../../../common/Components/PageAnimation/PageAnimation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectToken,
  setTenxToken,
  setToken,
} from "../../../../store/authSlice";

const Verify = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [btnText, setBtnText] = useState("Verifying...");
  const navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tenxTok = searchParams.get("tenx_token");
    const localTok = searchParams.get("local_token");
    if (!localTok) {
      redirect("");
      return;
    }
    if (localTok) {
      dispatch(setToken(localTok));
    }
    if (tenxTok) {
      dispatch(setTenxToken(tenxTok));
    }
  }, []);

  useEffect(() => {
    if (token) {
      redirect("/overview");
    }
  }, [token]);

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
