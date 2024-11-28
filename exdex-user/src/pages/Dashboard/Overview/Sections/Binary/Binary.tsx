import CommissionChart from "../../../../../common/Components/CommissionChart/CommissionChart";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./Binary.module.scss";
import {
  getBinary,
  getBinaryDetails,
  getBinaryReferralCodes,
} from "../../../../../services/overview";
import { useEffect, useState } from "react";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import { useDispatch } from "react-redux";
import {
  setBinaryMonthlyData,
  setBinaryReferralData,
} from "../../../../../store/overviewSlice";
import { copyToClipboard } from "../../../../../utils/clipboard";
import { extractMonth, extractTimeLabels } from "../../../../../utils/date";

const Binary = () => {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState<any>({});
  const [referralCodes, setReferralCodes] = useState<any>({
    left_referral_code: "",
    right_referral_code: "",
  });
  const [monthylData, setMonthlyData] = useState<any>({
    left_team_size: 0,
    left_volume: 0,
    left_volume_percentage_change: 0,
    right_team_size: 0,
    right_volume: 0,
    right_volume_percentage_change: 0,
  });
  //loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBinaryMethod();
    getBinaryDetailsMethod();
    getBinaryReferralCodesMethod();
  }, []);

  const getBinaryMethod = async () => {
    try {
      const response = await getBinary("monthly");
      if (response.status) {
        if (response.data && Array.isArray(response.data)) {
          const labels = response.data.map((item: any) =>
            extractMonth(item.updated_at)
          );
          let chartAB: any = {
            A: [0],
            B: [0],
          };
          response.data.forEach((item: any) => {
            chartAB.A.push(item.left_volume);
            chartAB.B.push(item.right_volume);
          });
          if (labels.length == 1) {
            labels.unshift("");
          }
          console.log(labels);
          let dataChart = {
            labels: labels,
            datasets: [
              {
                label: "A",
                data: chartAB.A,
                borderColor: "rgba(204, 253, 80, 1)",
                backgroundColor: "rgba(204, 253, 80, 0.5)",
                fill: true,
              },
              {
                label: "B",
                data: chartAB.B,
                borderColor: "rgba(206, 44, 138, 1)",
                backgroundColor: " rgba(206, 44, 138, 0.5)",
                fill: true,
              },
            ],
          };
          setChartData(dataChart);
          console.log(dataChart);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } else {
        console.error("Response status is false");
      }
    } catch (err) {
      console.error("Error fetching binary data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getBinaryDetailsMethod = async () => {
    try {
      const response = await getBinaryDetails("");
      if (response.status) {
        if (response.data) {
          setMonthlyData(response.data);
          dispatch(setBinaryMonthlyData(response.data));
        }
      }
    } catch (err) {
    } finally {
    }
  };

  const getBinaryReferralCodesMethod = async () => {
    try {
      const response = await getBinaryReferralCodes("");
      if (response.status) {
        if (response.data) {
          setReferralCodes(response.data);
          dispatch(setBinaryReferralData(response.data));
        }
      }
    } catch (err) {
    } finally {
    }
  };

  const copyAddress = (address: string, message: string) => {
    copyToClipboard(address, dispatch, {
      successMessage: message,
      onSuccess: () => {},
      onError: () => {},
    });
  };
  return (
    <>
      {!loading && (
        <PageAnimation>
          <div className={classes.binaryWrap}>
            <OverviewCard type="fullHeight">
              <div className={classes.binaryInner}>
                <div className={classes.head}>EGC: Group Commission</div>
                <div className={classes.indicatorWrap}>
                  <div className={classes.indicatorOut}>
                    <div className={classes.indicator}>
                      <div className={classes.detWrap}>
                        <div className={classes.colorOut}>
                          <div className={classes.color}></div>
                        </div>
                        <div className={classes.bottomVal}>
                          {monthylData.left_team_size}
                        </div>
                      </div>
                      <div className={classes.name}>A Indicator</div>
                      <div className={classes.detWrap}>
                        <div className={classes.direction}>
                          <div className={classes.directionInner}></div>
                          {monthylData.left_volume_percentage_change > 0 ? (
                            <img src="/assets/images/upArrow.png" alt="arrow" />
                          ) : (
                            <img
                              src="/assets/images/downArrow.png"
                              alt="arrow"
                            />
                          )}
                        </div>
                        <div className={classes.bottomVal}>
                          {monthylData.left_volume_percentage_change}%
                        </div>
                      </div>
                    </div>
                    <div className={classes.saleDetail}>
                      <div className={classes.saleName}>Total Sale</div>
                      <div className={classes.saleVal}>
                        {formatCurrency(
                          monthylData.left_volume,
                          "en-US",
                          "USD"
                        )}
                      </div>
                    </div>
                    {/* <div className={classes.copyBtnWrap}>
                      <div
                        className={classes.copy}
                        onClick={() => {
                          copyAddress(
                            referralCodes.left_referral_code,
                            "Referral link copied"
                          );
                        }}
                      >
                        Copy
                      </div>
                    </div> */}
                  </div>
                  <div className={classes.indicatorOut}>
                    <div className={classes.indicator}>
                      <div className={classes.detWrap}>
                        <div className={classes.colorOut}>
                          <div
                            className={`${classes.color} ${classes.color2}`}
                          ></div>
                        </div>
                        <div className={classes.bottomVal}>
                          {monthylData.right_team_size}
                        </div>
                      </div>
                      <div className={classes.name}>B Indicator</div>
                      <div className={classes.detWrap}>
                        <div className={classes.direction}>
                          <div className={classes.directionInner}></div>
                          {monthylData.right_volume_percentage_change > 0 ? (
                            <img src="/assets/images/upArrow.png" alt="arrow" />
                          ) : (
                            <img
                              src="/assets/images/downArrow.png"
                              alt="arrow"
                            />
                          )}
                        </div>
                        <div className={classes.bottomVal}>
                          {monthylData.right_volume_percentage_change}%
                        </div>
                      </div>
                    </div>
                    <div className={classes.saleDetail}>
                      <div className={classes.saleName}>Total Sale</div>
                      <div className={classes.saleVal}>
                        {" "}
                        {formatCurrency(
                          monthylData.right_volume,
                          "en-US",
                          "USD"
                        )}
                      </div>
                    </div>
                    {/* <div className={classes.copyBtnWrap}>
                      <div
                        className={classes.copy}
                        onClick={() => {
                          copyAddress(
                            referralCodes.right_referral_code,
                            "Referral link copied"
                          );
                        }}
                      >
                        Copy
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className={classes.chartOuter}>
                  <CommissionChart
                    labels={chartData.labels}
                    datasets={chartData.datasets ? chartData.datasets : []}
                    tooltipPrefix="Total Sale $"
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

export default Binary;
