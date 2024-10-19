import React from 'react'
import './TileContainer.css'
type Props = {
    children:React.ReactNode;
    loading?:boolean;
}

const TileContainer = ({children, loading}: Props) => {
  return (
   
         <div className={`tiles-container ${loading && "loading"}`}>{children}</div>
     )
}

export default TileContainer
