import { useEffect, useRef, useState } from "react";
import CommissionChart from "../../../../../common/Components/CommissionChart/CommissionChart";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./BinaryDetailed.module.scss";
import {
  getBinary,
  getBinaryDetails,
  searchUserCall,
} from "../../../../../services/overview";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import { useDispatch, useSelector } from "react-redux";
import { extractMonth } from "../../../../../utils/date";
import { selectUser } from "../../../../../store/authSlice";
import { copyToClipboard } from "../../../../../utils/clipboard";

const BinaryDetailed = () => {
  const dispatch = useDispatch();
  const user: any = useSelector(selectUser);
  const binaryMonthlyDetails = useSelector(
    (state: any) => state.overview.binaryMonthlyDetails
  );
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "A",
        data: [],
        borderColor: "rgba(204, 253, 80, 1)",
        backgroundColor: "rgba(50, 205, 50, 0.2)",
        fill: false,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  });
  const [chartData2, setChartData2] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "B",
        data: [],
        borderColor: "rgba(206, 44, 138, 1)",
        backgroundColor: "rgba(50, 205, 50, 0.2)",
        fill: false,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  });
  const [monthylData, setMonthlyData] = useState<any>({
    left_team_size: 0,
    left_volume: 0,
    left_volume_percentage_change: 0,
    right_team_size: 0,
    right_volume: 0,
    right_volume_percentage_change: 0,
  });
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedSearchItem, setSelectedItem] = useState<any>({});
  const [showSearch, setShowSearch] = useState(false);
  const searchTimeout = useRef<any>();
  const searchRef = useRef<HTMLDivElement>(null);
  const [referralCodes, setReferralCodes] = useState<any>({
    left_referral_code: "",
    right_referral_code: "",
  });

  //loading
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getBinaryMethod();
  }, []);

  useEffect(() => {
    if (binaryMonthlyDetails) {
      setMonthlyData(binaryMonthlyDetails);
    }
  }, [binaryMonthlyDetails]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getBinaryMethod();
    getBinaryDetailsMethod();
  }, [selectedSearchItem]);

  useEffect(() => {
    try {
      clearTimeout(searchTimeout.current);
    } catch (e) {
      console.log(e);
    }
    searchTimeout.current = setTimeout(() => {
      if (!searchInput) {
        setSelectedItem(null);
        return;
      }
      getSearchResult();
    }, 1000);
  }, [searchInput]);

  const getSearchResult = async () => {
    setSearching(true);
    try {
      const response = await searchUserCall(searchInput);
      if (response.status) {
        if (response.data) {
          setSearchResult(response.data);
        } else {
          setSearchResult([]);
        }
      } else {
        console.error("Response status is false");
      }
    } catch (err) {
      console.error("Error fetching search results:", err);
    } finally {
      setSearching(false);
    }
  };

  const getBinaryMethod = async () => {
    try {
      let data: any = {
        period: "monthly",
      };
      if (selectedSearchItem && selectedSearchItem.id) {
        data["user_id"] =
          selectedSearchItem.id == user.id ? "" : selectedSearchItem.id;
      }
      setFetching(true);
      const response = await getBinary(data);
      if (response.status) {
        if (response.data && Array.isArray(response.data)) {
          const labels = response.data.map((item: any) =>
            extractMonth(item.created_at)
          );
          let chartAB: any = {
            A: [0],
            B: [0],
          };
          response.data.forEach((item: any) => {
            chartAB.A.push(item.left_volume);
            chartAB.B.push(item.right_volume);
          });
          console.log(labels);
          if (labels.length == 1) {
            labels.unshift("");
          }
          setChartData({
            labels: labels,
            datasets: [
              {
                label: "A",
                data: chartAB.A,
                borderColor: "rgba(204, 253, 80, 1)",
                backgroundColor: "rgba(50, 205, 50, 0.2)",
                fill: false,
                tension: 0.4,
                pointRadius: 0,
              },
            ],
          });
          setChartData2({
            labels: labels,
            datasets: [
              {
                label: "B",
                data: chartAB.B,
                borderColor: "rgba(206, 44, 138, 1)",
                backgroundColor: "rgba(50, 205, 50, 0.2)",
                fill: false,
                tension: 0.4,
                pointRadius: 0,
              },
            ],
          });
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

  const getBinaryDetailsMethod = async () => {
    try {
      let data: any = {
        period: "monthly",
      };
      if (selectedSearchItem && selectedSearchItem.id) {
        data["user_id"] =
          selectedSearchItem.id == user.id ? "" : selectedSearchItem.id;
      }
      const response = await getBinaryDetails(data);
      if (response.status) {
        if (response.data) {
          setMonthlyData(response.data);
        }
      }
    } catch (err) {
    } finally {
    }
  };

  const searchSelect = (item: any) => {
    setSelectedItem(item);
    setSearchInput(item.full_name);
    setShowSearch(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name == "search") {
      setSearchInput(value);
    }
  };

  const copyAddress = (address: string, message: string) => {
    copyToClipboard(address, dispatch, {
      successMessage: message,
      onSuccess: () => {},
      onError: () => {},
    });
  };

  return (
    <>
      {!loading && (
        <PageAnimation>
          <div
            className={`${classes.binaryWrap} ${
              fetching && classes.opacityLoading
            }`}
          >
            <OverviewCard type="fullHeight">
              <div className={classes.binaryInner}>
                <div className={classes.head}>Team Performance Tracker</div>
                {/* <div className={classes.searchOuter}>
                  <input type="text" placeholder="Search For User Name" />
                </div> */}
                <div className={classes.searchOuter} ref={searchRef}>
                  <input
                    type="text"
                    placeholder="Search For User Name"
                    name="search"
                    value={searchInput}
                    onChange={handleChange}
                    onFocus={() => {
                      setShowSearch(true);
                    }}
                  />
                  {showSearch && (
                    <div className={classes.searchSuggestion}>
                      <div className={classes.searchItemWrap}>
                        {searching && (
                          <div className={classes.searchItem}>Searching...</div>
                        )}
                        {!searching &&
                          searchResult &&
                          searchResult.map((item: any) => (
                            <div
                              className={classes.searchItem}
                              key={item.email}
                              onClick={() => {
                                searchSelect(item);
                              }}
                            >
                              {item.full_name}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className={classes.userName}>
                  User Name:{" "}
                  {selectedSearchItem
                    ? selectedSearchItem?.full_name
                    : user
                    ? user.full_name
                    : ""}
                </div>
                <div className={classes.indicatorOut}>
                  <div className={classes.indicator}>
                    <div className={classes.detWrap}>
                      <div className={classes.colorOut}>
                        <div className={classes.color}></div>
                      </div>
                    </div>
                    <div className={classes.name}>A Indicator</div>
                    <div className={classes.detWrap}>
                      <div className={classes.direction}>
                        <div className={classes.directionInner}></div>
                        {monthylData.left_volume_percentage_change > 0 ? (
                          <img src="/assets/images/upArrow.png" alt="arrow" />
                        ) : (
                          <img src="/assets/images/downArrow.png" alt="arrow" />
                        )}
                      </div>
                    </div>
                    <div className={classes.bottomVal}>
                      {monthylData.left_team_size}
                    </div>
                    <div className={classes.bottomVal}>
                      {monthylData.left_volume_percentage_change}%
                    </div>
                  </div>
                  <div className={classes.saleDetail}>
                    <div className={classes.saleDetailLeft}>
                      <div className={classes.saleName}>Total Sale</div>
                      <div className={classes.saleVal}>
                        {formatCurrency(
                          monthylData.left_volume,
                          "en-US",
                          "USD"
                        )}
                      </div>
                    </div>
                    {/* <div
                      className={classes.copy}
                      onClick={() => {
                        copyAddress(
                          selectedSearchItem
                            ? `${
                                selectedSearchItem?.left_referral_code +
                                "-" +
                                selectedSearchItem?.parent_id
                              }`
                            : user
                            ? user.left_referral_code
                            : "",
                          "Referral link copied"
                        );
                      }}
                    >
                      Copy
                    </div> */}
                  </div>
                </div>
                <div className={classes.chartOuter}>
                  <CommissionChart
                    labels={chartData.labels}
                    datasets={chartData.datasets ? chartData.datasets : []}
                    tooltipPrefix=""
                    curveTension={0}
                  />
                </div>
              </div>
              <div className={classes.binaryInner}>
                <div className={classes.indicatorOut}>
                  <div className={classes.indicator}>
                    <div className={classes.detWrap}>
                      <div className={classes.colorOut}>
                        <div
                          className={`${classes.color} ${classes.color2}`}
                        ></div>
                      </div>
                    </div>
                    <div className={classes.name}>B Indicator</div>
                    <div className={classes.detWrap}>
                      <div className={classes.direction}>
                        <div className={classes.directionInner}></div>
                        {monthylData.right_volume_percentage_change > 0 ? (
                          <img src="/assets/images/upArrow.png" alt="arrow" />
                        ) : (
                          <img src="/assets/images/downArrow.png" alt="arrow" />
                        )}
                      </div>
                    </div>
                    <div className={classes.bottomVal}>
                      {monthylData.right_team_size}
                    </div>
                    <div className={classes.bottomVal}>
                      {monthylData.right_volume_percentage_change}%
                    </div>
                  </div>
                  <div className={classes.saleDetail}>
                    <div className={classes.saleDetailLeft}>
                      <div className={classes.saleName}>Total Sale</div>
                      <div className={classes.saleVal}>
                        {formatCurrency(
                          monthylData.right_volume,
                          "en-US",
                          "USD"
                        )}
                      </div>
                    </div>
                    {/* <div
                      className={classes.copy}
                      onClick={() => {
                        copyAddress(
                          selectedSearchItem
                            ? `${
                                selectedSearchItem?.right_referral_code +
                                "-" +
                                selectedSearchItem?.parent_id
                              }`
                            : user
                            ? user.right_referral_code
                            : "",
                          "Referral link copied"
                        );
                      }}
                    >
                      Copy
                    </div> */}
                  </div>
                  {/* <div className={classes.saleDetail}>
                    <div className={classes.saleName}>Total Sale</div>
                    <div className={classes.saleVal}>
                      {formatCurrency(monthylData.right_volume, "en-US", "USD")}
                    </div>
                  </div> */}
                </div>
                <div className={classes.chartOuter}>
                  <CommissionChart
                    labels={chartData2.labels}
                    datasets={chartData2.datasets ? chartData2.datasets : []}
                    tooltipPrefix=""
                    curveTension={0}
                  />
                </div>
              </div>
            </OverviewCard>
          </div>
        </PageAnimation>
      )}
    </>
  );
};

export default BinaryDetailed;
