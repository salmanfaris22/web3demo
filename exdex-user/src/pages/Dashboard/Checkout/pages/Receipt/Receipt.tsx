import React from "react";
import styles from "./Receipt.module.scss"; // Import styles

const Receipt = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <table className={styles.headerTable}>
          <tbody>
            <tr>
              <td className={styles.headerLeft}>
                <div className={styles.headerGreeting}>
                  <div className={styles.greetingText}>
                    Hello
                    <div className={styles.userName}>Diya,</div>
                  </div>
                  <div className={styles.purchaseInfo}>
                    You have successfully purchased
                  </div>
                </div>
              </td>
              <td className={styles.headerRight}>
                <img
                  src="/assets/images/logo.png"
                  alt="EXDEX"
                  className={styles.logo}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.orderDetails}>
          <span className={styles.orderImage}></span>
          <span className={styles.orderName}>NFT Warrior</span>
        </div>
      </div>
      <div className={styles.item}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th className={styles.th}>ITEM</th>
              <td className={styles.td}>Course On Digital Analysis</td>
            </tr>
            <tr>
              <th className={styles.th}>Ordered</th>
              <td className={styles.td}>27 June, 2022</td>
            </tr>
            <tr>
              <th className={styles.th}>Coupon Code</th>
              <td className={styles.td}>N/A</td>
            </tr>
            <tr>
              <th className={styles.th}>Quantity</th>
              <td className={styles.td}>1</td>
            </tr>
            <tr>
              <th className={styles.th}>Price</th>
              <td className={styles.td2}>0.05</td>
            </tr>
            <tr>
              <th className={styles.th}>Amount</th>
              <td className={styles.td2}>0.05</td>
            </tr>
            <tr>
              <th className={styles.th}>Total Paid</th>
              <td className={styles.td2}>0.05</td>
            </tr>
            <tr>
              <th className={styles.th}></th>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <table className={styles.item}>
        <tbody>
          <tr>
            <td className={styles.footerLeft}>
              <div className={styles.footerCompany}>EXDEX LTD.</div>
              <div className={styles.footerLocation}>
                Dubai, United Arab Emirates
              </div>
              <a
                href="https://exdex.com"
                className={styles.footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                EDDEX.COM
              </a>
            </td>
            <td className={styles.footerRight}>
              <div className={styles.footerLogo}>
                <img
                  src="/assets/images/logo.png"
                  alt="EXDEX"
                  className={styles.logo}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <a href="#" className={styles.button}>
        GO TO MY PACKAGE
      </a>
    </div>
  );
};

export default Receipt;
