import React from "react";
import styles from "./WatchListCard.module.scss";
import QRCode from "react-qr-code";

export interface WatchListCardProps {
  heading: string;
  coin: string;
  entryPrice: string;
  marketPrice: string;
  percentage: string;
  refferalCode:string
}

const WatchListCard = ({
  heading,
  coin,
  entryPrice,
  marketPrice,
  percentage,
  refferalCode
}: WatchListCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.watchListcardInner}>
        <div className={styles.heading}>{heading}</div>
        <div className={styles.coin}>{coin}</div>
        <div className={styles.priceInfo}>
          <div>
            <span className={styles.pricePair}>
              Entry Price <span className={styles.price}>{entryPrice}</span>
            </span>
          </div>
          <div>
            <span className={styles.pricePair}>
              Market Price <span className={styles.price}>{marketPrice}</span>
            </span>
          </div>
        </div>
        <div className={styles.percentage}>{`${percentage} %`}</div>
       {refferalCode && <div className={styles.qrCodeInfo}>
          <div className={styles.qrCode}>
           <QRCode value={`https://www.exdex.com/register?code=${refferalCode}`} />
          </div>
          <div className={styles.refferalCode}>
            Refferal Code:
            <div className={styles.code}>{refferalCode}</div>
          </div>
        </div>}
        <div className={styles.gaphBackGround} >
            <img src="/assets/images/ai_watchlist/graphVector.png" alt="Background" />
        </div>
        <div className={styles.footerLogo} >
        <img src="/assets/images/logoWhite.png" alt="Logo"/>
      </div>
      <div className={styles.footerUrl}>
      Exdex.com
      </div>
      </div>

    </div>
  );
};

export default WatchListCard;
