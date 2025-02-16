import React from "react";
import WarningSign from "../WarningSign/WarningSign";

import "./Table.css";

type Props = {
  config: any;
  data: any;
};

const Table = ({ config, data }: Props) => {
  const renderedRows = data.map((company: any) => {
    return (
      <tr key={company.cik} className="custom-table-row">
        {config.map((val: any, index: number) => (
          <td key={index} className="custom-table-cell">
            {val.render?.(company) || <WarningSign />}
          </td>
        ))}
      </tr>
    );
  });

  const renderedHeaders = config.map((config: any, index: number) => {
    return (
      <th key={index} className="custom-table-header">
        {config.label}
      </th>
    );
  });

  return (
    <div className="custom-table-container">
      <table className="custom-table">
        <thead>
          <tr className="custom-table-header-row">{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
