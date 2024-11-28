import React, { useEffect, useState } from "react";
import styles from "./SectionOne.module.scss";
import FInanceWrapper from "../FinanceWrapper/FInanceWrapper";
import SelectInput, {
  ISelect,
} from "../../../common/Components/SelectInput/SelectInput";
import { CoinTypes } from "../../../constants/values";
import Button from "../../../common/Components/Button/Button";
import TextInput from "../../../common/Components/TextInput/TextInput";
import NumOnlyInput from "../../../common/Components/NumOnlyInput/NumOnlyInput";
import useCustomForm from "../../../hooks/useForms";
import useToast from "../../../hooks/useToast";
import useMutate from "../../../hooks/useMutate";
import {
  generateToken,
  getTokenInfo,
  transer,
} from "../../../services/finance";
import useApi from "../../../hooks/useAPI";
import CustomDoughnutChart from "../../../common/Components/MultiDoughNut/MultiDoughNut";

const SectionOne = ({ onReload }: { onReload: () => void }) => {
  const [dataValues, setDataValues] = useState([50, 60, 70, 80]); // Example data values

  const [gradients, setGradients] = useState({
    gradient1: ["#2C0CC6", "rgba(174, 38, 169, 0.5)"],
    gradient2: ["rgba(18, 2, 242, 1)", "rgba(208, 46, 146, 0.5)"],
    gradient3: ["rgba(220, 48, 138, 1)", "rgba(117, 24, 205, 1)"],
    gradient4: ["rgba(127, 23, 224, 1)", "rgba(127, 23, 224, 0.5)"],
  });

  const [coinType, setCoinType] = useState<ISelect>();
  const [genAmt, setGenAmt] = useState<number | null>();
  const {
    values: formState,
    handleChange,
    handleSubmit,
    resetForm,
    isValid,
  } = useCustomForm<{
    Passcode: "";
    amount: number | null;
    to_account_number: string;
  }>({
    initialValues: {
      Passcode: "",
      amount: null,
      to_account_number: "",
    },
    validators: {
      Passcode: { required: "Enter Passcode" },
      amount: { required: "Enter Amount" },
      to_account_number: { required: "Enter Account Number" },
    },
    onSubmit: (e, v) => {
      transferAPI({ ...e, token_type: coinType?.value });
    },
  });

  const { triggerToast } = useToast();

  const { loading: mutateLoading, executeApi: genTokenAPI } = useMutate(
    generateToken,
    {
      onComplete: (e) => {
        console.log(e);
        triggerToast(e.data, "success");
        executeApi();
        setGenAmt(null);
        onReload();
        // route(-1);
      },
      onError: (errorMessage) => {
        triggerToast(errorMessage, "error");
      },
    }
  );

  const { loading: isTransferLoading, executeApi: transferAPI } = useMutate(
    transer,
    {
      onComplete: (e) => {
        triggerToast(e.message, "success");
        executeApi();
        onReload();
        resetForm();
      },
      onError: (errorMessage) => {
        triggerToast(errorMessage, "error");
      },
    }
  );

  const { executeApi, loading, data, error } = useApi(getTokenInfo, {});

  useEffect(() => {
    executeApi();
  }, []);

  const tokenInfo = data?.data;
  useEffect(() => {
    if (tokenInfo) {
      const totalValue =
        tokenInfo.total_excoin_created +
        tokenInfo.total_dextoken_created +
        tokenInfo.current_excoin_balance +
        tokenInfo.current_dextoken_balance;

      // Step 2: Calculate the percentage for each item
      const percentages = {
        total_excoin_created_percentage:
          (tokenInfo.total_excoin_created / totalValue) * 100,
        total_dextoken_created_percentage:
          (tokenInfo.total_dextoken_created / totalValue) * 100,
        current_excoin_balance_percentage:
          (tokenInfo.current_excoin_balance / totalValue) * 100,
        current_dextoken_balance_percentage:
          (tokenInfo.current_dextoken_balance / totalValue) * 100,
      };
      setDataValues([
        percentages.total_excoin_created_percentage,
        percentages.total_dextoken_created_percentage,
        percentages.current_excoin_balance_percentage,
        percentages.current_dextoken_balance_percentage,
      ]);
    }
  }, [tokenInfo]);

  return (
    <FInanceWrapper>
      <div className={styles.container}>
        <div className={styles.left}>
          <div>
            <div className={styles.label}>Generate token</div>
            <SelectInput
              labelKey="name"
              value={coinType}
              onChange={(e) => {
                //@ts-ignore
                setCoinType(e);
              }}
              options={CoinTypes}
            />
          </div>
          <div className={styles.coinGenWrap}>
            <div className={styles.label}>Amount</div>
            <div className={styles.coinGen}>
              <input
                value={genAmt || ""}
                onChange={(e) => {
                  console.log("--");
                  const re = /^[0-9\b]+(\.[0-9]*)?$/; // Updated regex to allow numbers with decimal points
                  const value = e.target.value;
                  if (value === "" || re.test(value)) {
                    setGenAmt(Number(value)); // Store the value as a string to preserve the decimal point input
                  } else {
                    e.preventDefault();
                    e.target.value = ""; // Clear the input if the entered value doesn't match the regex
                  }
                }}
              />
              <Button
                onClick={() => {
                  genTokenAPI({
                    token_type: coinType?.value,
                    token_amount: genAmt,
                  });
                }}
                theme="danger"
                disabled={mutateLoading || !coinType || !genAmt}
              >
                Generate
              </Button>
            </div>
          </div>

          <div className={styles.forms}>
            <div className={styles.label}>Transfer</div>
            <NumOnlyInput
               value={formState.amount as number}
              onChange={(e) => {
                handleChange("amount", Number(e.target.value));
              }}
              className={styles.frmFld}
              placeholder="Amount USD"
            />
            <TextInput
              value={formState.to_account_number}
              onChange={(e) => {
                handleChange("to_account_number", e.target.value);
              }}
              className={styles.frmFld}
              placeholder="Account"
            />
            <TextInput
            value={formState.Passcode}
              onChange={(e) => {
                handleChange("Passcode", e.target.value);
              }}
              className={styles.frmFld}
              placeholder="Transaction Pascode"
            />
            <Button
              onClick={handleSubmit}
              disabled={!isValid || !coinType || isTransferLoading}
              theme="neon"
            >
              Transfer
            </Button>
          </div>
        </div>
        <div>
          <div className={styles.coinSignleWrap}>
            <div className={styles.coinWrap}>
              <div className={styles.coinName}>Ex Coin Total Created</div>
              <div className={styles.count}>
                {tokenInfo?.total_excoin_created}
              </div>
              <div className={styles.bar}></div>
            </div>
            <div className={styles.coinWrap}>
              <div className={styles.coinName}>Dex Token Total Created</div>
              <div className={styles.count}>
                {tokenInfo?.total_dextoken_created}
              </div>
              <div className={styles.bar}></div>
            </div>
            <div className={styles.coinWrap}>
              <div className={styles.coinName}>Ex Coin Balance</div>
              <div className={styles.count}>
                {tokenInfo?.current_excoin_balance}
              </div>
              <div className={styles.bar}></div>
            </div>
            <div className={styles.coinWrap}>
              <div className={styles.coinName}>Dex Token Balance</div>
              <div className={styles.count}>
                {tokenInfo?.current_dextoken_balance}
              </div>
              <div className={styles.bar}></div>
            </div>
          </div>
        </div>
        <div className={styles.chart}>
          <CustomDoughnutChart
            dataValues={dataValues}
            gradients={gradients}
            cutout="30%"
          />
        </div>
      </div>
    </FInanceWrapper>
  );
};

export default SectionOne;
