import React, { ReactNode } from 'react'
import styles from './FInanceWrapper.module.scss'

const FInanceWrapper = ({children} : {children : ReactNode}) => {
  return (
    <div className={styles.container}>{children}</div>
  )
}

export default FInanceWrapper