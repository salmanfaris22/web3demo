import React, { useEffect, useState } from 'react';
import { HEADER } from '../../Layout/Header/Header';

const GradientBg = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementById(HEADER); 
    if (header) {
      setHeaderHeight(-header.offsetHeight); 
    }
  }, []);

  return (
    <div
      style={{
        top: `${headerHeight}px`,
        height: `calc(100% + ${Math.abs(headerHeight)}px)`,
      }}
      className="gradientBgFixed"
    ></div>
  );
};

export default GradientBg;
