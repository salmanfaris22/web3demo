import { useEffect, useRef, useState } from "react";
import PageAnimation from "../../../../common/Components/PageAnimation/PageAnimation";
import OverviewCard from "../../../../common/Components/OverviewCard/OverviewCard";
import OverviewDetail from "../Sections/DetailOverview/DetailOverview";
import FilterDetails from "../../../../common/Components/FilterDetails/FilterDetails";
import FilterTable from "../Sections/FilterTable/FilterTable";
import classes from "./UserDetail.module.scss";
import {
  exportUserProfileListing,
  getUserProfileListing,
  getUserStatus,
  suspendUser,
  activateUser,
  searchUserProfileListing,
  downloadUserAgreement,
  freeAccessUser,
  getUserFreeAccessStatus,
  dexOnlyUser,
  freezeUser,
} from "../../../../services/user";
import { useNavigate, useParams } from "react-router-dom";
import Table2 from "../../../../common/Components/Table2/Table2";
import { getFirstLetter } from "../../../../utils/name";
import Modal from "../../../../common/Components/Modal/Modal";
import Button from "../../../../common/Components/Button/Button";
import { IMAGE_URL } from "../../../../config";
import {
  convertISOToCustomFormat,
  convertISOToYYYYMMDD,
  convertISOToYYYYMMDDUTC,
} from "../../../../utils/date";
import { formatCurrency } from "../../../../utils/currencyFormatter";
import useToast from "../../../../hooks/useToast";
import DatePicker from "../../../../common/Components/Datepicker/Datepicker";
import Checkbox from "../../../../common/Components/Checkbox/Checkbox";
import Toggle from "../../../../common/Components/Toggle/Toggle";
import { hideToastById, showToast } from "../../../../store/toastSlice";
import { useDispatch } from "react-redux";

const UserDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedSearchItem, setSelectedItem] = useState<any>({});
  // const [searchInput, setSearchInput] = useState("");
  const [showPop, setShowPop] = useState(false);
  const { triggerToast } = useToast();

  const filters = [
    {
      name: "Affiliate",
      key: "affiliate",
    },
    {
      name: "Deposit",
      key: "deposit",
    },
    {
      name: "Withdraw",
      key: "withdraw",
    },
    {
      name: "Tickets",
      key: "tickets",
    },
    {
      name: "Agreements",
      key: "agreements",
    },
  ];

  const [data, setData] = useState([]);
  const [activeFilter, setActiveFilter] = useState(0);
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [dateFilter2, setDateFilter2] = useState({
    startDate: "",
    endDate: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [lifeTime, setLifeTime] = useState<boolean>(false);

  const [status, setStatus] = useState({
    nft: "",
    online: false,
    suspended: false,
    plan_name: "",
    only_dextoken: false,
    freeze_earning: false,
  });
  const [btnText, setBtnText] = useState("Suspend");
  const [btnText2, setBtnText2] = useState("Apply Date");
  const [aisignal, setAiSignal] = useState(false);
  const [dexgem, setDexGem] = useState(false);
  //loading
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const [tabsArr, setTabsArr] = useState<any>([]);
  const [freeAccessVal, setFreeAccessVal] = useState<boolean>(false);
  const [freeAccessPop, setFreeAccessPop] = useState<boolean>(false);
  const [expirationPop, setExpirationPop] = useState<boolean>(false);
  // const [dexOnlyVal, setDexOnlyVal] = useState<boolean>(false);

  const dateRef = useRef<any>();

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
    getUserListMethod();
    getUserStatusMethod();
    getFreeAccessStatusMethod();
  }, [activeFilter, id]);

  useEffect(() => {
    if (id && status) {
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
          action: `trigger`,
        },
        {
          name: status.suspended ? "Activate" : "Suspend",
          type: "button",
          action: `trigger`,
        },
      ]);
    }
    if (status) {
      if (status.suspended) {
        setBtnText("Activate");
      } else {
        setBtnText("Suspend");
      }
    }
  }, [id, status]);

  useEffect(() => {
    getUserListMethod();
  }, [dateFilter.startDate]);

  // useEffect(() => {
  //   if (freeAccessVal) {
  //     setFreeAccessPop(true);
  //   } else {
  //     setFreeAccessCancelPop(true);
  //   }
  // }, [freeAccessVal]);

  const selectedItem = (item: any) => {
    setSelectedItem(item);
    redirect(`/user/details/${item.user_id}`);
  };

  const handleDateSelect = (date: any) => {
    if (date.selection) {
      setDateFilter(date.selection);
    }
  };

  const redirect = (url: any) => {
    navigate(url);
  };

  const onClose = () => {
    setShowPop(false);
  };

  const onConfirm = () => {
    if (status.suspended) {
      activateUserMethod();
    } else {
      suspendUserMethod();
    }
  };

  const onConfirmAccess = () => {
    setFreeAccessPop(false);
    setExpirationPop(true);
    // setDateFilter2({
    //   startDate: "",
    //   endDate: "",
    // });
  };

  const onConfirmDate = () => {
    freeAccessUserMethod();
  };

  const getUserListMethod = async () => {
    try {
      setFetching(true);
      setData([]);
      let filterKey = `?listType=${filters[activeFilter]["key"]}`;
      if (dateFilter.startDate) {
        filterKey =
          filterKey +
          `&startDate=${convertISOToYYYYMMDD(
            dateFilter.startDate
          )}&endDate=${convertISOToYYYYMMDD(dateFilter.endDate)}`;
      }
      const data = {
        id: id,
        url: filterKey,
      };
      const response = await getUserProfileListing(data);
      if (response.status) {
        if (response.data) {
          setData(response.data);
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
      setSearching(false);
    }
  };

  const getUserStatusMethod = async () => {
    try {
      const response = await getUserStatus(id);
      if (response.status) {
        if (response.data) {
          setStatus(response.data);
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

  const getFreeAccessStatusMethod = async () => {
    try {
      const response = await getUserFreeAccessStatus(id);
      if (response.status) {
        if (response.data) {
          setFreeAccessVal(false);
          setAiSignal(false);
          setDexGem(false);
          setLifeTime(false);
          setDateFilter2({
            startDate: "",
            endDate: "",
          });
          if (response.data.ai_signal_enabled) {
            setAiSignal(true);
            setFreeAccessVal(true);
            if (response.data.no_expiration_ai_signal) {
              setLifeTime(true);
            } else {
              setDateFilter2({
                startDate: response.data.ai_signal_start,
                endDate: response.data.ai_signal_end,
              });
            }
          }
          if (response.data.dexgem_enabled) {
            setDexGem(true);
            setFreeAccessVal(true);
            if (response.data.no_expiration_dexgem) {
              setLifeTime(true);
            } else {
              setDateFilter2({
                startDate: response.data.dexgem_start,
                endDate: response.data.dexgem_end,
              });
            }
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

  const getSearchResult = async (val: any) => {
    try {
      setSearching(true);
      let filterKey = `?listType=search`;
      filterKey = filterKey + `&searchQuery=${val}`;

      const data = {
        id: id,
        url: filterKey,
      };
      const response = await searchUserProfileListing(data);
      if (response.status) {
        if (response.data) {
          setSearchResult(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } else {
        console.error("Response status is false");
      }
    } catch (err) {
      console.error("Error fetching binary data:", err);
    } finally {
      setSearching(false);
    }
  };

  const freeAccessUserMethod = async () => {
    try {
      setBtnText2("Applying...");
      let data: any = {
        ai_signal_enabled: false,
        dexgem_enabled: false,
      };
      if (aisignal) {
        data["ai_signal_enabled"] = true;
        if (lifeTime) {
          data["no_expiration_ai_signal"] = lifeTime;
        } else {
          if (dateFilter2.startDate) {
            data["ai_signal_start"] = convertISOToYYYYMMDDUTC(
              dateFilter2.startDate,
              "start"
            );
            data["ai_signal_end"] = convertISOToYYYYMMDDUTC(
              dateFilter2.endDate,
              "end"
            );
          }
          data["no_expiration_ai_signal"] = lifeTime;
        }
      } else {
        data["ai_signal_enabled"] = false;
      }
      if (dexgem) {
        data["dexgem_enabled"] = true;
        if (lifeTime) {
          data["no_expiration_dexgem"] = lifeTime;
        } else {
          if (dateFilter2.startDate) {
            data["dexgem_start"] = convertISOToYYYYMMDDUTC(
              dateFilter2.startDate,
              "start"
            );
            data["dexgem_end"] = convertISOToYYYYMMDDUTC(
              dateFilter2.endDate,
              "end"
            );
          }
          data["no_expiration_dexgem"] = lifeTime;
        }
      } else {
        data["dexgem_enabled"] = false;
      }
      const response = await freeAccessUser(id, data);
      if (response.status) {
        setBtnText("Activate");
        setShowPop(false);
        getUserStatusMethod();
      } else {
        console.error("Response status is false");
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
      setBtnText2("Apply Date");
      setExpirationPop(false);
      getFreeAccessStatusMethod();
    }
  };

  const suspendUserMethod = async () => {
    try {
      setBtnText("Suspending...");
      const response = await suspendUser(id);
      if (response.status) {
        setBtnText("Activate");
        setShowPop(false);
        getUserStatusMethod();
      } else {
        console.error("Response status is false");
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
      console.error("Error fetching binary data:", err);
    } finally {
    }
  };

  const toggleDexOnlyMethod = async () => {
    try {
      dispatch(
        showToast({
          message: "Updating, please wait...",
          type: "warning",
          timeout: 25000,
          id: 10,
        })
      );
      const data = {
        only_dextoken: !status.only_dextoken,
      };
      const response = await dexOnlyUser(id, data);
      if (response.status) {
        dispatch(hideToastById(10));
        setStatus((state) => ({
          ...state,
          only_dextoken: !state.only_dextoken,
        }));
      } else {
        console.error("Response status is false");
      }
    } catch (err: any) {
      try {
        if (err.response.data.error) {
          dispatch(hideToastById(10));
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
      console.error("Error fetching binary data:", err);
    } finally {
    }
  };

  const toggleFreezeMethod = async () => {
    try {
      dispatch(
        showToast({
          message: "Updating, please wait...",
          type: "warning",
          timeout: 25000,
          id: 10,
        })
      );
      const data = {
        freeze: !status.freeze_earning,
      };
      const response = await freezeUser(id, data);
      if (response.status) {
        dispatch(hideToastById(10));
        setStatus((state) => ({
          ...state,
          freeze_earning: !state.freeze_earning,
        }));
      } else {
        console.error("Response status is false");
      }
    } catch (err: any) {
      try {
        if (err.response.data.error) {
          dispatch(hideToastById(10));
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
      console.error("Error fetching binary data:", err);
    } finally {
      dispatch(hideToastById(10));
    }
  };

  const activateUserMethod = async () => {
    try {
      setBtnText("Activating...");
      const response = await activateUser(id);
      if (response.status) {
        setBtnText("Suspend");
        setShowPop(false);
        getUserStatusMethod();
      } else {
        console.error("Response status is false");
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
      console.error("Error fetching binary data:", err);
    } finally {
    }
  };

  const exportMethod = async () => {
    try {
      let filterKey = `?listType=${filters[activeFilter]["key"]}`;
      // if (searchInput) {
      //   filterKey = filterKey + `&searchQuery=${searchInput}`;
      // }
      if (dateFilter.startDate) {
        filterKey =
          filterKey +
          `&startDate=${convertISOToYYYYMMDD(
            dateFilter.startDate
          )}&endDate=${convertISOToYYYYMMDD(dateFilter.endDate)}`;
      }
      const data = {
        id: id,
        url: filterKey,
      };
      const response = await exportUserProfileListing(data);
      if (response) {
        const blob = new Blob([response], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
      // if (response.status) {
      // } else {
      //   console.error("Response status is false");
      // }
    } catch (err) {
      console.error("Error fetching binary data:", err);
    } finally {
    }
  };

  const checkBtnAction = (val: any) => {
    switch (val) {
      case "Edit":
        redirect(`/user/basic/${id}`);
        break;
      case "Suspend":
        setShowPop(true);
        break;
      case "Activate":
        setShowPop(true);
        break;
    }
  };

  const handleDateSelectMethod = (date: any) => {
    if (date.selection) {
      if (date.selection.startDate != date.selection.endDate) {
        setShowDatePicker(false);
        setDateFilter2(date.selection);
        setLifeTime(false);
      }
    }
  };

  const clearDate = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    setDateFilter2({
      startDate: "",
      endDate: "",
    });
  };

  const toggleDatePicker = () => {
    setShowDatePicker((state) => !state);
  };

  return (
    <PageAnimation>
      <div className={classes.overview}>
        <FilterDetails
          searching={searching}
          searchResult={searchResult}
          searchNameKey={"name"}
          enableSearch={true}
          listDisplayKey={"name"}
          getSearchResult={getSearchResult}
          selectedItem={selectedItem}
          isOnline={status.online ? "Online" : "Offline"}
          exportMethod={exportMethod}
          tabsArr={tabsArr}
          triggerAction={checkBtnAction}
          enableDate={true}
          handleDateSelect={handleDateSelect}
          freeAccess={true}
          freeAccessVal={freeAccessVal}
          handleFreeAccess={() => {
            setFreeAccessPop(true);
          }}
          dexOnly={true}
          dexOnlyVal={status.only_dextoken}
          handleDexOnlyAccess={() => {
            toggleDexOnlyMethod();
          }}
          freeze={true}
          freezeVal={status.freeze_earning}
          handleFreezeAccess={() => {
            toggleFreezeMethod();
          }}
        />
      </div>
      <div className={classes.body}>
        <div className={classes.bodyTop}>
          {status.plan_name && (
            <div className={classes.left}>
              <PageAnimation>
                <div className={classes.nftContainer}>
                  <OverviewCard>
                    <div className={classes.nftImage}>
                      <div className={classes.tag}>
                        <div className={classes.tagText}>
                          {status.plan_name}
                        </div>
                      </div>
                      <div
                        className={classes.nftImageWrap}
                        title={status.plan_name}
                        style={{
                          backgroundImage: `url(${IMAGE_URL}/${status.nft})`,
                        }}
                      ></div>
                    </div>
                  </OverviewCard>
                </div>
              </PageAnimation>
            </div>
          )}

          <div
            className={`${classes.right} ${!status.plan_name && classes.full}`}
          >
            <OverviewDetail />
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.filterTable}>
            <div className={classes.filterWrap}>
              <FilterTable
                filterArr={filters}
                filterChanged={(val) => {
                  setActiveFilter(val);
                }}
              />
            </div>
            <div className={classes.tableOuter}>
              <PageAnimation>
                <OverviewCard>
                  <div className={classes.table}>
                    <Table2>
                      <thead>
                        <tr>
                          <th className={classes.amount}>Name</th>
                          <th className={classes.durationHead}>Type</th>
                          {activeFilter == 4 && (
                            <>
                              <th className={classes.tradeFee}>Package</th>
                              <th className={classes.tradeFee}>
                                Participation Amount
                              </th>
                            </>
                          )}
                          {activeFilter != 4 && (
                            <>
                              <th className={classes.tradeFee}>Invited By</th>
                            </>
                          )}
                          <th className={classes.greenCol}>Date</th>
                          <th className={classes.progressCol}>Income</th>
                          {activeFilter == 4 ? (
                            <th className={classes.tradeFee}>Download</th>
                          ) : (
                            <th className={classes.progressCol}>
                              Transaction ID
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data.map((item: any, index: number) => (
                            <tr
                              className={classes.hover}
                              key={index}
                              onClick={() => {
                                redirect(`/user/details/${item.user_id}`);
                              }}
                            >
                              <td>
                                {activeFilter == 4 ? (
                                  <div className={classes.nameNFT}>
                                    <div
                                      className={classes.avatar}
                                      style={{
                                        backgroundImage: `url(${IMAGE_URL}/${item.nft_logo})`,
                                      }}
                                    ></div>
                                  </div>
                                ) : (
                                  <div className={classes.nameAvatar}>
                                    <div className={classes.avatar}>
                                      {item.avatar && (
                                        <img src={item.avatar} alt="profile" />
                                      )}
                                      {getFirstLetter(item.name)}
                                    </div>
                                    {item.name}
                                  </div>
                                )}
                              </td>
                              <td>{item.type}</td>
                              <td>
                                {" "}
                                {/* <div className={classes.statusWrap}>
                                  <div
                                    className={`${classes.statusDot} ${
                                      classes[item.status]
                                    }`}
                                  >
                                    {item.status}
                                  </div>
                                </div> */}
                                {activeFilter === 4 ? (
                                  <div>{item?.collection}</div>
                                ) : (
                                  <div className={classes.nameAvatar}>
                                    <div className={classes.avatar}>
                                      {item.avatar && (
                                        <img src={item.avatar} alt="profile" />
                                      )}
                                      {getFirstLetter(item.invited_by)}
                                    </div>
                                    {item.invited_by}
                                  </div>
                                )}
                              </td>
                              <td>
                                {activeFilter === 4
                                  ? formatCurrency(item.participation_amount)
                                  : convertISOToCustomFormat(item.date)}
                              </td>
                              <td>
                                {/* <div className={classes.statusWrap}>
                                  <div
                                    className={`${classes.statusDot} ${
                                      classes[item.affiliate]
                                    }`}
                                  >
                                    {item.affiliate}
                                  </div>
                                </div> */}
                                {activeFilter === 4
                                  ? convertISOToCustomFormat(item.purchase_date)
                                  : item.income}
                              </td>
                              <td>
                                {activeFilter === 4
                                  ? formatCurrency(item.income)
                                  : item.transaction_id}
                              </td>
                              {activeFilter === 4 && (
                                <td>
                                  <Button
                                    onClick={async () => {
                                      try {
                                        triggerToast("Downloading...", "info");
                                        const blob =
                                          await downloadUserAgreement(
                                            item.user_plan_id,
                                            id as string
                                          );
                                        const url = URL.createObjectURL(blob);
                                        window.open(url);
                                      } catch (error) {
                                        triggerToast(
                                          "Something went wrong",
                                          "error"
                                        );
                                      }
                                    }}
                                    className={classes.dwnBtn}
                                    theme="neon"
                                  >
                                    Download
                                  </Button>
                                </td>
                              )}
                            </tr>
                          ))}
                        {fetching && (
                          <>
                            <tr>
                              <td colSpan={8}>
                                <div className={classes.filler}>Loading...</div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={8}>
                                <div className={classes.loader}>Loading...</div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={8}>
                                <div className={classes.filler}>Loading...</div>
                              </td>
                            </tr>
                          </>
                        )}
                        {!fetching && !data.length && (
                          <>
                            <tr>
                              <td colSpan={8}>
                                <div className={classes.filler}>No Data</div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={8}>
                                <div className={classes.loader}>No Data</div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={8}>
                                <div className={classes.filler}>No Data</div>
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </Table2>
                  </div>
                </OverviewCard>
              </PageAnimation>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showPop} closeBtn={true} closeMethod={onClose}>
        <div className={classes.modalBody}>
          <div className={classes.popHead}>
            Are you sure you want to{" "}
            {status.suspended ? "Activate " : "Suspend "}
            the user?
          </div>
          {/* <div className={classes.description}>
            To continue, please verify the email address you have used to
            register into our platform
          </div> */}
          <div className={`${classes.btnOuter}`}>
            <Button
              onClick={onConfirm}
              disabled={btnText !== "Suspend" && btnText !== "Activate"}
            >
              <div className={classes.authBtn}>{btnText}</div>
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        show={freeAccessPop}
        closeBtn={true}
        closeMethod={() => {
          setFreeAccessPop(false);
        }}
      >
        <div className={classes.modalBody}>
          <div className={classes.popHead}>Manage Free Access</div>
          <div className={classes.description}>
            Are you sure you want to allow free access to the user?
          </div>
          <div className={classes.toggleWrap}>
            <div className={classes.toggleItem}>
              <Toggle
                value={aisignal === undefined ? false : aisignal}
                onToggleChange={(val) => {
                  console.log(val);
                  setAiSignal(val);
                }}
              ></Toggle>
              AI Signal
            </div>
            <div className={classes.toggleItem}>
              <Toggle
                value={dexgem === undefined ? false : dexgem}
                onToggleChange={(val) => {
                  setDexGem(val);
                }}
              ></Toggle>
              Dexgem
            </div>
          </div>
          <div className={`${classes.btnOuter}`}>
            <Button onClick={onConfirmAccess}>
              <div className={classes.authBtn}>Proceed</div>
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        show={expirationPop}
        closeBtn={true}
        closeMethod={() => {
          if (btnText2 == "Apply Date") {
            setExpirationPop(false);
          }
        }}
      >
        <div className={classes.modalBody}>
          <div className={classes.popHead}>Set Expiration Date </div>
          <div className={classes.description}>
            Set Expiration Date for the free access
          </div>
          <div className={classes.dateRange}>
            <div className={classes.dateWrap} ref={dateRef}>
              <div className={classes.dateFilter} onClick={toggleDatePicker}>
                <img src="/assets/images/dateBlue.png" alt="date" />
                {dateFilter2.startDate &&
                  dateFilter2.startDate &&
                  dateFilter2.endDate && (
                    <>
                      <span
                        title={`${dateFilter2.startDate} - ${dateFilter2.endDate}`}
                      >
                        {convertISOToCustomFormat(dateFilter2.startDate)} -{" "}
                        {convertISOToCustomFormat(dateFilter2.endDate)}
                      </span>
                      <img
                        onClick={clearDate}
                        className={classes.cross}
                        src="/assets/images/cross.png"
                        alt="close"
                      />
                    </>
                  )}
              </div>
              {showDatePicker && (
                <DatePicker
                  customClass={"topDate"}
                  isRange={true}
                  onSelect={handleDateSelectMethod}
                />
              )}
            </div>
            <Checkbox
              label={" No Expiration Date"}
              checked={lifeTime}
              theme="squareBlank"
              onChange={(event) => {
                setLifeTime(event.target.checked);
              }}
              disabled={
                dateFilter2.startDate && dateFilter2.endDate ? true : false
              }
            />
          </div>
          <div className={`${classes.btnOuter}`}>
            <Button onClick={onConfirmDate} disabled={btnText2 != "Apply Date"}>
              <div className={classes.authBtn}>{btnText2}</div>
            </Button>
          </div>
        </div>
      </Modal>
    </PageAnimation>
  );
};

export default UserDetail;
