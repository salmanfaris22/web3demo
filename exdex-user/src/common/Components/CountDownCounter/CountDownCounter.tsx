import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import styles from './CountDownCounter.module.scss'

interface CountingTextProps {
  from: number;
  to: number;
  duration?: number; 
  infoText : string
}

const CountDownCounter: React.FC<CountingTextProps> = ({ from, to, duration = 2, infoText }) => {
  const count = useMotionValue(from);
  const [roundedCount, setRoundedCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useMotionValueEvent(count, "change", latest => {
    setRoundedCount(Math.round(latest));
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        onUpdate: value => {
          count.set(value);
        }
      });

      return controls.stop;
    }
  }, [isInView, from, to, duration, count]);


  return (
    <motion.div className={styles.container} ref={ref}>
     {roundedCount.toLocaleString()}+
     <div className={styles.info}>{infoText}</div>
    </motion.div>
  );
};

export default CountDownCounter;
