import React, { ReactNode } from 'react';
import styles from './FinanceTitle.module.scss';

const FinanceTitle = ({children} : {children : ReactNode}) => {
  return (
    <div className={styles.container}>
     {children}
    </div>
  );
};

export default FinanceTitle;
