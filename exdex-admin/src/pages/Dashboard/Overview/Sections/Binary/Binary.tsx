import { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./Binary.module.scss";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import BarChart from "../../../../../common/Components/BarChart/BarChart";
import AreaChart from "../../../../../common/Components/AreaChart/AreaChart";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../../../../store/overviewSlice";
import {
  getBinary,
  getBinaryDetails,
  getBinarySummary,
} from "../../../../../services/overview";
import { setLoad } from "../../../../../store/loadSectionsSlice";
import CommissionChart from "../../../../../common/Components/CommissionChart/CommissionChart";
import {
  extractDay,
  extractMonth,
  extractTimeLabels,
  extractWeek,
  extractYear,
} from "../../../../../utils/date";

interface BinaryProps {
  refreshPage?: any;
}

const Binary: React.FC<BinaryProps> = ({ refreshPage }) => {
  const dispatch = useDispatch();
  const filterApplied = useSelector(selectFilter);
  const [summary, setSummary] = useState<any>({
    total_sales: 0,
    percentage_change: 0,
  });
  const [chartData, setChartData] = useState<any>({});
  const [monthylData, setMonthlyData] = useState<any>({
    left_team_size: 0,
    left_volume: 0,
    left_volume_percentage_change: 0,
    right_team_size: 0,
    right_volume: 0,
    right_volume_percentage_change: 0,
  });

  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getBinaryMethod();
    getBinarySummaryMethod();
    getBinaryDetailsMethod();
  }, [filterApplied, refreshPage]);

  const getBinaryMethod = async () => {
    setFetching(true);
    try {
      let filter = `?period=${filterApplied}`;
      if (refreshPage || refreshPage == 0) {
        filter = filter + `&user_id=${refreshPage}`;
      }
      const response = await getBinary(filter);
      if (response.status) {
        if (response.data && Array.isArray(response.data)) {
          const labels = response.data.map((item: any) => {
            switch (filterApplied) {
              case "monthly":
                return extractMonth(item.updated_at);
              case "hourly":
                return extractTimeLabels(item.updated_at);
              case "weekly":
                return extractWeek(item.updated_at);
              case "daily":
                return extractDay(item.updated_at);
              case "Annually":
                return extractYear(item.updated_at);
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
      let filter = `?period=${filterApplied}`;
      if (refreshPage || refreshPage == 0) {
        filter = filter + `&user_id=${refreshPage}`;
      }
      const response = await getBinarySummary(filter);
      if (response.status) {
        if (response.data) {
          setSummary({
            total_sales: response.data.total_sales,
            percentage_change: response.data.percentage_change,
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
    }
  };

  const getBinaryDetailsMethod = async () => {
    try {
      let filter = `?period=${filterApplied}`;
      if (refreshPage || refreshPage == 0) {
        filter = filter + `&user_id=${refreshPage}`;
      }
      const response = await getBinaryDetails(filter);
      if (response.status) {
        if (response.data) {
          setMonthlyData(response.data);
        }
      }
    } catch (err) {
    } finally {
      dispatch(setLoad(2));
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
                <div className={classes.topSection}>
                  <div className={classes.totalTop}>
                    <div className={classes.totalHead}>Binary</div>
                    <div className={classes.totalRight}>
                      <div className={classes.arrowWrap}>
                        <div
                          className={`${classes.arrow} ${
                            summary.percentage_change > 0 && classes.arrowGreen
                          }`}
                        >
                          {summary.percentage_change > 0 ? (
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
                          summary.percentage_change < 0 ? classes.red : ""
                        }`}
                      >
                        {summary.percentage_change
                          ? formatCurrency(summary.percentage_change)
                          : "-"}
                        {summary.percentage_change ? "%" : ""}
                      </div>
                    </div>
                  </div>
                  <div className={classes.totalAmount}>
                    {formatCurrency(summary.total_sales, "en-US", "USD")}
                  </div>
                  <div className={classes.autoOverview}>
                    <div className={classes.contentwrap}>
                      <div className={classes.indicatorWrap}>
                        <div className={classes.indicatorOut}>
                          <div className={classes.indicator}>
                            <div className={classes.colorBox}></div>
                            <div className={classes.name}>A Indicator</div>
                            <div className={classes.detWrap}>
                              <div className={classes.direction}>
                                <div className={classes.directionInner}></div>
                                {monthylData.left_volume_percentage_change >
                                0 ? (
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
                          </div>
                          <div className={classes.botWrap}>
                            <div className={classes.detWrap}>
                              <div className={classes.colorOut}>
                                <div className={classes.color}></div>
                              </div>
                              <div className={classes.bottomVal}>
                                {monthylData.left_team_size}
                              </div>
                            </div>
                            <div className={classes.bottomVal}>
                              {monthylData.left_volume_percentage_change}%
                            </div>
                          </div>
                          <div className={classes.saleDetail}>
                            <div className={classes.saleName}>Total Sale</div>
                            <div className={classes.saleVal}>
                              {formatCurrency(
                                monthylData.left_volume,
                                "en-US",
                                "USD"
                              )}
                            </div>
                          </div>
                        </div>
                        <div className={classes.indicatorOut}>
                          <div className={classes.indicator}>
                            <div className={classes.colorBox}></div>
                            <div className={classes.name}>B Indicator</div>
                            <div className={classes.detWrap}>
                              <div className={classes.direction}>
                                <div className={classes.directionInner}></div>
                                {monthylData.right_volume_percentage_change >
                                0 ? (
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
                          </div>
                          <div className={classes.botWrap}>
                            <div className={classes.detWrap}>
                              <div className={classes.colorOut}>
                                <div className={classes.color}></div>
                              </div>
                              <div className={classes.bottomVal}>
                                {monthylData.right_team_size}
                              </div>
                            </div>
                            <div className={classes.bottomVal}>
                              {monthylData.right_volume_percentage_change}%
                            </div>
                          </div>
                          <div className={classes.saleDetail}>
                            <div className={classes.saleName}>Total Sale</div>
                            <div className={classes.saleVal}>
                              {formatCurrency(
                                monthylData.right_volume,
                                "en-US",
                                "USD"
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
            </OverviewCard>
          </div>
        </PageAnimation>
      )}
    </>
  );
};

export default Binary;
