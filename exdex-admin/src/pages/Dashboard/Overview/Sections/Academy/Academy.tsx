import { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./Academy.module.scss";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import AreaChart from "../../../../../common/Components/AreaChart/AreaChart";

const Academy = () => {
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

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const datasets = [
    {
      label: "Dataset 1",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(56, 20, 166, 0.5)", // rgba(56, 20, 166, 1) with opacity
      borderColor: "rgba(56, 20, 166, 1)", // Solid border
      borderWidth: 1,
      fill: true,
    },
    {
      label: "Dataset 2",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(204, 253, 81, 0.5)", // rgba(204, 253, 81, 1) with opacity
      borderColor: "rgba(204, 253, 81, 1)",
      borderWidth: 1,
      fill: true,
    },
    {
      label: "Dataset 3",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(0, 140, 255, 0.5)", // rgba(0, 140, 255, 1) with opacity
      borderColor: "rgba(0, 140, 255, 1)",
      borderWidth: 1,
      fill: true,
    },
    {
      label: "Dataset 4",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(139, 103, 169, 0.5)", // rgba(139, 103, 169, 1) with opacity
      borderColor: "rgba(139, 103, 169, 1)",
      borderWidth: 1,
      fill: true,
    },
    {
      label: "Dataset 5",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(186, 72, 138, 0.5)", // rgba(186, 72, 138, 1) with opacity
      borderColor: "rgba(186, 72, 138, 1)",
      borderWidth: 1,
      fill: true,
    },
  ];

  const itemsData = [
    {
      name: "Courses",
      val: 0,
      percent: 0,
    },
    {
      name: "Certificate",
      val: 0,
      percent: 0,
    },
    {
      name: "Workshop",
      val: 0,
      percent: 0,
    },
    {
      name: "Live Session",
      val: 0,
      percent: 0,
    },
    {
      name: "Package",
      val: 0,
      percent: 0,
    },
  ];

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
                  <div className={classes.totalHead}>Academy Sales</div>
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
                <div style={{ width: "100%", height: "200px" }}>
                  <AreaChart
                    labels={labels}
                    datasets={datasets}
                    showAxes={true}
                    smoothness={0.4}
                    showLegend={false}
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

export default Academy;
