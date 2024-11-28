import { useEffect, useState } from "react";
import CommissionChart from "../../../../../common/Components/CommissionChart/CommissionChart";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./UniLevel.module.scss";
import {
  extractDay,
  extractMonth,
  extractTimeLabels,
  extractWeek,
} from "../../../../../utils/date";
import {
  getUnilevelGraph,
  getUnilevelSummary,
} from "../../../../../services/overview";
import { formatCurrency } from "../../../../../utils/currencyFormatter";

const UniLevel = () => {
  const [unidata, setUnidata] = useState({
    labels: [
      "Jan",
      "Feb",
      "March",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Level 5",
        data: [0, 50, 70, 90, 120, 150, 180, 250, 340, 450, 460, 590],
        borderColor: "rgba(186, 72, 138, 1)",
        backgroundColor: "rgba(186, 72, 138, 0.5)",
        fill: true,
      },
      {
        label: "Level 4",
        data: [0, 50, 120, 170, 220, 270, 320, 370, 420, 470, 520, 570],
        borderColor: "rgba(139, 103, 169, 1)",
        backgroundColor: "rgba(139, 103, 169, 0.5)",
        fill: true,
      },
      {
        label: "Level 2",
        data: [0, 50, 160, 210, 260, 310, 360, 410, 460, 510, 560, 610],
        borderColor: "rgba(127, 190, 67, 1)",
        backgroundColor: "rgba(127, 190, 67, 0.5)",
        fill: true,
      },
      {
        label: "Level 3",
        data: [0, 50, 140, 190, 240, 290, 340, 390, 440, 490, 540, 590],
        borderColor: "rgba(56, 20, 166, 1)",
        backgroundColor: "rgba(56, 20, 166, 0.5)",
        fill: true,
      },
      {
        label: "Level 1",
        data: [0, 50, 180, 230, 280, 330, 380, 430, 480, 530, 580, 630],
        borderColor: "rgba(93, 77, 130, 1)",
        backgroundColor: "rgba(93, 77, 130, 0.5)",
        fill: true,
      },
    ],
  });
  const [levels, setLevels] = useState([
    { name: "Level 1", count: "0", percent: "0" },
    { name: "Level 2", count: "0", percent: "0" },
    { name: "Level 3", count: "0", percent: "0" },
    { name: "Level 4", count: "0", percent: "0" },
    { name: "Level 5", count: "0", percent: "0" },
  ]);

  const [details, setDetails] = useState<any>([
    {
      title: "Total Earning",
      val: 0,
      icon: "/assets/images/discover/aff3.png",
    },
    {
      title: "Total Sales",
      val: 0,
      icon: "/assets/images/discover/aff2.png",
    },
    {
      title: "Total Member",
      val: 0,
      icon: "/assets/images/discover/aff1.png",
    },
    {
      title: "Latest Member",
      val: 0,
      icon: "/assets/images/discover/aff4.png",
    },
  ]);
  const [period, setPeriod] = useState("monthly");

  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getUniLevelSummaryMethod();
    getUniLevelGraphMethod();
  }, [period]);

  const getUniLevelSummaryMethod = async () => {
    setFetching(true);
    try {
      const response = await getUnilevelSummary(period);
      if (response.status) {
        if (response.data) {
          setDetails([
            {
              title: "Total Earning",
              val: formatCurrency(response.data.total_earnings, "en-US", "USD"),
              icon: "/assets/images/discover/market4.png",
            },
            {
              title: "Total Sales",
              val: formatCurrency(response.data.total_sales, "en-US", "USD"),
              icon: "/assets/images/discover/market2.png",
            },
            {
              title: "Total Member",
              val: formatCurrency(response.data.total_members, "en-US", ""),
              icon: "/assets/images/discover/market1.png",
            },
            {
              title: "Latest Member",
              val: formatCurrency(response.data.latest_members, "en-US", ""),
              icon: "/assets/images/discover/market3.png",
            },
          ]);
          const updatedLevels = [
            {
              name: "Level 1",
              count: formatCurrency(
                response.data.level_1.current_sales,
                "en-US",
                ""
              ),
              percent: formatCurrency(
                response.data.level_1.percentage_change,
                "en-US",
                ""
              ),
            },
            {
              name: "Level 2",
              count: formatCurrency(
                response.data.level_2.current_sales,
                "en-US",
                ""
              ),
              percent: formatCurrency(
                response.data.level_2.percentage_change,
                "en-US",
                ""
              ),
            },
            {
              name: "Level 3",
              count: formatCurrency(
                response.data.level_3.current_sales,
                "en-US",
                ""
              ),
              percent: formatCurrency(
                response.data.level_3.percentage_change,
                "en-US",
                ""
              ),
            },
            {
              name: "Level 4",
              count: formatCurrency(
                response.data.level_4.current_sales,
                "en-US",
                ""
              ),
              percent: formatCurrency(
                response.data.level_4.percentage_change,
                "en-US",
                ""
              ),
            },
            {
              name: "Level 5",
              count: formatCurrency(
                response.data.level_5.current_sales,
                "en-US",
                ""
              ),
              percent: formatCurrency(
                response.data.level_5.percentage_change,
                "en-US",
                ""
              ),
            },
          ];

          setLevels(updatedLevels);
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
      setFetching(false);
    }
  };

  const getUniLevelGraphMethod = async () => {
    try {
      const response = await getUnilevelGraph(period);
      if (response.status) {
        if (response.data) {
          updateData(response.data);
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

  const updateData = (apiData: any) => {
    const updatedDatasets = unidata.datasets.map((dataset) => {
      const levelKey = dataset.label.toLowerCase().replace(" ", "_");
      if (apiData[levelKey]) {
        const updatedData = apiData[levelKey].map((entry: any) => entry.amount);
        return {
          ...dataset,
          data: updatedData,
        };
      }
      return dataset;
    });

    const updatedLabels = apiData.level_1.map((entry: any) => {
      switch (period) {
        case "monthly":
          return extractMonth(entry.date);
        case "hourly":
          return extractTimeLabels(entry.date);
        case "weekly":
          return extractWeek(entry.date);
        case "daily":
          return extractDay(entry.date);
        default:
          return "";
      }
    });

    setUnidata((prev) => ({
      ...prev,
      labels: updatedLabels,
      datasets: updatedDatasets,
    }));
  };

  return (
    <div className={classes.binaryWrap}>
      <OverviewCard type="fullHeight">
        <div className={classes.binaryInner}>
          <div className={classes.head}>ELC: Unilevel</div>
          <div className={classes.levels}>
            {levels &&
              levels.map((item, index) => (
                <div className={classes.levelItem} key={item.name}>
                  <div className={classes.levelLeft}>
                    <div
                      className={`${classes.color} ${
                        classes[`color${index + 1}`]
                      }`}
                    ></div>
                    <div className={classes.name}>{item.name}</div>
                  </div>
                  <div className={classes.levelRight}>
                    <div className={classes.val}>{item.count}</div>
                    <div className={classes.directionWrap}>
                      <div className={classes.direction}>
                        <div className={classes.directionInner}></div>
                        <img src="/assets/images/downArrow.png" alt="arrow" />
                      </div>
                    </div>
                    <div className={classes.val}>{item.percent}%</div>
                  </div>
                </div>
              ))}
          </div>
          <div className={classes.chartOuter}>
            <CommissionChart
              labels={unidata.labels}
              datasets={unidata.datasets ? unidata.datasets : []}
              tooltipPrefix="Revenue $"
              title="Uni level"
              curveTension={0.5}
            />
          </div>
          <div className={classes.salesDetails}>
            <div className={classes.salesItem}>
              <div className={classes.salesHead}>Total earning</div>
              <div className={classes.salesVal}>{details[0].val}</div>
            </div>
            <div className={classes.salesItem}>
              <div className={classes.salesHead}>Total sales</div>
              <div className={classes.salesVal}>{details[1].val}</div>
            </div>
            <div className={classes.salesItem}>
              <div className={classes.salesHead}>Total member</div>
              <div className={classes.salesVal}>{details[2].val}</div>
            </div>
            <div className={classes.salesItem}>
              <div className={classes.salesHead}>Last member</div>
              <div className={classes.salesVal}>{details[3].val}</div>
            </div>
          </div>
        </div>
      </OverviewCard>
    </div>
  );
};

export default UniLevel;
