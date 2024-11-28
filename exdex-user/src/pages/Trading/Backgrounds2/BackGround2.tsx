import React, { ReactNode } from "react";
import styles from "./BackGrounds2.module.scss";

const BackGround = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.bgImg1}>
      <div className={styles.topBlur}></div>
      {children}

      <div className={styles.bottomBlur}></div>
      <div className={styles.absoluteBg1}></div>
     
      <svg
        className={`${styles.gradSvg} subtleMotion`}
        width="1920"
        height="1420"
        viewBox="0 0 1920 1420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.7">
          <g opacity="0.3" filter="url(#filter0_f_6699_68284)">
            <path
              d="M140.111 1053.3C356.115 1053.3 531.222 930.975 531.222 780.081C531.222 629.188 356.115 506.865 140.111 506.865C-75.8937 506.865 -251 629.188 -251 780.081C-251 930.975 -75.8937 1053.3 140.111 1053.3Z"
              fill="url(#paint0_linear_6699_68284)"
            />
          </g>
          <g opacity="0.6" filter="url(#filter1_f_6699_68284)">
            <path
              d="M609.232 1036.45C859.54 1098.81 1097.49 1008.75 1140.71 835.286C1183.92 661.827 1016.04 470.656 765.731 408.293C515.423 345.931 277.474 435.992 234.258 609.452C191.042 782.911 358.923 974.083 609.232 1036.45Z"
              fill="url(#paint1_linear_6699_68284)"
              fill-opacity="0.4"
            />
          </g>
          <g opacity="0.6" filter="url(#filter2_f_6699_68284)">
            <path
              d="M1678.29 855.055C1837.42 972.544 2032.42 978.396 2113.83 868.126C2195.25 757.856 2132.26 573.221 1973.13 455.732C1814 338.244 1619.01 332.391 1537.59 442.661C1456.17 552.931 1519.17 737.566 1678.29 855.055Z"
              fill="url(#paint2_linear_6699_68284)"
              fill-opacity="0.4"
            />
          </g>
          <g opacity="0.6" filter="url(#filter3_f_6699_68284)">
            <path
              d="M1710.15 880.722C1822.33 815.954 1871.41 690.932 1819.76 601.476C1768.11 512.02 1635.3 492.006 1523.12 556.774C1410.94 621.542 1361.87 746.565 1413.52 836.021C1465.16 925.476 1597.97 945.49 1710.15 880.722Z"
              fill="url(#paint3_linear_6699_68284)"
            />
          </g>
          <g opacity="0.6" filter="url(#filter4_f_6699_68284)">
            <path
              d="M1208.65 926.982C1324.4 926.982 1418.24 836.078 1418.24 723.941C1418.24 611.805 1324.4 520.9 1208.65 520.9C1092.89 520.9 999.055 611.805 999.055 723.941C999.055 836.078 1092.89 926.982 1208.65 926.982Z"
              fill="url(#paint4_linear_6699_68284)"
            />
          </g>
          <g opacity="0.6" filter="url(#filter5_f_6699_68284)">
            <path
              d="M445.139 697.742C518.518 697.742 578.004 639.932 578.004 568.62C578.004 497.307 518.518 439.497 445.139 439.497C371.759 439.497 312.273 497.307 312.273 568.62C312.273 639.932 371.759 697.742 445.139 697.742Z"
              fill="url(#paint5_linear_6699_68284)"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_6699_68284"
            x="-614.041"
            y="143.825"
            width="1508.3"
            height="1272.51"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="181.52"
              result="effect1_foregroundBlur_6699_68284"
            />
          </filter>
          <filter
            id="filter1_f_6699_68284"
            x="-135.564"
            y="25.4801"
            width="1646.09"
            height="1393.78"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="181.52"
              result="effect1_foregroundBlur_6699_68284"
            />
          </filter>
          <filter
            id="filter2_f_6699_68284"
            x="1138.96"
            y="0.599213"
            width="1373.5"
            height="1309.59"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="181.52"
              result="effect1_foregroundBlur_6699_68284"
            />
          </filter>
          <filter
            id="filter3_f_6699_68284"
            x="1029.93"
            y="155.722"
            width="1173.42"
            height="1126.05"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="181.52"
              result="effect1_foregroundBlur_6699_68284"
            />
          </filter>
          <filter
            id="filter4_f_6699_68284"
            x="636.014"
            y="157.86"
            width="1145.26"
            height="1132.16"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="181.52"
              result="effect1_foregroundBlur_6699_68284"
            />
          </filter>
          <filter
            id="filter5_f_6699_68284"
            x="-50.7672"
            y="76.4561"
            width="991.816"
            height="984.327"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="181.52"
              result="effect1_foregroundBlur_6699_68284"
            />
          </filter>
          <linearGradient
            id="paint0_linear_6699_68284"
            x1="-53.6762"
            y1="828.465"
            x2="334.057"
            y2="855.656"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#EA5954" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_6699_68284"
            x1="449.06"
            y1="722.04"
            x2="890.419"
            y2="865.741"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="1" stop-color="#CB25BD" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_6699_68284"
            x1="1656.84"
            y1="585.342"
            x2="1927.55"
            y2="816.419"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="1" stop-color="#CCFD51" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_6699_68284"
            x1="1532.55"
            y1="805.543"
            x2="1741.3"
            y2="701.532"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.36" stop-color="#1F454F" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_6699_68284"
            x1="1104.79"
            y1="759.899"
            x2="1313.07"
            y2="770.425"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#37D0FD" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_6699_68284"
            x1="379.305"
            y1="591.487"
            x2="511.338"
            y2="598.14"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00F0FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BackGround;
