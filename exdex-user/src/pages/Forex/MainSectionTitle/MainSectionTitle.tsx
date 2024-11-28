
import React from 'react'
import style from  './MainSectionTitle.module.scss'
;
const MainSectionTitle = ({title , id , className} : {title : string , id?:string , className?:string}) => {
  return (
    <h2 id={id} className={`${style.titleContainer} ${className}`}>
     {title}
    </h2>
  )
}

export default MainSectionTitle