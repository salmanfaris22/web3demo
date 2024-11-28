import { useDispatch } from "react-redux";
import classes from "./Profile.module.scss";
import { clearUserAndToken } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";

interface ProfileProps {
  details: any;
}

const Profile: React.FC<ProfileProps> = ({ details }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirect = (url: string) => {
    navigate(url);
  };

  const logoutMethod = () => {
    dispatch(clearUserAndToken());
    navigate("/");
  };

  return (
    // <div className={classes.profielWrap} onClick={logoutMethod}>
    //   <div className={classes.profile}></div>
    //   <div className={classes.profileName} title={details?.full_name}>
    //     {details?.full_name}
    //     <img src="/assets/images/header/arrow.png" alt="arrow" />
    //   </div>
    // </div>
    <div className={classes.profielWrap}>
      <div
        className={classes.profile}
        // style={{
        //   backgroundImage: `url(${
        //     profileImagePreview
        //       ? profileImagePreview
        //       : "/assets/images/userDefault.jpg"
        //   })`,
        // }}
      ></div>
      <div className={classes.profileName} title={details?.full_name}>
        {details?.full_name}
        <img src="/assets/images/header/arrow.png" alt="arrow" />
      </div>
      <div className={classes.dropDownOuter}>
        {/* <div
          className={classes.dropDownItem}
          onClick={() => {
            redirect("/profile");
          }}
        >
          Profile
        </div> */}
        <div className={classes.dropDownItem} onClick={logoutMethod}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Profile;
