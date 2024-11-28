import { useEffect, useState } from "react";
import PageAnimation from "../../../common/Components/PageAnimation/PageAnimation";
import { getUserNftDetails } from "../../../services/overview";
import OverviewCard from "./components/OverviewCard/OverviewCard";
import TopBar from "./components/TopBar/TopBar";
import Heatmap from "./components/TreeMap/TreeMap";
import classes from "./Overview.module.scss";
import Binary from "./Sections/Binary/Binary";
import BinaryDetailed from "./Sections/BinaryDetailed/BinaryDetails";
import Gpt from "./Sections/Gpt/Gpt";
import History from "./Sections/History/History";
import Market from "./Sections/Market/Market";
import News from "./Sections/News/News";
import PaymentSection from "./Sections/Payment/Payment";
import Refferal from "./Sections/Refferal/Refferal";
import Signal from "./Sections/Signal/Signal";
import UniLevel from "./Sections/UniLevel/UniLevel";
import Visits from "./Sections/Visits/Visits";
import { IMAGE_URL } from "../../../config";
import NFTMap from "./Sections/NFTMap/NFTMap";
import SwiperCommon from "../../../common/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";
import Button from "../../../common/Components/Button/Button";
import Copy from "../../../common/Components/Icons/Copy";
import { copyToClipboard } from "../../../utils/clipboard";
import { useDispatch } from "react-redux";
import Locate from "../../../common/Components/Icons/Locate";
import { formatCurrency } from "../../../utils/currencyFormatter";
import { NFT_HASH } from "../../../config";
interface DataItem {
  name: string;
  value: number;
  displayValue: string;
  color: string;
}

export const generateAsymmetricData = (): DataItem[] => {
  return [
    {
      name: "BTCUSDT",
      value: 600,
      displayValue: "189x",
      color: "rgba(204, 253, 81, 1)",
    },
    {
      name: "XRPSFT",
      value: 200,
      displayValue: "189%",
      color: "rgba(204, 253, 81, 1)",
    },
    {
      name: "XRPSFT STOP",
      value: 100,
      displayValue: "STOP LOSS",
      color: "#ADD8E6",
    },
    {
      name: "LEOLINK",
      value: 50,
      displayValue: "19%",
      color: "rgba(174, 229, 209, 1)",
    },
    {
      name: "EUROUSD",
      value: 200,
      displayValue: "68%",
      color: "rgba(204, 253, 81, 1)",
    },
    {
      name: "EUROUSD PP",
      value: 150,
      displayValue: "66pp",
      color: "#ADD8E6",
    },
    {
      name: "BTCUSDT 2",
      value: 350,
      displayValue: "180x",
      color: "rgba(204, 253, 81, 1)",
    },
    {
      name: "XRPSFT 2",
      value: 250,
      displayValue: "180%",
      color: "rgba(204, 253, 81, 1)",
    },
    {
      name: "LEOLINK 2",
      value: 80,
      displayValue: "15%",
      color: "rgba(174, 229, 209, 1)",
    },
    {
      name: "EUROUSD 2",
      value: 180,
      displayValue: "70%",
      color: "rgba(204, 253, 81, 1)",
    },
    {
      name: "BTCUSDT 3",
      value: 100,
      displayValue: "100x",
      color: "rgba(204, 253, 81, 1)",
    },
    {
      name: "XRPSFT 3",
      value: 75,
      displayValue: "75%",
      color: "rgba(204, 253, 81, 1)",
    },
    {
      name: "LEOLINK 3",
      value: 40,
      displayValue: "10%",
      color: "rgba(174, 229, 209, 1)",
    },
    {
      name: "EUROUSD 3",
      value: 120,
      displayValue: "60%",
      color: "rgba(204, 253, 81, 1)",
    },
    {
      name: "EXTRA 1",
      value: 300,
      displayValue: "EX1",
      color: "rgba(234, 89, 84, 1)",
    },
    {
      name: "EXTRA 2",
      value: 250,
      displayValue: "EX2",
      color: "rgba(234, 89, 84, 1)",
    },
    {
      name: "EXTRA 3",
      value: 150,
      displayValue: "EX3",
      color: "rgba(204, 253, 81, 1)",
    },
    {
      name: "EXTRA 4",
      value: 200,
      displayValue: "EX4",
      color: "rgba(234, 89, 84, 1)",
    },
    {
      name: "EXTRA 5",
      value: 100,
      displayValue: "EX5",
      color: "rgba(234, 89, 84, 1)",
    },
    {
      name: "EXTRA 1",
      value: 300,
      displayValue: "EX1",
      color: "rgba(234, 89, 84, 1)",
    },
    {
      name: "EXTRA 2",
      value: 250,
      displayValue: "EX2",
      color: "rgba(234, 89, 84, 1)",
    },
    {
      name: "EXTRA 3",
      value: 150,
      displayValue: "EX3",
      color: "rgba(204, 253, 81, 1)",
    },
    {
      name: "EXTRA 4",
      value: 200,
      displayValue: "EX4",
      color: "rgba(234, 89, 84, 1)",
    },
    {
      name: "EXTRA 5",
      value: 100,
      displayValue: "EX5",
      color: "rgba(234, 89, 84, 1)",
    },
    {
      name: "EXTRA 1",
      value: 300,
      displayValue: "EX1",
      color: "rgba(234, 89, 84, 1)",
    },
    {
      name: "EXTRA 2",
      value: 250,
      displayValue: "EX2",
      color: "rgba(234, 89, 84, 1)",
    },
    {
      name: "EXTRA 3",
      value: 150,
      displayValue: "EX3",
      color: "rgba(204, 253, 81, 1)",
    },
    {
      name: "EXTRA 4",
      value: 200,
      displayValue: "EX4",
      color: "rgba(234, 89, 84, 1)",
    },
    {
      name: "EXTRA 5",
      value: 100,
      displayValue: "EX5",
      color: "rgba(234, 89, 84, 1)",
    },
  ];
};

