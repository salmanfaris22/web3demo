import React, { useEffect, useRef, useState } from "react";
import styles from "./CandleChart.module.scss";
import { TradeChartDetails } from "../ChartDetails";

const CandleChart = ({
  coin_pair,
  code,
  Id = "tradingview_candleChart",
  isSimilarTech = false,
}: Pick<TradeChartDetails, "code" | "coin_pair"> & {
  Id?: string;
  isSimilarTech?: boolean;
}) => {
  const tradingviewRef = useRef<HTMLDivElement>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [tvWidget, setTvWidget] = useState(null);
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    setShowLoader(true);
  }, []);

  useEffect(() => {
    if (code) {
      if (code.includes("TradingView.chart")) {
        getEvent(code);
      } else if (code.includes("TradingView.widget")) {
        extractData(code);
      } else {
        console.error("Chart contains an error");
      }
    }
  }, [code]);

  const extractData = (data: any) => {
    const regex = /new\s+TradingView\.widget\(\s*({[\s\S]*})\s*\)/;
    const matches = data.match(regex);

    if (matches && matches.length > 1) {
      const widgetConfigObject = JSON.parse(matches[1]);
      widgetConfigObject.container_id = Id;
      widgetConfigObject.height = isSimilarTech ? 400 : 610;
      widgetConfigObject.autosize = false;
      widgetConfigObject.width = "100%";
      widgetConfigObject.disabled_features = ["use_localstorage_for_settings"];
      widgetConfigObject.loading_screen = { backgroundColor: "#fff" };
      widgetConfigObject.enable_publishing = false;
      console.log(widgetConfigObject);

      setGraphData(widgetConfigObject);

      setTimeout(() => {
        //@ts-ignore
        setTvWidget(new window.TradingView.widget(widgetConfigObject));
        setTimeout(() => {
          setShowLoader(false);
        }, 3000);
      }, 100);
    } else {
      console.error("Widget configuration object not found.");
    }
  };

  const buildChart = (data: any) => {
    const containerWidth = tradingviewRef?.current?.offsetWidth;
    const t = {
      ...data,
      container_id: Id,
      width: "100%",
      height: isSimilarTech ? 400 : 610,
      disabled_features: [
        "use_localstorage_for_settings",
        "hide_right_toolbar",
      ],
      autosize: false,
      loading_screen: { backgroundColor: "#fff", foregroundColor: "red" },
      enable_publishing: false,
    };
    setGraphData(t);
    setTimeout(() => {
      //@ts-ignore
      setTvWidget(new window.TradingView.chart(t));
      setTimeout(() => {
        setShowLoader(false);
      }, 3000);
    }, 100);
  };

  const getEvent = (event: any) => {
    let chartOpt = {};
    let pastedText = event.clipboardData
      ? event.clipboardData.getData("text")
      : event;
    const splited = pastedText.split(";");

    splited.map((x: any) => {
      const word = x.replace(/(\r\n|\n|\r)/gm, "");
      if (word.startsWith("tradingview_embed_options")) {
        const separators = ["=", "\\."];
        const tokens = word.split(new RegExp(separators.join("|"), "g"));
        //@ts-ignore
        chartOpt[tokens[1].trim().replace(/^["']|['"]$/g, "")] = tokens[2]
          .trim()
          .replace(/^["']|['"]$/g, "");
      }
    });

    buildChart(chartOpt);
  };

  return (
    <div className={styles.widgetContainer}>
      <div className={styles.tradingviewWidgetContainer} ref={tradingviewRef}>
        <div id={Id} className={styles.container_frame}></div>
        {/* <button id="load-more-button" className="load-btn" style={{ display: !isSimilarTech ? 'block' : 'none' }}>&nbsp;</button> */}
      </div>
      {showLoader && <div>Loading...</div>}{" "}
      {/* Replace with your spinner component */}
    </div>
  );
};

export default CandleChart;
