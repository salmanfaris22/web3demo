import { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./NFT.module.scss";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import BarChart from "../../../../../common/Components/BarChart/BarChart";
import AreaChart from "../../../../../common/Components/AreaChart/AreaChart";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../../../../store/overviewSlice";
import { getNFTSalesOverview } from "../../../../../services/overview";
import { setLoad } from "../../../../../store/loadSectionsSlice";

const NFT = () => {
  const dispatch = useDispatch();
  const filterApplied = useSelector(selectFilter);
  const [summary, setSummary] = useState<any>({
    total_amount: 0,
    percentage_change: 0,
    nft_sales_details: [],
  });
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setLoading(false);
    setFetching(false);
  }, []);

  useEffect(() => {
    getNFTSalesSummary();
  }, [filterApplied]);

  const getNFTSalesSummary = async () => {
    setFetching(true);
    try {
      let filter = `?period=${filterApplied}`;
      const response = await getNFTSalesOverview(filter);
      if (response.status) {
        if (response.data) {
          response.data.nft_sales_details.forEach((item: any) => {
            item.percent = parseFloat(
              ((item.total_amount / response.data.total_amount) * 100).toFixed(
                2
              )
            );
          });
          setSummary(response.data);
        }
      }
    } catch (err) {
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
                  <div className={classes.totalHead}>NFT Sales</div>
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
                  {formatCurrency(summary.total_amount, "en-US", "USD")}
                </div>
                <div className={classes.autoOverview}>
                  {summary.nft_sales_details.map(
                    (itemVal: any, index: number) => (
                      <div className={classes.nameProgress} key={index}>
                        <div className={classes.left}>
                          <div className={classes.name}>{itemVal.name}</div>
                          <div className={classes.progressOut}>
                            <div
                              className={`${classes.progressIn} ${
                                classes.progressUser
                              } ${
                                itemVal.percent > 30 && classes.progressPayout
                              }`}
                              style={{
                                width: `${itemVal.percent}%`,
                              }}
                            >
                              {formatCurrency(
                                itemVal.total_amount,
                                "en-US",
                                "USD"
                              )}
                            </div>
                          </div>
                        </div>
                        <div className={classes.right}>
                          {itemVal.total_count}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </OverviewCard>
          </div>
        </PageAnimation>
      )}
    </>
  );
};

export default NFT;
