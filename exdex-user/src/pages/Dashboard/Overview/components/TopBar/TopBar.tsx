import { useEffect, useState } from "react";
import TableChart from "../../../../../common/Components/TableChart/TableChart";
import {
  getSalesBehaviour,
  getTopBarSummary,
} from "../../../../../services/overview";
import classes from "./TopBar.module.scss";
import { formatCurrency } from "../../../../../utils/currencyFormatter";

const TopBar = () => {
  const [summary, setSummary] = useState({
    ex_coin_balance: 0,
    dex_token_balance: 0,
    my_commission: 0,
    total_payout: 0,
    team_investment: 0,
    commission_graph: [],
    payout_graph: [],
    dextoken_graph: [],
  });

  const [sales, setSales] = useState({
    checkout_page_count: 0,
    invoice_page_count: 0,
    plan_page_count: 0,
  });

  useEffect(() => {
    fetchTopSummary();
    fetchSalesBehaviour();
  }, []);

  const fetchTopSummary = async () => {
    try {
      const response = await getTopBarSummary();
      if (response.status) {
        if (response.data) {
          let dexGraphData: any = [];
          let commissionGraphData: any = [];
          let payoutGraphData: any = [];

          if (response.data.commission_graph) {
            commissionGraphData = response.data.commission_graph.map(
              (item: any) => item.commission
            );
            try {
              if (
                commissionGraphData.length &&
                commissionGraphData.length == 1 &&
                commissionGraphData[0] != 0
              ) {
                commissionGraphData.unshift(0);
              }
            } catch (e) {
              console.log(e);
            }
          }

          if (response.data.dextoken_graph) {
            dexGraphData = response.data.dextoken_graph.map(
              (item: any) => item.commission
            );
            try {
              if (
                dexGraphData.length &&
                dexGraphData.length == 1 &&
                dexGraphData[0] != 0
              ) {
                dexGraphData.unshift(0);
              }
            } catch (e) {
              console.log(e);
            }
          }

          if (response.data.payout_graph) {
            payoutGraphData = response.data.payout_graph.map(
              (item: any) => item.payout
            );
            try {
              if (
                payoutGraphData.length &&
                payoutGraphData.length == 1 &&
                payoutGraphData[0] != 0
              ) {
                payoutGraphData.unshift(0);
              }
            } catch (e) {
              console.log(e);
            }
          }

          setSummary({
            ex_coin_balance: response.data.ex_coin_balance,
            dex_token_balance: response.data.dex_token_balance,
            my_commission: response.data.my_commission,
            total_payout: response.data.total_payout,
            team_investment: response.data.team_investment,
            commission_graph: commissionGraphData,
            payout_graph: payoutGraphData,
            dextoken_graph: dexGraphData,
          });
        }
      }
    } catch (err) {
    } finally {
    }
  };

  const fetchSalesBehaviour = async () => {
    try {
      const response = await getSalesBehaviour();
      if (response.status) {
        if (response.data) {
          setSales(response.data);
        }
      }
    } catch (err) {
    } finally {
    }
  };

  return (
    <div className={classes.topOuter}>
      <div className={classes.topItemLeftWrap}>
        <div className={classes.topItem}>
          <div className={classes.topItemHead}>Excoin</div>
          <div
            className={`${classes.topItemVal} ${classes.orangeNum}`}
            title={summary.ex_coin_balance + ""}
          >
            {formatCurrency(summary.ex_coin_balance)}
          </div>
        </div>
        <div className={classes.topItem}>
          <div className={classes.topItemHead}>Dextoken</div>
          <div className={classes.topItemValWrap}>
            <div
              className={classes.topItemVal}
              title={summary.dex_token_balance + ""}
            >
              {formatCurrency(summary.dex_token_balance)}
            </div>
            <div className={classes.chart}>
              <TableChart
                data={summary.dextoken_graph}
                isDetailedChart={false}
                showArea={true}
                showAxis={false}
                useGradient={true}
                customColors={{
                  lineColor: "rgba(240, 0, 204, 1)",
                  gradientStart: "rgba(240, 0, 204, 0.8)",
                  gradientEnd: "rgba(43, 45, 52, 0.8)",
                }}
              />
            </div>
          </div>
        </div>
        <div className={classes.topItem}>
          <div className={classes.topItemHead}>My Comission</div>
          <div className={classes.topItemValWrap}>
            <div
              className={classes.topItemVal}
              title={summary.my_commission + ""}
            >
              {formatCurrency(summary.my_commission)}
            </div>
            <div className={classes.chart}>
              <TableChart
                data={summary.commission_graph}
                isDetailedChart={false}
                showArea={true}
                showAxis={false}
                useGradient={true}
                customColors={{
                  lineColor: "rgba(122, 194, 49, 1)",
                  gradientStart: "rgba(141, 236, 44, 0.8)",
                  gradientEnd: "rgba(43, 45, 52, 0.8)",
                }}
              />
            </div>
          </div>
        </div>
        <div className={classes.topItem}>
          <div className={classes.topItemHead}>Total payout</div>
          <div className={classes.topItemValWrap}>
            <div
              className={classes.topItemVal}
              title={summary.total_payout + ""}
            >
              {formatCurrency(summary.total_payout, "en-US", "USD")}
            </div>
            <div className={classes.chart}>
              <TableChart
                data={summary.payout_graph}
                isDetailedChart={false}
                showArea={true}
                showAxis={false}
                useGradient={true}
                customColors={{
                  lineColor: "rgba(0, 140, 255, 1)",
                  gradientStart: "rgba(0, 140, 255, 0.8)",
                  gradientEnd: "rgba(43, 45, 52, 0.8)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.teamBeh}>
        <div className={classes.topItemHead}>Sales Behavior</div>
        <div className={classes.teamGraph}>
          <div className={classes.teamFirst}>
            <span className={classes.greenDot}></span>
            <div className={classes.firstItem}></div>
            <div className={classes.firstInfo}>
              {formatCurrency(sales.plan_page_count)} <span>Active Card</span>
            </div>
          </div>
          <div className={classes.teamFirst}>
            <span className={classes.greenDot}></span>
            <div className={classes.firstItem}></div>
            <div className={classes.firstInfo}>
              {formatCurrency(sales.checkout_page_count)} <span>Check out</span>
            </div>
          </div>
          <div className={classes.teamFirst}>
            <span className={classes.greenDot}></span>
            <div className={classes.firstItem}></div>
            <div className={classes.firstInfo}>
              {formatCurrency(sales.invoice_page_count)} <span>Purchase</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
