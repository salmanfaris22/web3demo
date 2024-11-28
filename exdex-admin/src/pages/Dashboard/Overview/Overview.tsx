import { useDispatch, useSelector } from "react-redux";
import PageAnimation from "../../../common/Components/PageAnimation/PageAnimation";
import TopBar from "./components/TopBar/TopBar";
import classes from "./Overview.module.scss";
import Visits from "./Sections/Visits/Visits";
import { selectDiscoverLoad } from "../../../store/loadSectionsSlice";
import Tab from "../../../common/Components/Tab/Tab";
import { useEffect, useRef, useState } from "react";
import DatePicker from "../../../common/Components/Datepicker/Datepicker";
import {
  convertISOToCustomFormat,
  convertISOToYYYYMMDD,
} from "../../../utils/date";
import TotalSales from "./Sections/TotalSales/TotalSales";
import AutoTrade from "./Sections/AutoTrade/AutoTrade";
import AiSignal from "./Sections/AiSignal/AiSignal";
import DexGem from "./Sections/Dexgem/Dexgem";
import Academy from "./Sections/Academy/Academy";
import NFT from "./Sections/NFT/NFT";
import TotalSpendEx from "./Sections/TotalSpendEx/TotalSpendEx";
import TotalSpendDex from "./Sections/TotalSpendDex/TotalSpendDex";
import { setFilter } from "../../../store/overviewSlice";
import Binary from "./Sections/Binary/Binary";
import UniLevel from "./Sections/UniLevel/UniLevel";
import IB from "./Sections/IB/IB";
import { selectToken, selectUser } from "../../../store/authSlice";
import { getUserList } from "../../../services/user";
import ReusableDropdownPagination from "../../../common/Components/DropdownWithPagination/DropdownWithPagination";

