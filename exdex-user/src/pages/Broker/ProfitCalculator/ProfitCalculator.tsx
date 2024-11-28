import React, { useEffect, useState } from "react";
import Cards from "./Cards/Cards";
import styles from "./ProfitCalculator.module.scss";
import NumberInput from "../../../common/Components/NumberInput/NumberInput";
import useCustomForm from "../../../hooks/useForms";
import SelectInput from "../../../common/SelectInput/SelectInput";
import Button from "../../../common/Components/Button/Button";
import Ellipse from "../../ReferalProgram/Ellipse/Ellipse";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../common/Constants";
import { useSelector } from "react-redux";
import { selectToken } from "../../../store/authSlice";

type DataType = "Bronze" | "Silver" | "Gold";

type CategoryType = {
  standard: number;
  ecn: number;
  prime: number;
};

type DataItem = {
  type: DataType;
  categories: string[];
  Metals: CategoryType;
  Energy: CategoryType;
  Forex: CategoryType;
  Indices: CategoryType;
};

const data: DataItem[] = [
  {
    type: "Silver",
    categories: ["Metals", "Energy", "Forex", "Indices"],
    Metals: { standard: 8, ecn: 8, prime: 1.5 },
    Energy: { standard: 7, ecn: 7, prime: 1.5 },
    Forex: { standard: 5.5, ecn: 5.5, prime: 0.5 },
    Indices: { standard: 3, ecn: 3, prime: 0.5 },
  },
  {
    type: "Gold",
    categories: ["Metals", "Energy", "Forex", "Indices"],
    Metals: { standard: 10, ecn: 10, prime: 2 },
    Energy: { standard: 9, ecn: 9, prime: 2 },
    Forex: { standard: 6.5, ecn: 6.5, prime: 1 },
    Indices: { standard: 4, ecn: 4, prime: 1 },
  },
  {
    type: "Bronze",
    categories: ["Metals", "Energy", "Forex", "Indices"],
    Metals: { standard: 6.5, ecn: 6.5, prime: 1 },
    Energy: { standard: 6, ecn: 6, prime: 1 },
    Forex: { standard: 4, ecn: 4, prime: 0.25 },
    Indices: { standard: 2.5, ecn: 2.5, prime: 0.25 },
  },
];

