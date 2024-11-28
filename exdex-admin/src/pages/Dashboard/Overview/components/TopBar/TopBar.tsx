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
    total_sale: 0,
    total_user: 0,
    total_team_investment: 0,
    active_user: 0,
    total_payout: 0,
    sale_graph: [],
    user_graph: [],
    payout_graph: [],
  });
  const data = ["0", "1", "4", "1", "5", "4", "3", "5", "2", "4"];
  const [sales, setSales] = useState({
    checkout_page_count: 0,
    invoice_page_count: 0,
    plan_page_count: 0,
  });

  useEffect(() => {
    fetchTopSummary();
    fetchSalesBehaviour();
  }, []);

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

  const fetchTopSummary = async () => {
    try {
      const response = await getTopBarSummary();
      if (response.status) {
        if (response.data) {
          let user_graph: any = [];
          let sale_graph: any = [];
          let payout_graph: any = [];

          if (response.data.user_graph) {
            user_graph = response.data.user_graph.map(
              (item: any) => item.value
            );
            try {
              if (
                user_graph.length &&
                user_graph.length == 1 &&
                user_graph[0] != 0
              ) {
                user_graph.unshift(0);
              }
            } catch (e) {
              console.log(e);
            }
          }

          if (response.data.sale_graph) {
            sale_graph = response.data.sale_graph.map(
              (item: any) => item.value
            );
            try {
              if (
                sale_graph.length &&
                sale_graph.length == 1 &&
                sale_graph[0] != 0
              ) {
                sale_graph.unshift(0);
              }
            } catch (e) {
              console.log(e);
            }
          }

          if (response.data.payout_graph) {
            payout_graph = response.data.payout_graph.map(
              (item: any) => item.payout
            );
            try {
              if (
                payout_graph.length &&
                payout_graph.length == 1 &&
                payout_graph[0] != 0
              ) {
                payout_graph.unshift(0);
              }
            } catch (e) {
              console.log(e);
            }
          }

          setSummary({
            total_sale: response.data.total_sale,
            total_user: response.data.total_user,
            total_team_investment: response.data.total_team_investment,
            active_user: response.data.active_user,
            total_payout: response.data.total_payout,
            sale_graph: sale_graph,
            user_graph: user_graph,
            payout_graph: payout_graph,
          });
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
          <div className={classes.topItemHead}>Total Sale</div>
          <div
            className={`${classes.topItemVal} ${classes.orangeNum}`}
            title={summary.total_sale + ""}
          >
            {formatCurrency(summary.total_sale)}
          </div>
        </div>
        <div className={classes.topItem}>
          <div className={classes.topItemHead}>Total User</div>
          <div className={classes.topItemValWrap}>
            <div className={classes.topItemVal} title={summary.total_user + ""}>
              {formatCurrency(summary.total_user)}
            </div>
            <div className={classes.chart}>
              <TableChart
                data={summary.user_graph}
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
          <div className={classes.topItemHead}>Online user</div>
          <div className={classes.topItemValWrap}>
            <div className={classes.topItemVal}>
              {formatCurrency(summary.active_user)}
            </div>
            <div className={classes.chart}>
              <TableChart
                data={summary.sale_graph}
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
            <div className={classes.topItemVal}>
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
