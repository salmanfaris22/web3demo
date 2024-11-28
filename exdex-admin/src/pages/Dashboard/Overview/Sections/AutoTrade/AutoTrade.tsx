import { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./AutoTrade.module.scss";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import BarChart from "../../../../../common/Components/BarChart/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../../../../store/overviewSlice";
import { getAutoTradeOverview } from "../../../../../services/overview";
import { setLoad } from "../../../../../store/loadSectionsSlice";

const AutoTrade = () => {
  const dispatch = useDispatch();
  const filterApplied = useSelector(selectFilter);
  const [summary, setSummary] = useState({
    total_sales: 0,
    new_users: 0,
    old_users: 0,
    percentage_change: 0,
    new_user_contribution: 0,
    old_user_contribution: 0,
    user_payout: 0,
    active_contracts: 0,
    finished_contracts: 0,
    new_user_count_by_period: [],
    old_user_count_by_period: [],
    percent: {
      activePercent: 0,
      finishedPercent: 0,
      userPercent: 0,
      payoutPercent: 0,
    },
  });
  const [labels, setLabels] = useState<any>([]);
  const [datasets, setDatasets] = useState<any>([
    {
      label: "Top Portion",
      data: [5, 3, 4, 7, 6, 5, 3, 4, 7, 6],
      backgroundColor: "rgba(182, 255, 229, 1)", // Top color
    },
    {
      label: "Bottom Portion",
      data: [2, 1, 2, 3, 4, 2, 1, 2, 3, 4],
      backgroundColor: "rgba(31, 69, 79, 1)", // Bottom color
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getAutoSummary();
  }, [filterApplied]);

  const getAutoSummary = async () => {
    setFetching(true);
    try {
      let filter = `?period=${filterApplied}`;
      const response = await getAutoTradeOverview(filter);
      if (response.status) {
        if (response.data) {
          const total =
            response.data.finished_contracts +
            response.data.active_contracts +
            response.data.user_payout +
            response.data.new_users;

          let percent = {
            activePercent: 0,
            finishedPercent: 0,
            userPercent: 0,
            payoutPercent: 0,
          };

          if (total) {
            percent.activePercent = parseFloat(
              ((response.data.active_contracts / total) * 100).toFixed(2)
            );
            percent.finishedPercent = parseFloat(
              ((response.data.finished_contracts / total) * 100).toFixed(2)
            );
            percent.userPercent = parseFloat(
              ((response.data.new_users / total) * 100).toFixed(2)
            );
            percent.payoutPercent = parseFloat(
              ((response.data.user_payout / total) * 100).toFixed(2)
            );
          }

          setSummary({ ...response.data, percent });
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
            setLabels(labelArr);
          }
          setDatasets([
            {
              label: "New Users",
              data: newUserArr,
              backgroundColor: "rgba(182, 255, 229, 1)", // Top color
            },
            {
              label: "Old Users",
              data: oldUserArr,
              backgroundColor: "rgba(31, 69, 79, 1)", // Bottom color
            },
          ]);
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
      setFetching(false);
      dispatch(setLoad(1));
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
                <div className={classes.totalTop}>
                  <div className={classes.totalHead}>Auto Trade</div>
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
                <div className={classes.totalAmount}>
                  {formatCurrency(summary.total_sales, "en-US", "USD")}
                </div>
                <div className={classes.newOld}>
                  <div className={classes.newOldItemWrap}>
                    <div className={classes.newOldLeft}>
                      <div className={classes.newOldBox}></div>
                      <div className={classes.newOldName}>New Users</div>
                    </div>
                    <div className={classes.newOldRight}>
                      <div className={classes.val}>{summary.new_users}</div>
                      <div className={classes.arrowWrap}>
                        <div
                          className={`${classes.arrow} ${
                            summary.new_user_contribution > 0 &&
                            classes.arrowGreen
                          }`}
                        >
                          {summary.new_user_contribution > 0 ? (
                            <img src="/assets/images/upArrow.png" alt="arrow" />
                          ) : (
                            <img
                              src="/assets/images/downArrow.png"
                              alt="arrow"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.newOldItemWrap}>
                    <div className={classes.newOldLeft}>
                      <div
                        className={`${classes.newOldBox} ${classes.green}`}
                      ></div>
                      <div className={classes.newOldName}>Old Users</div>
                    </div>
                    <div className={classes.newOldRight}>
                      <div className={classes.val}>{summary.old_users}</div>
                      <div className={classes.arrowWrap}>
                        <div
                          className={`${classes.arrow} ${
                            summary.old_user_contribution > 0 &&
                            classes.arrowGreen
                          }`}
                        >
                          {summary.old_user_contribution > 0 ? (
                            <img src="/assets/images/upArrow.png" alt="arrow" />
                          ) : (
                            <img
                              src="/assets/images/downArrow.png"
                              alt="arrow"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.chartWrap}>
                  <BarChart labels={labels} datasets={datasets} />
                </div>
                <div className={classes.autoOverview}>
                  <div className={classes.nameProgress}>
                    <div className={classes.left}>
                      <div className={classes.name}>User</div>
                      <div className={classes.progressOut}>
                        <div
                          className={`${classes.progressIn} ${classes.progressUser}`}
                          style={{ width: `${summary.percent.userPercent}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className={classes.right}>{summary.new_users}</div>
                  </div>
                  <div className={classes.nameProgress}>
                    <div className={classes.left}>
                      <div className={classes.name}>Payout</div>
                      <div className={classes.progressOut}>
                        <div
                          className={`${classes.progressIn} ${classes.progressPayout}`}
                          style={{ width: `${summary.percent.payoutPercent}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className={classes.right}>{summary.user_payout}</div>
                  </div>
                  <div className={classes.nameProgress}>
                    <div className={classes.left}>
                      <div className={classes.name}>Active contract</div>
                      <div className={classes.progressOut}>
                        <div
                          className={`${classes.progressIn} ${classes.progressPayout}`}
                          style={{ width: `${summary.percent.activePercent}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className={classes.right}>
                      {summary.active_contracts}
                    </div>
                  </div>
                  <div className={classes.nameProgress}>
                    <div className={classes.left}>
                      <div className={classes.name}>Finished contract</div>
                      <div className={classes.progressOut}>
                        <div
                          className={`${classes.progressIn} ${classes.progressUser}`}
                          style={{
                            width: `${summary.percent.finishedPercent}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className={classes.right}>
                      {summary.finished_contracts}
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

export default AutoTrade;
