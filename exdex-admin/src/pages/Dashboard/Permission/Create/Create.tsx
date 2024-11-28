import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../common/Components/Button/Button";
import Checkbox from "../../../../common/Components/Checkbox/Checkbox";
import LabelInput from "../../../../common/Components/LabelInput/LabelInput";
import OverviewCard from "../../../../common/Components/OverviewCard/OverviewCard";
import PageAnimation from "../../../../common/Components/PageAnimation/PageAnimation";
import Tab from "../../../../common/Components/Tab/Tab";
import {
  addStaff,
  getPermissions,
  getUserDetailsFromId,
  updateStaff,
} from "../../../../services/permission";
import { showToast } from "../../../../store/toastSlice";
// import PhoneInputComponent from "../../../../common/Components/PhoneInput/PhoneInput";
import classes from "./Create.module.scss";
// import { getCountryCode } from "../../../../services/auth";
// import { setCountryCodes } from "../../../../store/authSlice";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [currentTab, setCurrentTab] = useState(1);
  const [permissions, setPermissions] = useState<any>({});
  const [checkedPermissions, setCheckedPermissions] = useState<any>({});
  const [type, setType] = useState("Add");
  const [btnText, setBtnText] = useState("Sent Invitation");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [code, setCode] = useState("");
  const [initialCode, setInitialCode] = useState("");
  const [initialPhone, setInitialPhone] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  //loading
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (selectAll) {
      if (checkedPermissions.administrative_permissions) {
        let perm = {
          administrative_permissions:
            checkedPermissions.administrative_permissions.map(
              (adminPerm: any) => true
            ),
          finance_permissions: checkedPermissions.finance_permissions.map(
            (financePerm: any) => true
          ),
        };
        setCheckedPermissions(perm);
      }
    } else {
      if (checkedPermissions.administrative_permissions) {
        let perm = {
          administrative_permissions:
            checkedPermissions.administrative_permissions.map(
              (adminPerm: any) => false
            ),
          finance_permissions: checkedPermissions.finance_permissions.map(
            (financePerm: any) => false
          ),
        };
        setCheckedPermissions(perm);
      }
    }
  }, [selectAll]);

  useEffect(() => {
    if (id == "add") {
      setType("Add");
    } else {
      setType("Update");
      setBtnText("Update");
    }
  }, [id]);

  const tabItems = [
    {
      label: "Overview",
    },
    {
      label: "Create",
      image: "/assets/images/plus.png",
    },
  ];

  const tabUpdate = (val: any) => {
    switch (val) {
      case 0:
        redirect("/permission");
        break;
      case 1:
        redirect("/permission/create/add");
        break;
    }
  };

  const redirect = (url: any) => {
    navigate(url);
  };

  useEffect(() => {
    // getCountryCodeMethod();
    getPermissionsMethod();
  }, []);

  // const getCountryCodeMethod = async () => {
  //   try {
  //     const response = await getCountryCode();
  //     if (response.status) {
  //       dispatch(setCountryCodes(response.data));
  //     }
  //   } catch (err) {
  //   } finally {
  //   }
  // };

  const getPermissionsMethod = async () => {
    try {
      setFetching(true);
      const response = await getPermissions();
      if (response.status) {
        if (response.data) {
          setPermissions(response.data);
          let perm = {
            administrative_permissions:
              response.data.administrative_permissions.map(() => false),
            finance_permissions: response.data.finance_permissions.map(
              () => false
            ),
          };
          setCheckedPermissions(perm);
          if (id != "add") {
            getUserDetailsMethod(response.data);
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
      setLoading(false);
      setFetching(false);
    }
  };

  const getUserDetailsMethod = async (permArr: any) => {
    try {
      setFetching(true);
      const response = await getUserDetailsFromId(id);
      if (response.status) {
        if (response.data) {
          setName(response.data.name);
          setEmail(response.data.email);
          // setPhone(response.data.phone);
          // setCode(response.data.country_code);
          setInitialCode(response.data.country_code);
          setInitialPhone(response.data.phone);

          let perm = {
            administrative_permissions: permArr.administrative_permissions.map(
              (adminPerm: any) =>
                response.data.permissions.includes(adminPerm.display_name)
                  ? true
                  : false
            ),
            finance_permissions: permArr.finance_permissions.map(
              (financePerm: any) =>
                response.data.permissions.includes(financePerm.display_name)
                  ? true
                  : false
            ),
          };

          setCheckedPermissions(perm);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } else {
        console.error("Response status is false");
      }
    } catch (err) {
      console.error("Error fetching binary data:", err);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  const handleCheckboxChange = (
    category: "administrative_permissions" | "finance_permissions",
    index: number,
    event: any
  ) => {
    const updatedPermissions = { ...checkedPermissions };
    updatedPermissions[category][index] = event.target.checked;
    setCheckedPermissions(updatedPermissions);
  };

  const handleSubmit = async () => {
    if (!name) {
      dispatch(
        showToast({
          message: "Fullname is required",
          type: "error",
          timeout: 5000,
        })
      );
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
    const selectedPermissions = [
      ...permissions.administrative_permissions
        .filter(
          (_: any, index: number) =>
            checkedPermissions.administrative_permissions[index]
        )
        .map((perm: any) => perm.id),
      ...permissions.finance_permissions
        .filter(
          (_: any, index: number) =>
            checkedPermissions.finance_permissions[index]
        )
        .map((perm: any) => perm.id),
    ];
    if (!selectedPermissions.length) {
      dispatch(
        showToast({
          message: "Permission is required",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    const staffData = {
      full_name: name,
      email,
      // country_code: code,
      // phone,
      permissions: selectedPermissions,
    };

    try {
      if (id == "add") {
        setBtnText("Senting...");
        const response = await addStaff(staffData);
        if (response.status === true) {
          navigate("/permission");
        } else {
          // Handle error response (e.g., display error message)
          console.error("Failed to create staff:", response.message);
        }
      } else {
        setBtnText("Updating...");
        const response = await updateStaff(staffData, id);
        if (response.status === true) {
          navigate("/permission");
        } else {
          // Handle error response (e.g., display error message)
          console.error("Failed to create staff:", response.message);
        }
      }
    } catch (err: any) {
      dispatch(
        showToast({
          message: err.response.data.error,
          type: "error",
          timeout: 5000,
        })
      );
      if (id == "add") {
        setBtnText("Sent Invitation");
      } else {
        setBtnText("Update");
      }
      console.error("Error creating staff:", err);
    } finally {
      if (id == "add") {
        setBtnText("Sent Invitation");
      } else {
        setBtnText("Update");
      }
    }
  };

  // const updatePhoneMethod = (data: any) => {
  //   if (data.phone) {
  //     setPhone(data.phone);
  //   }
  //   if (data.code) {
  //     setCode(data.code.code);
  //   }
  // };

  return (
    <PageAnimation>
      <div className={classes.userOuter}>
        <div className={classes.filterOut}>
          <Tab
            theme="grayTheme"
            items={tabItems}
            activeIndex={currentTab}
            onUpdate={tabUpdate}
          />
        </div>
        <div className={classes.head}>
          {type} {type == "Add" ? "a Staff" : ""}
        </div>
        <div className={classes.body}>
          <OverviewCard>
            <div className={classes.formWrap}>
              <div className={classes.formHead}>Basic Info</div>
              <div className={classes.formOuter}>
                <div className={classes.formField}>
                  <LabelInput
                    label="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=""
                  />
                </div>
                <div className={classes.formField}>
                  <LabelInput
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=""
                    disabled={type != "Add"}
                  />
                </div>
                {/* <div className={classes.formField}>
                  <PhoneInputComponent
                    theme={"box"}
                    updatePhone={updatePhoneMethod}
                    initialCode={initialCode}
                    initialPhone={initialPhone}
                  />
                </div> */}
              </div>
              <div className={classes.permissionOut}>
                <div className={classes.formHead}>
                  Permission
                  <div className={classes.selectAll}>
                    <div className={classes.selectAllWrap}>
                      <div className={classes.checkBoxWrap}>
                        <Checkbox
                          responsive="invertBox"
                          label={""}
                          checked={selectAll}
                          theme="squareBlank"
                          onChange={(val: any) => {
                            setSelectAll(val.target.checked);
                          }}
                        />
                      </div>
                      Select All
                    </div>
                  </div>
                </div>
                <div className={classes.permissionWrapper}>
                  <div className={classes.permissionHead}>Administration</div>
                  <div className={classes.checkBoxWrapper}>
                    {permissions &&
                      permissions.administrative_permissions &&
                      permissions.administrative_permissions.map(
                        (item: any, index: number) => (
                          <div
                            className={classes.checkBoxItem}
                            key={index}
                            title={item.description}
                          >
                            <Checkbox
                              responsive="invertBox"
                              label={item.display_name}
                              checked={
                                checkedPermissions.administrative_permissions[
                                  index
                                ]
                              }
                              theme="squareBlank"
                              onChange={(val: boolean) =>
                                handleCheckboxChange(
                                  "administrative_permissions",
                                  index,
                                  val
                                )
                              }
                            />
                          </div>
                        )
                      )}
                  </div>
                </div>
                <div className={classes.permissionWrapper}>
                  <div className={classes.permissionHead}>Finance</div>
                  <div className={classes.checkBoxWrapper}>
                    {permissions &&
                      permissions.finance_permissions &&
                      permissions.finance_permissions.map(
                        (item: any, index: number) => (
                          <div className={classes.checkBoxItem} key={index}>
                            <Checkbox
                              responsive="invertBox"
                              label={item.display_name}
                              checked={
                                checkedPermissions.finance_permissions[index]
                              }
                              theme="squareBlank"
                              onChange={(val: boolean) =>
                                handleCheckboxChange(
                                  "finance_permissions",
                                  index,
                                  val
                                )
                              }
                            />
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
          </OverviewCard>
        </div>
        <div className={classes.btnWrap}>
          <Button
            onClick={() => {
              redirect("/permission");
            }}
          >
            <div className={`${classes.btnItem} ${classes.cancel}`}>Cancel</div>
          </Button>
          {type == "Add" ? (
            <Button
              onClick={handleSubmit}
              disabled={btnText != "Sent Invitation"}
            >
              <div className={classes.btnItem}>{btnText}</div>
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={btnText != "Update"}>
              <div className={classes.btnItem}>{btnText}</div>
            </Button>
          )}
        </div>
      </div>
    </PageAnimation>
  );
};

export default Create;
