import { useState, useEffect, useRef } from "react";
import ProgressBar from "../../../common/Components/ProgressBar/ProgressBar";
import Table from "../../../common/Components/Table/Table";
import classes from "./Package.module.scss";
import PageAnimation from "../../../common/Components/PageAnimation/PageAnimation";
import Button from "../../../common/Components/Button/Button";
import TableChart from "../../../common/Components/TableChart/TableChart";
import SwiperCommon from "../../../common/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";
import MobileCard from "./MobileCards/MobileCards";
import Search from "../../../common/Components/Search/Search";
import { setSelectedPackage } from "../../../store/packageSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPlan, getPurchasedPlanAuto } from "../../../services/plan";
import { IMAGE_URL } from "../../../config";
import Loading from "../../../common/UI/Loading/Loading";
import NoData from "../../../common/Components/NoData/NoData";
import CardWrapper from "./InfoCards/CardWrapper";
import DataValues from "./InfoCards/DataValues";
import GaugeChart from "../../../common/Components/GaugeChartt/GaugeChart";
import PackageDetails from "./InfoCards/PackageDetails/PackageDetails";
import History from "../MyPackages/pages/History/History";
import PackagesMobile from "./PackagesMobile/PackagesMobile";
import { showToast } from "../../../store/toastSlice";
import { formatCurrency } from "../../../utils/currencyFormatter";

