import { useEffect, useRef, useState } from "react";
import PageAnimation from "../../../../common/Components/PageAnimation/PageAnimation";
import FilterDetails from "../../../../common/Components/FilterDetails/FilterDetails";
import classes from "./BasicInfo.module.scss";
import OverviewCard from "../../../../common/Components/OverviewCard/OverviewCard";
import LabelInput from "../../../../common/Components/LabelInput/LabelInput";
import DatePicker from "../../../../common/Components/Datepicker/Datepicker";
import { convertISOToCustomFormat, dmyToymd } from "../../../../utils/date";
import { QuilEditor } from "../../../../common/Components/QuilEditor/QuilEditor";
import Toggle from "../../../../common/Components/Toggle/Toggle";
import {
  getUserInfo,
  getUserStatus,
  profileFileUpload,
  updatePassword,
  updateUserInfo,
} from "../../../../services/user";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideToastById, showToast } from "../../../../store/toastSlice";
import Button from "../../../../common/Components/Button/Button";

const BasicInfo = () => {
  // const tabsArr = [
  //   {
  //     name: "Overview",
  //     hasImage: false,
  //     type: "tab",
  //   },

  //   {
  //     name: "Edit",
  //     hasImage: true,
  //     type: "button",
  //     action: "trigger",
  //   },
  // ];
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState<boolean>(true);

  const [tabsArr, setTabsArr] = useState<any>([
    {
      name: "Overview",
      hasImage: false,
      type: "tab",
    },

    {
      name: "Edit",
      hasImage: true,
      type: "button",
      action: "trigger",
    },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [socialInput, setSocialInput] = useState<any>([]);
  const [social, setSocial] = useState<any>([]);
  const [socialInitial, setSocialInitial] = useState<any>([]);

  const [languageInput, setLanguageInput] = useState<any>([]);
  const [language, setLanguage] = useState<any>([]);
  const [languageInitial, setLanguageInitial] = useState<any>([]);

  const [interestInput, setInterestInput] = useState<any>([]);
  const [interests, setInterests] = useState<any>([]);
  const [interestsInitial, setInterestsInitial] = useState<any>([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [description, setDescription] = useState<any>("");

  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [nationality, setNationality] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [newsLetter, setNewsLetter] = useState(false);
  const [enableNotification, setEnableNotification] = useState(false);

  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bgimage, setBgImage] = useState<File | null>(null);
  const [bgImagePreview, setBgImagePreview] = useState<string | null>(null);

  const [btnTextPassword, setBtnTextPassword] = useState("Save Changes");
  const [btnText, setBtnText] = useState("Save Changes");

  const [devices, setDevices] = useState<any>([]);

  const dateRef = useRef<any>();
  const basicInfoRef = useRef<HTMLDivElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  const [filter, setFilterArr] = useState([
    {
      name: "Basic Information",
      key: "basic",
    },
    {
      name: "Registered Devices",
      key: "devices",
    },
    {
      name: "Password Settings",
      key: "password",
    },
    {
      name: "Newsletter & Notifications",
      key: "newsletter",
    },
  ]);

  const [activeFilter, setActiveFilter] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getUserDetailsMethod();
  }, []);

  useEffect(() => {
    if (profileImage || bgimage) {
      uploadFile();
    }
  }, [profileImage, bgimage]);

  useEffect(() => {
    if (disabled) {
      setTabsArr([
        {
          name: "Overview",
          hasImage: false,
          type: "tab",
        },

        {
          name: "Edit",
          hasImage: true,
          type: "button",
          action: "trigger",
        },
      ]);
    } else {
      setTabsArr([
        {
          name: "Overview",
          hasImage: false,
          type: "tab",
        },

        {
          name: "Cancel Edit",
          hasImage: false,
          type: "button",
          action: "trigger",
        },
      ]);
    }
  }, [disabled]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, setProfileImage, setProfileImagePreview);
  };

  const handleBgImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, setBgImage, setBgImagePreview);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void,
    setPreview: (previewUrl: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const setActiveFilterMethod = (index: number) => {
    setActiveFilter(index);
    switch (index) {
      case 0:
        basicInfoRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case 1:
        devicesRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case 2:
        passwordRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case 3:
        newsletterRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  const handleDateSelect = (date: any) => {
    setShowDatePicker(false);
    const dateFormatted = convertISOToCustomFormat(date);
    setDob(dateFormatted);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(true);
  };

  const getUserDetailsMethod = async () => {
    try {
      const response = await getUserInfo();
      if (response.status) {
        if (response.data) {
          setName(response.data.full_name);
          setEmail(response.data.email);
          setDob(convertISOToCustomFormat(response.data.date_of_birth));
          setPhone(response.data.phone);

          setInterests(response.data.social_info.interest);
          setLanguage(response.data.social_info.language);
          setSocial(response.data.social_info.social_media);
          setInterestsInitial(response.data.social_info.interest);
          setLanguageInitial(response.data.social_info.language);
          setSocialInitial(response.data.social_info.social_media);

          setArea(response.data.address.area);
          setCity(response.data.address.city);
          setDistrict(response.data.address.district);
          setState(response.data.address.state);
          setNationality(response.data.address.nationality);

          setDevices(response.data.registered_devices);

          setNewsLetter(response.data.subscribe_newsletter);
          setEnableNotification(response.data.enable_notifications);

          if (response.data.avatar_url) {
            setProfileImagePreview(response.data.avatar_url);
          }
          if (response.data.background_photo_url) {
            setBgImagePreview(response.data.background_photo_url);
          }
          if (response.data.description) {
            setDescription(decodeBase64(response.data.description));
            console.log(decodeBase64(response.data.description));
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

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      let url = "background";
      if (bgimage) {
        formData.append("file", bgimage);
      }
      if (profileImage) {
        url = "avatar";
        formData.append("file", profileImage);
      }
      dispatch(
        showToast({
          message: "Uploading, please wait...",
          type: "warning",
          timeout: 25000,
          id: 10,
        })
      );
      const response = await profileFileUpload(formData, url);
      if (response.status) {
        if (response.data) {
          setProfileImage(null);
          setBgImage(null);
          dispatch(hideToastById(10));
          dispatch(
            showToast({
              message: "Successfully updated image",
              type: "success",
              timeout: 5000,
            })
          );
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } else {
        getUserDetailsMethod();
        dispatch(hideToastById(10));
        console.error("Response status is false");
      }
    } catch (err:any) {
      dispatch(
        showToast({
          message: err.response?.data?.error,
          type: "error",
          timeout: 5000,
        })
      );
      dispatch(hideToastById(10));
      console.error("Error fetching binary data:", err);
    } finally {
    }
  };

  const updatePasswordMethod = async () => {
    if (!currentPassword) {
      dispatch(
        showToast({
          message: "Please enter current password",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    if (!newPassword) {
      dispatch(
        showToast({
          message: "Please enter new password",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    if (newPassword != confirmPassword) {
      dispatch(
        showToast({
          message: "Passwords doesnt match",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    try {
      let data = {
        current_password: currentPassword,
        new_password: newPassword,
        retype_password: confirmPassword,
      };
      dispatch(
        showToast({
          message: "Updating, please wait...",
          type: "warning",
          timeout: 25000,
          id: 10,
        })
      );
      setBtnTextPassword("Saving...");
      const response = await updatePassword(data);
      if (response.status) {
        if (response.data) {
          dispatch(hideToastById(10));
          setNewPassword("");
          setCurrentPassword("");
          setConfirmPassword("");
          dispatch(
            showToast({
              message: "Successfully updated password",
              type: "success",
              timeout: 5000,
            })
          );
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } else {
        console.error("Response status is false");
      }
    } catch (err: any) {
      dispatch(
        showToast({
          message: err.response.data.error || "Error updating password",
          type: "error",
          timeout: 5000,
        })
      );
      dispatch(hideToastById(10));
      console.error("Error fetching binary data:", err);
    } finally {
      setBtnTextPassword("Save Changes");
    }
  };

  const convertBase64 = (input: any) => {
    return btoa(input);
  };

  const decodeBase64 = (input: any) => {
    return atob(input);
  };

  const updateProfile = async () => {
    if (!name) {
      dispatch(
        showToast({
          message: "Please enter full name",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    if (!email) {
      dispatch(
        showToast({
          message: "Please enter email",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    if (!phone) {
      dispatch(
        showToast({
          message: "Please enter phone",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    try {
      let data = {
        full_name: name,
        email: email,
        phone: phone,
        date_of_birth: dob ? dmyToymd(dob) : "",
        description: convertBase64(description),
        address: {
          area: area,
          city: city,
          district: district,
          state: state,
          nationality: nationality,
        },
        social_info: {
          social_media: social,
          language: language,
          interest: interests,
        },
        subscribe_newsletter: newsLetter,
        enable_notifications: enableNotification,
      };
      dispatch(
        showToast({
          message: "Updating, please wait...",
          type: "warning",
          timeout: 25000,
          id: 10,
        })
      );
      setBtnText("Saving...");
      const response = await updateUserInfo(data);
      if (response.status) {
        if (response.data) {
          dispatch(hideToastById(10));
          getUserDetailsMethod();
          dispatch(
            showToast({
              message: "Successfully updated profile",
              type: "success",
              timeout: 5000,
            })
          );
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } else {
        console.error("Response status is false");
      }
    } catch (err: any) {
      dispatch(
        showToast({
          message: err.response.data.error || "Error updating password",
          type: "error",
          timeout: 5000,
        })
      );
      dispatch(hideToastById(10));
      console.error("Error fetching binary data:", err);
    } finally {
      setBtnText("Save Changes");
    }
  };

  const checkBtnAction = (val: any) => {
    switch (val) {
      case "Edit":
        setDisabled(false);
        break;
      case "Cancel Edit":
        setDisabled(true);
        break;
    }
  };

  return (
    <PageAnimation>
      <div className={classes.basicOuter}>
        <div className={classes.overview}>
          <FilterDetails
            tabsArr={tabsArr}
            triggerAction={checkBtnAction}
            enableDate={false}
            enableSearch={false}
          />
        </div>
        <div className={classes.body}>
          <div className={classes.left}>
            <div className={classes.basicFilter}>
              <PageAnimation>
                <OverviewCard borderRadius={9}>
                  <div className={classes.filter}>
                    {filter.map((item, index: number) => (
                      <div
                        className={`${classes.filterItem} ${
                          activeFilter == index ? classes.active : ""
                        }`}
                        key={item.name}
                        onClick={() => {
                          setActiveFilterMethod(index);
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </OverviewCard>
              </PageAnimation>
            </div>
          </div>
          <div className={classes.right}>
            <OverviewCard>
              <div className={classes.profileDetails} ref={basicInfoRef}>
                <div className={classes.head}>Basic Info</div>
                <div
                  className={classes.imageWrapper}
                  style={{
                    backgroundImage: `url(${
                      bgImagePreview ? bgImagePreview : "/assets/images/bg.png"
                    })`,
                  }}
                >
                  <div className={classes.camIcon}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBgImageChange}
                    />
                    <img src="/assets/images/cam.png" alt="camera" />
                  </div>
                  <div
                    className={classes.profileImage}
                    style={{
                      backgroundImage: `url(${
                        profileImagePreview
                          ? profileImagePreview
                          : "/assets/images/userDefault.jpg"
                      })`,
                    }}
                  >
                    <div className={classes.camIcon}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                      />
                      <img src="/assets/images/cam.png" alt="camera" />
                    </div>
                  </div>
                </div>
                <div className={classes.bodyWrap}>
                  <div className={classes.bodyLeft}>
                    <div className={classes.verified}>
                      <img src="/assets/images/verified.png" alt="verified" />
                      Verified
                    </div>
                    <div className={classes.subText}>
                      Change your profile picture and cover image
                    </div>
                  </div>
                  <div className={classes.bodyRight}>
                    <div className={classes.formOuter}>
                      <div className={classes.formField}>
                        <LabelInput
                          label="Full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder=""
                          disabled={disabled}
                        />
                      </div>
                      <div className={classes.formField}>
                        <LabelInput
                          label="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder=""
                          disabled={disabled}
                        />
                      </div>
                      <div className={classes.formField}>
                        <div className={classes.dateWrap}>
                          <span
                            className={`${classes.remit} ${classes.confirmSpan}`}
                            ref={dateRef}
                            onClick={toggleDatePicker}
                          >
                            {showDatePicker && (
                              <DatePicker
                                isRange={false}
                                onSelect={handleDateSelect}
                              />
                            )}
                            <LabelInput
                              label="DOB"
                              readOnly={true}
                              value={dob}
                              onChange={(e) => setDob(e.target.value)}
                              placeholder="DOB"
                              disabled={false}
                            />
                            <img
                              className={classes.dateImg}
                              src="/assets/images/dateWhite.png"
                              alt="date"
                            />
                          </span>
                        </div>
                      </div>
                      <div className={classes.formField}>
                        <LabelInput
                          label="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder=""
                          disabled={disabled}
                        />
                      </div>
                      <div className={classes.formField}>
                        <div className={classes.label}>
                          Describe your Reason
                        </div>
                        <div className={`${classes.texteditor}`}>
                          <QuilEditor
                            value={description}
                            handleOnChange={(val) => {
                              setDescription(val);
                            }}
                            theme={"dark"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={classes.formHead}>Social Info</div>
                    <div className={classes.formOuter}>
                      <div className={classes.formField}>
                        <LabelInput
                          label="Add Social Media "
                          value={socialInput}
                          onChange={(e) => setSocialInput(e.target.value)}
                          placeholder=""
                          disabled={disabled}
                          isTagInput={true}
                          onTagChange={(val) => setSocial(val)}
                          initialTags={socialInitial}
                        />
                      </div>
                      <div className={classes.formField}>
                        <LabelInput
                          label="Language"
                          value={languageInput}
                          onChange={(e) => setLanguageInput(e.target.value)}
                          placeholder="Select Language"
                          disabled={disabled}
                          isTagInput={true}
                          options={["English"]}
                          inputType="select"
                          onTagChange={(val) => setLanguage(val)}
                          initialTags={languageInitial}
                        />
                      </div>
                      <div className={classes.formField}>
                        <LabelInput
                          label="Interests"
                          value={interestInput}
                          onChange={(e) => setInterestInput(e.target.value)}
                          placeholder=""
                          disabled={disabled}
                          isTagInput={true}
                          onTagChange={(val) => setInterests(val)}
                          initialTags={interestsInitial}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </OverviewCard>
            <div className={classes.addressWrap}>
              <OverviewCard>
                <div className={classes.addressInner}>
                  <div className={classes.head}>Address</div>
                  <div className={classes.formOuter}>
                    <div className={classes.formField}>
                      <LabelInput
                        label="Area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder=""
                        disabled={disabled}
                      />
                    </div>
                    <div className={classes.formField}>
                      <LabelInput
                        label="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder=""
                        disabled={disabled}
                      />
                    </div>
                    <div className={classes.formField}>
                      <LabelInput
                        label="District"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder=""
                        disabled={disabled}
                      />
                    </div>
                    <div className={classes.formField}>
                      <LabelInput
                        label="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder=""
                        disabled={disabled}
                      />
                    </div>
                    <div className={classes.formField}>
                      <LabelInput
                        label="Nationality"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        placeholder=""
                        disabled={disabled}
                      />
                    </div>
                  </div>
                  {!disabled && (
                    <div className={classes.btnWrap}>
                      <Button
                        theme="light"
                        disabled={btnText != "Save Changes"}
                        onClick={updateProfile}
                      >
                        <div className={classes.saveBtn}>{btnText}</div>
                      </Button>
                    </div>
                  )}
                </div>
              </OverviewCard>
            </div>
            <div className={classes.addressWrap} ref={devicesRef}>
              <OverviewCard>
                <div className={classes.addressInner}>
                  <div className={classes.head}>Registered Device</div>
                  <div className={classes.description}>
                    You can manage maximum 3 devices
                  </div>
                  <div className={classes.deviceWrap}>
                    {devices &&
                      devices.length > 0 &&
                      devices.map((item: any, index: number) => (
                        <div className={classes.deviceItem} key={index}>
                          <div className={classes.menuWrap}>
                            <div className={classes.menuDots}>
                              <img
                                src="/assets/images/menuDotsGray.png"
                                alt="menu"
                              />
                              <div className={classes.menuOptions}>
                                <div className={classes.menuItem}>Remove</div>
                              </div>
                            </div>
                          </div>
                          <div className={classes.deviceLeft}>
                            <img
                              src={
                                item.device_type == "Mobile"
                                  ? "/assets/images/mob.png"
                                  : "/assets/images/pc.png"
                              }
                              alt="device"
                            />
                          </div>
                          <div className={classes.deviceRight}>
                            <div className={classes.name}>
                              {item.device_type}
                            </div>
                            <div className={classes.des}>
                              {item.device_name}
                            </div>
                            {item.current && (
                              <div className={classes.currentDevice}>
                                <img
                                  src="/assets/images/verifiedWhite.png"
                                  alt="verified"
                                />
                                This Device
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </OverviewCard>
            </div>
            <div className={classes.addressWrap} ref={passwordRef}>
              <OverviewCard>
                <div className={classes.addressInner}>
                  <div className={classes.head}>Password Settings</div>
                  <div className={classes.description}>
                    We recommend that youset a strong password that is at least
                    u characters long and includes a mix of letters, numbers and
                    symbol
                  </div>
                  <div className={classes.formOuter}>
                    <div className={classes.formField}>
                      <LabelInput
                        label="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder=""
                        disabled={disabled}
                        type="password"
                      />
                    </div>
                  </div>
                  <div className={classes.formHead}>Set your new password</div>
                  <div className={classes.formOuter}>
                    <div className={classes.formField}>
                      <LabelInput
                        label="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder=""
                        type="password"
                        disabled={disabled}
                      />
                    </div>
                    <div className={classes.formField}></div>
                    <div className={classes.formField}>
                      <LabelInput
                        label="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder=""
                        type="password"
                        disabled={disabled}
                      />
                    </div>
                    <div className={classes.formField}></div>
                  </div>
                  {!disabled && (
                    <div className={classes.btnWrap}>
                      <Button
                        theme="light"
                        onClick={updatePasswordMethod}
                        disabled={btnTextPassword != "Save Changes"}
                      >
                        <div className={classes.saveBtn}>{btnTextPassword}</div>
                      </Button>
                    </div>
                  )}
                </div>
              </OverviewCard>
            </div>
            <div className={classes.addressWrap} ref={newsletterRef}>
              <OverviewCard>
                <div className={classes.addressInner}>
                  <div className={classes.head}>Newsletter & Notifications</div>
                  <div className={classes.description}>
                    Control The Newsletter Subscription And Email Notification
                  </div>
                  <div className={classes.togOuter}>
                    <div className={classes.toggleField}>
                      <Toggle
                        value={newsLetter}
                        toggleSwitch={(val) => {
                          setNewsLetter(val);
                        }}
                      />
                      <div className={classes.toggleText}>
                        Subscribe to our newsletter
                      </div>
                    </div>
                    <div className={classes.toggleField}>
                      <Toggle
                        value={enableNotification}
                        toggleSwitch={(val) => {
                          console.log(val);
                          setEnableNotification(val);
                        }}
                      />
                      <div className={classes.toggleText}>
                        Enable notifications
                      </div>
                    </div>
                  </div>
                  {!disabled && (
                    <div className={classes.btnWrap}>
                      <Button
                        theme="light"
                        disabled={btnText != "Save Changes"}
                        onClick={updateProfile}
                      >
                        <div className={classes.saveBtn}>{btnText}</div>
                      </Button>
                    </div>
                  )}
                </div>
              </OverviewCard>
            </div>
          </div>
        </div>
      </div>
    </PageAnimation>
  );
};

export default BasicInfo;
