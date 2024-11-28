
import React, { ReactNode } from 'react'
import styles from './MainTitle.module.scss'




export const MainTitle = ({children} : {children : ReactNode}) => {
  return (
    <div className={styles.container}>{children}</div>
  )
}
