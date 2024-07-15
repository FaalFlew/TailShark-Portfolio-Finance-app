import React from 'react'

interface Props  {
    title:string;
    subTitle:string;
}

const Tile = ({title, subTitle}: Props) => {
  return (
    <div>
    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
    {title}
    </h5>

  <span className="font-bold text-xl">{subTitle}</span></div>
  )
}

export default Tile