import React, { ReactNode } from 'react'
import styles from './DesktopWrapper.module.scss'

const DeskTopWrapper = ({children} : {children : ReactNode}) => {
  return (
    <div className={styles.desktopCards}>
      {children}
    </div>
  )
}

export default DeskTopWrapper