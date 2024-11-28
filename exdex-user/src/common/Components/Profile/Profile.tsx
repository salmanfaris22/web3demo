import { useDispatch } from "react-redux";
import classes from "./Profile.module.scss";
import { clearUserAndToken } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../../services/user";

interface ProfileProps {
  details: any;
}

const Profile: React.FC<ProfileProps> = ({ details }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );

  useEffect(() => {
    getUserDetailsMethod();
  }, []);

  const getUserDetailsMethod = async () => {
    try {
      const response = await getUserInfo();
      if (response.status) {
        if (response.data) {
          if (response.data.avatar_url) {
            setProfileImagePreview(response.data.avatar_url);
          }
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } else {
        console.error("Response status is false");
      }
    } catch (err) {
      console.error("Error fetching binary data:", err);
    } finally {
    }
  };

  const redirect = (url: string) => {
    navigate(url);
  };

  const logoutMethod = () => {
    dispatch(clearUserAndToken());
    navigate("/");
  };

  return (
    <div className={classes.profielWrap}>
      <div
        className={classes.profile}
        style={{
          backgroundImage: `url(${
            profileImagePreview
              ? profileImagePreview
              : "/assets/images/userDefault.jpg"
          })`,
        }}
      ></div>
      <div className={classes.profileName} title={details?.full_name}>
        {details?.full_name}
        <img src="/assets/images/header/arrow.png" alt="arrow" />
      </div>
      <div className={classes.dropDownOuter}>
        <div
          className={classes.dropDownItem}
          onClick={() => {
            redirect("/package");
          }}
        >
          My Packages
        </div>
        <div
          className={classes.dropDownItem}
          onClick={() => {
            redirect("/profile");
          }}
        >
          Profile
        </div>
        <div className={classes.dropDownItem} onClick={logoutMethod}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Profile;
