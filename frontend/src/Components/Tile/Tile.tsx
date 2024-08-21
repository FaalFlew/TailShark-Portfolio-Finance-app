import { formatLargeMonetaryNumber } from "../../Utils/NumberFormatting";
import React from "react";
import "./Tile.css";
interface Props {
  title: string;
  subTitle?: string | number;
}

const Tile = ({ title,  subTitle = "Not available" }: Props) => {
  return (
    <div className="tile-container">
      <div>
        <h5 className="tile-title">{title}</h5>

        <div className="tile-subtitle-container">
          {typeof subTitle === "number" && !isNaN(subTitle) ? (
            <>{formatLargeMonetaryNumber(subTitle)}</>
          ) : (
            <>{subTitle}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tile;
