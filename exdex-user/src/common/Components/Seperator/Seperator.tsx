import React, { HTMLAttributes } from 'react';
import styles from './Seperator.module.scss';

const Seperator = ({className,...props}:HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`${styles.seperator} seperator ${className}`} {...props}>
    </div>
  );
};

export default Seperator;
