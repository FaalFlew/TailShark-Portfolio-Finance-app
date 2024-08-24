import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Utils/NumberFormatting";
import React from "react";
import "./Tile.css";
interface Props {
  title: string;
  subTitle?: string | number;
  priceChange?: number;
}

const Tile = ({ title, subTitle = "Not available", priceChange }: Props) => {
  return (
    <div className="tile-container">
      <div>
        <h5 className="tile-title">{title}</h5>

        <div className="tile-subtitle-container">
          {typeof subTitle === "number" && !isNaN(subTitle) ? (
            <>
              <div>{formatLargeMonetaryNumber(subTitle)}</div>
              {priceChange !== undefined && (
                <div
                  className={`price-change ${
                      priceChange > 0
                        ? "positive"
                        : priceChange < 0
                        ? "negative"
                        : "neutral"
                    }`}
                >
                  <span className="">{priceChange} </span>
                  <span className="percentage-change">{`(${formatRatio(
                    Math.abs((priceChange / (subTitle - priceChange)) * 100)
                  )}%)`}</span>
                </div>
              )}
            </>
          ) : (
            <>{subTitle}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tile;
