import React, { ImgHTMLAttributes, useState } from "react";
import styles from "./LazyImage.module.scss";

const LazyImage = (
  props: ImgHTMLAttributes<HTMLImageElement> & { classNames?: { img?: string } }
) => {
  const [isImgLoading, setIsImgLoading] = useState(true);

  return (
    <>
      {isImgLoading && (
        <div className={`wave-container ${styles.waveLoader}`}>
          <div className="wave"></div>
        </div>
      )}

      <img
        {...props}
        decoding="async"
        className={props?.classNames?.img}
        loading="eager"
        onLoad={() => {
          setIsImgLoading(false);
        }}
      />
    </>
  );
};

export default LazyImage;
