import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "../../../../../common/Components/Datepicker/Datepicker";
import OverviewCard from "../../../../../common/Components/OverviewCard/OverviewCard";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import Pagination from "../../../../../common/Components/Pagination/Pagination";
import Table2 from "../../../../../common/Components/Table2/Table2";
import {
  exportPurchasedPlanHistory,
  getPurchasedPlanHistory,
} from "../../../../../services/plan";
import { copyToClipboard } from "../../../../../utils/clipboard";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import {
  convertISOToCustomFormat,
  convertISOToYYYYMMDD,
} from "../../../../../utils/date";
import classes from "./History.module.scss";

const History = ({
  overviewPage,
  onSeeLess,
  theme,
  planId,
}: {
  overviewPage?: boolean;
  theme?: string;
  planId?: any;
  onSeeLess?: () => void;
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRef = useRef<any>();
  const [searchInput, setSearchInput] = useState("");
  const searchTimeout = useRef<any>();
  const searchRef = useRef<HTMLDivElement>(null);

  //loading
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [downloading, setDownloading] = useState(false);
  //pagination
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  //pagination ends
  useEffect(() => {
    getPlansMethod();
  }, [dateFilter]);

  useEffect(() => {
    getPlansMethod();
  }, [page]);

  useEffect(() => {
    try {
      clearTimeout(searchTimeout.current);
    } catch (e) {
      console.log(e);
    }
    searchTimeout.current = setTimeout(() => {
      getPlansMethod();
    }, 1000);
  }, [searchInput]);

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

  const getPlansMethod = async () => {
    setLoading(true);
    setFetching(true);
    try {
      let url = `?page=${page + 1}&limit=${pageSize}`;
      if (searchInput) {
        url = url + `&search=${searchInput}`;
      }
      if (planId) {
        url = url + `&user_plan_id=${planId}`;
      }
      if (dateFilter.startDate && dateFilter.endDate) {
        if (searchInput) {
          url =
            url +
            `&start_date=${convertISOToYYYYMMDD(
              dateFilter.startDate
            )}&end_date=${convertISOToYYYYMMDD(dateFilter.endDate)}`;
        } else {
          url =
            url +
            `&start_date=${convertISOToYYYYMMDD(
              dateFilter.startDate
            )}&end_date=${convertISOToYYYYMMDD(dateFilter.endDate)}`;
        }
      }
      const response = await getPurchasedPlanHistory(url);
      if (response.status) {
        if (response.data && response.data.data) {
          setData(response.data.data);
          setPageCount(Math.ceil(response.data.total_count / pageSize));
        } else {
          setData([]);
        }
      } else {
        setData([]);
      }
    } catch (err) {
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  const getExportHistoryMethod = async () => {
    if (downloading) {
      return;
    }
    try {
      setDownloading(true);
      let url = "";
      if (planId) {
        url = `?user_plan_id=${planId}`;
      }
      const response = await exportPurchasedPlanHistory(url);
      if (response) {
        const blob = new Blob([response], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Income.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
    } finally {
      setDownloading(false);
    }
  };

  const clearDate = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    setDateFilter({
      startDate: "",
      endDate: "",
    });
  };

  const copyAddress = (address: string, message: string) => {
    copyToClipboard(address, dispatch, {
      successMessage: message,
      onSuccess: () => {},
      onError: () => {},
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name == "search") {
      setSearchInput(value);
    }
  };

  return (
    <PageAnimation>
      <div className={classes.binaryWrap}>
        <OverviewCard type="fullHeight" background="transparent">
          <div className={classes.binaryInner}>
            <div className={classes.filterSection}>
              <div className={classes.pass}>{planId ? "Passive Income History" : ""}</div>
              <div className={classes.rightSection}>
                {!overviewPage && (
                  <div
                    className={classes.export}
                    onClick={getExportHistoryMethod}
                  >
                    Export{downloading ? "ing" : ""}
                    <img
                      src="/assets/images/filter/download.png"
                      alt="download"
                    />
                  </div>
                )}
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
                    <DatePicker isRange={true} onSelect={handleDateSelect} />
                  )}
                </div>
                <div className={classes.search}>
                  <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    value={searchInput}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className={classes.filter}>
                  <img src="/assets/images/filter/filter.png" alt="filter" />
                  Filter
                </div> */}
              </div>
            </div>
          </div>
          <div className={classes.tableOuter}>
            <Table2 theme={theme ? theme : ""}>
              <thead>
                <tr>
                  <th className={classes.nft}>NO.</th>
                  <th className={classes.durationHead}>ID#</th>
                  <th className={classes.tradeFee}>Date</th>
                  <th className={classes.amount}>Today Income</th>
                  <th className={classes.progressCol}>Platform Fee</th>
                  <th className={classes.progressCol}>Net Income</th>
                  <th className={classes.progressCol}>Status</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item: any, index: number) => (
                    <tr key={index}>
                      <td data-label="NO.">{item.index}</td>
                      <td data-label="ID#">{item.id}</td>
                      <td data-label="Date">
                        {convertISOToCustomFormat(item.date)}
                      </td>
                      <td data-label="Today Income">
                        {formatCurrency(item.today_income, "en-US", "USD")}
                      </td>
                      <td data-label="Platform Fee">
                        <div className={classes.fee}>
                          {item.platform_fee}
                          {item.platform_fee != "-" ? "%" : ""}
                        </div>
                      </td>
                      <td data-label="Net Income">
                        {" "}
                        {formatCurrency(item.income, "en-US", "USD")}
                      </td>
                      <td data-label="Status">
                        <div className={classes.statusWrap}>
                          <div
                            className={`${classes.status} ${
                              classes[
                                item.status == "Stop Loss"
                                  ? "stoploss"
                                  : item.status
                              ]
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
                      <td colSpan={7}>
                        <div className={classes.filler}>Loading...</div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={7}>
                        <div className={classes.loader}>Loading...</div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={7}>
                        <div className={classes.filler}>Loading...</div>
                      </td>
                    </tr>
                  </>
                )}
                {!fetching && !data.length && (
                  <>
                    <tr>
                      <td colSpan={7}>
                        <div className={classes.filler}>No Data</div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={7}>
                        <div className={classes.loader}>No Data</div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={7}>
                        <div className={classes.filler}>No Data</div>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table2>
            <div className={classes.paginationWrap}>
              <Pagination
                containerClassName="CustomPaginationSimple"
                pageCount={pageCount}
                initialPage={page}
                onPageChange={(e) => {
                  setPage(e.selected);
                }}
              />
            </div>
            {overviewPage && (
              <div
                className={`${classes.rightSection} ${classes.rightSectionOverView}`}
              >
                <div className={classes.seeLess}>
                  <span onClick={onSeeLess}>
                    See Less
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.00057 19.0006H21.0006C21.1828 19 21.3615 18.9498 21.5173 18.8552C21.673 18.7607 21.8001 18.6254 21.8848 18.464C21.9694 18.3027 22.0085 18.1212 21.9977 17.9393C21.9869 17.7574 21.9267 17.5819 21.8236 17.4316L12.8236 4.43159C12.4506 3.89259 11.5526 3.89259 11.1786 4.43159L2.17857 17.4316C2.0744 17.5815 2.01331 17.7572 2.00194 17.9394C1.99057 18.1216 2.02936 18.3035 2.11409 18.4652C2.19882 18.6269 2.32625 18.7623 2.48254 18.8567C2.63883 18.9511 2.81799 19.0009 3.00057 19.0006Z"
                        fill="#CCFC50"
                      />
                    </svg>
                  </span>
                </div>
                <div
                  className={classes.export}
                  onClick={getExportHistoryMethod}
                >
                  Export{downloading ? "ing" : ""}
                  <img
                    src="/assets/images/filter/download.png"
                    alt="download"
                  />
                </div>
              </div>
            )}
          </div>
        </OverviewCard>
      </div>
    </PageAnimation>
  );
};

export default History;
