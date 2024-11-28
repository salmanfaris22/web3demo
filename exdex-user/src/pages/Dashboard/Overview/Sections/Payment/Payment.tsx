import Button from "../../../../../common/Components/Button/Button";
import QRCodeComponent from "../../../../../common/Components/QrCode/QrCode";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import SelectCoin from "../../components/SelectCoin/SelectCoin";
import classes from "./Payment.module.scss";
import {
  getBalance,
  swap,
  getCurrency,
  createWallet,
  withdraw,
  transfer,
} from "../../../../../services/payment";
import { showToast, hideToastById } from "../../../../../store/toastSlice";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import { useDispatch } from "react-redux";
import CountdownTimer from "../../../../../common/Components/CountdownTimer/CountdownTimer";
import SearchableDropdown from "../../components/SearchableDropdown/SearchableDropdown";
import { searchUser } from "../../../../../services/user";
import { copyToClipboard } from "../../../../../utils/clipboard";
import { setCallHistory } from "../../../../../store/overviewSlice";
import SwiperCommon from "../../../../../common/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";

const PaymentSection = () => {
  const dispatch = useDispatch();
  const [balance, setBalance] = useState<any>({
    dexToken: 0,
    exCoin: 0,
  });
  const [swapEx, setSwapEx] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [networks, setNetworks] = useState([]);
  const [networksWithdraw, setNetworksWithdraw] = useState([]);
  const [depositAmount, setDepositAmount] = useState<any>("");
  const [depositCoin, setDepositCoin] = useState<any>("");
  const [depositCoinNetwork, setDepositCoinNetwork] = useState<any>("");
  const [withdrawCoin, setWithdrawCoin] = useState<any>("");
  const [withdrawCoinNetwork, setWithdrawCoinNetwork] = useState<any>("");
  const [depositAddress, setDepositAddress] = useState<any>({});
  const [withdrawAddress, setWithdrawAddress] = useState<any>("");
  const [withdrawAmount, setWithdrawAmount] = useState<any>("");
  const [transferAddress, setTransferAddress] = useState<any>("");
  const [transferAmount, setTransferAmount] = useState<any>("");
  const [counter, setCounter] = useState({ min: 0, sec: 0 });
  const [clearSearch, setClearSearch] = useState(false);
  const [clearSearchInput, setClearSearchInput] = useState(false);
  const [users, setUsers] = useState<any>([]);

  const [swapping, setSwapping] = useState(false);
  const [depositing, setDepositing] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [transferring, setTransferring] = useState(false);

  useEffect(() => {
    getBalanceMethod();
    getCurrencyMethod();
  }, []);

  const getBalanceMethod = async () => {
    try {
      const response = await getBalance();
      if (response.status) {
        if (response.data.balances) {
          setBalance({
            dexToken: response.data.balances.dex_token,
            exCoin: response.data.balances.ex_coin,
          });
        }
      }
    } catch (err) {
    } finally {
    }
  };

  const swapMethod = async () => {
    try {
      console.log(parseFloat(swapEx + ""));
      if (parseFloat(swapEx + "") < 0) {
        dispatch(
          showToast({
            message: "Invalid Ex Coin",
            type: "error",
            timeout: 5000,
          })
        );
        return;
      }
      const data = {
        from_coin: "EXCoin",
        to_coin: "DexToken",
        amount: parseFloat(swapEx + ""),
      };
      setSwapping(true);
      const response = await swap(data);
      if (response.status) {
        dispatch(
          showToast({
            message: response.data,
            type: "success",
            timeout: 5000,
          })
        );
        setSwapEx(0);
        getBalanceMethod();
      }
    } catch (err: any) {
      dispatch(
        showToast({
          message: err.response.data.error || err.message,
          type: "error",
          timeout: 5000,
        })
      );
    } finally {
      setSwapping(false);
    }
  };

  const getCurrencyMethod = async () => {
    try {
      const response = await getCurrency();
      if (response.status) {
        setCurrencies(response.data);
      }
    } catch (err) {
    } finally {
    }
  };

  const createWalletMethod = async () => {
    if (depositing || !depositAmount) {
      return;
    }
    setDepositing(true);
    try {
      const data = {
        coin: depositCoinNetwork["abbreviation"],
        amount: parseFloat(depositAmount),
      };
      const response = await createWallet(data);
      if (response.status) {
        setDepositAmount("");
        setCounter({ min: 0, sec: 0 });
        setTimeout(() => {
          setCounter({ min: 15, sec: 0 });
        }, 400);
        setDepositAddress(response.data);
        dispatch(setCallHistory(true));
        setTimeout(() => {
          dispatch(setCallHistory(false));
        }, 100);
      }
    } catch (err) {
    } finally {
      setDepositing(false);
    }
  };

  const withdrawMethod = async () => {
    if (!parseFloat(withdrawAmount)) {
      dispatch(
        showToast({
          message: "Invalid Amount",
          type: "error",
          timeout: 5000,
        })
      );
      return;
    }
    setWithdrawing(true);
    try {
      const data = {
        coin: withdrawCoin["abbreviation"],
        amount: parseFloat(withdrawAmount),
        address: withdrawAddress,
        network: withdrawCoinNetwork.abbreviation,
      };
      const response = await withdraw(data);
      if (response.status) {
        setWithdrawAddress("");
        setWithdrawAmount("");
        getBalanceMethod();
        dispatch(
          showToast({
            message: response.message,
            type: "success",
            timeout: 5000,
          })
        );
      }
    } catch (err: any) {
      dispatch(
        showToast({
          message: err.response.data.error || err.message,
          type: "error",
          timeout: 5000,
        })
      );
    } finally {
      setWithdrawing(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name == "swapEx") {
      setSwapEx(value);
    }
    if (name == "depositAmount") {
      setDepositAmount(value);
    }
    if (name == "withdrawAddress") {
      setWithdrawAddress(value);
    }
    if (name == "withdrawAmount") {
      setWithdrawAmount(value);
    }
    if (name == "transferAmount") {
      setTransferAmount(value);
    }
  };

  const selectCoin = (data: any) => {
    setDepositCoin(data);
    if (data.networks) {
      setNetworks(data.networks);
    }
  };

  const selectCoinNetwork = (data: any) => {
    setDepositCoinNetwork(data);
  };

  const selectCoinWithdraw = (data: any) => {
    setWithdrawCoin(data);
    if (data.networks) {
      setNetworksWithdraw(data.networks);
    }
  };

  const selectCoinNetworkWithdraw = (data: any) => {
    setWithdrawCoinNetwork(data);
  };

  const handleExpire = () => {
    setDepositAddress("");
  };

  const fetchSuggestions = async (searchTerm: string) => {
    try {
      if (!searchTerm.trim() || searchTerm.length < 4) {
        setClearSearch(false);
        setUsers([]);
        return;
      }
      setClearSearch(true);
      const response = await searchUser(searchTerm);
      if (response.status) {
        if (response.data.suggestions) {
          setUsers(response.data.suggestions);
        }
      }
    } catch (err) {
    } finally {
    }
  };

  const handleSelectionUpdate = async (val: any) => {
    if (val.accountNumber) {
      setTransferAddress(val.accountNumber);
      setClearSearch(true);
    }
  };

  const handleClearSearchInput = () => {
    setClearSearchInput(true);
    setClearSearch(false);
    setTransferAddress("");
    setTimeout(() => {
      setClearSearchInput(false);
    }, 400);
  };

  const transferMethod = async () => {
    setTransferring(true);
    try {
      const data = {
        to_account_number: transferAddress,
        amount: parseFloat(transferAmount),
      };
      const response = await transfer(data);
      if (response.status) {
        setTransferAddress("");
        setTransferAmount("");
        getBalanceMethod();
        dispatch(
          showToast({
            message: response.message,
            type: "success",
            timeout: 5000,
          })
        );
      }
    } catch (err: any) {
      dispatch(
        showToast({
          message: err.response.data.error || err.message,
          type: "error",
          timeout: 5000,
        })
      );
    } finally {
      setTransferring(false);
    }
  };

  const copyAddress = () => {
    if (!depositAddress || !depositAddress.address) {
      return;
    }
    copyToClipboard(depositAddress.address, dispatch, {
      successMessage: "Address copied to clipboard",
      onSuccess: () => {},
      onError: () => {},
    });
  };

  return (
    <div className={classes.paymentSection}>
      <div className={`${classes.deposit} ${classes.descktopSwiper}`}>
        <OverviewCard type="fullHeight">
          <div className={classes.cardInner}>
            <div className={classes.depositOuter}>
              <div className={classes.head}>Deposit</div>
              <div className={classes.itemHead}>Select Coin</div>
              <div className={`${classes.selector}`}>
                <SelectCoin
                  options={currencies}
                  suggestionList={currencies}
                  keyName="name"
                  suggestionKey="abbreviation"
                  updateParent={selectCoin}
                />
              </div>
            </div>
            <div className={classes.networkOuter}>
              <div className={classes.itemHead}>Select Network</div>
              <div className={`${classes.selector}`}>
                <SelectCoin
                  options={networks}
                  keyName="name"
                  suggestionKey="abbreviation"
                  updateParent={selectCoinNetwork}
                />
              </div>
              {/* <div className={classes.smallTextWrap}>
                <span>Contract addresss ending in</span>
                <span>
                  jLk6j <img src="/assets/images/arrowRight.png" alt="arrow" />
                </span>
              </div> */}
            </div>
            <div className={classes.depositOuter2}>
              <div className={classes.itemHead}>Deposit Amount</div>
              <div className={classes.selector}>
                <input
                  type="text"
                  name="depositAmount"
                  onChange={handleChange}
                  value={depositAmount}
                />
                <div
                  className={`${classes.generateBtn} ${
                    (depositing || !depositAmount) &&
                    classes.generateBtnDisabled
                  }`}
                  onClick={createWalletMethod}
                >
                  Generat{depositing ? "ing" : "e"}
                </div>
              </div>
            </div>
            <div className={classes.qrWrap}>
              <div className={classes.qrLeft}>
                <QRCodeComponent
                  value={depositAddress.address ? depositAddress.address : ""}
                />
              </div>
              <div className={classes.qrRight}>
                <div className={classes.time}>
                  <div className={classes.counterWrap}>
                    <CountdownTimer
                      initialMinutes={counter.min}
                      initialSeconds={counter.sec}
                      onExpire={handleExpire}
                    />
                  </div>
                  <span>min remaining limit</span>
                </div>
                <div className={classes.address}>
                  <div className={classes.addressDetail}>
                    <div className={classes.addLabel}>Address</div>
                    <div className={classes.addVal}>
                      {depositAddress.address}
                    </div>
                  </div>
                  <div className={classes.copy} onClick={copyAddress}>
                    <img src="/assets/images/copy.png" alt="copy" />
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.smallTextWrap}>
              <span>Minimum deposit</span>
              <span>More than 0.01 USDT</span>
            </div>
          </div>
        </OverviewCard>
      </div>
      <div className={`${classes.deposit} ${classes.descktopSwiper}`}>
        <OverviewCard type="fullHeight">
          <div className={classes.cardInner}>
            <div className={classes.depositOuter}>
              <div className={classes.head}>Withdraw</div>
              <div className={classes.itemHead}>Select Coin</div>
              <div className={`${classes.selector}`}>
                <SelectCoin
                  options={currencies}
                  keyName="name"
                  suggestionKey="abbreviation"
                  updateParent={selectCoinWithdraw}
                />
              </div>
            </div>
            <div className={classes.networkOuter}>
              <div className={classes.itemHead}>Select Network</div>
              <div className={classes.selector}>
                <input
                  type="text"
                  placeholder="Address"
                  name="withdrawAddress"
                  value={withdrawAddress}
                  onChange={handleChange}
                  className={classes.addInp}
                />
                <div className={classes.iconsInput}>
                  {withdrawAddress && (
                    <img
                      src="/assets/images/cross.png"
                      alt="cross"
                      className={classes.cursor}
                      onClick={() => {
                        setWithdrawAddress("");
                      }}
                    />
                  )}
                </div>
              </div>
              <div className={`${classes.selector}`}>
                <SelectCoin
                  options={networksWithdraw}
                  keyName="name"
                  suggestionKey="abbreviation"
                  updateParent={selectCoinNetworkWithdraw}
                />
              </div>
              {/* <div className={classes.smallTextWrap}>
                <span>Contract addresss ending in</span>
                <span>
                  jLk6j <img src="/assets/images/arrowRight.png" alt="arrow" />
                </span>
              </div> */}
            </div>
            <div className={classes.networkOuter}>
              <div className={classes.itemHead}>Withdraw Amount</div>
              <div className={classes.selector}>
                <input
                  type="text"
                  placeholder="Amount"
                  name="withdrawAmount"
                  value={withdrawAmount}
                  onChange={handleChange}
                  className={classes.addInp}
                />
                <div className={`${classes.iconsInput} ${classes.spanIp}`}>
                  {/* <span>
                    EXCOIN
                  </span> */}
                  <span
                    onClick={() => {
                      setWithdrawAmount(balance.exCoin);
                    }}
                  >
                    MAX
                  </span>
                </div>
              </div>
              {/* <div className={classes.smallTextWrap}>
                <span>Available Withdraw</span>
                <span className={classes.white}>
                  <span>
                    {" "}
                    {formatCurrency(balance.exCoin, "en-US", "")} USDT
                  </span>
                  <img src="/assets/images/arrowDownWhite.png" alt="arrow" />
                </span>
              </div> */}
              {/* <div className={classes.smallTextWrap}>
                <span>24h remaining limit</span>
                <span className={classes.white}>
                  7,999,800 USDT /{" "}
                  <span className={classes.grey}>8,000,000.0 USDT</span>
                  <img src="/assets/images/arrowDownWhite.png" alt="arrow" />
                </span>
              </div> */}
            </div>
            <div className={classes.withdrawBottom}>
              <div className={classes.smallTextWrap}>
                {/* <div>
                  <span>Receive amount</span>
                  <div>
                    <span className={classes.white}>0.00 USDT</span>
                  </div>
                  <div>
                    <span>
                      Network Fee 1 USDT{" "}
                      <img src="/assets/images/arrowRight.png" alt="arrow" />
                    </span>
                  </div> */}
                {/* </div> */}
              </div>
              <Button
                theme="light"
                inlineStyle={{
                  borderRadius: "30px",
                  backgroundColor: "var(--color-green)",
                }}
                disabled={withdrawing || !withdrawAmount || !withdrawAddress}
                onClick={withdrawMethod}
              >
                <div className={classes.confirmButton}>
                  {withdrawing ? "Withdrawing" : "Request Withdrawal"}
                </div>
              </Button>
            </div>
          </div>
        </OverviewCard>
      </div>
      <div className={`${classes.deposit} ${classes.descktopSwiper}`}>
        <OverviewCard type="fullHeight">
          <div className={classes.cardInner}>
            <div className={classes.head}>Transfer</div>
            <div className={classes.networkOuter}>
              <div className={classes.itemHead}>Search for user ID</div>
              <div className={classes.selector}>
                <SearchableDropdown
                  keyName="accountNumber"
                  suggestionKey="fullName"
                  placeholder="Recipients Account Number"
                  updateParent={handleSelectionUpdate}
                  fetchSuggestions={fetchSuggestions}
                  suggestions={users}
                  clearInput={clearSearchInput}
                />
                <div className={classes.iconsInput}>
                  {clearSearch && (
                    <img
                      src="/assets/images/cross.png"
                      alt="cross"
                      className={classes.cursor}
                      onClick={handleClearSearchInput}
                    />
                  )}
                  {transferAddress && (
                    <img src="/assets/images/tick.png" alt="tick" />
                  )}
                </div>
              </div>
            </div>
            <div className={classes.networkOuter}>
              <div className={classes.itemHead}>Amount</div>
              <div className={classes.selector}>
                <input
                  type="text"
                  placeholder="Amount"
                  name="transferAmount"
                  value={transferAmount}
                  onChange={handleChange}
                />
              </div>
              <div className={classes.smallTextWrap}>
                <span>Available Dextoken</span>
                <span className={classes.white}>
                  {formatCurrency(balance.dexToken, "en-US", "")} USDT
                </span>
              </div>
            </div>
            <div className={`${classes.withdrawBottom} ${classes.pad}`}>
              <Button
                theme="light"
                type="full"
                onClick={transferMethod}
                disabled={!transferAddress || !transferAmount || transferring}
                inlineStyle={{
                  borderRadius: "30px",
                  backgroundColor: "var(--color-green)",
                }}
              >
                <div
                  className={`${classes.confirmButton} ${classes.confirmButton2}`}
                >
                  {transferring ? "Transferring" : "Transfer"}
                </div>
              </Button>
            </div>
          </div>
        </OverviewCard>
      </div>
      <div className={`${classes.deposit} ${classes.descktopSwiper}`}>
        <OverviewCard type="fullHeight">
          <div className={classes.cardInner}>
            <div className={classes.head}>Swap</div>
            <div className={classes.networkOuter}>
              <div className={classes.itemHead}>From</div>
              <div className={classes.coinOuter}>
                <div className={classes.coinWrapper}>
                  <div className={classes.coinWrap}>X</div>
                  <div className={classes.coinLabel}>Excoin</div>
                </div>
                <div className={classes.quantityWrapper}>
                  <input
                    type="number"
                    name="swapEx"
                    value={swapEx}
                    onChange={handleChange}
                  />
                  <div
                    className={classes.quantity}
                    onClick={() => {
                      setSwapEx(balance.exCoin.toFixed(2));
                    }}
                  >
                    Available {formatCurrency(balance.exCoin, "en-US", "")}
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.middle}>
              <div className={classes.midWrap}>
                <img src="/assets/images/arrow.png" alt="arrow" />
              </div>
            </div>
            <div className={classes.networkOuter}>
              <div className={classes.itemHead}>To</div>
              <div className={classes.coinOuter}>
                <div className={classes.coinWrapper}>
                  <div className={classes.coinWrap}>D</div>
                  <div className={classes.coinLabel}>Dextoken</div>
                </div>
                <div className={classes.quantityWrapper}>
                  {/* <input
                    type="text"
                    disabled
                    value={formatCurrency(balance.dexToken, "en-US", "")}
                  /> */}
                  <input
                    type="number"
                    name="swapEx"
                    value={swapEx}
                    onChange={handleChange}
                  />
                  <div
                    className={classes.quantity}
                    onClick={() => {
                      setSwapEx(
                        balance.dexToken < balance.exCoin
                          ? balance.dexToken.toFixed(2)
                          : balance.exCoin.toFixed(2)
                      );
                    }}
                  >
                    Available {formatCurrency(balance.dexToken, "en-US", "")}
                  </div>
                </div>
              </div>
            </div>
            <div className={`${classes.withdrawBottom} ${classes.pad2}`}>
              <Button
                theme="light"
                type="full"
                disabled={swapping || !swapEx}
                inlineStyle={{
                  borderRadius: "30px",
                  backgroundColor: "var(--color-green)",
                }}
                onClick={swapMethod}
              >
                <div
                  className={`${classes.confirmButton} ${classes.confirmButton2}`}
                >
                  {swapping ? "Swapping" : "Confirm Swap"}
                </div>
              </Button>
            </div>
          </div>
        </OverviewCard>
      </div>

      <div className={`fullHeightSwiper ${classes.mobileSwiper}`}>
        <SwiperCommon
          pagination={true}
          slidesPerview={1}
          spaceBetween={10}
          slidesPerGroup={1}
          arrows={false}
        >
          <SwiperSlide>
            <div className={classes.deposit}>
              <OverviewCard type="fullHeight">
                <div className={classes.cardInner}>
                  <div className={classes.depositOuter}>
                    <div className={classes.head}>Deposit</div>
                    <div className={classes.itemHead}>Select Coin</div>
                    <div className={`${classes.selector}`}>
                      <SelectCoin
                        options={currencies}
                        suggestionList={currencies}
                        keyName="name"
                        suggestionKey="abbreviation"
                        updateParent={selectCoin}
                      />
                    </div>
                  </div>
                  <div className={classes.networkOuter}>
                    <div className={classes.itemHead}>Select Network</div>
                    <div className={`${classes.selector}`}>
                      <SelectCoin
                        options={networks}
                        keyName="name"
                        suggestionKey="abbreviation"
                        updateParent={selectCoinNetwork}
                      />
                    </div>
                    {/* <div className={classes.smallTextWrap}>
                <span>Contract addresss ending in</span>
                <span>
                  jLk6j <img src="/assets/images/arrowRight.png" alt="arrow" />
                </span>
              </div> */}
                  </div>
                  <div className={classes.depositOuter2}>
                    <div className={classes.itemHead}>Deposit Amount</div>
                    <div className={classes.selector}>
                      <input
                        type="text"
                        name="depositAmount"
                        onChange={handleChange}
                        value={depositAmount}
                      />
                      <div
                        className={`${classes.generateBtn} ${
                          (depositing || !depositAmount) &&
                          classes.generateBtnDisabled
                        }`}
                        onClick={createWalletMethod}
                      >
                        Generat{depositing ? "ing" : "e"}
                      </div>
                    </div>
                  </div>
                  <div className={classes.qrWrap}>
                    <div className={classes.qrLeft}>
                      <QRCodeComponent
                        value={
                          depositAddress.address ? depositAddress.address : ""
                        }
                      />
                    </div>
                    <div className={classes.qrRight}>
                      <div className={classes.time}>
                        <div className={classes.counterWrap}>
                          <CountdownTimer
                            initialMinutes={counter.min}
                            initialSeconds={counter.sec}
                            onExpire={handleExpire}
                          />
                        </div>
                        <span>min remaining limit</span>
                      </div>
                      <div className={classes.address}>
                        <div className={classes.addressDetail}>
                          <div className={classes.addLabel}>Address</div>
                          <div className={classes.addVal}>
                            {depositAddress.address}
                          </div>
                        </div>
                        <div className={classes.copy} onClick={copyAddress}>
                          <img src="/assets/images/copy.png" alt="copy" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.smallTextWrap}>
                    <span>Minimum deposit</span>
                    <span>More than 0.01 USDT</span>
                  </div>
                </div>
              </OverviewCard>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={classes.deposit}>
              <OverviewCard type="fullHeight">
                <div className={classes.cardInner}>
                  <div className={classes.depositOuter}>
                    <div className={classes.head}>Withdraw</div>
                    <div className={classes.itemHead}>Select Coin</div>
                    <div className={`${classes.selector}`}>
                      <SelectCoin
                        options={currencies}
                        keyName="name"
                        suggestionKey="abbreviation"
                        updateParent={selectCoinWithdraw}
                      />
                    </div>
                  </div>
                  <div className={classes.networkOuter}>
                    <div className={classes.itemHead}>Select Network</div>
                    <div className={classes.selector}>
                      <input
                        type="text"
                        placeholder="Address"
                        name="withdrawAddress"
                        value={withdrawAddress}
                        onChange={handleChange}
                        className={classes.addInp}
                      />
                      <div className={classes.iconsInput}>
                        {withdrawAddress && (
                          <img
                            src="/assets/images/cross.png"
                            alt="cross"
                            className={classes.cursor}
                            onClick={() => {
                              setWithdrawAddress("");
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div className={`${classes.selector}`}>
                      <SelectCoin
                        options={networksWithdraw}
                        keyName="name"
                        suggestionKey="abbreviation"
                        updateParent={selectCoinNetworkWithdraw}
                      />
                    </div>
                    {/* <div className={classes.smallTextWrap}>
                <span>Contract addresss ending in</span>
                <span>
                  jLk6j <img src="/assets/images/arrowRight.png" alt="arrow" />
                </span>
              </div> */}
                  </div>
                  <div className={classes.networkOuter}>
                    <div className={classes.itemHead}>Withdraw Amount</div>
                    <div className={classes.selector}>
                      <input
                        type="text"
                        placeholder="Amount"
                        name="withdrawAmount"
                        value={withdrawAmount}
                        onChange={handleChange}
                        className={classes.addInp}
                      />
                      <div
                        className={`${classes.iconsInput} ${classes.spanIp}`}
                      >
                        {/* <span>
                          EXCOIN
                        </span> */}
                        <span
                          onClick={() => {
                            setWithdrawAmount(balance.exCoin);
                          }}
                        >
                          MAX
                        </span>
                      </div>
                    </div>
                    {/* <div className={classes.smallTextWrap}>
                <span>Available Withdraw</span>
                <span className={classes.white}>
                  <span>
                    {" "}
                    {formatCurrency(balance.exCoin, "en-US", "")} USDT
                  </span>
                  <img src="/assets/images/arrowDownWhite.png" alt="arrow" />
                </span>
              </div> */}
                    {/* <div className={classes.smallTextWrap}>
                <span>24h remaining limit</span>
                <span className={classes.white}>
                  7,999,800 USDT /{" "}
                  <span className={classes.grey}>8,000,000.0 USDT</span>
                  <img src="/assets/images/arrowDownWhite.png" alt="arrow" />
                </span>
              </div> */}
                  </div>
                  <div className={classes.withdrawBottom}>
                    <div className={classes.smallTextWrap}>
                      {/* <div>
                  <span>Receive amount</span>
                  <div>
                    <span className={classes.white}>0.00 USDT</span>
                  </div>
                  <div>
                    <span>
                      Network Fee 1 USDT{" "}
                      <img src="/assets/images/arrowRight.png" alt="arrow" />
                    </span>
                  </div> */}
                      {/* </div> */}
                    </div>
                    <Button
                      theme="light"
                      inlineStyle={{
                        borderRadius: "30px",
                        backgroundColor: "var(--color-green)",
                      }}
                      disabled={
                        withdrawing || !withdrawAmount || !withdrawAddress
                      }
                      onClick={withdrawMethod}
                    >
                      <div className={classes.confirmButton}>
                        {withdrawing ? "Withdrawing" : "Request Withdrawal"}
                      </div>
                    </Button>
                  </div>
                </div>
              </OverviewCard>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={classes.deposit}>
              <OverviewCard type="fullHeight">
                <div className={classes.cardInner}>
                  <div className={classes.head}>Transfer</div>
                  <div className={classes.networkOuter}>
                    <div className={classes.itemHead}>Search for user ID</div>
                    <div className={classes.selector}>
                      <SearchableDropdown
                        keyName="accountNumber"
                        suggestionKey="fullName"
                        placeholder="Recipients Account Number"
                        updateParent={handleSelectionUpdate}
                        fetchSuggestions={fetchSuggestions}
                        suggestions={users}
                        clearInput={clearSearchInput}
                      />
                      <div className={classes.iconsInput}>
                        {clearSearch && (
                          <img
                            src="/assets/images/cross.png"
                            alt="cross"
                            className={classes.cursor}
                            onClick={handleClearSearchInput}
                          />
                        )}
                        {transferAddress && (
                          <img src="/assets/images/tick.png" alt="tick" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={classes.networkOuter}>
                    <div className={classes.itemHead}>Amount</div>
                    <div className={classes.selector}>
                      <input
                        type="text"
                        placeholder="Amount"
                        name="transferAmount"
                        value={transferAmount}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={classes.smallTextWrap}>
                      <span>Available Dextoken</span>
                      <span className={classes.white}>
                        {formatCurrency(balance.dexToken, "en-US", "")} USDT
                      </span>
                    </div>
                  </div>
                  <div className={`${classes.withdrawBottom} ${classes.pad}`}>
                    <Button
                      theme="light"
                      type="full"
                      onClick={transferMethod}
                      disabled={
                        !transferAddress || !transferAmount || transferring
                      }
                      inlineStyle={{
                        borderRadius: "30px",
                        backgroundColor: "var(--color-green)",
                      }}
                    >
                      <div
                        className={`${classes.confirmButton} ${classes.confirmButton2}`}
                      >
                        {transferring ? "Transferring" : "Transfer"}
                      </div>
                    </Button>
                  </div>
                </div>
              </OverviewCard>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={classes.deposit}>
              <OverviewCard type="fullHeight">
                <div className={classes.cardInner}>
                  <div className={classes.head}>Swap</div>
                  <div className={classes.networkOuter}>
                    <div className={classes.itemHead}>From</div>
                    <div className={classes.coinOuter}>
                      <div className={classes.coinWrapper}>
                        <div className={classes.coinWrap}>X</div>
                        <div className={classes.coinLabel}>Excoin</div>
                      </div>
                      <div className={classes.quantityWrapper}>
                        <input
                          type="number"
                          name="swapEx"
                          value={swapEx}
                          onChange={handleChange}
                        />
                        <div
                          className={classes.quantity}
                          onClick={() => {
                            setSwapEx(balance.exCoin.toFixed(2));
                          }}
                        >
                          Available{" "}
                          {formatCurrency(balance.exCoin, "en-US", "")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.middle}>
                    <div className={classes.midWrap}>
                      <img src="/assets/images/arrow.png" alt="arrow" />
                    </div>
                  </div>
                  <div className={classes.networkOuter}>
                    <div className={classes.itemHead}>To</div>
                    <div className={classes.coinOuter}>
                      <div className={classes.coinWrapper}>
                        <div className={classes.coinWrap}>D</div>
                        <div className={classes.coinLabel}>Dextoken</div>
                      </div>
                      <div className={classes.quantityWrapper}>
                        {/* <input
                          type="text"
                          disabled
                          value={formatCurrency(balance.dexToken, "en-US", "")}
                        /> */}
                        <input
                          type="number"
                          name="swapEx"
                          value={swapEx}
                          onChange={handleChange}
                        />
                        <div
                          className={classes.quantity}
                          onClick={() => {
                            setSwapEx(
                              balance.dexToken < balance.exCoin
                                ? balance.dexToken.toFixed(2)
                                : balance.exCoin.toFixed(2)
                            );
                          }}
                        >
                          Available{" "}
                          {formatCurrency(balance.dexToken, "en-US", "")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${classes.withdrawBottom} ${classes.pad2}`}>
                    <Button
                      theme="light"
                      type="full"
                      disabled={swapping || !swapEx}
                      inlineStyle={{
                        borderRadius: "30px",
                        backgroundColor: "var(--color-green)",
                      }}
                      onClick={swapMethod}
                    >
                      <div
                        className={`${classes.confirmButton} ${classes.confirmButton2}`}
                      >
                        {swapping ? "Swapping" : "Confirm Swap"}
                      </div>
                    </Button>
                  </div>
                </div>
              </OverviewCard>
            </div>
          </SwiperSlide>
        </SwiperCommon>
      </div>
    </div>
  );
};
export default PaymentSection;
