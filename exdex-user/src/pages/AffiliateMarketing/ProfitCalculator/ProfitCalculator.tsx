import React, { useEffect, useState } from "react";
import styles from "./ProfitCalculator.module.scss";
import CalculatorInput from "./CalculatorInput/CalculatorInput";
import LevelGraph from "./LevelGraph/LevelGraph";
import LevelButton from "./LevelButton/LevelButton";

const ProfitCalculator = () => {
  const [activeBtn, setActiveBtn] = useState<any>("");
  const [LevelInfo, setLevelInfo] = useState<any>([
    {
      label: "Level 1",
      amount: 0,
      comission: 10,
      count: 0,
    },
    {
      label: "Level 2",
      amount: 0,
      comission: 8,
      count: 0,
    },
    {
      label: "Level 3",
      amount: 0,
      comission: 6,
      count: 0,
    },
    {
      label: "Level 4",
      amount: 0,
      comission: 4,
      count: 0,
    },
    {
      label: "Level 5",
      amount: 0,
      comission: 2,
      count: 0,
    },
  ]);
  const [selectedDur, setSelectedDur] = useState("monthly");
  const options = [
    { name: "Monthly $199", key: "monthly" },
    { name: "Yearly $999", key: "yearly" },
  ];

  useEffect(() => {
    const amountVal = selectedDur == "monthly" ? 199 : 999;
    const updatedLevelInfo = [...LevelInfo];
    updatedLevelInfo.forEach((item, index) => {
      if (selectedDur == "monthly") {
        if (index > 0) {
          item.amount =
            (item.count * 0 * (item.comission / 100)).toFixed(1) || 0;
        } else {
          item.amount =
            (item.count * amountVal * (item.comission / 100)).toFixed(1) || 0;
        }
      } else {
        item.amount =
          (item.count * amountVal * (item.comission / 100)).toFixed(1) || 0;
      }
    });
    setLevelInfo(updatedLevelInfo);
  }, [selectedDur]);

  const handleChange = (event: any) => {
    setSelectedDur(event.target.value);
  };

  const calculate = (level: any, value: any, percent: any) => {
    const parsedValue = parseFloat(value);
    const amountVal = selectedDur == "monthly" ? 199 : 999;
    const levelIndex = parseInt(level) - 1;
    const updatedLevelInfo = [...LevelInfo];
    updatedLevelInfo[levelIndex].count = value;
    updatedLevelInfo[levelIndex].amount =
      (parsedValue * amountVal * (percent / 100)).toFixed(1) || 0;
    setLevelInfo(updatedLevelInfo);
    setActiveBtn("Level " + level);
  };

  const total = LevelInfo.filter(
    (item: { amount: string }) => item.amount !== "0.0"
  ).reduce((acc: number, curr: { amount: string }) => {
    const t = acc + parseFloat(curr.amount);
    return t;
  }, 0);

  return (
    <div className={styles.calculatorWrap}>
      <div className={styles.head}>
        <div className={styles.topContent}>
          Type of Subscribtion :
          <span>
            {selectedDur == "monthly" ? "Monthly $199" : "Yearly $999"}
          </span>
        </div>
        <div className={styles.selectOut}>
          <select value={selectedDur} onChange={handleChange}>
            {options.map((item) => (
              <option key={item.key} value={item.key}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.calculator}>
          <CalculatorInput
            label="Level 1"
            comission={10}
            onBlur={(val: any) => {
              calculate("1", val, 10);
            }}
          />
          <div
            className={`${styles.yearOnly} ${
              selectedDur == "monthly" && styles.hide
            }`}
          >
            <CalculatorInput
              label="Level 2"
              comission={8}
              onBlur={(val: any) => {
                calculate("2", val, 8);
              }}
            />
            <CalculatorInput
              label="Level 3"
              comission={6}
              onBlur={(val: any) => {
                calculate("3", val, 6);
              }}
            />
            <CalculatorInput
              label="Level 4"
              comission={4}
              onBlur={(val: any) => {
                calculate("4", val, 4);
              }}
            />
            <CalculatorInput
              label="Level 5"
              comission={2}
              onBlur={(val: any) => {
                calculate("5", val, 2);
              }}
            />
          </div>
        </div>
        <div className={styles.graph}>
          <LevelGraph count={total} />
          <div className={styles.btnWraps}>
            {LevelInfo.map((x: any, index: number) => (
              <LevelButton
                onClick={(label: string) => {
                  setActiveBtn(label);
                }}
                isActive={activeBtn === x.label}
                key={x.label}
                label={x.label}
                amount={selectedDur == "monthly" && index > 0 ? null : x.amount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;
