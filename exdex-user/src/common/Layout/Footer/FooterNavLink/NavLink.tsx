import React from 'react';
import styles from './FooterNavLink.module.scss';
import { LinkProps, NavLink } from 'react-router-dom';

const FooterNavLink = ({type , children , to  , disabled} : {type : "light" | "dark"  , disabled? : boolean } & LinkProps) => {
  return (
    disabled  ? <div  className={`${styles.container} ${type === "light" ? styles.light : styles.dark }`}>{children}</div> : 
    <NavLink to={to} className={`${styles.container} ${type === "light" ? styles.light : styles.dark }`}>
      {children}
    </NavLink>
  );
};

export default FooterNavLink;