const ProfitCalculator: React.FC = () => {
  const nav = useNavigate();
  const token = useSelector(selectToken);
  const [active, setActive] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<DataItem[]>(); // Initially show the first tab data
  const [selectedType, setSelectedType] = useState<DataType>("Bronze");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const filtered = data.filter((item) => item.type === "Bronze");
    setFilteredData(filtered);
  }, []);

  const { handleChange, values } = useCustomForm<{
    client: number | undefined;
    volume: number | undefined;
    account: string | any;
    asset: string;
  }>({
    initialValues: {
      account: "",
      client: undefined,
      volume: undefined,
      asset: "",
    },
    onSubmit: () => {},
  });

  const handleTypeClick = (type: DataType, index: number) => {
    setSelectedType(type);
    const filtered = data.filter((item) => item.type === type);
    setFilteredData(filtered);
    setActive(index);
  };

  useEffect(() => {
    if (values.account && values.client && values.volume && values.asset) {
      console.log("here");
      const relevantData = data.find((item) => item.type === selectedType);
      if (relevantData) {
        const categoryData: CategoryType | undefined = relevantData[
          //@ts-ignore
          values.asset.value as keyof typeof relevantData
        ] as CategoryType;
        if (categoryData) {
          //@ts-ignore
          const rate =
            //@ts-ignore
            categoryData[
              values.account.value.toLowerCase() as keyof CategoryType
            ];
          if (typeof rate === "number") {
            //@ts-ignore
            const total = rate * values.volume * (values.client || 0);
            setTotal(total);
          }
        }
      }
    }
  }, [values, selectedType]);

  const getClassForValue = (value: number) => {
    if (!value) {
      return styles.noVal;
    }
    if (value < 1000) {
      return styles.start;
    } else if (value < 5000) {
      return styles.mid;
    } else {
      return styles.end;
    }
  };

  return (
    <div className={styles.container}>
      <Cards />
      <div className={styles.calcWrap}>
        <div className={styles.titleWrap}>
          <div className={styles.title}>
            <h2>Profit calculator</h2>
            <div className={styles.tabRow}>
              {["Bronze", "Silver", "Gold"].map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleTypeClick(tab as DataType, index)}
                  className={`${styles.tab} ${
                    active === index ? styles.active : ""
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Standard</th>
              <th>ECN</th>
              <th>Prime</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((item) =>
              item.categories.map((category, idx) => (
                <tr
                  key={`${item.type}-${category}-${idx}`}
                  className={styles.dataRow}
                >
                  {/* {idx === 0 && <td rowSpan={item.categories.length}>{item.type}</td>} */}
                  <td>{category}</td>
                  <td className={styles.data}>
                    {item[
                      category as keyof Omit<DataItem, "type" | "categories">
                    ].standard.toFixed(2)}
                  </td>
                  <td className={styles.data}>
                    {item[
                      category as keyof Omit<DataItem, "type" | "categories">
                    ].ecn.toFixed(2)}
                  </td>
                  <td className={styles.data}>
                    {item[
                      category as keyof Omit<DataItem, "type" | "categories">
                    ].prime.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className={styles.calculator}>
          <h2>Unlock your potential extra income</h2>
          <p>Specify the expected values of your partner network</p>
          <div className={styles.calBtm}>
            <div className={styles.calcLeft}>
              <div className={styles.inputs}>
                <span className={styles.label}>
                  Active clients : <span>{values.client}</span>
                </span>
                <NumberInput
                  label=""
                  type="number"
                  value={values.client}
                  theme="white"
                  className={styles.numInput}
                  step={1}
                  minWidth={"none"}
                  updated={(val: any) => {
                    handleChange("client", val);
                  }}
                />
              </div>
              <div className={styles.inputs}>
                <span className={styles.label}>
                  Average trading volume per trader :
                  <span>
                    {
                      //@ts-ignore
                      values.volume?.value
                    }
                  </span>
                </span>
                <NumberInput
                  label=""
                  type="number"
                  value={values.volume}
                  theme="white"
                  className={styles.numInput}
                  step={1}
                  minWidth={"none"}
                  updated={(val: any) => {
                    handleChange("volume", val);
                  }}
                />
              </div>
              <div className={styles.inputs}>
                <span className={styles.label}>
                  Type of Acc :{" "}
                  <span>
                    {
                      //@ts-ignore
                      values.account?.value
                    }
                  </span>
                </span>
                <SelectInput
                  labelKey={"key"}
                  value={values.account}
                  onChange={(e) => {
                    //@ts-ignore
                    console.log(e);
                    //@ts-ignore
                    handleChange("account", e);
                  }}
                  className={styles.customSelector}
                  optionKey="key"
                  options={[
                    {
                      key: "Standard",
                      value: "Standard",
                    },
                    {
                      key: "ECN",
                      value: "ECN",
                    },
                    {
                      key: "Standard",
                      value: "Prime",
                    },
                  ]}
                />
              </div>
              <div className={styles.inputs}>
                <span className={styles.label}>
                  Type of asset :{" "}
                  <span>
                    {
                      //@ts-ignore
                      values.asset.value
                    }
                  </span>
                </span>
                <SelectInput
                  value={values.asset}
                  labelKey="value"
                  onChange={(e) => {
                    console.log(e);
                    //@ts-ignore

                    handleChange("asset", e);
                  }}
                  className={styles.customSelector}
                  optionKey="key"
                  options={data[0].categories.map((c) => {
                    return {
                      key: c,
                      value: c,
                    };
                  })}
                />
              </div>
            </div>
            <div className={styles.graph}>
              <img src="/assets/images/ib/Vector.png" alt="Graph" />
              <div
                className={`${styles.revenueMeter} ${getClassForValue(total)}`}
              >
                <div className={styles.indicWrap}>
                  <div className={styles.revenue}>
                    <div>Monthly revenue will be</div>
                    <div>{total.toFixed(2)}</div>
                  </div>
                  <div className={styles.bulb}></div>
                  <div className={styles.line}>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ImIn}>
          <h2>Are you ready to earn?</h2>
          <div className={styles.bigIn}>
            <h3>I'm In</h3>
            <Button
              onClick={() => {
                nav(token ? routers.overview : routers.signup);
              }}
              theme="neon"
            >
              Yes Im in
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.blurred}></div>
      <div className={styles.ellipse}>
        <Ellipse />
      </div>
    </div>
  );
};

export default ProfitCalculator;
