// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";
import styles from "./TradeViewChart.module.scss";

function TradingViewWidget({symbol , loadSymbol} : {symbol : string , loadSymbol : boolean }) {
  const container = useRef();

  useEffect(() => {
    if(loadSymbol){
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${symbol}",
           "interval": "30",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "in",
          "backgroundColor": "#1E2F35",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "calendar": false,
           "hide_volume" : true,
          "support_host": "https://www.tradingview.com"
        }`;
    //@ts-ignore
    container.current.appendChild(script);
    }
  }, [symbol , loadSymbol]);

  return (
    <div className={styles.container}>
      <div className={styles.widgetHolder}>
        <div
          className="tradingview-widget-container"
          //@ts-ignore
          ref={container}
          style={{ height: "100vh", width: "100%" }}
        >
          {!loadSymbol && <div className={styles.loader} ></div>}
          <div
            className="tradingview-widget-container__widget"
            style={{ height: "calc(100% - 32px)", width: "100%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
