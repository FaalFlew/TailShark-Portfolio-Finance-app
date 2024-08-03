import { formatLargeMonetaryNumber } from '../../Utils/NumberFormatting';
import React from 'react'

interface Props  {
    title:string;
    subTitle:string | number;
}

const Tile = ({title, subTitle}: Props) => {
  return (
    <div>
    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
    {title}
    </h5>

  <span className="font-bold text-xl">{ typeof subTitle === 'number' && !isNaN(subTitle)? 
  (<>{formatLargeMonetaryNumber(subTitle)}</>):
  (<>{subTitle}</>)
  }
  </span></div>
  )
}

export default Tile