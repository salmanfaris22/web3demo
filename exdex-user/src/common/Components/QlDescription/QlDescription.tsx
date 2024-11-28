import React from 'react'
import HTMLParser from '../HTMLParser/HTMLParser'
import styles from './QLDescription.module.scss'

const QlDescription = ({description} : {description : string}) => {
  return (
    <div className={`ql-editor qlGlobal  ql-container ${styles.description}`}>
    {HTMLParser(description || "")}
  </div>
  )
}

export default QlDescription