const breakpoints = {
  300: {
    slidesPerView: 1.1,
    spaceBetween: 20,
    slidesPerGroup: 1,
  },
  350: {
    slidesPerView: 1.2,
    spaceBetween: 20,
    slidesPerGroup: 1,
  },
  480: {
    slidesPerView: 1.3,
    spaceBetween: 20,
    slidesPerGroup: 1,
  },
  550: {
    slidesPerView: 1.8,
    spaceBetween: 20,
    slidesPerGroup: 1,
  },
  650: {
    slidesPerView: 2.1,
    spaceBetween: 20,
    slidesPerGroup: 2,
  },
  750: {
    slidesPerView: 2.2,
    spaceBetween: 20,
    slidesPerGroup: 2,
  },
  850: {
    slidesPerView: 2.5,
    spaceBetween: 20,
    slidesPerGroup: 2,
  },
};
const sortArray = [
  {
    id: 0,
    value: "AVG PNL Monthly",
    key: "avg_pnl_monthly_graph",
  },
  {
    id: 1,
    value: "AVG PNL 3 Months",
    key: "avg_pnl_3_month_graph",
  },
  {
    id: 2,
    value: "AVG PNL 6 Months",
    key: "avg_pnl_6_month_graph",
  },
];
const Packages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState<any>([]);
  const [planData, setPlanData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [showSort, setShowSort] = useState(false);
  const [sortHead, setSortHead] = useState("AVG PNL Monthly");
  const sortRef = useRef<HTMLDivElement>(null);
  const [selectedRow, setSelecetdRow] = useState<number | null>(null);
  const [selectedRowMobile, setSelectedRowMobile] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (selectedRow != null) {
      getPurchasedDetails();
    }
  }, [selectedRow]);

  const getPurchasedDetails = async () => {
    try {
      const id =
        selectedRow != null ? data[selectedRow]["max_amount_plan_id"] : null;
      const response = await getPurchasedPlanAuto(id);
      if (response.status) {
        setPlanData(response.data);
      }
    } catch (err: any) {
      if (err.response.data.error) {
        dispatch(
          showToast({
            message: err.response.data.error,
            type: "error",
            timeout: 5000,
          })
        );
      }
    } finally {
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
      setShowSort(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await getPlan();
        if (response.status) {
          response.data.forEach((item: any) => {
            let foundActive = false;
            item.duration.forEach((dur: any, durationIndex: number) => {
              if (dur.active && !foundActive) {
                foundActive = true;
                dur.selected = true;
                item["monthly_pnl"] = item.duration[durationIndex].MonthlyPnl;
                item["three_month_pnl"] =
                  item.duration[durationIndex].ThreeMonthPnl;
                item["six_month_pnl"] =
                  item.duration[durationIndex].SixMonthPnl;
              }
            });
            item.PNL = "avg_pnl_monthly_graph";
            item.trade_fee = "+" + item.trade_fee + "%";
            item.minimum = item.minimum.toLocaleString("en-US");
            item.maximum =
              item.id == 6 ? "" : item.maximum.toLocaleString("en-US");
          });
          setData(response.data);
        }
      } catch (err) {
        // setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  const toggleSort = () => {
    setShowSort((prevState) => !prevState);
  };

  const durationClick = (index: number, durationIndex: number) => {
    const updatedData = data.map((item: any, idx: number) => {
      if (idx === index) {
        const updatedDurations = item.duration.map(
          (dur: any, durIdx: number) => ({
            ...dur,
            selected: durIdx === durationIndex,
          })
        );
        return { ...item, duration: updatedDurations };
      }
      return item;
    });
    updatedData[index]["monthly_pnl"] =
      updatedData[index].duration[durationIndex].MonthlyPnl;
    updatedData[index]["three_month_pnl"] =
      updatedData[index].duration[durationIndex].ThreeMonthPnl;
    updatedData[index]["six_month_pnl"] =
      updatedData[index].duration[durationIndex].SixMonthPnl;
    setData(updatedData);
  };

  const pnlUpdated = (slideIndex: number, index: number) => {
    const newPNL = sortArray[slideIndex]["key"];
    const newData = data.map((item: any, idx: number) => {
      if (idx === index) {
        return {
          ...item,
          PNL: newPNL,
        };
      }
      return item;
    });
    setData(newData);
  };

  const sortUpdate = (slideIndex: number) => {
    setSortHead(sortArray[slideIndex].value);
    const newPNL = sortArray[slideIndex]["key"];
    const newData = data.map((item: any) => {
      return {
        ...item,
        PNL: newPNL,
      };
    });
    setData(newData);
  };

  const selectPackage = (plan: any) => {
    dispatch(setSelectedPackage(plan));
    navigate(`/autotrade/plan/${plan.id}`);
  };

  return (
    <>
      <PageAnimation left={true}>
        {selectedRowMobile !== null && selectedRowMobile !== undefined && (
          <PackagesMobile
            onClose={() => {
              setSelectedRowMobile(null);
            }}
            header="WARRIOR"
          />
        )}
        <div
          className={`${classes.packageOuter} ${
            selectedRowMobile !== null && selectedRow !== undefined
              ? classes.shrinkMobile
              : ""
          }`}
        >
          <div className={classes.searchWrap}>
            <Search placeholder="Search a card" />
          </div>
          <div className={classes.packageHead}>
            Auto-Trade
            <span className={classes.subHead}>
              <span className={classes.des}>#</span>Start growing your assets on
              autopilot
            </span>
          </div>
          {loading && (
            <PageAnimation>
              <Loading />
            </PageAnimation>
          )}
          {!loading && data.length > 0 && (
            <PageAnimation left={true}>
              <div className={classes.packageListing}>
                <div className={classes.des}>
                  <Table className={classes.expandableTable} noCollapse>
                    <thead>
                      <tr>
                        <th className={classes.nft}>NFT Collection</th>
                        <th className={classes.amount}>Minimum</th>
                        <th className={classes.durationHead}>Duration</th>
                        <th className={classes.tradeFee}>Trade Fee</th>
                        <th className={classes.sort}>
                          <div
                            className={classes.sortWrap}
                            onClick={toggleSort}
                            ref={sortRef}
                          >
                            {sortHead}
                            <img
                              className={`${showSort && classes.active}`}
                              src="/assets/images/arrow.png"
                              alt="sort"
                            />
                            <div
                              className={`${classes.sortPop} ${
                                showSort && classes.active
                              }`}
                            >
                              {sortArray.map((sortItem) => (
                                <div
                                  key={sortItem.id}
                                  className={classes.sortItem}
                                  onClick={() => {
                                    sortUpdate(sortItem.id);
                                  }}
                                >
                                  {sortItem.value}
                                </div>
                              ))}
                            </div>
                          </div>
                        </th>
                        <th className={classes.progressCol}>Daily NFT Limit</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={classes.headingSeperator}>
                        <td colSpan={7}></td>
                      </tr>
                      {data.map((item: any, index: number) => (
                        <>
                          <tr
                            className={`${
                              selectedRow === index && classes.selectedRow
                            }`}
                            key={index}
                            onClick={() => {
                              if (item.has_user_plan) {
                                setSelecetdRow(
                                  index === selectedRow ? null : index
                                );
                              }
                            }}
                          >
                            <td className={classes.nft}>
                              <div
                                className={`${classes.imgName} ${
                                  item.has_user_plan ? classes.whiteName : ""
                                }`}
                              >
                                <div className={classes.iconWrap}>
                                  <img
                                    src={`${IMAGE_URL}/logos/${item.logo}`}
                                    alt={item.collection}
                                  />
                                </div>
                                {item.collection}
                              </div>
                            </td>
                            <td className={classes.amount}>
                              ${item.minimum}
                              {item.maximum ? "-" + item.maximum : "+"}
                            </td>
                            <td className={classes.duration}>
                              <div className={classes.durWrap}>
                                {item.duration.map(
                                  (dur: any, durIndex: number) => (
                                    <div
                                      onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        if (dur.active) {
                                          durationClick(index, durIndex);
                                        }
                                      }}
                                      key={dur.value}
                                      className={`${classes.durItem} ${
                                        dur.selected && classes.active
                                      } ${!dur.active && classes.disabled}`}
                                    >
                                      {dur.value} YRS
                                    </div>
                                  )
                                )}
                              </div>
                            </td>
                            <td className={classes.tradeFee}>
                              {item.collection == "PARTNER"
                                ? "Contact us"
                                : item.trade_fee}
                            </td>
                            <td>
                              <div className={classes.chartContainer}>
                                <TableChart
                                  data={
                                    item.PNL == sortArray[0]["key"]
                                      ? item[sortArray[0]["key"]]
                                      : item.PNL == sortArray[1]["key"]
                                      ? item[sortArray[1]["key"]]
                                      : item[sortArray[2]["key"]]
                                  }
                                  // customColors={{
                                  //   lineColor: "var(--color-green)",
                                  // }}
                                  customColors={{
                                    lineColor: "var(--color-green)", // Otherwise, line color is orange
                                  }}
                                />
                                <div
                                  className={`${classes.chartValue} ${classes.chartGreen}`}
                                >
                                  {sortHead == "AVG PNL Monthly"
                                    ? item.monthly_pnl
                                    : sortHead == "AVG PNL 3 Months"
                                    ? item.three_month_pnl
                                    : item.six_month_pnl}
                                  %
                                </div>
                              </div>
                            </td>
                            <td className={classes.progressCol}>
                              <div className={classes.progressWrap}>
                                <ProgressBar
                                  percentage={item.available_nft_percentage}
                                  backgroundColor="var(--color-orange)"
                                  barColor="var(--color-green)"
                                  barBorder={0}
                                  showPercent={true}
                                />
                              </div>
                            </td>
                            <td className={classes.btnCol}>
                              <Button
                                theme="neon"
                                onClick={() => {
                                  selectPackage(item);
                                }}
                              >
                                <div
                                  className={`${classes.btnInner} ${
                                    item.has_user_plan ? classes.btnOutPlan : ""
                                  }`}
                                >
                                  {item.collection == "PARTNER" && (
                                    <div className={classes.contactWidAdjuster}>
                                      Create a plan
                                    </div>
                                  )}
                                  {item.collection == "PARTNER" ? (
                                    "Contact us   "
                                  ) : item.has_user_plan ? (
                                    <div className={classes.topup}>
                                      Top up{" "}
                                      <span>
                                        <img
                                          src="/assets/images/plus2.png"
                                          alt="plus"
                                        />
                                      </span>
                                    </div>
                                  ) : (
                                    "Create a plan"
                                  )}
                                </div>
                              </Button>
                            </td>
                          </tr>
                          {/* {selectedRow === index && ( */}
                          <tr>
                            <td colSpan={7} className={classes.expandedRow}>
                              <div
                                className={`${classes.rowInner} ${
                                  selectedRow === index ? classes.active : ""
                                }`}
                              >
                                {selectedRow === index && (
                                  <div className={classes.infoRow}>
                                    {planData?.plan_pricing && (
                                      <div
                                        className={classes.infoCardContainer}
                                      >
                                        <CardWrapper
                                          title="NFT Price"
                                          data={[
                                            planData?.plan_pricing?.low_price /
                                              (planData?.plan_pricing
                                                ?.low_price +
                                                planData?.plan_pricing
                                                  ?.current_price +
                                                planData?.plan_pricing
                                                  ?.high_price),
                                            planData?.plan_pricing
                                              ?.current_price /
                                              (planData?.plan_pricing
                                                ?.low_price +
                                                planData?.plan_pricing
                                                  ?.current_price +
                                                planData?.plan_pricing
                                                  ?.high_price),
                                            planData?.plan_pricing?.high_price /
                                              (planData?.plan_pricing
                                                ?.low_price +
                                                planData?.plan_pricing
                                                  ?.current_price +
                                                planData?.plan_pricing
                                                  ?.high_price),
                                          ]}
                                        >
                                          <div
                                            className={classes.dataValueWrapper}
                                          >
                                            <DataValues
                                              theme="red"
                                              value={
                                                "$" +
                                                planData?.plan_pricing
                                                  ?.low_price
                                              }
                                              label="Lowest"
                                            />
                                            <DataValues
                                              theme="lightGreen"
                                              value={
                                                "$" +
                                                planData?.plan_pricing
                                                  ?.current_price
                                              }
                                              label="Current"
                                            />
                                            <DataValues
                                              value={
                                                "$" +
                                                planData?.plan_pricing
                                                  ?.high_price
                                              }
                                              theme="neon"
                                              label="Highest"
                                            />
                                          </div>
                                        </CardWrapper>
                                      </div>
                                    )}

                                    {planData.available_nft_percentage && (
                                      <div
                                        className={classes.infoCardContainer}
                                      >
                                        <CardWrapper
                                          title="Remaining NFT"
                                          data={[
                                            planData.available_nft_percentage /
                                              100,
                                            (100 -
                                              planData.available_nft_percentage) /
                                              100,
                                          ]}
                                        >
                                          <div
                                            className={classes.dataValueWrapper}
                                          >
                                            <DataValues
                                              theme="neon"
                                              value={
                                                formatCurrency(
                                                  planData.available_nft_percentage,
                                                  "en-US",
                                                  "",
                                                  999,
                                                  1
                                                ) + "%"
                                              }
                                              label=""
                                            />
                                          </div>
                                        </CardWrapper>
                                      </div>
                                    )}

                                    <div className={classes.infoCardContainer}>
                                      <CardWrapper title="Popularity">
                                        <GaugeChart
                                          value={planData.rank || 0}
                                          maxValue={6}
                                        />
                                      </CardWrapper>
                                    </div>
                                    {planData?.daily_roi && (
                                      <div
                                        className={classes.infoCardContainer}
                                      >
                                        <CardWrapper
                                          title="Daily Passive income"
                                          data={[
                                            planData?.daily_roi?.lowest /
                                              (planData?.daily_roi?.lowest +
                                                planData?.daily_roi?.average +
                                                planData?.daily_roi?.highest),
                                            planData?.daily_roi?.average /
                                              (planData?.daily_roi?.lowest +
                                                planData?.daily_roi?.average +
                                                planData?.daily_roi?.highest),
                                            planData?.daily_roi?.highest /
                                              (planData?.daily_roi?.lowest +
                                                planData?.daily_roi?.average +
                                                planData?.daily_roi?.highest),
                                          ]}
                                        >
                                          <div
                                            className={classes.dataValueWrapper}
                                          >
                                            <DataValues
                                              theme="red"
                                              value={formatCurrency(
                                                planData?.daily_roi?.lowest,
                                                "en-US",
                                                "USD",
                                                999,
                                                1
                                              )}
                                              label="Lowest"
                                            />
                                            <DataValues
                                              theme="lightGreen"
                                              value={formatCurrency(
                                                planData?.daily_roi?.average,
                                                "en-US",
                                                "USD",
                                                999,
                                                1
                                              )}
                                              label="Average"
                                            />
                                            <DataValues
                                              theme="neon"
                                              value={formatCurrency(
                                                planData?.daily_roi?.highest,
                                                "en-US",
                                                "USD",
                                                999,
                                                1
                                              )}
                                              label="Highest"
                                            />
                                          </div>
                                        </CardWrapper>
                                      </div>
                                    )}
                                    {planData?.monthly_roi && (
                                      <div
                                        className={classes.infoCardContainer}
                                      >
                                        <CardWrapper
                                          title="Monthly Passive income"
                                          data={[
                                            planData?.monthly_roi?.lowest /
                                              (planData?.monthly_roi?.lowest +
                                                planData?.monthly_roi?.average +
                                                planData?.monthly_roi?.highest),
                                            planData?.monthly_roi?.average /
                                              (planData?.monthly_roi?.lowest +
                                                planData?.monthly_roi?.average +
                                                planData?.monthly_roi?.highest),
                                            planData?.monthly_roi?.highest /
                                              (planData?.monthly_roi?.lowest +
                                                planData?.monthly_roi?.average +
                                                planData?.monthly_roi?.highest),
                                          ]}
                                        >
                                          <div
                                            className={classes.dataValueWrapper}
                                          >
                                            <DataValues
                                              theme="red"
                                              value={formatCurrency(
                                                planData?.monthly_roi?.lowest,
                                                "en-US",
                                                "USD",
                                                999,
                                                1
                                              )}
                                              label="Lowest"
                                            />
                                            <DataValues
                                              theme="lightGreen"
                                              value={formatCurrency(
                                                planData?.monthly_roi?.average,
                                                "en-US",
                                                "USD",
                                                999,
                                                1
                                              )}
                                              label="Average"
                                            />
                                            <DataValues
                                              theme="neon"
                                              value={formatCurrency(
                                                planData?.monthly_roi?.highest,
                                                "en-US",
                                                "USD",
                                                999,
                                                1
                                              )}
                                              label="Highest"
                                            />
                                          </div>
                                        </CardWrapper>
                                      </div>
                                    )}
                                    {planData?.yearly_roi && (
                                      <div
                                        className={classes.infoCardContainer}
                                      >
                                        <CardWrapper
                                          title="Yearly Passive income"
                                          data={[
                                            planData?.yearly_roi?.lowest /
                                              (planData?.yearly_roi?.lowest +
                                                planData?.yearly_roi?.average +
                                                planData?.yearly_roi?.highest),
                                            planData?.yearly_roi?.average /
                                              (planData?.yearly_roi?.lowest +
                                                planData?.yearly_roi?.average +
                                                planData?.yearly_roi?.highest),
                                            planData?.yearly_roi?.highest /
                                              (planData?.yearly_roi?.lowest +
                                                planData?.yearly_roi?.average +
                                                planData?.yearly_roi?.highest),
                                          ]}
                                        >
                                          <div
                                            className={classes.dataValueWrapper}
                                          >
                                            <DataValues
                                              theme="red"
                                              value={formatCurrency(
                                                planData?.yearly_roi?.lowest,
                                                "en-US",
                                                "USD",
                                                999,
                                                1
                                              )}
                                              label="Lowest"
                                            />
                                            <DataValues
                                              theme="lightGreen"
                                              value={formatCurrency(
                                                planData?.yearly_roi?.average,
                                                "en-US",
                                                "USD",
                                                999,
                                                1
                                              )}
                                              label="Average"
                                            />
                                            <DataValues
                                              theme="neon"
                                              value={formatCurrency(
                                                planData?.yearly_roi?.highest,
                                                "en-US",
                                                "USD",
                                                999,
                                                1
                                              )}
                                              label="Highest"
                                            />
                                          </div>
                                        </CardWrapper>
                                      </div>
                                    )}
                                  </div>
                                )}
                                <div className={classes.packageDetailWrap}>
                                  <PackageDetails
                                    id={item.max_amount_plan_id}
                                  />
                                </div>
                                {selectedRow === index && (
                                  <div className={classes.historyWrapper}>
                                    <History
                                      theme="tableAuto"
                                      overviewPage
                                      planId={item.max_amount_plan_id}
                                      onSeeLess={() => setSelecetdRow(null)}
                                    />
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                          {/* )} */}
                          <tr className={classes.headingSeperator}>
                            <td colSpan={7}></td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <div className={classes.mob}>
                  <SwiperCommon
                    pagination={true}
                    slidesPerview={2.5}
                    spaceBetween={20}
                    breakpoints={breakpoints}
                    slidesPerGroup={2}
                    arrows={false}
                  >
                    {data.map((item: any, index: number) => (
                      <SwiperSlide key={index}>
                        <MobileCard
                          onClick={() => {
                            setSelectedRowMobile(index);
                          }}
                        >
                          <div className={classes.mobItemWrap}>
                            <div className={classes.imgName}>
                              <div className={classes.iconWrap}>
                                <img
                                  src={`${IMAGE_URL}/logos/${item.logo}`}
                                  alt={item.type}
                                />
                              </div>
                              {item.collection}
                            </div>
                            <div className={classes.cardItem}>
                              <div className={classes.cardLeft}>Minimum</div>
                              <div className={classes.cardRight}>
                                ${item.minimum}
                              </div>
                            </div>
                            <div className={classes.cardItem}>
                              <div className={classes.cardLeft}>Trade fee</div>
                              <div className={classes.cardRight}>
                                {item.trade_fee}
                              </div>
                            </div>
                            <div className={classes.cardItem}>
                              <div className={classes.cardLeft}>NFT Limit</div>
                              <div className={classes.cardRight}>
                                <div className={classes.progressWrap}>
                                  <ProgressBar
                                    percentage={item.available_nft_percentage}
                                    backgroundColor="var(--dark-color3)"
                                    barColor="var(--color-green)"
                                    barBorder={0}
                                    showPercent={true}
                                    fontStyle={{
                                      fontSize: "1rem",
                                      lineHeight: "0.1rem",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className={classes.cardItem}>
                              <div className={classes.cardLeft}>Duration</div>
                              <div className={classes.cardRight}>
                                <div className={classes.durWrap}>
                                  {item.duration.map(
                                    (dur: any, durIndex: number) => (
                                      <div
                                        className={`${classes.radio} ${
                                          !dur.active ? classes.hide : ""
                                        }`}
                                        key={durIndex}
                                        onClick={() => {
                                          durationClick(index, durIndex);
                                        }}
                                      >
                                        <input
                                          type="radio"
                                          id={`${dur.value}_${index}_${durIndex}`}
                                          name={`years_${index}`}
                                          checked={dur.selected}
                                          onChange={() => {}}
                                        />
                                        <label
                                          htmlFor={`${dur.value}_${index}_${durIndex}`}
                                        >
                                          <span
                                            className={classes.radioCustom}
                                          ></span>
                                          {dur.value} YRS
                                        </label>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className={classes.cardMid}>
                              <div className={classes.sort}>
                                {item.PNL == sortArray[0]["key"]
                                  ? "AVG PNL Monthly"
                                  : item.PNL == sortArray[1]["key"]
                                  ? "AVG PNL 3 Months"
                                  : "AVG PNL 6 Months"}
                                <img
                                  src="/assets/images/arrow.png"
                                  alt="sort"
                                />
                              </div>
                              <div className={classes.chartContainer}>
                                <SwiperCommon
                                  pagination={true}
                                  slidesPerview={1}
                                  arrows={false}
                                  onActiveIndexChange={(slideIndex) => {
                                    pnlUpdated(slideIndex, index);
                                  }}
                                >
                                  <SwiperSlide>
                                    <div className={classes.mobChartWrap}>
                                      <TableChart
                                        data={item[sortArray[0]["key"]]}
                                        customColors={{
                                          lineColor: "var(--color-green)",
                                        }}
                                      />
                                      <div
                                        className={`${classes.chartValue} ${classes.chartGreen}`}
                                      >
                                        {item.monthly_pnl}%
                                      </div>
                                    </div>
                                  </SwiperSlide>
                                  <SwiperSlide>
                                    <div className={classes.mobChartWrap}>
                                      <TableChart
                                        data={item[sortArray[1]["key"]]}
                                        customColors={{
                                          lineColor: "var(--color-green)",
                                        }}
                                      />
                                      <div
                                        className={`${classes.chartValue} ${classes.chartGreen}`}
                                      >
                                        {item.three_month_pnl}%
                                      </div>
                                    </div>
                                  </SwiperSlide>
                                  <SwiperSlide>
                                    <div className={classes.mobChartWrap}>
                                      <TableChart
                                        data={item[sortArray[2]["key"]]}
                                        customColors={{
                                          lineColor: "var(--color-green)",
                                        }}
                                      />
                                      <div
                                        className={`${classes.chartValue} ${classes.chartGreen}`}
                                      >
                                        {item.six_month_pnl}%
                                      </div>
                                    </div>
                                  </SwiperSlide>
                                </SwiperCommon>
                              </div>
                            </div>
                            <div className={classes.cardBottom}>
                              <Button
                                theme="neon"
                                onClick={() => {
                                  selectPackage(item);
                                }}
                              >
                                <div className={classes.btnInner}>
                                  Create a plan
                                </div>
                              </Button>
                            </div>
                          </div>
                        </MobileCard>
                      </SwiperSlide>
                    ))}
                  </SwiperCommon>
                </div>
              </div>
            </PageAnimation>
          )}
          {!loading && !data.length && (
            <PageAnimation>
              <NoData title="No Data" description="" />
            </PageAnimation>
          )}
        </div>
      </PageAnimation>
    </>
  );
};

export default Packages;
