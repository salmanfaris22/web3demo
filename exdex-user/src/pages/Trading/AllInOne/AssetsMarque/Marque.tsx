import React from 'react'

import styles from "./AssetsMarque.module.scss"
import Marquee from 'react-fast-marquee';
const data = [
    { filePath: "/assets/images/trade/assets/1.png" },
    { filePath: "/assets/images/trade/assets/2.png" },
    { filePath: "/assets/images/trade/assets/3.png" },
    { filePath: "/assets/images/trade/assets/4.png" },
    { filePath: "/assets/images/trade/assets/5.png" },
    { filePath: "/assets/images/trade/assets/6.png" },
    { filePath: "/assets/images/trade/assets/7.png" },
    { filePath: "/assets/images/trade/assets/8.png" },
    { filePath: "/assets/images/trade/assets/9.png" },
    { filePath: "/assets/images/trade/assets/10.png" },
    { filePath: "/assets/images/trade/assets/11.png" },
    { filePath: "/assets/images/trade/assets/12.png" },
  ];
  

export const MarqueList = ({direction}  : {direction : "left" | "right"}) => {
  return (
    <Marquee direction={direction} autoFill speed={20}  >
    {data.map((d) => {
      return (
        <div className={styles.assetWrap}>
          <img src={d.filePath} alt="" />
        </div>
      );
    })}
  </Marquee>
  )
}
