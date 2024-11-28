import { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./AiSignal.module.scss";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import BarChart from "../../../../../common/Components/BarChart/BarChart";
import DoughnutChart from "../../../../../common/Components/DoughnutChart/DoughnutChart";
import { useSelector } from "react-redux";
import { selectFilter } from "../../../../../store/overviewSlice";
import { getAiSignalOverview } from "../../../../../services/overview";

const AiSignal = () => {
  const filterApplied = useSelector(selectFilter);
  const [datasets, setDatasets] = useState<any>([
    {
      data: [60, 40, 30],
      backgroundColor: [
        "rgba(204, 253, 80, 1)", // Light green
        "rgba(182, 255, 229, 1)", // Light blue
        "rgba(31, 69, 79, 1)", // Dark blue
      ],
    },
  ]);
  const [labels, setLabels] = useState<any>([]);
  const [datasets2, setDatasets2] = useState<any>([
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
    active_contracts_change: 0,
    finished_contracts_change: 0,
  });

  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getAutoSummary();
  }, [filterApplied]);

  const getAutoSummary = async () => {
    setFetching(true);
    try {
      let filter = `?period=${filterApplied}`;
      const response = await getAiSignalOverview(filter);
      if (response.status) {
        if (response.data) {
          setSummary(response.data);
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
            console.log(labelArr, newUserArr, oldUserArr);
          }
          setDatasets2([
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
          setDatasets([
            {
              data: [
                response.data.finished_contracts,
                response.data.active_contracts,
                response.data.new_users,
              ],
              backgroundColor: [
                "rgba(204, 253, 80, 1)", // Light green
                "rgba(182, 255, 229, 1)", // Light blue
                "rgba(31, 69, 79, 1)", // Dark blue
              ],
            },
          ]);
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
                <div className={classes.totalTop}>
                  <div className={classes.totalHead}>Ai Signal</div>
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
                    <div className={`${classes.percent} ${
                    summary.percentage_change < 0 ? classes.red : ""
                  }`}>
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
                  <BarChart labels={labels} datasets={datasets2} />
                </div>
                <div className={classes.chartWrapper}>
                  <div className={classes.chartWrap2}>
                    <DoughnutChart datasets={datasets} />
                  </div>
                  <div className={`${classes.newOld} ${classes.newOldChart}`}>
                    <div className={classes.newOldItemWrap}>
                      <div className={classes.newOldLeft}>
                        <div className={classes.newOldBox}></div>
                        <div className={classes.newOldName}>User</div>
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
                        <div className={classes.newOldVal}>
                          {summary.new_user_contribution
                            ? formatCurrency(summary.new_user_contribution)
                            : "-"}
                          {summary.new_user_contribution ? "%" : ""}
                        </div>
                      </div>
                    </div>
                    <div className={classes.newOldItemWrap}>
                      <div className={classes.newOldLeft}>
                        <div
                          className={`${classes.newOldBox} ${classes.lightBlue}`}
                        ></div>
                        <div className={classes.newOldName}>Active</div>
                      </div>
                      <div className={classes.newOldRight}>
                        <div className={classes.val}>
                          {summary.active_contracts}
                        </div>
                        <div className={classes.arrowWrap}>
                          <div
                            className={`${classes.arrow} ${
                              summary.active_contracts_change > 0 &&
                              classes.arrowGreen
                            }`}
                          >
                            {summary.active_contracts_change > 0 ? (
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
                          <div className={classes.newOldVal}>
                            {summary.active_contracts_change
                              ? formatCurrency(summary.active_contracts_change)
                              : "-"}
                            {summary.active_contracts_change ? "%" : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.newOldItemWrap}>
                      <div className={classes.newOldLeft}>
                        <div
                          className={`${classes.newOldBox} ${classes.green}`}
                        ></div>
                        <div className={classes.newOldName}>Deactive</div>
                      </div>
                      <div className={classes.newOldRight}>
                        <div className={classes.val}>
                          {summary.finished_contracts}
                        </div>
                        <div className={classes.arrowWrap}>
                          <div
                            className={`${classes.arrow} ${
                              summary.finished_contracts_change > 0 &&
                              classes.arrowGreen
                            }`}
                          >
                            {summary.finished_contracts_change > 0 ? (
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
                          <div className={classes.newOldVal}>
                            {summary.finished_contracts_change
                              ? formatCurrency(
                                  summary.finished_contracts_change
                                )
                              : "-"}
                            {summary.finished_contracts_change ? "%" : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.newOldItemWrap}>
                      <div className={classes.newOldLeft}>
                        <div
                          className={`${classes.newOldBox} ${classes.red}`}
                        ></div>
                        <div className={classes.newOldName}>Cards</div>
                      </div>
                      <div className={classes.newOldRight}>
                        <div className={classes.val}>
                          {summary.active_contracts}
                        </div>
                        <div className={classes.arrowWrap}>
                          <div
                            className={`${classes.arrow} ${
                              summary.active_contracts_change > 0 &&
                              classes.arrowGreen
                            }`}
                          >
                            {summary.active_contracts_change > 0 ? (
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
                          <div className={classes.newOldVal}>
                            {summary.active_contracts_change
                              ? formatCurrency(summary.active_contracts_change)
                              : "-"}
                            {summary.active_contracts_change ? "%" : ""}
                          </div>
                        </div>
                      </div>
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

export default AiSignal;
