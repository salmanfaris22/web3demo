import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import styles from "./Cards.module.scss";
import Button from "../../../../common/Components/Button/Button";
import { formatCurrency } from "../../../../utils/currencyFormatter";
import { useSelector } from "react-redux";
import { selectToken } from "../../../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../../common/Constants";

const data = [
  {
    title: "Standard",
    deposit: 100,
    description:
      "A GREAT ACCOUNT FOR ALL TYPES OF TRADERS, WITH FLOATING FX SPREAD FROM 1.2 PIPS VIA MT4/MT5 AND MICRO LOT TRADING AVAILABLE",
  },
  {
    title: "ECN",
    deposit: 500,
    description:
      "Get VIP treatment with ZERO spreads (for 90%+ of the trading day) + low commission (max 3.5 USD per lot per side) MT4/MT5",
  },
  {
    title: "Prime",
    deposit: 30000,
    description:
      "Just like Raw+, you will benefit from ZERO spreads and earn rebates of up to 21% of your commissions! MT4/MT5",
  },
];

const NavArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
    >
      <path
        d="M7.74222 2.30678C7.91724 2.1318 8.1546 2.03351 8.40208 2.03351C8.64957 2.03351 8.88692 2.1318 9.06195 2.30678L13.2619 6.50678C13.4369 6.6818 13.5352 6.91916 13.5352 7.16664C13.5352 7.41413 13.4369 7.65148 13.2619 7.82651L9.06195 12.0265C8.88592 12.1965 8.65016 12.2906 8.40544 12.2885C8.16073 12.2863 7.92663 12.1882 7.75359 12.0151C7.58054 11.8421 7.48238 11.608 7.48025 11.3633C7.47813 11.1186 7.5722 10.8828 7.74222 10.7068L10.2687 8.09998H1.40208C1.15455 8.09998 0.917151 8.00164 0.742117 7.82661C0.567083 7.65157 0.46875 7.41418 0.46875 7.16664C0.46875 6.91911 0.567083 6.68171 0.742117 6.50668C0.917151 6.33164 1.15455 6.23331 1.40208 6.23331H10.2687L7.74222 3.62651C7.56724 3.45148 7.46895 3.21413 7.46895 2.96664C7.46895 2.71916 7.56724 2.4818 7.74222 2.30678Z"
        fill="#AEE5D1"
      />
    </svg>
  );
};

const Cards = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const winWidth = window.innerWidth;
  const isPc = winWidth > 768;
  const getAnimProperty = (hov: boolean) => {
    return isPc
      ? { width: hov ? "50%" : "25%" }
      : { maxHeight: hov ? "800px" : "250px" };
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const token = useSelector(selectToken);
  const nav = useNavigate();

  const textVariants: Variants = isPc
    ? {
        visible: {
          display: "block",
          opacity: 1,
          transition: { duration: 0.4, delay: 0.3 },
        },
        hidden: { display: "none", opacity: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { display: "none", opacity: 0 },
        visible: {
          display: "block",
          opacity: 1,
          transition: { delay: 0.3 },
        },
      };

  return (
    <div className={styles.container}>
      <div className={styles.cardRow}>
        {data.map((e, index) => {
          const isHovered = index === hoveredIndex;
          const width = getAnimProperty(isHovered);

          return (
            <motion.div
              key={index}
              className={styles.card}
              style={width}
              onMouseEnter={() => handleMouseEnter(index)}
              // onMouseLeave={() => setHoveredIndex(null)}
              animate={width}
              transition={{ duration: isPc ? 0.3 : 0.03 }}
            >
              <div className={styles.cardInner}>
                <motion.div
                  initial="visible"
                  variants={textVariants}
                  animate={!isHovered ? "visible" : "hidden"}
                  className={styles.titleInfo}
                >
                  {e.title}
                  <div className={styles.account}>ACCOUNT</div>
                  <div className={styles.titleArrow}>
                    <NavArrow />
                  </div>
                </motion.div>
                <motion.div
                  initial="hidden"
                  variants={textVariants}
                  animate={isHovered ? "visible" : "hidden"}
                  className={styles.descriptionInfo}
                >
                  <div>
                    {e.title}
                    <div className={styles.account}>ACCOUNT</div>
                    <div className={styles.description}>{e.description}</div>
                  </div>
                  <div className={styles.btnGrp}>
                    <div className={styles.account}>
                      Deposit from {formatCurrency(e.deposit)}
                    </div>
                    <Button
                      onClick={() => {
                        console.log(routers.trade)
                        nav(token ? routers.trade : routers.signup);
                      }}
                      theme="neon"
                    >
                      {token ? "Home" : "Open Account"}
                    </Button>
                  </div>
                </motion.div>
              </div>
              {index !== hoveredIndex && <NavArrow />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