const Overview = () => {
  const data = generateAsymmetricData();
  const [nft, setNft] = useState<any>({
    id: "",
    logo: "",
    collection: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getNFTDetailsMethod();
  }, []);

  const getNFTDetailsMethod = async () => {
    try {
      const response = await getUserNftDetails();
      if (response.status) {
        if (response.data) {
          setNft(response.data);
        }
      }
    } catch (err) {
    } finally {
    }
  };

  return (
    <div className={classes.overviewOuter}>
      <PageAnimation>
        <TopBar />
      </PageAnimation>
      <div className={classes.bottomContent}>
        <PageAnimation>
          <div className={classes.firstSection}>
            <div className={classes.nftContainer}>
              <OverviewCard>
                <div className={classes.nftImage}>
                  {nft.full_name && (
                    <PageAnimation type="full">
                      <div
                        className={classes.bgImage}
                        style={{
                          backgroundImage: `url(${IMAGE_URL}/${nft.logo})`,
                        }}
                      >
                        <a
                          href={`${NFT_HASH}/${nft.transaction_hash}`}
                          target="_blank"
                        ></a>
                      </div>
                      <div className={classes.nftFooter}>
                        <div className={classes.title}>{nft.full_name}</div>
                        {nft.account_number && (
                          <div className={classes.userId}>
                            {nft.account_number}
                            <Button
                              theme="icon"
                              onClick={() => {
                                copyToClipboard(nft.account_number, dispatch, {
                                  successMessage:
                                    "Account number copied to clipboard",
                                  onSuccess: () => {},
                                  onError: () => {},
                                });
                              }}
                            >
                              <Copy />
                            </Button>
                          </div>
                        )}
                        {nft.country && (
                          <div className={classes.locate}>
                            <Locate />
                            {nft.country}
                          </div>
                        )}
                        <div className={classes.buyBtn}>
                          <Button>{`Total Earning : ${formatCurrency(
                            nft.total_earnings ? nft.total_earnings : 0,
                            "en-US",
                            "USD"
                          )}`}</Button>
                        </div>
                      </div>
                      {nft.collection && (
                        <div className={classes.tag}>
                          <div className={classes.tagText}>
                            {nft.collection}
                          </div>
                        </div>
                      )}
                    </PageAnimation>
                  )}
                </div>
              </OverviewCard>
            </div>

            <div className={`${classes.treeContainer}`}>
              <OverviewCard type="fullHeight">
                <div className={classes.heatMapOuter}>
                  <div className={classes.heatMapContainer}>
                    {/* <Heatmap data={data} /> */}
                    <NFTMap />
                  </div>
                </div>
              </OverviewCard>
            </div>
          </div>
          <div className={classes.paymentSection}>
            <PaymentSection />
          </div>
          <div className={`${classes.bottomWrap}`}>
            <div className={`${classes.mobileSwiper} fullHeightSwiper`}>
              <SwiperCommon
                pagination={true}
                slidesPerview={1}
                spaceBetween={10}
                slidesPerGroup={1}
                arrows={false}
              >
                <SwiperSlide key={1}>
                  <div className={classes.visitsRef}>
                    <Visits />
                  </div>
                </SwiperSlide>
                <SwiperSlide key={2}>
                  <div className={classes.visitsRef}>
                    <Refferal />
                  </div>
                </SwiperSlide>
                <SwiperSlide key={3}>
                  <div className={classes.visitsRef}>
                    <Binary />
                  </div>
                </SwiperSlide>
                <SwiperSlide key={4}>
                  <div className={classes.visitsRef}>
                    <UniLevel />
                  </div>
                </SwiperSlide>
              </SwiperCommon>
            </div>

            <div className={classes.bottomLeft}>
              <div className={classes.bottomTop}>
                <div
                  className={`${classes.visitsRef} ${classes.descktopSwiper}`}
                >
                  <Visits />
                </div>
                <div
                  className={`${classes.visitsRef} ${classes.descktopSwiper}`}
                >
                  <Refferal />
                </div>
              </div>
              <div className={classes.bottomBottom}>
                <Gpt />
              </div>
              <div className={`${classes.bottomBottom} ${classes.marTen}`}>
                <News />
              </div>
            </div>
            <div className={classes.bottomRightWrap}>
              <div className={classes.bottomRightInner}>
                <div className={`${classes.bottomLeft} ${classes.bottomLeft2}`}>
                  <div
                    className={`${classes.visitsRef} ${classes.descktopSwiper}`}
                  >
                    <Binary />
                  </div>
                  <div
                    className={`${classes.visitsRef} ${classes.descktopSwiper}`}
                  >
                    <UniLevel />
                  </div>
                </div>
                <div
                  className={`${classes.bottomLeft} ${classes.bottomLeft2} `}
                >
                  <div className={classes.visitsRef}>
                    <BinaryDetailed />
                  </div>
                </div>
              </div>
              <div className={classes.bottomSignal}>
                <Signal />
              </div>
              <div className={`${classes.marketWrap} ${classes.marTen}`}>
                <div className={classes.marketItem}>
                  <Market type="normal" />
                </div>
                <div className={classes.marketItem}>
                  <Market type="compare" />
                </div>
              </div>
            </div>
          </div>
          <div className={`${classes.marTen} ${classes.historyWrap}`}>
            <History />
          </div>
        </PageAnimation>
      </div>
    </div>
  );
};

export default Overview;
