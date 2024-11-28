import { LinkProps, NavLink as ReactNavigate } from 'react-router-dom'
import styles  from './Navigate.module.scss'

const Navigate = ({children , ...rest} : LinkProps) => {
  return (
    <ReactNavigate  {...rest} className={styles.link} >{children}</ReactNavigate>
  )
}

export default Navigate