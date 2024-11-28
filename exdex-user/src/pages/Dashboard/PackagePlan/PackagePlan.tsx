import { useEffect, useState, useRef } from "react";
import { RootState } from "../../../store";
import { getSelectedPackage } from "../../../store/packageSlice";
import classes from "./PackagePlan.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PageAnimation from "../../../common/Components/PageAnimation/PageAnimation";

import Toggle from "../../../common/Components/Toggle/Toggle";
import NumberInput from "../../../common/Components/NumberInput/NumberInput";
import Checkbox from "../../../common/Components/Checkbox/Checkbox";
import ProgressBar from "../../../common/Components/ProgressBar/ProgressBar";
import SignalCard from "../../../common/Components/SignalCard/SignalCard";
import Button from "../../../common/Components/Button/Button";
import Signature from "../../../common/Components/Signature/Signature";
import SignaturePad from "react-signature-pad-wrapper";
import { IMAGE_URL } from "../../../config";
import {
  getPlanConfig,
  saveSignature,
  savePlan,
  getPlanNFTStatus,
  getPlanNFTPrice,
} from "../../../services/plan";
import { hideToastById, showToast } from "../../../store/toastSlice";
import NFT from "./components/NFT/NFT";
import PriceDiscount from "../../../common/Components/PriceDiscout/PriceDiscount";
import Customize from "./components/Customize/Customize";
import { routers } from "../../../common/Constants";

const PackagePlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [customize, setCustomize] = useState(false);
  const [signal, setSignal] = useState(false);
  const [dexGem, setDexGem] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [planRange, setPlanRange] = useState({ min: 0, max: 0 });
  const [planMonths, setPlanMonths] = useState<any>([]);
  const [selectedMonth, setSelectedMonth] = useState<any>(0);
  const [loading, setLoading] = useState(true);

  const signatureRef = useRef<SignaturePad>(null);
  const [packageDetails, setPackageDetails] = useState<any>({});
  const [checked, setChecked] = useState(false);
  const [btnText, setBtnText] = useState("Proceed to checkout");
  const [aiSignalDuration, setAiSignalDuration] = useState("monthly");
  const [options, setOptions] = useState<any>([]);
  const [markets, setMarkets] = useState<any>();
  const [tradeMarkets, setTradeMarkets] = useState<any>();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [tradeSize, setTradeSize] = useState<any>({});
  const [selectedNft, setSelectedNft] = useState<any>(0);
  const [hideNFT, setHideNFT] = useState<any>(false);
  const [NFTPrice, setNFTPrice] = useState<any>({});

  useEffect(() => {
    console.log(signatureRef.current);
  }, [signatureRef.current]);

  const selectedPackage = useSelector((state: RootState) =>
    getSelectedPackage(state.package)
  );

  const handleClearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setChecked(false);
    }
  };

  const signatureImage = async (user_plan_id: any) => {
    if (signatureRef.current) {
      const png = signatureRef.current.toDataURL();
      const blob = dataURLToBlob(png);
      const formData = new FormData();
      formData.append("signature", blob);
      try {
        const response = await saveSignature(id + "", formData);
        if (response.status) {
          setBtnText("Proceed to checkout");
          dispatch(hideToastById(10));
          dispatch(
            showToast({
              message: response.message,
              type: "success",
              timeout: 5000,
            })
          );
          navigate(`/checkout/autotrade/${user_plan_id}`);
        }
      } catch (err) {
        console.log(err);
        setBtnText("Proceed to checkout");
        dispatch(hideToastById(10));
      } finally {
        setBtnText("Proceed to checkout");
        dispatch(hideToastById(10));
        setLoading(false);
      }
    }
  };

  const handleAgree = () => {
    if (signatureRef.current) {
      if (signatureRef.current.isEmpty() && !checked) {
        return;
      }
    }
    setChecked((prevState) => !prevState);
  };

  const dataURLToBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  useEffect(() => {
    if (selectedPackage.minimum) {
      setPackageDetails(selectedPackage);
    }
  }, [selectedPackage]);

  useEffect(() => {
    if (packageDetails.minimum) {
      setPlanRange({
        min: convertToNumber(packageDetails.minimum),
        max: convertToNumber(packageDetails.maximum),
      });
      setTotalAmount(convertToNumber(packageDetails.minimum));
      const activeMonths = packageDetails.duration
        .filter((item: any) => item.active)
        .map((item: any) => parseInt(item.value) * 12);

      if (activeMonths.length) {
        setSelectedMonth(activeMonths[0]);
        setPlanMonths(activeMonths);
      }
    }
  }, [packageDetails]);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    if (id) {
      fetchNFTStatus(id);
      fetchNFTPrice(id);
      fetchConfig(id);
    } else {
      navigate("/");
    }
  }, [id]);

  const fetchNFTStatus = async (routeid: string) => {
    try {
      const response = await getPlanNFTStatus(routeid);
      if (response.status) {
        setHideNFT(response.data.plan_status);
      }
    } catch (err) {
      // setError(err);
    } finally {
    }
  };

  const fetchNFTPrice = async (routeid: string) => {
    try {
      const response = await getPlanNFTPrice(routeid);
      if (response.status) {
        if (response.data && response.data[0]) {
          setNFTPrice(response.data[0]);
        }
      }
    } catch (err) {
      // setError(err);
    } finally {
    }
  };

  const fetchConfig = async (routeid: string) => {
    try {
      const response = await getPlanConfig(routeid);
      if (response.status) {
        if (response.data.plan_config && response.data.plan_config.config) {
          if (response.data.plan_config.config.trade_markets) {
            const keys = Object.keys(
              response.data.plan_config.config.trade_markets
            );
            const marketArray = keys.map((item: any) => {
              return {
                label: item,
                key: item,
                checked: false,
                disabled: response.data.plan_config.config.trade_markets[item],
              };
            });
            setMarkets(marketArray);
          }
          if (response.data.plan_config.config.trade_strategies) {
            const marketArray =
              response.data.plan_config.config.trade_strategies.map(
                (item: any) => {
                  return { label: item, key: item, checked: false };
                }
              );
            setOptions(marketArray);
          }
          if (response.data.plan_config.config.custom_methods) {
            const customArray =
              response.data.plan_config.config.custom_methods.map(
                (item: any) => {
                  return { label: item, key: item, checked: false };
                }
              );
            setTradeMarkets(customArray);
          }
          if (response.data.plan_config.config.settings) {
            setTradeSize(response.data.plan_config.config.settings);
          }
        }
        if (response.data.plan) {
          setPackageDetails(response.data.plan);
        }
      }
    } catch (err) {
      // setError(err);
    } finally {
    }
  };

  const convertToNumber = (str: string) => {
    try {
      return parseInt(str.replace(/,/g, ""), 10);
    } catch (e) {
      return parseInt(str, 10);
    }
  };

  const toggleHandler = (val: boolean, type: string) => {
    if (type == "customize") {
      setCustomize(val);
    } else if (type == "signal") {
      setSignal(val);
    } else if (type == "dexgem") {
      setDexGem(val);
    }
  };

  const confirmPay = async () => {
    setBtnText("Confirming...");
    dispatch(
      showToast({
        message: "Confirming...",
        type: "warning",
        timeout: 25000,
        id: 10,
      })
    );
    let optionsObject: any = {};
    let marketsObject: any = {};
    let customObject: any = {};

    options.forEach((item: any) => {
      optionsObject[item.label] = item.checked;
    });
    markets.forEach((item: any) => {
      marketsObject[item.label] = item.checked;
    });
    tradeMarkets.forEach((item: any) => {
      customObject[item.label] = item.checked;
    });

    const data = {
      settings: tradeSize,
      trade_strategies: optionsObject,
      trade_markets: marketsObject,
      amount_in_usd: totalAmount,
      participation_duration: selectedMonth,
      dex_gem: dexGem,
      ai_signal: signal,
      customize: customize,
      ai_signal_plan_type: aiSignalDuration,
      dex_gem_plan_type: "lifetime",
      nft_selected: selectedNft,
      default_setting: !customize,
      custom_methods: customObject,
    };

    try {
      const response = await savePlan(id + "", data);
      if (response.status) {
        // dispatch(setSelectedPackage(data));
        signatureImage(response.data.user_plan_id);
      }
    } catch (err: any) {
      console.log(err);
      dispatch(hideToastById(10));
      setBtnText("Proceed to checkout");
      try {
        if (err.response.data.error) {
          dispatch(
            showToast({
              message: err.response.data.error,
              type: "error",
              timeout: 5000,
            })
          );
        }
      } catch (e) {
        console.log(e);
      }
    } finally {
      // setBtnText("Confirm & Pay");
      setLoading(false);
    }
  };

  const handleChange = (key: string) => {
    console.log(key);
    setAiSignalDuration(key);
  };

  const handleCustomizeUpdate = (
    trade: any,
    market: any,
    option: any,
    tradeMarket: any
  ) => {
    setOptions(option);
    setMarkets(market);
    setTradeSize(trade);
    setTradeMarkets(tradeMarket);
  };

  return (
    <PageAnimation left={true}>
      <div className={classes.planOuter}>
        <div className={classes.planInner}>
          <div className={classes.planTop}>
            <div className={classes.imgName}>
              <div className={classes.imgNameWrap}>
                {packageDetails.logo && (
                  <img
                    src={`${IMAGE_URL}/logos/${packageDetails.logo}`}
                    alt={packageDetails.collection}
                  />
                )}
                <span className={classes.name}>
                  {packageDetails.collection}
                </span>
              </div>
              <span className={classes.des}>Auto Pilot Advanced Settings.</span>
            </div>
          </div>
          {!hideNFT && (
            <div className={classes.nftSlider}>
              <div className={classes.sectionHead}>
                Choose Your NFT
                <div className={classes.headItem}>
                  <PriceDiscount
                    price={NFTPrice.Price}
                    discount={NFTPrice.OfferPrice}
                    unit="$"
                  />
                </div>
              </div>
              <NFT
                id={id + ""}
                updateNft={(item) => {
                  setSelectedNft(item.id);
                }}
              />
            </div>
          )}

          <div className={classes.bottomWrapper}>
            <div className={classes.section}>
              <div className={classes.sectionTop}>
                <div className={classes.sectionHead}>
                  {/* {customize && "Minimum Trade Size"} */}
                </div>
                <div className={classes.sectionToggle}>
                  <span>{customize ? "Default settings" : "Customize"}</span>
                  <Toggle
                    value={customize}
                    toggleSwitch={(val) => {
                      toggleHandler(val, "customize");
                    }}
                  />
                </div>
              </div>
              {customize && (
                <Customize
                  tradeMarketsArr={tradeMarkets}
                  marketsArr={markets}
                  optionsArr={options}
                  tradeSizeMar={tradeSize}
                  update={handleCustomizeUpdate}
                />
              )}
            </div>
            <div className={`${classes.section} ${classes.sectionMobWrap}`}>
              <div className={`${classes.sectionHead} ${classes.sectionHead2}`}>
                Participation Duration
              </div>
              <div className={classes.depositSection}>
                <div className={classes.depositTop}>
                  <div
                    className={`${classes.depositSectionLeft} ${classes.depositSectionLeftSmall}`}
                  >
                    <div className={classes.coinSection}>
                      <div className={classes.coinInput}>
                        <NumberInput
                          label=""
                          type="number"
                          value={selectedMonth}
                          unit="Months"
                          theme="white"
                          step={12}
                          updated={(val: any) => {
                            if (
                              planMonths.length &&
                              parseInt(val) >= planMonths[0] &&
                              parseInt(val) <= planMonths[planMonths.length - 1]
                            ) {
                              setSelectedMonth(parseInt(val));
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${classes.depositSectionRight} ${classes.depositSectionRight2}`}
                  >
                    <div className={classes.totamount}>{selectedMonth}</div>
                    <ProgressBar
                      range={
                        planMonths.length
                          ? {
                              min: "> " + planMonths[0] + "",
                              max:
                                "of " +
                                planMonths[planMonths.length - 1] +
                                " months",
                            }
                          : {
                              min: "",
                              max: "",
                            }
                      }
                      percentage={
                        selectedMonth
                          ? (planMonths.indexOf(selectedMonth) +
                              1 / planMonths.length) *
                            100
                          : 0
                      }
                      backgroundColor="var(--btn-color)"
                      barColor="var(--color-orange)"
                      barBorder={4}
                      showPercent={false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${classes.section} ${classes.sectionMobWrap}`}>
              <div className={`${classes.sectionHead} ${classes.sectionHead2}`}>
                Participation Amount
              </div>
              <div className={classes.depositSection}>
                <div className={classes.depositTop}>
                  <div
                    className={`${classes.depositSectionLeft} ${classes.depositSectionLeftSmall}`}
                  >
                    <div className={classes.coinSection}>
                      <div className={classes.coinInput}>
                        <NumberInput
                          label=""
                          type="number"
                          value={totalAmount}
                          unit="USD"
                          theme="white"
                          step={500}
                          updated={(val: any) => {
                            let newVal = parseInt(val, 10);
                            if (newVal > planRange.max) {
                              newVal = planRange.max;
                            }

                            setTotalAmount(newVal);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${classes.depositSectionRight} ${classes.depositSectionRight2}`}
                  >
                    <div className={classes.totamount}>{totalAmount}</div>
                    <ProgressBar
                      range={{
                        min: "> " + planRange.min + "",
                        max: planRange.max + " USD <",
                      }}
                      percentage={
                        planRange.max && totalAmount
                          ? ((totalAmount - planRange.min) /
                              (planRange.max - planRange.min)) *
                            100
                          : 0
                      }
                      backgroundColor="var(--btn-color)"
                      barColor="var(--color-orange)"
                      barBorder={4}
                      showPercent={false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.section}>
              <div className={classes.sectionTop}>
                <div className={classes.sectionHead}>Terms & conditions</div>
              </div>
              <div className={classes.termSig}>
                <div className={classes.termsWrap}>
                  <div className={classes.termsContent}>
                    <div className={classes.termsTop}>
                      Last Updated: 25/09/2024
                    </div>
                    <div className={classes.termsBottom}>
                      Welcome to ExDex.com! These Terms and Conditions ("Terms")
                      govern your use of ExDex.com ("Platform"), an all-in-one
                      trading platform that enables users to trade
                      cryptocurrencies, forex, and other markets. The Platform
                      also provides AI-based trading signals, automated
                      investments through trading bots, and educational
                      resources on trading. By accessing or using the Platform,
                      you agree to be bound by these Terms. If you do not agree
                      to these Terms, please do not use the Platform.{" "}
                      <span>
                        <Button
                          theme="light"
                          onClick={() => {
                            window.open(routers.termsOfService, "_blank");
                          }}
                        >
                          <div className={classes.readBtn}>Read more</div>
                        </Button>
                      </span>
                    </div>
                  </div>
                </div>
                <div className={classes.section}>
                  <div className={classes.signatureOuter}>
                    <div className={classes.signatureWrap}>
                      <div className={classes.signatureInnerWrap}>
                        <Signature
                          ref={signatureRef}
                          width={innerWidth > 900 ? 380 : innerWidth}
                          height={100}
                          options={{
                            backgroundColor: "rgba(174, 229, 209, 1)",
                            penColor: "rgba(31, 69, 79, 1)",
                            minWidth: 3,
                            maxWidth: 5,
                          }}
                        />
                      </div>
                      <div className={classes.signatureBtns}>
                        <div className={classes.signBtn}>
                          <Button
                            theme="light"
                            type="full"
                            onClick={() => {
                              navigate(`/autotrade`);
                            }}
                          >
                            <div className={classes.signButton}>Cancel</div>
                          </Button>
                        </div>
                        <div className={classes.signBtn}>
                          <Button
                            theme="light"
                            type="full"
                            onClick={handleClearSignature}
                          >
                            <div className={classes.signButton}>
                              Clear Signature
                            </div>
                          </Button>
                        </div>
                        <div className={classes.signBtn} onClick={handleAgree}>
                          <Button theme="light" type="full">
                            <div
                              className={`${classes.signButton} ${
                                classes.agreeBtn
                              } ${checked && classes.checked}`}
                            >
                              I Agree
                            </div>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={classes.section}>
              <div className={classes.sectionTop}>
                <div className={classes.sectionHead}>
                  {signal && "AI Powered Signal"}
                </div>
                <div className={classes.sectionToggle}>
                  <span className={classes.discountPercent}>
                    (Special Offer 30% discount)
                  </span>
                  {!signal && (
                    <span className={classes.sigToggleLabel}>AI Signal</span>
                  )}
                  <Toggle
                    value={false}
                    toggleSwitch={(val) => {
                      toggleHandler(val, "signal");
                    }}
                  />
                </div>
              </div>
              {signal && (
                <div className={classes.signalHeader}>
                  <div className={classes.signalHead}>
                    High-Accuracy Financial Market Signals
                  </div>
                  <div className={classes.signalDes}>
                    Harnessing Advanced AI to Deliver Precise Trading Signals
                    Across Global Financial Markets
                  </div>
                </div>
              )}

              {signal && (
                <div className={classes.signalPackage}>
                  <div className={classes.sectionHead}>
                    Subscribtion Duration
                  </div>
                  <div className={classes.signalPackages}>
                    <div
                      className={classes.signalPackageItems}
                      onClick={() => {
                        handleChange("monthly");
                      }}
                    >
                      <Checkbox
                        responsive="invertBox"
                        label={"Monthly"}
                        checked={aiSignalDuration == "monthly"}
                        theme="darkCheck"
                        onChange={() => {}}
                      />
                      <div className={classes.priceVal}>
                        <PriceDiscount price="99" discount="199" unit="$" />
                      </div>
                    </div>
                    <div
                      className={classes.signalPackageItems}
                      onClick={() => {
                        handleChange("yearly");
                      }}
                    >
                      <Checkbox
                        responsive="invertBox"
                        label={"Yearly"}
                        checked={aiSignalDuration == "yearly"}
                        theme="darkCheck"
                        onChange={() => {}}
                      />
                      <div className={classes.priceVal}>
                        <PriceDiscount price="690" discount="999" unit="$" />
                      </div>
                    </div>
                    <div
                      className={classes.signalPackageItems}
                      onClick={() => {
                        handleChange("lifetime");
                      }}
                    >
                      <Checkbox
                        responsive="invertBox"
                        label={"Life Time"}
                        checked={aiSignalDuration == "lifetime"}
                        theme="darkCheck"
                        onChange={() => {}}
                      />
                      <div className={classes.priceVal}>
                        <PriceDiscount price="6900" discount="9,999" unit="$" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {signal && (
                <div className={classes.signalWrap}>
                  <div className={classes.signalItem}>
                    <SignalCard
                      style={{
                        backgroundImage: `url(/assets/images/signals/ai1.png)`,
                      }}
                    />
                  </div>
                  <div className={classes.signalItem}>
                    <SignalCard
                      style={{
                        backgroundImage: `url(/assets/images/signals/ai2.png)`,
                      }}
                    />
                  </div>
                  <div className={classes.signalItem}>
                    <SignalCard
                      style={{
                        backgroundImage: `url(/assets/images/signals/ai3.png)`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className={classes.section}>
              <div className={classes.sectionTop}>
                <div className={classes.sectionHead}>
                  {dexGem && "DexGem Signal"}
                </div>
                <div className={classes.sectionToggle}>
                  <span className={classes.discountPercent}>
                    (Special Offer 30% discount)
                  </span>
                  {!dexGem && (
                    <span className={classes.sigToggleLabel}>
                      DexGem Signal
                    </span>
                  )}
                  <Toggle
                    value={false}
                    toggleSwitch={(val) => {
                      toggleHandler(val, "dexgem");
                    }}
                  />
                </div>
              </div>
              {dexGem && (
                <div className={classes.signalHeader}>
                  <div className={classes.signalHead}>
                    High-Accuracy Financial Market Signals
                  </div>
                  <div className={classes.signalDes}>
                    Harnessing Advanced AI to Deliver Precise Trading Signals
                    Across Global Financial Markets
                  </div>
                </div>
              )}
              {dexGem && (
                <div className={classes.signalPackage}>
                  <div className={classes.sectionHead}>
                    Subscribtion Duration
                  </div>
                  <div
                    className={`${classes.signalPackages} ${classes.signalPackages2}`}
                  >
                    <div
                      className={classes.signalPackageItems}
                      onClick={() => {
                        handleChange("lifetime");
                      }}
                    >
                      <Checkbox
                        responsive="invertBox"
                        label={"Life Time"}
                        theme="darkCheck"
                        checked={true}
                        onChange={() => {}}
                      />
                      <div className={classes.priceVal}>
                        <PriceDiscount price="699" discount="999" unit="$" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {dexGem && (
                <div className={classes.signalWrap}>
                  <div className={classes.signalItem2}>
                    <SignalCard
                      style={{
                        backgroundImage: `url(/assets/images/signals/dex.png)`,
                      }}
                    />
                  </div>
                  <div className={classes.signalItem2}>
                    <SignalCard
                      style={{
                        backgroundImage: `url(/assets/images/signals/dex.png)`,
                      }}
                    />{" "}
                  </div>
                  <div className={classes.signalItem2}>
                    <SignalCard
                      style={{
                        backgroundImage: `url(/assets/images/signals/dex.png)`,
                      }}
                    />{" "}
                  </div>
                </div>
              )}
            </div> */}
            <div className={classes.section}>
              <div className={classes.confirmWrap}>
                <div className={classes.confirmBtn}>
                  <Button
                    disabled={!checked || btnText != "Proceed to checkout"}
                    theme="light"
                    inlineStyle={{
                      borderRadius: "30px",
                      backgroundColor: "var(--color-green)",
                    }}
                    onClick={confirmPay}
                  >
                    <div className={classes.confirmButton}>{btnText}</div>
                  </Button>
                </div>
              </div>
            </div>
            <div className={classes.warning}>
              <span>Risk warning:</span> Cryptocurrency trading is subject to
              high market risk. Please make your trades cautiously. Exdex will
              make best efforts to choose high-quality signals but will not be
              responsible for your trading losses.
            </div>
          </div>
        </div>
      </div>
    </PageAnimation>
  );
};

export default PackagePlan;
