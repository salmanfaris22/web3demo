import { useEffect, useRef, useState } from "react";
import Tab from "../../../../../common/Components/Tab/Tab";
import Table2 from "../../../../../common/Components/Table2/Table2";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./History.module.scss";
import { getHistory, getExportHistory } from "../../../../../services/overview";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import { convertISOToCustomFormat } from "../../../../../utils/date";
import { copyToClipboard } from "../../../../../utils/clipboard";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "../../../../../common/Components/Datepicker/Datepicker";

const History = () => {
  const dispatch = useDispatch();
  const callHistory = useSelector((state: any) => state.overview.callHistory);
  const tabItems = [
    {
      label: "Recent Deposit",
    },
    {
      label: "Recent Withdraw",
    },
  ];
  const [data, setData] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRef = useRef<any>();
  //loading
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setData([]);
    getHistoryMethod();
  }, [currentTab]);

  useEffect(() => {
    if (callHistory) {
      getHistoryMethod();
    }
  }, [callHistory]);

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
    getHistoryMethod();
  }, [dateFilter]);

  const getHistoryMethod = async () => {
    try {
      setFetching(true);
      const response = await getHistory(
        currentTab == 0 ? "DEPOSIT" : "WITHDRAW"
      );
      if (response.status) {
        if (response.data.transactions) {
          setData(response.data.transactions);
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  const tabUpdate = (val: any) => {
    setCurrentTab(val);
  };

  const copyAddress = (address: string, message: string) => {
    copyToClipboard(address, dispatch, {
      successMessage: message,
      onSuccess: () => {},
      onError: () => {},
    });
  };

  const getExportHistoryMethod = async () => {
    if (downloading) {
      return;
    }
    try {
      setDownloading(true);
      const response = await getExportHistory(
        currentTab == 0 ? "DEPOSIT" : "WITHDRAW"
      );
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

  return (
    <>
      {!loading && (
        <PageAnimation>
          <div className={classes.binaryWrap}>
            <OverviewCard type="fullHeight">
              <div className={classes.binaryInner}>
                <div className={classes.head}>Transaction History</div>
                <div className={classes.filterSection}>
                  <Tab items={tabItems} activeIndex={0} onUpdate={tabUpdate} />
                  <div className={classes.rightSection}>
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
                      <input type="text" placeholder="Search" />
                    </div>
                    <div className={classes.filter}>
                      <img
                        src="/assets/images/filter/filter.png"
                        alt="filter"
                      />
                      Filter
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.tableOuter}>
                <Table2>
                  <thead>
                    <tr>
                      <th className={classes.nft}>Amount</th>
                      <th className={classes.amount}>Date</th>
                      <th className={classes.durationHead}>Network</th>
                      <th className={classes.tradeFee}>Address</th>
                      <th className={classes.progressCol}>TxID</th>
                      <th className={classes.progressCol}>EXcoin Received</th>
                      <th className={classes.progressCol}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item: any, index: number) => (
                        <tr key={index}>
                          <td data-label="Amount">
                            {formatCurrency(item.usd_amount, "en-US", "USD")}
                          </td>
                          <td data-label="Date">
                            {item.created_at
                              ? convertISOToCustomFormat(item.created_at)
                              : ""}
                          </td>
                          <td data-label="Network">{item.currency}</td>
                          <td data-label="Address">
                            <div
                              className={classes.addWrap}
                              onClick={() => {
                                copyAddress(
                                  item.address,
                                  "Address copied to clipboard"
                                );
                              }}
                            >
                              <span className={classes.add}>
                                {item.address}
                              </span>
                              {item.address && (
                                <span>
                                  <img
                                    src="/assets/images/copy3.png"
                                    alt="copy"
                                  />
                                </span>
                              )}
                            </div>
                          </td>
                          <td data-label="TxID">
                            <div
                              className={classes.addWrap}
                              onClick={() => {
                                copyAddress(
                                  "18353326727839",
                                  "Transaction ID copied to clipboard"
                                );
                              }}
                            >
                              <span className={classes.add}>
                                18353326727839
                              </span>
                              {item.address && (
                                <span>
                                  <img
                                    src="/assets/images/copy3.png"
                                    alt="copy"
                                  />
                                </span>
                              )}
                            </div>
                          </td>
                          <td data-label="EXcoin Received">
                            {formatCurrency(item.ex_coin_amount)}
                          </td>
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
              </div>
            </OverviewCard>
          </div>
        </PageAnimation>
      )}
    </>
  );
};

export default History;
