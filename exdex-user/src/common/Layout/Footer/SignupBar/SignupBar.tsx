import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../../../../store/authSlice";
import Search from "../../../Components/Search/Search";
import { routers } from "../../../Constants";
import classes from "./SignupBar.module.scss";

const SignupBar = () => {
  const token = useSelector(selectToken);
  const nav = useNavigate();
  return (
    <div className={classes.signupBar}>
      <div className={classes.signupBarInfo}>
        <span>Start earning today</span>
        <button
          onClick={() => {
            nav(token ? routers.trade : routers.signup);
          }}
        >
          {" "}
          {token ? "Home" : "Signup now"}
        </button>
      </div>
      <Search type="dark" placeholder="Search a card" />
    </div>
  );
};

export default SignupBar;
