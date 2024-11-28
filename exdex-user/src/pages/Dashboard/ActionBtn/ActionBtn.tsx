import React, { ButtonHTMLAttributes } from 'react'
import styles from  "./ActionBtn.module.scss"

const ActionBtn = ({children ,  ...props} : ButtonHTMLAttributes<HTMLButtonElement> ) => {
  return (
    <button {...props} className={`${styles.container} ${props.className}`}>{children}</button>
  )
}

export default ActionBtn