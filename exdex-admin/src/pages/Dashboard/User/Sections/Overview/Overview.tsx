import { useEffect, useState } from "react";
import OverviewCard from "../../../../../common/Components/OverviewCard/OverviewCard";
import classes from "./Overview.module.scss";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import AreaChart from "../../../../../common/Components/AreaChart/AreaChart";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import {
  getTotal,
  getUserGraph,
  userOverview,
} from "../../../../../services/user";

const OverviewSec = () => {
  const [summary, setSummary] = useState<any>({
    total_academy_sales: 0,
    total_ai_signal_sales: 0,
    total_auto_trade_sales: 0,
    total_dex_gem_sales: 0,
    total_nft_sales: 0,
    academy_percentage_change: 0,
    ai_signal_percentage_change: 0,
    auto_trade_percentage_change: 0,
    dex_gem_percentage_change: 0,
    nft_percentage_change: 0,
  });
  const [stats, setStats] = useState<any>([]);
  const [total, setTotal] = useState<any>({
    monthly_percentage_change: 0,
    total_user_count: 0,
  });
  const [labels, setLabels] = useState([]);
  const [datasets, setDataSet] = useState([
    {
      label: "IB",
      data: [],
      backgroundColor: "rgba(46, 75, 94, 0.5)", // rgba(139, 103, 169, 1) with opacity
      borderColor: "rgba(46, 75, 94, 1)",
      borderWidth: 1,
      fill: true,
    },
    {
      label: "Autotrade",
      data: [],
      backgroundColor: "rgba(127, 194, 249, 0.5)", // rgba(0, 140, 255, 1) with opacity
      borderColor: "rgba(127, 194, 249, 1)",
      borderWidth: 1,
      fill: true,
    },
    {
      label: "AI Signal",
      data: [],
      backgroundColor: "rgba(255, 255, 255, 0.5)", // rgba(204, 253, 81, 1) with opacity
      borderColor: "rgba(255, 255, 255, 0.95)",
      borderWidth: 1,
      fill: true,
    },
    {
      label: "Dexgem",
      data: [],
      backgroundColor: "rgba(255, 215, 71, 0.5)", // rgba(56, 20, 166, 1) with opacity
      borderColor: "rgba(255, 215, 71, 1)", // Solid border
      borderWidth: 1,
      fill: true,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getUserMethod();
    getTotalMethod();
    getGraph();
  }, []);

  const getUserMethod = async () => {
    try {
      setFetching(true);
      const response = await userOverview();
      if (response.status) {
        if (response.data) {
          setStats(response.data.data);
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

  const getTotalMethod = async () => {
    try {
      const response = await getTotal();
      if (response.status) {
        setTotal(response.data);
      } else {
        console.error("Response status is false");
      }
    } catch (err) {
      console.error("Error fetching binary data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getGraph = async () => {
    try {
      const response = await getUserGraph();
      if (response.status) {
        if (response.data) {
          let labelsArr: any = [];
          let ib: any = [];
          let autotrade: any = [];
          let signal: any = [];
          let dexgem: any = [];
          if (response.data) {
            setSummary({
              total_academy_sales: response.data.total_academy_sales,
              total_ai_signal_sales: response.data.total_ai_signal_sales,
              total_auto_trade_sales: response.data.total_auto_trade_sales,
              total_dex_gem_sales: response.data.total_dex_gem_sales,
              total_nft_sales: response.data.total_nft_sales,
              academy_percentage_change:
                response.data.academy_percentage_change,
              ai_signal_percentage_change:
                response.data.ai_signal_percentage_change,
              auto_trade_percentage_change:
                response.data.auto_trade_percentage_change,
              dex_gem_percentage_change:
                response.data.dex_gem_percentage_change,
              nft_percentage_change: response.data.nft_percentage_change,
            });
            if (response.data.graph_data) {
              response.data.graph_data.forEach((item: any) => {
                labelsArr.push(item.month);
                autotrade.push(item.auto_trade_sales);
                signal.push(item.ai_signal_sales);
                dexgem.push(item.dex_gem_sales);
              });
            }
          }
          setLabels(labelsArr);
          setDataSet([
            {
              label: "IB",
              data: ib,
              backgroundColor: "rgba(46, 75, 94, 0.5)", // rgba(139, 103, 169, 1) with opacity
              borderColor: "rgba(46, 75, 94, 1)",
              borderWidth: 1,
              fill: true,
            },
            {
              label: "Autotrade",
              data: autotrade,
              backgroundColor: "rgba(127, 194, 249, 0.5)", // rgba(0, 140, 255, 1) with opacity
              borderColor: "rgba(127, 194, 249, 1)",
              borderWidth: 1,
              fill: true,
            },
            {
              label: "AI Signal",
              data: signal,
              backgroundColor: "rgba(255, 255, 255, 0.5)", // rgba(204, 253, 81, 1) with opacity
              borderColor: "rgba(255, 255, 255, 0.95)",
              borderWidth: 1,
              fill: true,
            },
            {
              label: "Dexgem",
              data: dexgem,
              backgroundColor: "rgba(255, 215, 71, 0.5)", // rgba(56, 20, 166, 1) with opacity
              borderColor: "rgba(255, 215, 71, 1)", // Solid border
              borderWidth: 1,
              fill: true,
            },
          ]);
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

  return (
    <PageAnimation>
      <OverviewCard>
        <div className={classes.overviewSection}>
          <div className={classes.leftSec}>
            <div className={classes.leftTop}>
              <div className={classes.leftTopLeft}>
                <div className={classes.totalLabel}>Total User</div>
                <div
                  className={classes.totalVal}
                  title={total.total_user_count}
                >
                  {formatCurrency(total.total_user_count)}
                </div>
              </div>
              <div className={classes.totalRight}>
                <div className={classes.arrowWrap}>
                  <div
                    className={`${classes.arrow} ${
                      total.monthly_percentage_change > 0 && classes.arrowGreen
                    }`}
                  >
                    {total.monthly_percentage_change > 0 ? (
                      <img src="/assets/images/upArrow.png" alt="arrow" />
                    ) : (
                      <img src="/assets/images/downArrow.png" alt="arrow" />
                    )}
                  </div>
                </div>
                <div
                  className={`${classes.percent} ${
                    total.monthly_percentage_change < 0 ? classes.red : ""
                  }`}
                >
                  {total.monthly_percentage_change
                    ? formatCurrency(total.monthly_percentage_change)
                    : "-"}
                  {total.monthly_percentage_change ? "%" : ""}
                </div>
              </div>
            </div>
            <div className={classes.chartOut}>
              <AreaChart
                labels={labels}
                datasets={datasets}
                showAxes={true}
                smoothness={0.4}
                showLegend={false}
              />
            </div>
            <div className={classes.legends}>
              <div className={classes.legendItem}>
                <div className={`${classes.legendBox} ${classes.dark}`}></div>
                <div className={classes.legendDet}>
                  <div className={classes.legendLabVal}>
                    <div className={classes.lab}>IB</div>
                    <div className={classes.val}>
                      {formatCurrency(0, "en-US", "USD")}
                    </div>
                  </div>
                  <div
                    className={`${classes.percent} ${
                      summary.percentage_change < 0 ? classes.red : ""
                    }`}
                  >
                    <div className={classes.arrowWrap}>
                      <div
                        className={`${classes.arrow} ${
                          summary.percentage_change > 0 && classes.arrowGreen
                        }`}
                      >
                        {summary.percentage_change > 0 ? (
                          <img src="/assets/images/upArrow.png" alt="arrow" />
                        ) : (
                          <img src="/assets/images/downArrow.png" alt="arrow" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.legendItem}>
                <div className={`${classes.legendBox}`}></div>
                <div className={classes.legendDet}>
                  <div className={classes.legendLabVal} title={summary.total_auto_trade_sales}>
                    <div className={classes.lab}>Auto Trade</div>
                    <div className={classes.val}>
                      {formatCurrency(
                        summary.total_auto_trade_sales,
                        "en-US",
                        "USD"
                      )}
                    </div>
                  </div>
                  <div
                    className={`${classes.percent} ${
                      summary.auto_trade_percentage_change < 0
                        ? classes.red
                        : ""
                    }`}
                  >
                    <div className={classes.arrowWrap}>
                      <div
                        className={`${classes.arrow} ${
                          summary.auto_trade_percentage_change > 0 &&
                          classes.arrowGreen
                        }`}
                      >
                        {summary.auto_trade_percentage_change > 0 ? (
                          <img src="/assets/images/upArrow.png" alt="arrow" />
                        ) : (
                          <img src="/assets/images/downArrow.png" alt="arrow" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.legendItem}>
                <div className={`${classes.legendBox} ${classes.white}`}></div>
                <div className={classes.legendDet}>
                  <div className={classes.legendLabVal} title={summary.total_ai_signal_sales}>
                    <div className={classes.lab}>Signal</div>
                    <div className={classes.val}>
                      {formatCurrency(
                        summary.total_ai_signal_sales,
                        "en-US",
                        "USD"
                      )}
                    </div>
                  </div>
                  <div
                    className={`${classes.percent} ${
                      summary.ai_signal_percentage_change < 0 ? classes.red : ""
                    }`}
                  >
                    <div className={classes.arrowWrap}>
                      <div
                        className={`${classes.arrow} ${
                          summary.ai_signal_percentage_change > 0 &&
                          classes.arrowGreen
                        }`}
                      >
                        {summary.ai_signal_percentage_change > 0 ? (
                          <img src="/assets/images/upArrow.png" alt="arrow" />
                        ) : (
                          <img src="/assets/images/downArrow.png" alt="arrow" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.legendItem}>
                <div className={`${classes.legendBox} ${classes.yellow}`}></div>
                <div className={classes.legendDet}>
                  <div className={classes.legendLabVal} title={summary.total_dex_gem_sales}>
                    <div className={classes.lab}>Dex Gem</div>
                    <div className={classes.val}>
                      {formatCurrency(
                        summary.total_dex_gem_sales,
                        "en-US",
                        "USD"
                      )}
                    </div>
                  </div>
                  <div
                    className={`${classes.percent} ${
                      summary.dex_gem_percentage_change < 0 ? classes.red : ""
                    }`}
                  >
                    <div className={classes.arrowWrap}>
                      <div
                        className={`${classes.arrow} ${
                          summary.dex_gem_percentage_change > 0 &&
                          classes.arrowGreen
                        }`}
                      >
                        {summary.dex_gem_percentage_change > 0 ? (
                          <img src="/assets/images/upArrow.png" alt="arrow" />
                        ) : (
                          <img src="/assets/images/downArrow.png" alt="arrow" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!fetching && (
            <PageAnimation>
              <div className={classes.rightSec}>
                <div className={classes.userStat}>
                  <div className={classes.statHead}>General</div>
                  <div className={classes.statsWrap}>
                    {stats.map((item: any, index: number) => (
                      <div className={classes.statItem} key={index}>
                        <div className={classes.namePercent}>
                          <div className={classes.statLabel}>
                            {item.category}
                          </div>
                          <div className={classes.statPercent}>
                            <div className={classes.progressOut}>
                              <div
                                className={`${classes.progressIn} ${
                                  classes.progressUser
                                } ${
                                  item.percentage > 30 && classes.progressPayout
                                }`}
                                style={{
                                  width: `${item.percentage}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className={classes.statVal}>
                          {formatCurrency(item.count)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PageAnimation>
          )}
        </div>
      </OverviewCard>
    </PageAnimation>
  );
};

export default OverviewSec;
