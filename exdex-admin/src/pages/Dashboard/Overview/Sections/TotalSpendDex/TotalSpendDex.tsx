import { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./TotalSpendDex.module.scss";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import BarChart from "../../../../../common/Components/BarChart/BarChart";
import AreaChart from "../../../../../common/Components/AreaChart/AreaChart";
import { useSelector } from "react-redux";
import {
  selectFilter,
  selectSpendSummary,
} from "../../../../../store/overviewSlice";
import {
  extractMonth,
  extractTimeLabels,
  extractWeek,
  extractYear,
} from "../../../../../utils/date";

const TotalSpendDex = () => {
  const filterApplied = useSelector(selectFilter);
  const summary = useSelector(selectSpendSummary);
  const [labels, setLabels] = useState<any>([]);
  const [datasets, setDataSets] = useState<any>([
    {
      label: "Balance",
      data: [],
      backgroundColor: "rgba(232, 85, 85, 0.1)", // Light green with opacity
      borderColor: "rgba(232, 85, 85, 1)", // Solid light green border
      borderWidth: 1,
      fill: true,
      tension: 0.6, // Smooth curve
    },
    {
      label: "Spend",
      data: [],
      backgroundColor: "rgba(204, 253, 80, 0.1)", // Light blue with opacity
      borderColor: "rgba(204, 253, 80, 1)", // Solid light blue border
      borderWidth: 1,
      fill: true,
      tension: 0.6, // Smooth curve
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setLoading(false);
    setFetching(false);
  }, []);

  useEffect(() => {
    if (summary) {
      if (summary.dexcoin_balance_graph) {
        const extractedLabels = summary.dexcoin_balance_graph.map(
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
        summary.dexcoin_balance_graph.forEach((item: any) => {
          chartAB.A.push(item.balance);
        });
        if (summary.dexcoin_spend_graph) {
          summary.dexcoin_spend_graph.forEach((item: any) => {
            chartAB.B.push(item.spend);
          });
        }
        if (extractedLabels.length == 1) {
          extractedLabels.unshift("");
        }
        setLabels(extractedLabels);
        setDataSets([
          {
            label: "Balance",
            data: chartAB.A,
            backgroundColor: "rgba(232, 85, 85, 0.1)", // Light green with opacity
            borderColor: "rgba(232, 85, 85, 1)", // Solid light green border
            borderWidth: 1,
            fill: true,
            tension: 0.6, // Smooth curve
          },
          {
            label: "Spend",
            data: chartAB.B,
            backgroundColor: "rgba(204, 253, 80, 0.1)", // Light blue with opacity
            borderColor: "rgba(204, 253, 80, 1)", // Solid light blue border
            borderWidth: 1,
            fill: true,
            tension: 0.6, // Smooth curve
          },
        ]);
      }
    }
  }, [summary]);

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
                    <div className={classes.totalHead}>Total Spend DEX</div>
                    <div className={classes.totalRight}>
                      <div className={classes.arrowWrap}>
                        <div
                          className={`${classes.arrow} ${
                            summary.dexcoin_spend_change > 0 &&
                            classes.arrowGreen
                          }`}
                        >
                          {summary.dexcoin_spend_change > 0 ? (
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
                          summary.dexcoin_spend_change < 0 ? classes.red : ""
                        }`}
                      >
                        {summary.dexcoin_spend_change
                          ? formatCurrency(summary.dexcoin_spend_change)
                          : "-"}
                        {summary.dexcoin_spend_change ? "%" : ""}
                      </div>
                    </div>
                  </div>
                  <div className={classes.totalAmount}>
                    {formatCurrency(
                      summary.total_dexcoin_spent,
                      "en-US",
                      "USD"
                    )}
                  </div>
                  <div className={classes.balanceWrap}>
                    <div className={classes.totalTop}>
                      <div className={classes.totalHead}>Total Balance DEX</div>
                      <div className={classes.totalRight}>
                        <div className={classes.arrowWrap}>
                          <div
                            className={`${classes.arrow} ${
                              summary.dextoken_balance_change > 0 &&
                              classes.arrowGreen
                            }`}
                          >
                            {summary.dextoken_balance_change > 0 ? (
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
                            summary.dextoken_balance_change < 0 ? classes.red : ""
                          }`}
                        >
                          {summary.dextoken_balance_change
                            ? formatCurrency(summary.dextoken_balance_change)
                            : "-"}
                          {summary.dextoken_balance_change ? "%" : ""}
                        </div>
                      </div>
                    </div>
                    <div className={classes.totalAmount}>
                      {formatCurrency(summary.dexcoin_balance, "en-US", "USD")}
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

export default TotalSpendDex;
