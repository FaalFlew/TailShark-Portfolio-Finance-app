import React from "react";
import WarningSign from "../WarningSign/WarningSign";

import "./RatioList.css";

type Props = {
  config: any;
  data: any;
};

const RatioList = ({ config, data }: Props) => {
  const renderedRows = config.map((row: any, index: number) => {
    return (
      <li className="ratio-list-item">
        <div className="ratio-list-content">
          <div className="ratio-list-text">
            <p className="ratio-list-label">{row.label}</p>
            {row.subTitle && (
              <p className="ratio-list-subtitle">{row.subTitle}</p>
            )}
          </div>
          <div className="ratio-list-rendered">
            {row.render?.(data) || <WarningSign />}
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="ratio-list-container">
      <ul className="ratio-list">{renderedRows}</ul>
    </div>
  );
};

export default RatioList;
