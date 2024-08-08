import React from 'react'
import './TileContainer.css'
type Props = {
    children:React.ReactNode;
}

const TileContainer = ({children}: Props) => {
  return (
   
         <div className='tiles-container'>{children}</div>
     )
}

export default TileContainer
