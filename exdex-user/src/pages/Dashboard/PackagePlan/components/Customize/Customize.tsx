import React, { useEffect, useState } from "react";
import classes from "./Customize.module.scss";
import NumberInput from "../../../../../common/Components/NumberInput/NumberInput";
import Checkbox from "../../../../../common/Components/Checkbox/Checkbox";
import { useDispatch } from "react-redux";
import { showToast } from "../../../../../store/toastSlice";

interface CustomizeProps {
  optionsArr: any[];
  marketsArr: any[];
  tradeSizeMar: any;
  tradeMarketsArr: any[];
  update: (
    tradeSize: any,
    market: any[],
    options: any[],
    tradeMarket: any[]
  ) => void;
}

const Customize: React.FC<CustomizeProps> = ({
  optionsArr,
  marketsArr,
  tradeSizeMar,
  tradeMarketsArr,
  update,
}) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState<any>([]);
  const [markets, setMarkets] = useState<any>();
  const [tradeMarkets, setTradeMarkets] = useState<any>();
  const [tradeSize, setTradeSize] = useState<any>({});
  const [updateRequired, setUpdateRequired] = useState<boolean>(false);

  useEffect(() => {
    setTradeSize(tradeSizeMar);
    setMarkets(marketsArr);
    setOptions(optionsArr);
    setTradeMarkets(tradeMarketsArr);
  }, [tradeSizeMar]);

  useEffect(() => {
    if (updateRequired) {
      update(tradeSize, markets, options, tradeMarkets);
      setUpdateRequired(false);
    }
  }, [tradeSize, markets, options, tradeMarkets]);

  const handleTradeSizeUpdate = (key: any, newValue: any) => {
    setTradeSize((prevValues: any) => ({
      ...prevValues,
      [key]: newValue,
    }));
    setUpdateRequired(true);
  };

  useEffect(() => {
    console.log(options);
  }, [options]);

  const handleChange =
    (optionKey: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setOptions(
        options.map((opt: any) => {
          if (opt.key === optionKey) {
            return { ...opt, checked: event.target.checked };
          }
          return opt;
        })
      );
      setUpdateRequired(true);
    };

  const handleChangeCustom =
    (optionKey: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const checkedArr = tradeMarkets
        .filter((item: any) => item.checked)
        .map((item: any) => item.key);

      if (checkedArr.length > 1 && !checkedArr.includes(optionKey)) {
        console.log(optionKey, checkedArr);
        dispatch(
          showToast({
            message: "Can't select more than 2 options",
            type: "error",
            timeout: 5000,
          })
        );
        return;
      }
      setTradeMarkets(
        tradeMarkets.map((opt: any) => {
          if (opt.key === optionKey) {
            return { ...opt, checked: event.target.checked };
          }
          return opt;
        })
      );
      setUpdateRequired(true);
    };

  const handleChangeMarket =
    (marketKey: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const checkedArr = markets
        .filter((item: any) => item.checked)
        .map((item: any) => item.key);

      if (checkedArr.length > 1 && !checkedArr.includes(marketKey)) {
        console.log(marketKey, checkedArr);
        dispatch(
          showToast({
            message: "Can't select more than 2 Markets",
            type: "error",
            timeout: 5000,
          })
        );
        return;
      }
      setMarkets(
        markets.map((market: any) => {
          if (market.key === marketKey) {
            return { ...market, checked: event.target.checked };
          }
          return market;
        })
      );
      setUpdateRequired(true);
    };

  return (
    <>
      {/* <div className={classes.sectionDes}>
        Set the minimum trade size that will be executed in your brokerage
        account , if the parameter is set to “0.50”, our trading server will
        place trades with minimum size od 0.50 lot or 50 000 units of base
        currency , Dedault recommended value is “0.01”
      </div>
      <div className={classes.sectionBody}>
        <div className={classes.numbeWrap}>
          {Object.keys(tradeSize) &&
            Object.keys(tradeSize).length > 0 &&
            Object.keys(tradeSize).map((item: any) => (
              <div className={classes.numberItem} key={item}>
                <NumberInput
                  label={item.replace(/_/g, " ")}
                  type="number"
                  value={tradeSize[item]}
                  updated={(val) => {
                    handleTradeSizeUpdate(item, val);
                  }}
                />
              </div>
            ))}
        </div>
      </div> */}
      <div className={classes.section}>
        <div className={classes.sectionHead}>
          Custom Trading Methods and AI Optimization
        </div>
        <div className={classes.des}>
          Customizing your trading method may not be fully optimized with our AI
          algorithm. For optimal results, we recommend users with trading
          experience carefully select their preferred method from the options
          provided below.
        </div>
        <div
          className={`${classes.checkboxWrap} ${classes.checkboxWrap2} ${classes.checkboxWrap3}`}
        >
          {tradeMarkets &&
            tradeMarkets.length > 0 &&
            tradeMarkets.map((option: any) => (
              <div className={classes.checkboxSection} key={option.key}>
                <div className={classes.checkBoxItem}>
                  <Checkbox
                    responsive="invertBox"
                    theme="normal"
                    label={option.label}
                    checked={option.checked}
                    onChange={handleChangeCustom(option.key)}
                  />
                </div>
              </div>
            ))}
          <div className={classes.checkboxSection}></div>
          <div className={classes.checkboxSection}></div>
        </div>
      </div>
      <div className={classes.section}>
        <div className={classes.sectionHead}>Trade Strategies</div>
        <div className={classes.checkboxWrap}>
          {options.length > 0 &&
            options.map((option: any) => (
              <div className={classes.checkboxSection} key={option.key}>
                <div className={classes.checkBoxItem}>
                  <Checkbox
                    responsive="invertBox"
                    theme="normal"
                    label={option.label}
                    checked={option.checked}
                    onChange={handleChange(option.key)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className={classes.section}>
        <div className={classes.sectionHead}>Trading Markets</div>
        <div className={`${classes.checkboxWrap} ${classes.checkboxWrap2}`}>
          {markets &&
            markets.length > 0 &&
            markets.map((market: any) => (
              <div className={classes.checkboxSection} key={market.key}>
                <div className={classes.checkBoxItem}>
                  <Checkbox
                    theme="normal"
                    responsive="invertBox"
                    label={market.label}
                    checked={market.checked}
                    disabled={market.disabled}
                    onChange={handleChangeMarket(market.key)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default Customize;
