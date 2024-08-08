import { formatLargeMonetaryNumber } from '../../Utils/NumberFormatting';
import React from 'react';
import './Tile.css'
interface Props {
  title: string;
  subTitle: string | number;
}

const Tile = ({ title, subTitle }: Props) => {
  return (
    <div className="tile-container">
      <div>
      <h5 className="tile-title">
        {title}
      </h5>

      <span className="tile-subtitle">
        {typeof subTitle === 'number' && !isNaN(subTitle) ? (
          <>{formatLargeMonetaryNumber(subTitle)}</>
        ) : (
          <>{subTitle}</>
        )}
      </span>
      </div>
    </div>
  );
};

export default Tile;
