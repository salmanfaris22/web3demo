import React from "react";

const Ellipse = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="940"
      height="852"
      viewBox="0 0 940 852"
      fill="none"
    >
      <g filter="url(#filter0_f_2372_2356)">
        <ellipse cx="470" cy="384" rx="76" ry="74" fill="#CCFC50" />
      </g>
      <defs>
        <filter
          id="filter0_f_2372_2356"
          x="0"
          y="-84"
          width="940"
          height="936"
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
            stdDeviation="197"
            result="effect1_foregroundBlur_2372_2356"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Ellipse;
