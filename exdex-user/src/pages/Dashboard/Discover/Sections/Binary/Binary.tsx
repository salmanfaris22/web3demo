import CommissionChart from "../../../../../common/Components/CommissionChart/CommissionChart";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./Binary.module.scss";
import {
  getBinary,
  getBinaryDetails,
  getBinaryReferralCodes,
  getBinarySummary,
} from "../../../../../services/overview";
import { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import { useDispatch } from "react-redux";
import {
  setBinaryMonthlyData,
  setBinaryReferralData,
} from "../../../../../store/overviewSlice";
import { copyToClipboard } from "../../../../../utils/clipboard";
import DetailCard from "../../components/DetailCards/DetailCards";
import {
  extractTimeLabels,
  extractDay,
  extractMonth,
  extractWeek,
} from "../../../../../utils/date";
import { setLoad } from "../../../../../store/loadSectionsSlice";

const Binary = () => {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState<any>({});
  const [referralCodes, setReferralCodes] = useState<any>({
    left_referral_code: "",
    right_referral_code: "",
  });
  const [monthylData, setMonthlyData] = useState<any>({
    left_team_size: 0,
    left_volume: 0,
    left_volume_percentage_change: 0,
    right_team_size: 0,
    right_volume: 0,
    right_volume_percentage_change: 0,
  });
  const [period, setPeriod] = useState("monthly");
  const filterVals = [
    {
      name: "Monthly",
      val: "monthly",
    },
    // {
    //   name: "Weekly",
    //   val: "weekly",
    // },
    {
      name: "Daily",
      val: "daily",
    },
    {
      name: "Hourly",
      val: "hourly",
    },
  ];
  //loading
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [details, setDetails] = useState<any>([
    {
      title: "Total Earning",
      val: 0,
      icon: "/assets/images/discover/market4.png",
    },
    {
      title: "Total Sales",
      val: 0,
      icon: "/assets/images/discover/market2.png",
    },
    {
      title: "Total Member",
      val: 0,
      icon: "/assets/images/discover/market1.png",
    },
    {
      title: "Latest Member",
      val: 0,
      icon: "/assets/images/discover/market3.png",
    },
  ]);

  useEffect(() => {
    getBinaryMethod();
    getBinarySummaryMethod();
    getBinaryDetailsMethod();
  }, [period]);

  useEffect(() => {
    getBinaryReferralCodesMethod();
  }, []);

  const getBinaryMethod = async () => {
    setFetching(true);
    try {
      const response = await getBinary(period);
      if (response.status) {
        if (response.data && Array.isArray(response.data)) {
          const labels = response.data.map((item: any) => {
            switch (period) {
              case "monthly":
                return extractMonth(item.updated_at);
              case "hourly":
                return extractTimeLabels(item.updated_at);
              case "weekly":
                return extractWeek(item.updated_at);
              case "daily":
                return extractDay(item.updated_at);
              default:
                return "";
            }
          });
          let chartAB: any = {
            A: [0],
            B: [0],
          };
          response.data.forEach((item: any) => {
            chartAB.A.push(item.left_volume);
            chartAB.B.push(item.right_volume);
          });
          if (labels.length == 1) {
            labels.unshift("");
          }
          console.log(labels);
          let dataChart = {
            labels: labels,
            datasets: [
              {
                label: "A",
                data: chartAB.A,
                borderColor: "rgba(204, 253, 80, 1)",
                backgroundColor: "rgba(204, 253, 80, 0.5)",
                fill: true,
              },
              {
                label: "B",
                data: chartAB.B,
                borderColor: "rgba(206, 44, 138, 1)",
                backgroundColor: " rgba(206, 44, 138, 0.5)",
                fill: true,
              },
            ],
          };
          setChartData(dataChart);
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

  const getBinarySummaryMethod = async () => {
    try {
      const response = await getBinarySummary(period);
      if (response.status) {
        if (response.data) {
          setDetails([
            {
              title: "Total Earning",
              val: formatCurrency(response.data.total_earnings, "en-US", "USD"),
              icon: "/assets/images/discover/market4.png",
            },
            {
              title: "Total Sales",
              val: formatCurrency(response.data.total_sales, "en-US", "USD"),
              icon: "/assets/images/discover/market2.png",
            },
            {
              title: "Total Member",
              val: formatCurrency(response.data.total_members, "en-US", ""),
              icon: "/assets/images/discover/market1.png",
            },
            {
              title: "Latest Member",
              val: formatCurrency(response.data.latest_members, "en-US", ""),
              icon: "/assets/images/discover/market3.png",
            },
          ]);
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
    }
  };

  const getBinaryDetailsMethod = async () => {
    try {
      const response = await getBinaryDetails(period);
      if (response.status) {
        if (response.data) {
          setMonthlyData(response.data);
          dispatch(setBinaryMonthlyData(response.data));
        }
      }
    } catch (err) {
    } finally {
      dispatch(setLoad(2));
    }
  };

  const getBinaryReferralCodesMethod = async () => {
    try {
      const response = await getBinaryReferralCodes("");
      if (response.status) {
        if (response.data) {
          setReferralCodes(response.data);
          dispatch(setBinaryReferralData(response.data));
        }
      }
    } catch (err) {
    } finally {
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
    if (name == "period") {
      setPeriod(value);
    }
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
                <div className={classes.head}>
                  Market Maker Overview
                  <div className={classes.filter}>
                    <select
                      name="period"
                      onChange={handleChange}
                      value={period}
                    >
                      {filterVals.map((item: any) => (
                        <option value={item.val} key={item.val}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={classes.cardOuter}>
                  {details.map((item: any, index: number) => (
                    <div className={classes.cardItem} key={index}>
                      <DetailCard
                        title={item.title}
                        val={item.val}
                        icon={item.icon}
                      />
                    </div>
                  ))}
                </div>
                <div className={classes.contentwrap}>
                  <div className={classes.indicatorWrap}>
                    <div className={classes.sectionHead}>
                      <div>Total</div> <div>Monthly Growth</div>
                    </div>
                    <div className={classes.indicatorOut}>
                      <div className={classes.indicator}>
                        <div className={classes.detWrap}>
                          <div className={classes.colorOut}>
                            <div className={classes.color}></div>
                          </div>
                          <div className={classes.bottomVal}>
                            {monthylData.left_team_size}
                          </div>
                        </div>
                        <div className={classes.name}>A Indicator</div>
                        <div className={classes.detWrap}>
                          <div className={classes.direction}>
                            <div className={classes.directionInner}></div>
                            {monthylData.left_volume_percentage_change > 0 ? (
                              <img
                                src="/assets/images/upArrow.png"
                                alt="arrow"
                              />
                            ) : (
                              <img
                                src="/assets/images/downArrow.png"
                                alt="arrow"
                              />
                            )}
                          </div>
                          <div className={classes.bottomVal}>
                            {monthylData.left_volume_percentage_change}%
                          </div>
                        </div>
                      </div>
                      {/* <div className={classes.saleDetail}>
                        <div className={classes.saleName}>Total Sale</div>
                        <div className={classes.saleVal}>
                          {formatCurrency(
                            monthylData.left_volume,
                            "en-US",
                            "USD"
                          )}
                        </div>
                      </div> */}
                      {/* <div className={classes.copyBtnWrap}>
                        <div
                          className={classes.copy}
                          onClick={() => {
                            copyAddress(
                              referralCodes.left_referral_code,
                              "Referral link copied"
                            );
                          }}
                        >
                          Copy
                        </div>
                      </div> */}
                    </div>
                    <div className={classes.indicatorOut}>
                      <div className={classes.indicator}>
                        <div className={classes.detWrap}>
                          <div className={classes.colorOut}>
                            <div
                              className={`${classes.color} ${classes.color2}`}
                            ></div>
                          </div>
                          <div className={classes.bottomVal}>
                            {monthylData.right_team_size}
                          </div>
                        </div>
                        <div className={classes.name}>B Indicator</div>
                        <div className={classes.detWrap}>
                          <div className={classes.direction}>
                            <div className={classes.directionInner}></div>
                            {monthylData.right_volume_percentage_change > 0 ? (
                              <img
                                src="/assets/images/upArrow.png"
                                alt="arrow"
                              />
                            ) : (
                              <img
                                src="/assets/images/downArrow.png"
                                alt="arrow"
                              />
                            )}
                          </div>
                          <div className={classes.bottomVal}>
                            {monthylData.right_volume_percentage_change}%
                          </div>
                        </div>
                      </div>
                      {/* <div className={classes.saleDetail}>
                        <div className={classes.saleName}>Total Sale</div>
                        <div className={classes.saleVal}>
                          {" "}
                          {formatCurrency(
                            monthylData.right_volume,
                            "en-US",
                            "USD"
                          )}
                        </div>
                      </div> */}
                      {/* <div className={classes.copyBtnWrap}>
                        <div
                          className={classes.copy}
                          onClick={() => {
                            copyAddress(
                              referralCodes.right_referral_code,
                              "Referral link copied"
                            );
                          }}
                        >
                          Copy
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className={classes.chartOuter}>
                    <CommissionChart
                      labels={chartData.labels}
                      datasets={chartData.datasets ? chartData.datasets : []}
                      tooltipPrefix="Total Sale $"
                    />
                  </div>
                </div>
              </div>
            </OverviewCard>
          </div>
        </PageAnimation>
      )}
    </>
  );
};

export default Binary;
