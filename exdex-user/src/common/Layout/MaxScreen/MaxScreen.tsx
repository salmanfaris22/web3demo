import React, { ReactNode } from 'react'

const MaxScreen = ({children} : {children : ReactNode}) => {
  return (
      <div className='maxScreen' >{children} </div>
  )
}

export default MaxScreen