import { useEffect, useState } from "react";
import TableChart from "../../../../../common/Components/TableChart/TableChart";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./Market.module.scss";
import { getForexMarkets, getMarkets } from "../../../../../services/overview";
import { useDispatch } from "react-redux";
import { showToast } from "../../../../../store/toastSlice";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import { IMAGE_URL } from "../../../../../config";
interface MarketProps {
  type: string;
}

const Market: React.FC<MarketProps> = ({ type }) => {
  //loading
  const [loading, setLoading] = useState(true);
  const data2 = [
    {
      logo_url: "/assets/images/remove/coins/btc.png",
      icon2: "/assets/images/remove/coins/btc.png",
      symbol: "BTC",
      name: "Bitcoin",
      current_price: "29198.24",
      price_change_percentage_24h: "+125.1",
      historical_data: ["4", "1", "4", "1", "5", "4", "3", "5", "2", "4"],
    },
    {
      logo_url: "/assets/images/remove/coins/eth.png",
      icon2: "/assets/images/remove/coins/btc.png",
      symbol: "ETH",
      name: "Etherium",
      current_price: "29198.24",
      price_change_percentage_24h: "+125.1",
      historical_data: ["4", "1", "4", "1", "5", "4", "3", "5", "2", "4"],
    },
    {
      logo_url: "/assets/images/remove/coins/xrp.png",
      icon2: "/assets/images/remove/coins/btc.png",
      symbol: "XRP",
      name: "Ripple",
      current_price: "29198.24",
      price_change_percentage_24h: "+125.1",
      historical_data: ["4", "1", "4", "1", "5", "4", "3", "5", "2", "4"],
    },
    {
      logo_url: "/assets/images/remove/coins/bin.png",
      icon2: "/assets/images/remove/coins/btc.png",
      symbol: "BNB",
      name: "Aurantine",
      current_price: "29198.24",
      price_change_percentage_24h: "+125.1",
      historical_data: ["4", "1", "4", "1", "5", "4", "3", "5", "2", "4"],
    },
    {
      logo_url: "/assets/images/remove/coins/btc.png",
      icon2: "/assets/images/remove/coins/btc.png",
      symbol: "BTC",
      name: "Bitcoin",
      current_price: "29198.24",
      price_change_percentage_24h: "+125.1",
      historical_data: ["4", "1", "4", "1", "5", "4", "3", "5", "2", "4"],
    },
    {
      logo_url: "/assets/images/remove/coins/eth.png",
      icon2: "/assets/images/remove/coins/btc.png",
      symbol: "ETH",
      name: "Etherium",
      current_price: "29198.24",
      price_change_percentage_24h: "+125.1",
      historical_data: ["4", "1", "4", "1", "5", "4", "3", "5", "2", "4"],
    },
    {
      logo_url: "/assets/images/remove/coins/xrp.png",
      icon2: "/assets/images/remove/coins/btc.png",
      symbol: "XRP",
      name: "Ripple",
      current_price: "29198.24",
      price_change_percentage_24h: "+125.1",
      historical_data: ["4", "1", "4", "1", "5", "4", "3", "5", "2", "4"],
    },
    {
      logo_url: "/assets/images/remove/coins/bin.png",
      icon2: "/assets/images/remove/coins/btc.png",
      symbol: "BNB",
      name: "Aurantine",
      current_price: "29198.24",
      price_change_percentage_24h: "+125.1",
      historical_data: ["4", "1", "4", "1", "5", "4", "3", "5", "2", "4"],
    },
  ];

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (type == "compare") {
      // setData(data2);
      // setLoading(false);
    } else {
      // setData(data1);
    }
  }, []);

  useEffect(() => {
    if (type != "compare") {
      getForexMarketsMethod();
    } else {
      getMarketsMethod();
    }
  }, []);

  const getMarketsMethod = async () => {
    try {
      const response = await getForexMarkets();
      if (response.status) {
        setData(response.data);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const getForexMarketsMethod = async () => {
    try {
      const response = await getMarkets();
      if (response.status) {
        setData(response.data);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading && data && (
        <PageAnimation>
          <div
            className={`${classes.binWrapper} ${
              type == "compare" && classes.abs
            }`}
          >
            <div className={classes.binaryWrap}>
              <OverviewCard>
                <div className={classes.binaryInner}>
                  <div className={classes.head}>Market</div>
                  <div className={classes.marketWrap}>
                    {data &&
                      data.map((item: any, index: number) => (
                        <div className={classes.marketItem} key={index}>
                          <div className={classes.marketDetails}>
                            <div
                              className={`${classes.marketImageWrap} ${
                                type == "compare" && classes.compare
                              }`}
                            >
                              {type != "compare" && (
                                <div
                                  className={classes.marketImage}
                                  style={{
                                    backgroundImage: `url(${item.logo_url})`,
                                  }}
                                ></div>
                              )}
                              {type == "compare" && (
                                <div
                                  className={classes.marketImage}
                                  style={{
                                    backgroundImage: `url(${
                                      IMAGE_URL + item.base_logo
                                    })`,
                                  }}
                                ></div>
                              )}
                              {type == "compare" && (
                                <div
                                  className={classes.marketImage}
                                  style={{
                                    backgroundImage: `url(${
                                      IMAGE_URL + item.quote_logo
                                    })`,
                                  }}
                                ></div>
                              )}
                            </div>
                            <div className={classes.marketDet}>
                              <div className={classes.abb}>{item.symbol}</div>
                              <div className={classes.name}>{item.name}</div>
                            </div>
                          </div>
                          <div className={classes.marketChart}>
                            <TableChart
                              data={
                                item.historical_data
                                  ? item.historical_data
                                  : item.data
                              }
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
                          <div className={classes.marketRight}>
                            <div className={classes.marketPrice}>
                              <div className={classes.price}>
                                {formatCurrency(
                                  item.current_price,
                                  "en-US",
                                  "USD"
                                )}
                              </div>
                              <div
                                className={`${classes.percent} ${
                                  item.price_change_percentage_24h < 0
                                    ? classes.red
                                    : ""
                                }`}
                              >
                                {formatCurrency(
                                  item.price_change_percentage_24h
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </OverviewCard>
            </div>
          </div>
        </PageAnimation>
      )}
    </>
  );
};

export default Market;
