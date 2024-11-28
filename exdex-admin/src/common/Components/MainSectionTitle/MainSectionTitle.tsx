import React, { ReactNode } from 'react'
import styles from "./MainSectionTitle.module.scss"

const MainSectionTitle = ({children} : {children : ReactNode}) => {
  return (
    <div className={styles.container} >{children}</div>
  )
}

export default MainSectionTitle