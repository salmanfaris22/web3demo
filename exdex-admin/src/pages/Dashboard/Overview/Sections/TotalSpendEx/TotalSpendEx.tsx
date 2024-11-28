import { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./TotalSpendEx.module.scss";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import AreaChart from "../../../../../common/Components/AreaChart/AreaChart";
import {
  selectFilter,
  setSpendSummary,
} from "../../../../../store/overviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSpendOverview } from "../../../../../services/overview";
import {
  extractMonth,
  extractTimeLabels,
  extractWeek,
  extractYear,
} from "../../../../../utils/date";

const TotalSpendEx = () => {
  const dispatch = useDispatch();
  const filterApplied = useSelector(selectFilter);
  const [summary, setSummary] = useState<any>({
    total_excoin_spent: 0,
    total_dexcoin_spent: 0,
    excoin_balance: 0,
    dexcoin_balance: 0,
    excoin_spend_change: 0,
    dexcoin_spend_change: 0,
    dextoken_balance_change: 0,
    excoin_balance_change: 0,
    excoin_spend_graph: [],
    dexcoin_spend_graph: [],
    excoin_balance_graph: [],
    dexcoin_balance_graph: [],
  });
  const [labels, setLabels] = useState<any>([]);
  const [datasets, setDataSets] = useState<any>([
    {
      label: "Spend",
      data: [],
      backgroundColor: "rgba(204, 253, 80, 0.1)", // Light green with opacity
      borderColor: "rgba(204, 253, 80, 1)", // Solid light green border
      borderWidth: 1,
      fill: true,
      tension: 0.6, // Smooth curve
    },
    {
      label: "Balance",
      data: [],
      backgroundColor: "rgba(182, 255, 229, 0.1)", // Light blue with opacity
      borderColor: "rgba(182, 255, 229, 1)", // Solid light blue border
      borderWidth: 1,
      fill: true,
      tension: 0.6, // Smooth curve
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getSpendSummary();
  }, [filterApplied]);

  const getSpendSummary = async () => {
    setFetching(true);
    try {
      let filter = `?period=${filterApplied}`;
      const response = await getSpendOverview(filter);
      if (response.status) {
        if (response.data) {
          setSummary(response.data);
          dispatch(setSpendSummary(response.data));
          let oldUserArr: any = [];
          let newUserArr: any = [];
          if (response.data.old_user_count_by_period) {
            oldUserArr = response.data.old_user_count_by_period;
          }
          if (response.data.new_user_count_by_period) {
            newUserArr = response.data.new_user_count_by_period;
            const labelArr = newUserArr.map((item: any, index: number) => {
              return index;
            });
            // setLabels(labelArr);
            console.log(labelArr, newUserArr, oldUserArr);
          }
          if (response.data.excoin_balance_graph) {
            const extractedLabels = response.data.excoin_balance_graph.map(
              (item: any) => {
                switch (filterApplied) {
                  case "monthly":
                    return extractMonth(item.date);
                  case "hourly":
                    return extractTimeLabels(item.date);
                  case "weekly":
                    return extractWeek(item.date);
                  case "yearly":
                    return extractYear(item.date);
                  default:
                    return "";
                }
              }
            );

            let chartAB: any = {
              A: [0],
              B: [0],
            };
            response.data.excoin_balance_graph.forEach((item: any) => {
              chartAB.A.push(item.balance);
            });
            if (response.data.excoin_spend_graph) {
              response.data.excoin_spend_graph.forEach((item: any) => {
                chartAB.B.push(item.spend);
              });
            }
            if (extractedLabels.length == 1) {
              extractedLabels.unshift("");
            }
            setLabels(extractedLabels);
            setDataSets([
              {
                label: "Spend",
                data: chartAB.B,
                backgroundColor: "rgba(204, 253, 80, 0.1)", // Light green with opacity
                borderColor: "rgba(204, 253, 80, 1)", // Solid light green border
                borderWidth: 1,
                fill: true,
                tension: 0.6, // Smooth curve
              },
              {
                label: "Balance",
                data: chartAB.A,
                backgroundColor: "rgba(182, 255, 229, 0.1)", // Light blue with opacity
                borderColor: "rgba(182, 255, 229, 1)", // Solid light blue border
                borderWidth: 1,
                fill: true,
                tension: 0.6, // Smooth curve
              },
            ]);
          }
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  return (
    <>
      {!loading && (
        <PageAnimation type="full">
          <div
            className={`${classes.autoWrapOut} ${
              fetching && classes.opacityLoading
            }`}
          >
            <OverviewCard type="fullHeight">
              <div className={classes.autoWrap}>
                <div className={classes.topPortion}>
                  <div className={classes.totalTop}>
                    <div className={classes.totalHead}>Total Spend Ex</div>
                    <div className={classes.totalRight}>
                      <div className={classes.arrowWrap}>
                        <div
                          className={`${classes.arrow} ${
                            summary.excoin_spend_change > 0 &&
                            classes.arrowGreen
                          }`}
                        >
                          {summary.excoin_spend_change > 0 ? (
                            <img src="/assets/images/upArrow.png" alt="arrow" />
                          ) : (
                            <img
                              src="/assets/images/downArrow.png"
                              alt="arrow"
                            />
                          )}
                        </div>
                      </div>
                      <div
                        className={`${classes.percent} ${
                          summary.excoin_spend_change < 0 ? classes.red : ""
                        }`}
                      >
                        {summary.excoin_spend_change
                          ? formatCurrency(summary.excoin_spend_change)
                          : "-"}
                        {summary.excoin_spend_change ? "%" : ""}
                      </div>
                    </div>
                  </div>
                  <div className={classes.totalAmount}>
                    {formatCurrency(summary.total_excoin_spent, "en-US", "USD")}
                  </div>
                  <div className={classes.balanceWrap}>
                    <div className={classes.totalTop}>
                      <div className={classes.totalHead}>Total Balance Ex</div>
                      <div className={classes.totalRight}>
                        <div className={classes.arrowWrap}>
                          <div
                            className={`${classes.arrow} ${
                              summary.excoin_balance_change > 0 &&
                              classes.arrowGreen
                            }`}
                          >
                            {summary.excoin_balance_change > 0 ? (
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
                        </div>
                        <div
                          className={`${classes.percent} ${
                            summary.excoin_balance_change < 0 ? classes.red : ""
                          }`}
                        >
                          {summary.excoin_balance_change
                            ? formatCurrency(summary.excoin_balance_change)
                            : "-"}
                          {summary.excoin_balance_change ? "%" : ""}
                        </div>
                      </div>
                    </div>
                    <div className={classes.totalAmount}>
                      {formatCurrency(summary.excoin_balance, "en-US", "USD")}
                    </div>
                  </div>
                </div>
                <div className={classes.chartLegend}>
                  <div style={{ width: "100%", height: "180px" }}>
                    <AreaChart
                      labels={labels}
                      datasets={datasets}
                      showAxes={false}
                      smoothness={0.4}
                    />
                  </div>
                  <div className={classes.legends}>
                    <div className={classes.legendItem}>
                      <div className={classes.legendBox}></div>
                      <div className={classes.legendName}>Spend</div>
                    </div>
                    <div className={classes.legendItem}>
                      <div className={classes.legendBox}></div>
                      <div className={classes.legendName}>Balance</div>
                    </div>
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

export default TotalSpendEx;
