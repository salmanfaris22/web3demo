import { useEffect, useState } from "react";
import OverviewCard from "../../../../../common/Components/OverviewCard/OverviewCard";
import classes from "./DetailOverview.module.scss";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import AreaChart from "../../../../../common/Components/AreaChart/AreaChart";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import {
  getUserBalanceDetails,
  getUserProfile,
} from "../../../../../services/user";
import BubbleChart from "../../Components/BubbleChart/BubbleChart";
import { useParams } from "react-router-dom";

const OverviewDetail = () => {
  const { id } = useParams();
  const [summary, setSummary] = useState<any>({
    income: 0,
    withdrawn: 0,
    excoin: 0,
    dextoken: 0,
    percentage_change: 0,
    binary_commission: 0,
    direct_commission: 0,
    unilevel_commission: 0,
    binary_percentage_change: 0,
    direct_percentage_change: 0,
    unilevel_percentage_change: 0,
  });

  const [chartValues, setChartValues] = useState<any>([0, 0, 0, 0]);

  const [stats, setStats] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [fetching2, setFetching2] = useState(true);

  useEffect(() => {
    getUserMethod();
    getUserBalanceMethod();
  }, [id]);

  const getUserMethod = async () => {
    try {
      setFetching(true);
      const response = await getUserProfile(id);
      if (response.status) {
        if (response.data) {
          setStats(response.data);
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

  const getUserBalanceMethod = async () => {
    try {
      setFetching2(true);
      const response = await getUserBalanceDetails(id);
      if (response.status) {
        if (response.data) {
          setSummary(response.data);
          const totalCommission =
            response.data.binary_commission +
            response.data.direct_commission +
            response.data.unilevel_commission;

          // Step 2: Calculate the percentage for each commission type
          const binaryPercentage =
            totalCommission > 0
              ? (
                  (response.data.binary_commission / totalCommission) *
                  100
                ).toFixed(2)
              : "0.00";
          const directPercentage =
            totalCommission > 0
              ? (
                  (response.data.direct_commission / totalCommission) *
                  100
                ).toFixed(2)
              : "0.00";
          const unilevelPercentage =
            totalCommission > 0
              ? (
                  (response.data.unilevel_commission / totalCommission) *
                  100
                ).toFixed(2)
              : "0.00";

          setChartValues([
            unilevelPercentage,
            binaryPercentage,
            0,
            directPercentage,
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
      setFetching2(false);
    }
  };

  return (
    <PageAnimation>
      <OverviewCard>
        <div className={classes.overviewSection}>
          <div className={classes.leftSec}>
            <div className={classes.leftTop}>
              <div className={classes.leftTopLeft}>
                <div className={classes.leftItem}>
                  <div className={classes.totalLabel}>Income</div>
                  <div className={classes.totalVal} title={summary.income}>
                    {formatCurrency(summary.income, "en-US", "USD")}
                  </div>
                </div>
                <div className={classes.leftItem}>
                  <div className={classes.totalLabel}>Withdraw</div>
                  <div className={classes.totalVal} title={summary.withdrawn}>
                    {formatCurrency(summary.withdrawn, "en-US", "USD")}
                  </div>
                </div>
                <div className={classes.leftItem}>
                  <div className={classes.totalLabel}>Ex Coin</div>
                  <div className={classes.totalVal} title={summary.excoin}>
                    {formatCurrency(summary.excoin, "en-US", "USD")}
                  </div>
                </div>
                <div className={classes.leftItem}>
                  <div className={classes.totalLabel}>Dex token</div>
                  <div className={classes.totalVal} title={summary.dextoken}>
                    {formatCurrency(summary.dextoken, "en-US", "USD")}
                  </div>
                </div>
              </div>
              <div className={classes.chartOut}>
                {!fetching2 && (
                  <PageAnimation>
                    <BubbleChart values={chartValues} />
                  </PageAnimation>
                )}
              </div>
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
                      <img src="/assets/images/downArrow.png" alt="arrow" />
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
            <div className={classes.leftSection}></div>

            <div className={classes.legends}>
              <div className={classes.legendItem}>
                <div className={`${classes.legendBox} ${classes.dark}`}></div>
                <div className={classes.legendDet}>
                  <div
                    className={classes.legendLabVal}
                    title={summary.direct_commission}
                  >
                    <div className={classes.lab}>Direct</div>
                    <div className={classes.val}>
                      {formatCurrency(
                        summary.direct_commission,
                        "en-US",
                        "USD"
                      )}
                    </div>
                  </div>
                  <div
                    className={`${classes.percent} ${
                      summary.direct_percentage_change < 0 ? classes.red : ""
                    }`}
                  >
                    <div className={classes.arrowWrap}>
                      <div
                        className={`${classes.arrow} ${
                          summary.direct_percentage_change > 0 &&
                          classes.arrowGreen
                        }`}
                      >
                        {summary.direct_percentage_change > 0 ? (
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
                  <div
                    className={classes.legendLabVal}
                    title={summary.binary_commission}
                  >
                    <div className={`${classes.lab} ${classes.lab2}`}>
                      Binary
                    </div>
                    <div className={classes.val}>
                      {formatCurrency(
                        summary.binary_commission,
                        "en-US",
                        "USD"
                      )}
                    </div>
                  </div>
                  <div
                    className={`${classes.percent} ${
                      summary.binary_percentage_change < 0 ? classes.red : ""
                    }`}
                  >
                    <div className={classes.arrowWrap}>
                      <div
                        className={`${classes.arrow} ${
                          summary.binary_percentage_change > 0 &&
                          classes.arrowGreen
                        }`}
                      >
                        {summary.binary_percentage_change > 0 ? (
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
                  <div
                    className={classes.legendLabVal}
                    title={summary.unilevel_commission}
                  >
                    <div className={classes.lab}>Unilevel</div>
                    <div className={classes.val}>
                      {formatCurrency(
                        summary.unilevel_commission,
                        "en-US",
                        "USD"
                      )}
                    </div>
                  </div>
                  <div
                    className={`${classes.percent} ${
                      summary.unilevel_percentage_change < 0 ? classes.red : ""
                    }`}
                  >
                    <div className={classes.arrowWrap}>
                      <div
                        className={`${classes.arrow} ${
                          summary.unilevel_percentage_change > 0 &&
                          classes.arrowGreen
                        }`}
                      >
                        {summary.unilevel_percentage_change > 0 ? (
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
                  <div className={classes.statsWrap}>
                    {stats.map((item: any, index: number) => (
                      <div className={classes.statItem} key={index}>
                        <div className={classes.namePercent}>
                          <div className={classes.statLabel}>
                            {item.category}
                          </div>
                        </div>
                        <div className={classes.statVal}>{item.value}</div>
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

export default OverviewDetail;
