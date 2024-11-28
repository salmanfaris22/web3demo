import React from 'react';
import styles from './InfoText.module.scss';

const InfoText = ({text} : 
  {text:string}
) => {
  return (
    <div className={styles.container}>
          <img src="/assets/images/info.png" alt="Info icon"/>
          <div className={styles.text} >{text}</div> 
    </div>
  );
};

export default InfoText;
