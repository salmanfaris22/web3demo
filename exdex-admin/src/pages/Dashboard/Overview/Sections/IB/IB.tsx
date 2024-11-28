import { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./IB.module.scss";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import TableChart from "../../../../../common/Components/TableChart/TableChart";
import DoughnutChart from "../../../../../common/Components/DoughnutChart/DoughnutChart";

const IB = () => {
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
  let item = {
    percent: 0,
    val: 0,
    dummyVal: 0,
    user: 0,
    payout: 0,
    active: 0,
    finished: 0,
  };
  const itemsData = [
    {
      name: "Level 1",
      val: 0,
      percent: 0,
    },
    {
      name: "Level 2",
      val: 0,
      percent: 0,
    },
    {
      name: "Level 3",
      val: 0,
      percent: 0,
    },
  ];
  const data = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
  const [datasets, setDatasets] = useState<any>([
    {
      data: [0, 0, 0],
      backgroundColor: [
        "rgba(204, 253, 80, 1)", // Light green
        "rgba(182, 255, 229, 1)", // Light blue
        "rgba(31, 69, 79, 1)", // Dark blue
      ],
    },
  ]);
  useEffect(() => {
    setLoading(false);
    setFetching(false);
  }, []);

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
                  <div className={classes.totalHead}>IB</div>
                  <div className={classes.totalRight}>
                    <div className={classes.arrowWrap}>
                      <div
                        className={`${classes.arrow} ${
                          item.percent > 0 && classes.arrowGreen
                        }`}
                      >
                        {item.percent > 0 ? (
                          <img src="/assets/images/upArrow.png" alt="arrow" />
                        ) : (
                          <img src="/assets/images/downArrow.png" alt="arrow" />
                        )}
                      </div>
                    </div>
                    <div
                      className={`${classes.percent} ${
                        item.percent < 0 ? classes.red : ""
                      }`}
                    >
                      {item.percent ? formatCurrency(item.percent) : "-"}
                      {item.percent ? "%" : ""}
                    </div>
                  </div>
                </div>
                <div className={classes.totalAmount}>
                  {formatCurrency(item.val, "en-US", "USD")}
                </div>
                <div className={classes.chartWrapper}>
                  <div className={`${classes.newOld} ${classes.newOldChart}`}>
                    {itemsData.map((itemVal, index) => (
                      <div className={classes.newOldItemWrap} key={index}>
                        <div className={classes.newOldLeft}>
                          <div className={classes.newOldBox}></div>
                          <div className={classes.newOldName}>
                            {itemVal.name}
                          </div>
                        </div>
                        <div className={classes.chart}>
                          <TableChart
                            data={data}
                            isDetailedChart={false}
                            showArea={false}
                            showAxis={false}
                            useGradient={true}
                            customColors={{
                              lineColor: "rgba(204, 253, 80, 1)",
                              gradientStart: "rgba(240, 0, 204, 0.8)",
                              gradientEnd: "rgba(43, 45, 52, 0.8)",
                            }}
                          />
                        </div>
                        <div className={classes.newOldRight}>
                          <div className={classes.val}>{itemVal.val}</div>
                          <div className={classes.arrowWrap}>
                            <div
                              className={`${classes.arrow} ${
                                itemVal.percent > 0 && classes.arrowGreen
                              }`}
                            >
                              {itemVal.percent > 0 ? (
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
                            {itemVal.percent
                              ? formatCurrency(itemVal.percent)
                              : "-"}
                            {itemVal.percent ? "%" : ""}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`${classes.newOld} ${classes.newOldChart}`}>
                  <div className={classes.newOldItemWrap}>
                    <div className={classes.newOldLeft}>
                      <div className={classes.newOldBox}></div>
                      <div className={classes.newOldName}>Sales</div>
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
                      <div className={classes.newOldVal}>
                        {summary.new_user_contribution
                          ? formatCurrency(summary.new_user_contribution)
                          : "-"}
                        {summary.new_user_contribution ? "%" : ""}
                      </div>
                    </div>
                    <div className={classes.newOldLeft}>
                      <div className={classes.newOldBox}></div>
                      <div className={classes.newOldName}>Earning</div>
                    </div>
                  </div>
                  <div className={classes.newOldItemWrap}>
                    <div className={classes.newOldLeft}>
                      <div className={classes.newOldBox}></div>
                      <div className={classes.newOldName}>Sales</div>
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
                      <div className={classes.newOldVal}>
                        {summary.new_user_contribution
                          ? formatCurrency(summary.new_user_contribution)
                          : "-"}
                        {summary.new_user_contribution ? "%" : ""}
                      </div>
                    </div>
                    <div className={classes.newOldLeft}>
                      <div className={classes.newOldBox}></div>
                      <div className={classes.newOldName}>Earning</div>
                    </div>
                  </div>
                </div>
                <div className={classes.chartWrap2}>
                  <DoughnutChart datasets={datasets} />
                </div>
              </div>
            </OverviewCard>
          </div>
        </PageAnimation>
      )}
    </>
  );
};

export default IB;