const Overview = () => {
  const dispatch = useDispatch();
  const loadSection = useSelector(selectDiscoverLoad);
  const token = useSelector(selectToken);
  const user: any = useSelector(selectUser);

  //dropdown
  const [items, setItems] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  //dropdown
  //dropdown2
  const [items2, setItems2] = useState<any>([]);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [itemsPerPage2] = useState(20);
  const [totalPages2, setTotalPages2] = useState(0);
  const [isLoading2, setIsLoading2] = useState(false);

  const tabItems = [
    {
      label: "Weekly",
    },
    {
      label: "Monthly",
    },
    {
      label: "Annually",
    },
    {
      label: "Reset",
    },
  ];

  useEffect(() => {
    loadItems();
  }, [currentPage]);

  useEffect(() => {
    getUserListMethod();
  }, [currentPage2]);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      let filterKey = `?type=direct&page=${currentPage}&limit=${itemsPerPage}`;
      const response = await getUserList(filterKey);
      if (response.status) {
        if (response.data) {
          setItems([...items, ...response.data.users]);
          setTotalPages(Math.ceil(response.data.total_count / itemsPerPage));
          // setTotalPages(57);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } else {
        console.error("Response status is false");
      }
    } catch (err) {
      console.error("Error fetching binary data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleViewMore2 = () => {
    setCurrentPage2(currentPage2 + 1);
  };

  const tabUpdate = (val: any) => {
    if (val != 3) {
      setDateFilter({
        startDate: "",
        endDate: "",
      });
    }
    let filterString = "all";
    switch (val) {
      case 0:
        filterString = "weekly";
        break;
      case 1:
        filterString = "monthly";
        break;
      case 2:
        filterString = "annually";
        break;
      case 3:
        filterString = "all";
        break;
    }
    if (dateFilter.startDate && dateFilter.endDate && val == 3) {
      filterString =
        filterString +
        `&startDate=${convertISOToYYYYMMDD(
          dateFilter.startDate
        )}&endDate=${convertISOToYYYYMMDD(dateFilter.endDate)}`;
    }
    dispatch(setFilter(filterString));
    setCurrentTab(val);
  };
  const [currentTab, setCurrentTab] = useState(3);
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filterItem, setFilterItem] = useState<any>();
  const [clearTeam, setClearTeam] = useState<boolean>(false);
  const [clearDirect, setClearDirect] = useState<boolean>(false);

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
    if (user && user.role == "admin") {
      getUserListMethod();
      loadItems();
    }
  }, [user]);

  useEffect(() => {
    if (dateFilter.startDate && dateFilter.endDate) {
      tabUpdate(3);
    }
  }, [dateFilter]);

  const clearDate = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    setDateFilter({
      startDate: "",
      endDate: "",
    });
  };

  const toggleDatePicker = () => {
    setShowDatePicker((state) => !state);
  };

  const handleDateSelect = (date: any) => {
    if (date.selection) {
      if (date.selection.startDate != date.selection.endDate) {
        setShowDatePicker(false);
        setDateFilter(date.selection);
      }
    }
  };

  const handleChange = (data: any, type: string) => {
    if (type == "team") {
      setClearDirect(true);
      setTimeout(() => {
        setClearDirect(false);
      }, 100);
    } else {
      setClearTeam(true);
      setTimeout(() => {
        setClearTeam(false);
      }, 100);
    }
    setFilterItem(data.id);
  };

  const getUserListMethod = async () => {
    try {
      setIsLoading2(true);
      let filterKey = `?type=team&page=${currentPage2}&limit=${itemsPerPage2}`;
      const response = await getUserList(filterKey);
      if (response.status) {
        if (response.data && response.data.users) {
          setItems2([...items2, ...response.data.users]);
          setTotalPages2(Math.ceil(response.data.total_count / itemsPerPage));
          // setTotalPages2(57);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } else {
        console.error("Response status is false");
      }
    } catch (err) {
      console.error("Error fetching binary data:", err);
    } finally {
      setIsLoading2(false);
    }
  };

  return (
    <div className={classes.overviewOuter}>
      {token && (
        <>
          <div className={classes.topOuter}>
            <PageAnimation>
              <TopBar />
              {loadSection > -1 && (
                <>
                  <div className={classes.disItemWrap}>
                    <Visits />
                  </div>
                </>
              )}
              <div className={classes.filterTabWrap}>
                <div className={classes.tab}>
                  <Tab
                    theme="greenOrange"
                    items={tabItems}
                    activeIndex={currentTab}
                    onUpdate={tabUpdate}
                  />
                </div>
                <div className={classes.filter}>
                  <div className={classes.setDuration} ref={dateRef}>
                    <div
                      className={classes.datePicker}
                      onClick={toggleDatePicker}
                    >
                      {dateFilter.startDate && dateFilter.endDate && (
                        <>
                          <span>
                            {convertISOToCustomFormat(dateFilter.startDate)} -{" "}
                            {convertISOToCustomFormat(dateFilter.endDate)}
                          </span>
                          <img
                            onClick={clearDate}
                            className={classes.cross}
                            src="/assets/images/cross.png"
                            alt="close"
                          />
                        </>
                      )}
                      {(!dateFilter.startDate || !dateFilter.endDate) && (
                        <>
                          <span className={classes.dur}>Set Duration</span>
                        </>
                      )}
                    </div>

                    {showDatePicker && (
                      <DatePicker isRange={true} onSelect={handleDateSelect} />
                    )}
                  </div>
                  {/* <div className={classes.export}>Export</div> */}
                </div>
              </div>
            </PageAnimation>
          </div>
          <div className={classes.salesOverview}>
            <div className={classes.head}>Sales overview</div>
            <div className={classes.sectionWrap}>
              {loadSection > -1 && (
                <div className={classes.visitsRef}>
                  <TotalSales key={"sales"} />
                </div>
              )}
              {loadSection > -1 && (
                <div className={classes.visitsRef}>
                  <AutoTrade />
                </div>
              )}
              {loadSection > 0 && (
                <div className={classes.visitsRef}>
                  <AiSignal />
                </div>
              )}
              {loadSection > 0 && (
                <div className={classes.visitsRef}>
                  <DexGem />
                </div>
              )}
              {loadSection > 1 && (
                <div className={classes.visitsRef}>
                  <Academy />
                </div>
              )}
              {loadSection > 1 && (
                <div className={classes.visitsRef}>
                  <NFT />
                </div>
              )}
              {loadSection > 2 && (
                <div className={classes.visitsRef}>
                  <TotalSpendEx />
                </div>
              )}
              {loadSection > 2 && (
                <div className={classes.visitsRef}>
                  <TotalSpendDex />
                </div>
              )}
              <div className={classes.visitsRef}></div>
            </div>
          </div>
          <div className={classes.affiliateOverview}>
            <div className={classes.head}>
              Affiliatte overview
              {user && user.role == "admin" && (
                <div className={classes.aff}>
                  <div className={classes.filterWrap}>
                    <ReusableDropdownPagination
                      items={items2}
                      selectFirst={true}
                      totalPages={totalPages2}
                      onViewMore={handleViewMore2}
                      isLoading={isLoading2}
                      clear={clearTeam}
                      keyName="country_name"
                      currentPage={currentPage2}
                      placeholder="Select team users"
                      onSelect={(data) => {
                        handleChange(data, "team");
                      }}
                    />
                  </div>
                  <div className={classes.filterWrap}>
                    <ReusableDropdownPagination
                      items={items}
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onViewMore={handleViewMore}
                      isLoading={isLoading}
                      clear={clearDirect}
                      placeholder="Select direct users"
                      onSelect={(data) => {
                        handleChange(data, "direct");
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            {loadSection > 2 && (
              <div className={classes.sectionWrap}>
                <div className={classes.visitsRef}>
                  <TotalSales
                    type="users"
                    key={"users"}
                    refreshPage={filterItem}
                  />
                </div>
                <div className={classes.visitsRef}>
                  <Binary refreshPage={filterItem} />
                </div>
                <div className={classes.visitsRef}>
                  <UniLevel refreshPage={filterItem} />
                </div>
                <div className={classes.visitsRef}>
                  <IB />
                </div>
                <div className={classes.visitsRef}></div>
                <div className={classes.visitsRef}></div>
                <div className={classes.visitsRef}></div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
