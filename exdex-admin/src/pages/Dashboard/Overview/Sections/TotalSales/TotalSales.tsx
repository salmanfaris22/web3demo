import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./TotalSales.module.scss";
import { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import { useSelector } from "react-redux";
import RadarChart from "../../../../../common/Components/RadarChart/RadarChart";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import {
  getSalesOverview,
  getUserOverview,
} from "../../../../../services/overview";
import { selectFilter } from "../../../../../store/overviewSlice";

interface TotalSalesInterface {
  type?: string;
  refreshPage?: any;
}

const TotalSales: React.FC<TotalSalesInterface> = ({ type, refreshPage }) => {
  const labels = ["AI Signal", "Dex Gem", "Academy", "NFT", "Auto Trade"];
  const filterApplied = useSelector(selectFilter);
  const [salesSummary, setSalesSummary] = useState<any>({});
  const [sales, setSales] = useState<any>([]);
  const [datasets, setDataSet] = useState([
    {
      label: "Old User",
      data: [],
      borderColor: "rgba(46, 75, 94, 1)", // Old user color
      backgroundColor: "rgba(46, 75, 94, 1)",
      fill: true,
    },
    {
      label: "New User",
      data: [],
      borderColor: "rgba(204, 253, 81, 1)", // New user color
      backgroundColor: "rgba(204, 253, 81, 1)",
      fill: true,
    },
  ]);
  //loading
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (type == "users") {
      getUserSummary();
    } else {
      getSalesSummary();
    }
  }, [filterApplied, refreshPage]);

  const getSalesSummary = async () => {
    setFetching(true);
    try {
      let filter = `?period=${filterApplied}`;
      const response = await getSalesOverview(filter);
      if (response.status) {
        if (response.data) {
          setSalesSummary(response.data);
          const salesTemp = [
            {
              name: "AI Signal",
              amount: response.data.total_ai_signal,
              percent: response.data.ai_signal_percentage,
              percent2: response.data.ai_signal_contribution,
            },
            {
              name: "Dex Gem",
              amount: response.data.total_dex_gem,
              percent: response.data.dex_gem_percentage,
              percent2: response.data.dex_gem_contribution,
            },
            {
              name: "Auto Trade",
              amount: response.data.total_auto_trade,
              percent: response.data.auto_trade_percentage,
              percent2: response.data.auto_trade_contribution,
            },
            {
              name: "NFT",
              amount: response.data.total_nft,
              percent: response.data.nft_percentage,
              percent2: response.data.nft_contribution,
            },
            {
              name: "Academy",
              amount: response.data.total_academy,
              percent: response.data.academy_percentage,
              percent2: response.data.academy_contribution,
            },
          ];
          setSales(salesTemp);
          let oldDataSet: any = [];
          let newDataSet: any = [];
          if (response.data.old_user_sales) {
            oldDataSet = [
              response.data.old_user_sales.total_ai_signal || 0,
              response.data.old_user_sales.total_dex_gem || 0,
              response.data.old_user_sales.total_academy || 0,
              response.data.old_user_sales.total_nft || 0,
              response.data.old_user_sales.total_auto_trade || 0,
            ];
          }
          if (response.data.new_user_sales) {
            newDataSet = [
              response.data.new_user_sales.total_ai_signal || 0,
              response.data.new_user_sales.total_dex_gem || 0,
              response.data.new_user_sales.total_academy || 0,
              response.data.new_user_sales.total_nft || 0,
              response.data.new_user_sales.total_auto_trade || 0,
            ];
          }
          setDataSet([
            {
              label: "Old User",
              data: oldDataSet,
              borderColor: "rgba(46, 75, 94, 1)",
              backgroundColor: "rgba(46, 75, 94, 1)",
              fill: true,
            },
            {
              label: "New User",
              data: newDataSet,
              borderColor: "rgba(204, 253, 81, 1)",
              backgroundColor: "rgba(204, 253, 81, 1)",
              fill: true,
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

  const getUserSummary = async () => {
    setFetching(true);
    try {
      let filter = `?period=${filterApplied}`;
      if (refreshPage || refreshPage == 0) {
        filter = filter + `&user_id=${refreshPage}`;
      }
      const response = await getUserOverview(filter);
      if (response.status) {
        if (response.data) {
          setSalesSummary(response.data);
          const salesTemp = [
            {
              name: "AI Signal",
              amount: response.data.total_ai_signal_users,
              percent: response.data.ai_signal_user_percentage,
              percent2: response.data.ai_signal_user_contribution,
            },
            {
              name: "Dex Gem",
              amount: response.data.total_dex_gem_users,
              percent: response.data.dex_gem_user_percentage,
              percent2: response.data.dex_gem_user_contribution,
            },
            {
              name: "Auto Trade",
              amount: response.data.total_auto_trade_users,
              percent: response.data.auto_trade_user_percentage,
              percent2: response.data.auto_trade_user_contribution,
            },
            {
              name: "NFT",
              amount: response.data.total_nft_users,
              percent: response.data.nft_user_percentage,
              percent2: response.data.nft_user_contribution,
            },
            {
              name: "Academy",
              amount: response.data.total_academy_users,
              percent: response.data.academy_user_percentage,
              percent2: response.data.academy_user_contribution,
            },
          ];
          setSales(salesTemp);
          let oldDataSet: any = [];
          let newDataSet: any = [];
          if (response.data.old_user_sales) {
            oldDataSet = [
              response.data.old_user_sales.total_ai_signal_users || 0,
              response.data.old_user_sales.total_dex_gem_users || 0,
              response.data.old_user_sales.total_academy_users || 0,
              response.data.old_user_sales.total_nft_users || 0,
              response.data.old_user_sales.total_auto_trade_users || 0,
            ];
          }
          if (response.data.new_user_sales) {
            newDataSet = [
              response.data.new_user_sales.total_ai_signal_users || 0,
              response.data.new_user_sales.total_dex_gem_users || 0,
              response.data.new_user_sales.total_academy_users || 0,
              response.data.new_user_sales.total_nft_users || 0,
              response.data.new_user_sales.total_auto_trade_users || 0,
            ];
          }
          setDataSet([
            {
              label: "Old User",
              data: oldDataSet,
              borderColor: "rgba(46, 75, 94, 1)",
              backgroundColor: "rgba(46, 75, 94, 1)",
              fill: true,
            },
            {
              label: "New User",
              data: newDataSet,
              borderColor: "rgba(204, 253, 81, 1)",
              backgroundColor: "rgba(204, 253, 81, 1)",
              fill: true,
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
            className={`${classes.totalWrapOut} ${
              fetching && classes.opacityLoading
            }`}
          >
            <OverviewCard type="fullHeight">
              <div className={classes.totalWrap}>
                <div className={classes.totalTop}>
                  <div className={classes.totalHead}>
                    {type ? "Total Users" : "Total Sales"}
                  </div>
                  <div className={classes.totalRight}>
                    <div className={classes.legend}>
                      <div
                        className={`${classes.legendBox} ${classes.legendOld}`}
                      ></div>
                      <div className={classes.legendText}>Old Users</div>
                    </div>
                    <div className={classes.legend}>
                      <div className={classes.legendBox}></div>
                      <div className={classes.legendText}>New Users</div>
                    </div>
                  </div>
                </div>
                <div className={classes.chartOuter}>
                  <div style={{ width: "100%", height: "240px" }}>
                    <RadarChart labels={labels} datasets={datasets} />
                  </div>
                </div>
                <div
                  className={`${classes.saleDetails} ${
                    type == "users" ? classes.user : ""
                  }`}
                >
                  {sales &&
                    sales.map((item: any, index: number) => (
                      <div className={classes.saleItem} key={index}>
                        <div className={classes.saleTop}>
                          <div className={classes.saleLeft}>{item.name}</div>
                          <div className={classes.saleRight}>
                            <div className={classes.amount}>
                              {type == "users"
                                ? formatCurrency(item.amount)
                                : formatCurrency(item.amount, "en-US", "USD")}
                            </div>
                            <div className={classes.arrowWrap}>
                              <div
                                className={`${classes.arrow} ${
                                  item.percent > 0 && classes.arrowGreen
                                }`}
                              >
                                {item.percent > 0 ? (
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
                                item.percent < 0 ? classes.red : ""
                              }`}
                            >
                              {item.percent
                                ? formatCurrency(item.percent)
                                : "-"}
                              {item.percent ? "%" : ""}
                            </div>
                          </div>
                        </div>
                        <div className={classes.saleProgress}>
                          <div
                            className={classes.progressInner}
                            style={{ width: `${item.percent2}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </OverviewCard>
          </div>
        </PageAnimation>
      )}
    </>
  );
};

export default TotalSales;
