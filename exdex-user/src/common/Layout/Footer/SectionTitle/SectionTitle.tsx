import React from 'react';
import styles from './SectionTitle.module.scss';



const SectionTitle = ({title} : {title :  string}) => {
  return (
    <div className={styles.container}>
       {title}
    </div>
  );
};

export default SectionTitle;
