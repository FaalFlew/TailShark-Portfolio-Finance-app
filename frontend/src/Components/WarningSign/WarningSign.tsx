import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faExclamation } from "@fortawesome/free-solid-svg-icons";
import "./WarningSign.css";

const ErrorIcon: React.FC = () => {
  return (
    <div className="error-icon" data-tooltip="No data available">
      <FontAwesomeIcon icon={faCircle} className="circle" />
      <FontAwesomeIcon icon={faExclamation} className="exclamation" />
    </div>
  );
};

export default ErrorIcon;
