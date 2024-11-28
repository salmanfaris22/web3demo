import { useEffect, useState } from "react";
import classes from "./Listing.module.scss";
import {
  activateUser,
  deleteUser,
  exportUserProfileListing,
  getUserList,
  reActivateUser,
  suspendUser,
} from "../../../../services/user";
import FilterDetails from "../../../../common/Components/FilterDetails/FilterDetails";
import PageAnimation from "../../../../common/Components/PageAnimation/PageAnimation";
import Table2 from "../../../../common/Components/Table2/Table2";
import { useNavigate } from "react-router-dom";
import { getFirstLetter } from "../../../../utils/name";
import OverviewCard from "../../../../common/Components/OverviewCard/OverviewCard";
import Tab from "../../../../common/Components/Tab/Tab";
import Pagination from "../../../../common/Components/Pagination/Pagination";
import Modal from "../../../../common/Components/Modal/Modal";
import Button from "../../../../common/Components/Button/Button";
import {
  exportUserProfile,
  getPermissionsUsers,
  searchStaffProfileListing,
} from "../../../../services/permission";
import { convertISOToYYYYMMDD } from "../../../../utils/date";

const Listing = () => {
  const navigate = useNavigate();


  const [data, setData] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState(1);
  const [btnText, setBtnText] = useState("Delete");
  const [btnText2, setBtnText2] = useState("Suspend");
  const [showDeletePop, setShowDeletePop] = useState(false);
  const [showSuspendPop, setShowSuspendPop] = useState(false);
  const [selectedItemDel, setSelectedItemDel] = useState<any>({});
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedSearchItem, setSelectedItem] = useState<any>({});
  //loading
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  //pagination
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  useEffect(() => {
    getUserMethod();
  }, [page]);

  const getUserMethod = async () => {
    try {
      setFetching(true);
      setData([]);
      let filterKey = `?page=${1}&page_size=${pageSize}`;
      const response = await getPermissionsUsers(filterKey);
      if (response.status) {
        if (response.data && response.data.items) {
          setData(response.data.items);
          setPageCount(response.data.total_pages);
        } else {
          console.log("Unexpected data format:", response.data);
        }
      } else {
        console.log("Response status is false");
      }
    } catch (err) {
      console.log("Error fetching binary data:", err);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  const onCloseDelete = () => {
    setShowDeletePop(false);
  };

  const onConfirmDelete = () => {
    deleteUserMethod();
  };

  const onCloseSuspend = () => {
    setShowSuspendPop(false);
  };

  const onConfirmSuspend = () => {
    suspendUserMethod();
  };

  const suspendUserMethod = async () => {
    try {
      if (btnText2 == "Suspend") {
        setBtnText2("Suspending...");
        const response = await suspendUser(selectedItemDel.user_id);
        if (response.status) {
        } else {
          console.error("Response status is false");
        }
      } else {
        setBtnText2("Activating...");
        if (selectedItemDel.status == "Deleted") {
          const response = await reActivateUser(selectedItemDel.user_id);
          if (response.status) {
          } else {
            console.error("Response status is false");
          }
        } else {
          const response = await activateUser(selectedItemDel.user_id);
          if (response.status) {
          } else {
            console.error("Response status is false");
          }
        }
      }
      setShowSuspendPop(false);
      getUserMethod();
    } catch (err) {
      console.error("Error fetching binary data:", err);
    } finally {
      setBtnText2("Suspend");
    }
  };

  const deleteUserMethod = async () => {
    try {
      setBtnText("Deleting...");
      const response = await deleteUser(selectedItemDel.user_id);
      if (response.status) {
        setShowDeletePop(false);
        getUserMethod();
      } else {
        console.error("Response status is false");
      }
    } catch (err) {
      console.error("Error fetching binary data:", err);
    } finally {
      setBtnText("Delete");
    }
  };

  const redirect = (url: any) => {
    navigate(url);
  };

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
        break;
      case 1:
        redirect("/permission/create/add");
        break;
    }
  };

  const exportMethod = async () => {
    try {
      let filterKey = `?page=${page}&page_size=${pageSize}`;
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
        url: filterKey,
      };
      const response = await exportUserProfile(data);
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

  const handleDateSelect = (date: any) => {
    if (date.selection) {
      setDateFilter(date.selection);
    }
  };

  const selectedItem = (item: any) => {
    setSelectedItem(item);
    redirect(`/permission/create/${item.user_id}`);
  };

  const getSearchResult = async (val: any) => {
    try {
      setSearching(true);
      let filterKey = `?search=${val}&page=${page}&page_size=${100}`;
      const data = {
        url: filterKey,
      };
      const response = await searchStaffProfileListing(data);
      if (response.status) {
        if (response.data) {
          if (response.data.users) {
            setSearchResult(response.data.users);
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
      setSearching(false);
    }
  };

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
          <FilterDetails
            searching={searching}
            searchResult={searchResult}
            searchNameKey={"name"}
            enableSearch={true}
            listDisplayKey={"name"}
            getSearchResult={getSearchResult}
            selectedItem={selectedItem}
            tabsArr={[]}
            enableDate={false}
            exportMethod={exportMethod}
            handleDateSelect={handleDateSelect}
          />
        </div>
        <div className={classes.body}>
          <div className={classes.bottom}>
            <div className={classes.filterTable}>
              <div className={classes.tableOuter}>
                <PageAnimation>
                  <OverviewCard>
                    <div className={classes.table}>
                      <Table2>
                        <thead>
                          <tr>
                            <th className={classes.nft}>Name</th>
                            <th className={classes.amount}>Date</th>
                            <th className={classes.tradeFee}>Status</th>
                            <th className={classes.greenCol}>Last Visited</th>
                            <th className={classes.progressCol}>Permission</th>
                            <th className={classes.progressCol}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {data &&
                            data.map((item: any, index: number) => (
                              <tr key={index}>
                                <td>
                                  <div className={classes.nameAvatar}>
                                    <div className={classes.avatar}>
                                      {item.avatar && (
                                        <img src={item.avatar} alt="profile" />
                                      )}
                                      {getFirstLetter(item.name)}
                                    </div>
                                    {item.name}
                                  </div>
                                </td>
                                <td>{item.date}</td>
                                <td>
                                  {" "}
                                  <div className={classes.statusWrap}>
                                    <div
                                      className={`${classes.statusDot} ${
                                        classes[item.status]
                                      }`}
                                    >
                                      {item.status}
                                    </div>
                                  </div>
                                </td>
                                <td>{item.last_visited_date}</td>
                                <td>
                                  <div className={classes.permissionWrapOut}>
                                    {item.permissions.map((perm: any) => (
                                      <div
                                        className={classes.permissionTab}
                                        key={perm}
                                      >
                                        {perm}
                                      </div>
                                    ))}
                                  </div>
                                </td>
                                <td>
                                  <div className={classes.menuWrap}>
                                    <div className={classes.menuDot}>
                                      <img
                                        src="/assets/images/menuDots.png"
                                        alt="menu"
                                      />
                                      <div className={classes.menuOptionWrap}>
                                        <div
                                          className={classes.menuOption}
                                          onClick={() => {
                                            redirect(
                                              `/permission/create/${item.user_id}`
                                            );
                                          }}
                                        >
                                          <img
                                            src="/assets/images/editWhite.png"
                                            alt="edit"
                                          />
                                          Edit
                                        </div>
                                        {item.status != "Deleted" && (
                                          <div
                                            className={classes.menuOption}
                                            onClick={() => {
                                              setSelectedItemDel(item);
                                              setShowDeletePop(true);
                                            }}
                                          >
                                            <img
                                              src="/assets/images/deleteWhite.png"
                                              alt="edit"
                                            />
                                            Delete
                                          </div>
                                        )}

                                        <div
                                          className={classes.menuOption}
                                          onClick={() => {
                                            setSelectedItemDel(item);
                                            if (
                                              item.status == "Suspended" ||
                                              item.status == "Deleted"
                                            ) {
                                              setBtnText2("Activate");
                                            } else {
                                              setBtnText2("Suspend");
                                            }
                                            setShowSuspendPop(true);
                                          }}
                                        >
                                          <img
                                            src="/assets/images/suspend.png"
                                            alt="edit"
                                          />
                                          {item.status != "Suspended" &&
                                          item.status != "Deleted"
                                            ? "Suspend"
                                            : "Activate"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          {fetching && (
                            <>
                              <tr>
                                <td colSpan={6}>
                                  <div className={classes.filler}>
                                    Loading...
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={6}>
                                  <div className={classes.loader}>
                                    Loading...
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={6}>
                                  <div className={classes.filler}>
                                    Loading...
                                  </div>
                                </td>
                              </tr>
                            </>
                          )}
                          {!fetching && !data.length && (
                            <>
                              <tr>
                                <td colSpan={6}>
                                  <div className={classes.filler}>No Data</div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={6}>
                                  <div className={classes.loader}>No Data</div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={6}>
                                  <div className={classes.filler}>No Data</div>
                                </td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </Table2>
                    </div>
                  </OverviewCard>
                  <div className={classes.pagination}>
                    <Pagination
                      containerClassName="CustomPaginationSimple"
                      pageCount={pageCount}
                      initialPage={page}
                      onPageChange={(e) => {
                        console.log(e);
                        setPage(e.selected + 1);
                      }}
                    />
                  </div>
                </PageAnimation>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showDeletePop} closeBtn={true} closeMethod={onCloseDelete}>
        <div className={classes.modalBody}>
          <div className={classes.popHead}>
            Are you sure you want to delete the user?
          </div>
          <div className={`${classes.btnOuter}`}>
            <Button onClick={onConfirmDelete} disabled={btnText !== "Delete"}>
              <div className={classes.authBtn}>{btnText}</div>
            </Button>
          </div>
        </div>
      </Modal>
      <Modal show={showSuspendPop} closeBtn={true} closeMethod={onCloseSuspend}>
        <div className={classes.modalBody}>
          <div className={classes.popHead}>
            Are you sure you want to
            {selectedItemDel.status == "Suspended" ||
            selectedItemDel.status == "Deleted"
              ? " activate"
              : " suspend"}{" "}
            the user?
          </div>
          <div className={`${classes.btnOuter}`}>
            <Button
              onClick={onConfirmSuspend}
              disabled={btnText2 !== "Suspend" && btnText2 !== "Activate"}
            >
              <div className={classes.authBtn}>{btnText2}</div>
            </Button>
          </div>
        </div>
      </Modal>
    </PageAnimation>
  );
};

export default Listing;
