import React from "react";
import styles from "./ProductService.module.scss";
import SectionTitle from "../SectionTitle/SectionTitle";
import FooterNavLink from "../FooterNavLink/NavLink";
import CardLink from "../CardLink/CardLink";
import { routers } from "../../../Constants";

const footerLinks = [
  {
    name: "Home",
    to: routers.trade,
  },
  {
    name: "Trade",
    to: "",
  },
  {
    name: "AI Signal",
    to: routers.aiSignal,
    disabled: false,
  },
  {
    name: "Dex Gem",
    to: routers.projects,
    disabled: false,
  },
  {
    name: "Academy",
    to: routers.academy,
    disabled: false,
    hideMobile: true,
  },
  {
    name: "Auto Trade",
    to: "/autotrade",
  },
  {
    name: "Affiliate marketing",
    to: "/affiliate-marketing",
  },
  {
    name: "Refferal program",
    to: routers.referalProgram,
  },
  {
    name: "IB",
    to: routers.brokerPage,
  },
];

const cardLinks = [
  {
    title: "About us",
    links: [
      {
        text: "Our Vision",
        to: routers.aboutUs,
        id: "vision",
      },
      {
        text: "Our Mission",
        to: routers.aboutUs,
        id: "mission",
      },
      {
        text: "Our Value",
        to: routers.aboutUs,
        id: "values",
      },
      {
        text: "Our Team",
        to: routers.aboutUs,
        id: "team",
      },
    ],
  },
  {
    title: "Legal and Regulatory",

    links: [
      {
        text: "Licenses and Registrations",
        disabled: true,
      },
      {
        text: "KYC and AML Compliance",
        disabled: true,
      },
      {
        text: "Data Protection",
        disabled: true,
      },
      {
        text: "Risk Disclosure",
        disabled: true,
      },
    ],
  },
  {
    title: "Dex Academy",
    links: [
      {
        text: "Beginner Courses",
        disabled: true,
      },
      {
        text: "Intermediate Courses",
        disabled: true,
      },
      {
        text: "Certifications",
        disabled: true,
      },
      {
        text: "Webinars and Workshops",
        disabled: true,
      },
    ],
  },
];

const ProductService = () => {
  return (
    <div>
      <SectionTitle title="Product and Service" />
      <div className={styles.container}>
        <div className={styles.sections}>
          {footerLinks.map(({ name, to, disabled, hideMobile }, index) => (
            <div
              className={`${styles.navContainer} ${
                disabled && "disabledLink"
              } ${hideMobile && styles.hideMobile}`}
              key={index}
            >
              {" "}
              <FooterNavLink type="light" to={to} disabled={disabled}>
                {name}
              </FooterNavLink>{" "}
            </div>
          ))}
        </div>
        <div className={styles.sections}>
          <div className={styles.logoWrapper}>
            <div className={styles.left}>
              <SectionTitle title="Download MT5" />
              <div className={styles.leftInner}>
                <div className={styles.item}>
                  <a
                    href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5&hl=en_IN"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/assets/images/appicons/google.png"
                      alt="google"
                    />
                  </a>
                </div>
                <div className={styles.item}>
                  <a
                    href="https://apps.apple.com/us/app/metatrader-5/id413251709"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/assets/images/appicons/app.png"
                      alt="app store"
                    />
                  </a>
                </div>
                <div className={styles.item}>
                  <a
                    href="https://exdex-prod.s3.ap-south-1.amazonaws.com/software/mt5setup.exe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/assets/images/appicons/windows.png"
                      alt="windows"
                    />
                  </a>
                </div>
                <div className={styles.item}>
                  <a
                    href="https://exdex-prod.s3.ap-south-1.amazonaws.com/software/MetaTrader5.pkg.zip"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/assets/images/appicons/mac.png" alt="mac" />
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <SectionTitle title="Download MT4" />
              <div className={styles.leftInner}>
                <div className={styles.item}>
                  <a
                    href="https://apps.apple.com/us/app/metatrader-4/id496212596"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/assets/images/appicons/app.png"
                      alt="app store"
                    />
                  </a>
                </div>
                <div className={styles.item}>
                  <a
                    href="https://exdex-prod.s3.ap-south-1.amazonaws.com/software/mt4setup.exe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/assets/images/appicons/windows.png"
                      alt="windows"
                    />
                  </a>
                </div>
                <div className={styles.item}>
                  <a
                    href="https://exdex-prod.s3.ap-south-1.amazonaws.com/software/MetaTrader4.pkg.zip"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/assets/images/appicons/mac.png" alt="mac" />
                  </a>
                </div>
                <div className={styles.item} style={{ opacity: 0 }}>
                  <img src="/assets/images/appicons/google.png" alt="google" />
                </div>
              </div>
            </div>{" "}
          </div>
          {/* {cardLinks.map(({ title, links }) => (
            <div className={styles.navContainer} key={title}>
              <CardLink
                title={title}
                // eslint-disable-next-line react/jsx-no-comment-textnodes
                //@ts-ignore
                links={links}
              />
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default ProductService;
