import { useEffect, useState } from "react";
import classes from "./Checkout.module.scss";
import CheckoutCard from "./components/CheckoutCard/CheckoutCard";
import Button from "../../../common/Components/Button/Button";
import { getSelectedPlan } from "../../../services/plan";
import Loading from "../../../common/UI/Loading/Loading";
import PageAnimation from "../../../common/Components/PageAnimation/PageAnimation";
import { useNavigate, useParams } from "react-router-dom";
import {
  makePayment,
  getBalance,
  verifyCoupon,
} from "../../../services/payment";
import { hideToastById, showToast } from "../../../store/toastSlice";
import { useDispatch } from "react-redux";
import NoData from "../../../common/Components/NoData/NoData";
import { setPlanStatus, setTriggerGetPlan } from "../../../store/authSlice";
import { getUserPlanStatus } from "../../../services/user";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [btnText, setBtnText] = useState<string>("CONFIRM & PAY");
  const [applyBtnText, setApplyBtnText] = useState<string>("Apply");

  const [couponCode, setCouponCode] = useState("");
  const [couponSelected, setCouponSelected] = useState<any>([]);
  const [applyDexToken, setApplyDexToken] = useState<boolean>(false);
  const [dexTokenApplicable, setDexTokenApplicable] = useState<number>(0);
  const [balance, setBalance] = useState<any>({
    dexToken: 0,
    exCoin: 0,
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchPlan = async () => {
      setLoading(true);
      try {
        const response = await getSelectedPlan(id + "");
        if (response.status) {
          setData(response.data[0] ? response.data[0] : {});
        }
      } catch (err) {
        // setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
    getBalanceMethod();
  }, [id]);

  useEffect(() => {
    if (data["checkout_details"]) {
      setDexTokenApplicable(
        balance.dexToken > data["checkout_details"]["total_price"] * 0.5
          ? data["checkout_details"]["total_price"] * 0.5
          : balance.dexToken
      );
    }
  }, [data]);

  const getPlanStatus = async () => {
    try {
      const response = await getUserPlanStatus();
      if (response.status) {
        dispatch(setPlanStatus(response.data));
      }
    } catch (err: any) {
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
    }
  };

  const makePaymentMethod = async () => {
    setBtnText("Confirming...");
    dispatch(
      showToast({
        message: "Confirming payment, please wait...",
        type: "warning",
        timeout: 25000,
        id: 10,
      })
    );
    try {
      let items = [];
      if (data["checkout_details"]) {
        items = data["checkout_details"].items.map((item: any) => {
          return {
            type: item.type,
            status: item.type == "NFT" ? item.id : true,
          };
        });
      }
      let payloadData = {
        referral_code: couponCode,
        dex_token_amount: applyDexToken ? dexTokenApplicable : 0,
        items: items,
      };

      const response = await makePayment(data.id + "", payloadData);
      if (response.status) {
        getPlanStatus();
        dispatch(setTriggerGetPlan(true));
        setTimeout(() => {
          dispatch(setTriggerGetPlan(false));
        }, 100);
        navigate(`/payment-status/success/${data.id}`);
      }
      dispatch(hideToastById(10));
      dispatch(
        showToast({
          message: response.message,
          type: "success",
          timeout: 5000,
        })
      );
    } catch (err: any) {
      dispatch(hideToastById(10));
      dispatch(
        showToast({
          message: err.response.data.error,
          type: "error",
          timeout: 5000,
        })
      );
      navigate(`/payment-status/error/${data.id}`);
    } finally {
      setBtnText("CONFIRM & PAY");
    }
  };

  const getBalanceMethod = async () => {
    try {
      const response = await getBalance();
      if (response.status) {
        console.log(response);
        if (response.data.balances) {
          setBalance({
            dexToken: response.data.balances.dex_token,
            exCoin: response.data.balances.ex_coin,
          });
        }
      }
    } catch (err: any) {
    } finally {
    }
  };

  const handleCoupon = (event: any) => {
    setCouponCode(event.target.value);
  };

  const handleRemoveItem = (itemToRemove: any) => {
    const newItems = data.checkout_details.items.filter(
      (item: any) => item !== itemToRemove
    );
    const newTotalPrice = newItems.reduce(
      (acc: any, item: any) => acc + item.price,
      0
    );

    setData({
      ...data,
      checkout_details: {
        ...data.checkout_details,
        items: newItems,
        total_price: newTotalPrice,
      },
    });
  };

  const removeCoupon = (i: number) => {
    const updatedCouponArr = couponSelected.filter(
      (_: any, index: number) => index !== i
    );
    setCouponSelected(updatedCouponArr);
  };

  const applyCoupon = async () => {
    if (applyBtnText != "Apply") {
      return;
    }
    try {
      const data = {
        code: couponCode,
      };
      dispatch(
        showToast({
          message: "Verifying coupon...",
          type: "warning",
          timeout: 25000,
          id: 10,
        })
      );
      setApplyBtnText("Applying...");
      const response = await verifyCoupon(data);
      if (response.status) {
        dispatch(hideToastById(10));
        dispatch(
          showToast({
            message: response.message,
            type: "success",
            timeout: 5000,
          })
        );
        setCouponSelected((state: any) => [...state, couponCode]);
        setCouponCode("");
      }
    } catch (err: any) {
      dispatch(hideToastById(10));
      dispatch(
        showToast({
          message: err.response.data.error,
          type: "error",
          timeout: 5000,
        })
      );
    } finally {
      setApplyBtnText("Apply");
    }
  };

  const applyToken = () => {
    setApplyDexToken((state) => !state);
  };

  return (
    <>
      {loading && (
        <PageAnimation>
          <Loading />
        </PageAnimation>
      )}
      {!loading && !data["checkout_details"] && (
        <PageAnimation>
          <NoData title="No Data" description="" />
        </PageAnimation>
      )}
      {!loading && data["checkout_details"] && (
        <PageAnimation>
          <div className={classes.checkboxOuter}>
            <div className={classes.checkboxInner}>
              <div className={classes.count}>
                {data["checkout_details"].items.length} items in Cart
              </div>
              <div className={classes.innerWrap}>
                <div className={classes.left}>
                  <div className={classes.cartItems}>
                    {data["checkout_details"].items.map(
                      (item: any, index: number) => (
                        <div className={classes.cartItem} key={index}>
                          <CheckoutCard
                            details={item}
                            removeItem={handleRemoveItem}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className={classes.right}>
                  <div className={classes.summary}>
                    <div className={`${classes.sumBox} ${classes.mobHide}`}>
                      <div className={classes.sumHead}>Order Summary</div>
                      <div className={classes.priceBox}>
                        <div className={`${classes.price}`}>
                          ${data["checkout_details"]["total_price"]}
                        </div>
                        <div className={classes.priceLabels}>
                          <div className={classes.lab}>Total price</div>
                          <div
                            className={`${classes.exBal} ${
                              applyDexToken
                                ? data["checkout_details"]["total_price"] >
                                  balance.exCoin + dexTokenApplicable
                                  ? classes.warning
                                  : ""
                                : data["checkout_details"]["total_price"] >
                                  balance.exCoin
                                ? classes.warning
                                : ""
                            }`}
                          >
                            ${balance.exCoin} Available EXCoin
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${classes.priceWrapper} ${classes.mobShow}`}
                    >
                      <div className={`${classes.priceBox}`}>
                        <div className={classes.priceLabel}>Total Price:</div>
                        <div className={classes.priceValues}>
                          <div className={classes.priceVal}>
                            ${data["checkout_details"]["total_price"]}
                          </div>
                        </div>
                      </div>
                      <div className={classes.exBal}>
                        ${balance.exCoin} Available EXCoin
                      </div>
                    </div>
                    <div className={classes.referralBox}>
                      <div className={classes.sumHead}>Reffreral Code</div>
                      {couponSelected.map((item: any, index: number) => (
                        <div className={classes.couponWrap} key={index}>
                          <span>{item}</span> is applied
                          <img
                            src="/assets/images/closegreen.png"
                            alt="close"
                            onClick={() => {
                              removeCoupon(index);
                            }}
                          />
                        </div>
                      ))}

                      <div className={classes.couponBox}>
                        <input
                          type="text"
                          placeholder="Enter Coupon Code"
                          value={couponCode}
                          onChange={handleCoupon}
                        />
                        <div className={classes.apply} onClick={applyCoupon}>
                          {applyBtnText}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.dexWrap}>
                    <div className={`${classes.dexHead} ${classes.mobHide}`}>
                      Pay DEXToken
                    </div>
                    <div className={classes.dexBox}>
                      <div className={classes.dexSubHead}>
                        Available DEXTOKEN
                      </div>
                      <div className={classes.coin}>
                        <img src="/assets/images/coin.png" alt="coin" />{" "}
                        {dexTokenApplicable}
                      </div>
                      <div className={classes.dexDes}>
                        You have total{" "}
                        {applyDexToken
                          ? balance.dexToken - dexTokenApplicable
                          : balance.dexToken}{" "}
                        points available. Use your points and enjoy more
                        reductions
                      </div>
                      <div className={classes.btnWrap}>
                        <Button
                          type="full"
                          onClick={applyToken}
                          disabled={!balance.dexToken}
                        >
                          <div
                            className={`${classes.dexBtn} ${
                              applyDexToken && classes.dexBtnApplied
                            }`}
                          >
                            {applyDexToken
                              ? `Applied ${dexTokenApplicable}`
                              : "Apply DEXToken"}
                          </div>
                        </Button>
                      </div>
                    </div>
                    <div
                      className={`${classes.privacyTerms} ${classes.mobShow}`}
                    >
                      By placing your order, you agree to our Company{" "}
                      <a href="#">Privacy Policy</a> and{" "}
                      <a href="#">Terms & Conditions</a>
                    </div>
                    <div className={classes.btnWrapConfirm}>
                      <Button
                        type="full"
                        disabled={
                          btnText != "CONFIRM & PAY" ||
                          !data["checkout_details"].items.length
                        }
                        onClick={makePaymentMethod}
                      >
                        <div className={classes.confirmBtn}>{btnText}</div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className={classes.count}>
                {data["checkout_details"].items.length} items saved for later
              </div> */}
              {/* <div className={classes.innerWrap}>
                <div className={classes.left}>
                  <div className={classes.cartItems}>
                    {data["checkout_details"].items.map(
                      (item: any, index: number) => (
                        <div className={classes.cartItem} key={index}>
                          <CheckoutCard
                            details={item}
                            saveForLater={true}
                            removeItem={handleRemoveItem}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div> */}
              <div className={`${classes.privacyTerms} ${classes.mobHide}`}>
                By placing your order, you agree to our Company{" "}
                <a href="#">Privacy Policy</a> and{" "}
                <a href="#">Terms & Conditions</a>
              </div>
            </div>
          </div>
        </PageAnimation>
      )}
    </>
  );
};

export default Checkout;
