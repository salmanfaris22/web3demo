import { useEffect, useRef, useState } from "react";
import Tab from "../../../../../common/Components/Tab/Tab";
import Table2 from "../../../../../common/Components/Table2/Table2";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./History.module.scss";
import { getReferralHistory } from "../../../../../services/overview";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import {
  convertISOToCustomFormat,
  formatDate,
} from "../../../../../utils/date";
import { copyToClipboard } from "../../../../../utils/clipboard";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "../../../../../common/Components/Datepicker/Datepicker";
import { setLoad } from "../../../../../store/loadSectionsSlice";

const History = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const searchTimeout = useRef<any>();
  const filterRef = useRef<any>();
  const dateRef = useRef<any>();

  const filterTypes = [
    {
      name: "All",
      val: "all",
    },
    {
      name: "Binary",
      val: "binary",
    },
    {
      name: "Unilevel",
      val: "unilevel",
    },
  ];
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });
  //loading
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
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
    if (filterType) {
      getHistoryMethod();
    }
  }, [filterType]);

  useEffect(() => {
    getHistoryMethod();
  }, [dateFilter]);

  useEffect(() => {
    try {
      clearTimeout(searchTimeout.current);
    } catch (e) {
      console.log(e);
    }
    searchTimeout.current = setTimeout(() => {
      getHistoryMethod();
    }, 1000);
  }, [searchInput]);

  const getHistoryMethod = async () => {
    try {
      let data: any = {
        type: filterType,
        search: searchInput,
      };
      if (dateFilter.startDate && dateFilter.endDate) {
        data["startDate"] = formatDate(dateFilter.startDate);
        data["endDate"] = formatDate(dateFilter.endDate);
      }
      setFetching(true);
      setData([]);
      const response = await getReferralHistory(data);
      if (response.status) {
        if (response.data) {
          setData(response.data);
        } else {
          setData([]);
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
      setFetching(false);
      dispatch(setLoad(5));
    }
  };

  const copyAddress = (address: string, message: string) => {
    copyToClipboard(address, dispatch, {
      successMessage: message,
      onSuccess: () => {},
      onError: () => {},
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name == "search") {
      setSearchInput(value);
    }
  };

  const filterToggle = () => {
    setShowFilter((state) => !state);
  };

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
    console.log("Selected date or range:", date);
    if (date.selection) {
      if (date.selection.startDate != date.selection.endDate) {
        setShowDatePicker(false);
        setDateFilter(date.selection);
      }
    }
  };

  const selectFilter = (val: any) => {
    setShowFilter(false);
    setFilterType(val.val);
  };

  return (
    <>
      {!loading && (
        <PageAnimation>
          <div className={classes.binaryWrap}>
            <OverviewCard type="fullHeight">
              <div className={classes.binaryInner}>
                <div className={classes.head}>Referral History</div>
                <div className={classes.filterSection}>
                  <div></div>
                  <div className={classes.rightSection}>
                    <div className={classes.datePickerOuter} ref={dateRef}>
                      <div
                        className={classes.datePicker}
                        onClick={toggleDatePicker}
                      >
                        <img
                          src="/assets/images/filter/date.svg"
                          alt="datepicker"
                        />
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
                      </div>

                      {showDatePicker && (
                        <DatePicker
                          isRange={true}
                          onSelect={handleDateSelect}
                        />
                      )}
                    </div>
                    <div className={classes.search}>
                      <input
                        type="text"
                        placeholder="Search"
                        name="search"
                        value={searchInput}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={classes.filterOuter} ref={filterRef}>
                      <div className={classes.filter} onClick={filterToggle}>
                        <img
                          src="/assets/images/filter/filter.png"
                          alt="filter"
                        />
                        {filterType}
                      </div>
                      {showFilter && (
                        <div className={classes.filterSuggestion}>
                          {filterTypes.map((item) => (
                            <div
                              key={item.name}
                              className={classes.filterItem}
                              onClick={() => {
                                selectFilter(item);
                              }}
                            >
                              {item.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.tableOuter}>
                <Table2>
                  <thead>
                    <tr>
                      <th className={classes.nft}>NO.</th>
                      <th className={classes.amount}>Name</th>
                      <th className={classes.amount}>Type</th>
                      <th className={classes.durationHead}>Account No.</th>
                      <th className={classes.tradeFee}>Joining Date</th>
                      <th className={classes.progressCol}>Amount</th>
                      <th className={classes.progressCol}>KYC</th>
                      <th className={classes.progressCol}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item: any, index: number) => (
                        <tr key={index}>
                          <td data-label="NO.">{index + 1}</td>
                          <td data-label="Name">{item.user_name}</td>
                          <td data-label="Type">{item.subscription_type}</td>
                          <td data-label="Account">{item.account_number}</td>
                          <td data-label="Joining Date">
                            {item.joining_date
                              ? convertISOToCustomFormat(item.joining_date)
                              : ""}
                          </td>
                          <td data-label="Amount">
                            {formatCurrency(
                              item.total_amount_usd,
                              "en-US",
                              "USD"
                            )}
                          </td>
                          <td data-label="KYC">{item.kyc}</td>
                          <td data-label="Status">
                            <div className={classes.statusWrap}>
                              <div
                                className={`${classes.status} ${
                                  classes[item.status]
                                }`}
                              >
                                {item.status}
                              </div>
                            </div>
                          </td>
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
          </div>
        </PageAnimation>
      )}
    </>
  );
};

export default History;
