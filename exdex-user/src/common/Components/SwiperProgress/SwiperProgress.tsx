import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./SwiperProgress.module.scss";

interface SwiperProgressProps {
  targetElemId: string;
  customScrollPercentage?: number
}

const SwiperProgress: React.FC<SwiperProgressProps> = ({ targetElemId , customScrollPercentage }) => {
  const [percentage, setPercentage] = useState( customScrollPercentage?`${customScrollPercentage}%`: "0%");
  const scrollableDivRef = useRef<HTMLElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);


  useEffect(()=>{
   if(customScrollPercentage && customScrollPercentage !==undefined){
    setPercentage(`${customScrollPercentage}%`)
   }
  },[customScrollPercentage])

  const updateProgressBar = useCallback(() => {

    if (scrollableDivRef.current && !customScrollPercentage) {
      const { top, height } = scrollableDivRef.current.getBoundingClientRect();
      console.log(top)
      if (top < 0) {
        const scrolled = Math.min((Math.abs(top) / height) * 100, 100);
        setPercentage(`${scrolled}%`);
      } else {
        setPercentage("0%");
      }
    }
  }, []);

  console.log(percentage)

  useEffect(() => {
    scrollableDivRef.current = document.getElementById(targetElemId) as HTMLElement;
    window.addEventListener("wheel", updateProgressBar);
    return () => {
      window.removeEventListener("wheel", updateProgressBar);
    };
  }, [updateProgressBar, targetElemId]);

  return (
    <div className={styles.progressBarContainer}>
      <div
        ref={progressBarRef}
        id="progressBar"
        className={styles.progressBar}
        style={{ height: percentage }}
      ></div>
      <div className={styles.progressDot} style={{ top: percentage }}></div>
    </div>
  );
};

export default SwiperProgress;
