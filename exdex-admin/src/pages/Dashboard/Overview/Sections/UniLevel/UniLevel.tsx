import { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import classes from "./UniLevel.module.scss";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import TableChart from "../../../../../common/Components/TableChart/TableChart";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../../../../store/overviewSlice";
import {
  getUnilevelGraph,
  getUnilevelSummary,
} from "../../../../../services/overview";
import { setLoad } from "../../../../../store/loadSectionsSlice";

interface UniLevalProps {
  refreshPage: any;
}
const UniLevel: React.FC<UniLevalProps> = ({ refreshPage }) => {
  const dispatch = useDispatch();
  const filterApplied = useSelector(selectFilter);
  const [levels, setLevels] = useState<any>([
    { name: "Level 1", val: "0", percent: 0, data: [] },
    { name: "Level 2", val: "0", percent: 0, data: [] },
    { name: "Level 3", val: "0", percent: 0, data: [] },
    { name: "Level 4", val: "0", percent: 0, data: [] },
    { name: "Level 5", val: "0", percent: 0, data: [] },
  ]);
  const [summary, setSummary] = useState({
    percent: 0,
    val: 0,
  });

  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getBinarySummaryMethod();
    getBinaryGraphSummaryMethod();
  }, [filterApplied, refreshPage]);

  const getBinarySummaryMethod = async () => {
    setFetching(true);
    try {
      let filter = `?period=${filterApplied}`;
      if (refreshPage || refreshPage == 0) {
        filter = filter + `&user_id=${refreshPage}`;
      }
      const response = await getUnilevelSummary(filter);
      if (response.status) {
        if (response.data) {
          const updatedLevels = [
            {
              name: "Level 1",
              val: formatCurrency(
                response.data.level_1.current_sales,
                "en-US",
                ""
              ),
              percent: formatCurrency(
                response.data.level_1.percentage_change,
                "en-US",
                ""
              ),
              data: [],
            },
            {
              name: "Level 2",
              val: formatCurrency(
                response.data.level_2.current_sales,
                "en-US",
                ""
              ),
              percent: formatCurrency(
                response.data.level_2.percentage_change,
                "en-US",
                ""
              ),
              data: [],
            },
            {
              name: "Level 3",
              val: formatCurrency(
                response.data.level_3.current_sales,
                "en-US",
                ""
              ),
              percent: formatCurrency(
                response.data.level_3.percentage_change,
                "en-US",
                ""
              ),
              data: [],
            },
            {
              name: "Level 4",
              val: formatCurrency(
                response.data.level_4.current_sales,
                "en-US",
                ""
              ),
              percent: formatCurrency(
                response.data.level_4.percentage_change,
                "en-US",
                ""
              ),
              data: [],
            },
            {
              name: "Level 5",
              val: formatCurrency(
                response.data.level_5.current_sales,
                "en-US",
                ""
              ),
              percent: formatCurrency(
                response.data.level_5.percentage_change,
                "en-US",
                ""
              ),
              data: [],
            },
          ];

          setLevels(updatedLevels);
          setSummary({
            percent: response.data.total_percentage_change,
            val: response.data.total_sales,
          });
          getBinaryGraphSummaryMethod();
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
      setFetching(false);
      dispatch(setLoad(3));
    }
  };

  const getBinaryGraphSummaryMethod = async () => {
    setFetching(true);
    try {
      let filter = `?period=${filterApplied}`;
      if (refreshPage || refreshPage == 0) {
        filter = filter + `&user_id=${refreshPage}`;
      }
      const response = await getUnilevelGraph(filter);
      if (response.status && response.data) {
        const graphData: any = {
          level_1: response.data.level_1,
          level_2: response.data.level_2,
          level_3: response.data.level_3,
          level_4: response.data.level_4,
          level_5: response.data.level_5,
        };

        const updatedLevels: any = levels.map((level: any, index: number) => {
          const levelKey = `level_${index + 1}`;
          return {
            ...level,
            data: graphData[levelKey].map((entry: any) => entry.amount),
          };
        });
        setLevels(updatedLevels);
      }
    } catch (err) {
      // Handle error
    } finally {
      setLoading(false);
      setFetching(false);
      dispatch(setLoad(3));
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
                  <div className={classes.totalHead}>UniLevel</div>
                  <div className={classes.totalRight}>
                    <div className={classes.arrowWrap}>
                      <div
                        className={`${classes.arrow} ${
                          summary.percent > 0 && classes.arrowGreen
                        }`}
                      >
                        {summary.percent > 0 ? (
                          <img src="/assets/images/upArrow.png" alt="arrow" />
                        ) : (
                          <img src="/assets/images/downArrow.png" alt="arrow" />
                        )}
                      </div>
                    </div>
                    <div
                      className={`${classes.percent} ${
                        summary.percent < 0 ? classes.red : ""
                      }`}
                    >
                      {summary.percent ? formatCurrency(summary.percent) : "-"}
                      {summary.percent ? "%" : ""}
                    </div>
                  </div>
                </div>
                <div className={classes.totalAmount}>
                  {formatCurrency(summary.val, "en-US", "USD")}
                </div>
                <div className={classes.chartWrapper}>
                  <div className={`${classes.newOld} ${classes.newOldChart}`}>
                    {levels.map((itemVal: any, index: number) => (
                      <div className={classes.newOldItemWrap} key={index}>
                        <div className={classes.newOldLeft}>
                          <div className={classes.newOldBox}></div>
                          <div className={classes.newOldName}>
                            {itemVal.name}
                          </div>
                        </div>
                        <div className={classes.chart}>
                          <TableChart
                            data={itemVal.data}
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
                <div className={classes.summary}>
                  <div className={classes.summaryItem}>
                    <div className={classes.sumHead}>Total card</div>
                    <div className={classes.sumVal}>{formatCurrency(0)}</div>
                  </div>
                  <div className={classes.summaryItem}>
                    <div className={classes.sumHead}>Win card</div>
                    <div className={classes.sumVal}>{formatCurrency(0)}</div>
                  </div>
                  <div className={classes.summaryItem}>
                    <div className={classes.sumHead}>Stop loss</div>
                    <div className={classes.sumVal}>{formatCurrency(0)}</div>
                  </div>
                  <div className={classes.summaryItem}>
                    <div className={classes.sumHead}>Today card</div>
                    <div className={classes.sumVal}>{formatCurrency(0)}</div>
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

export default UniLevel;
