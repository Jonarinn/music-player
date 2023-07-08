import React from "react";
import "./alert.scss";
import { AlertType } from "../../types";

interface AlertProps {
  alert: AlertType;
}

const Alert: React.FC<AlertProps> = ({ alert }) => {
  return (
    <article className={`alert ${alert.type}`}>
      <h1>{alert.type}</h1>
      <p>{alert.message}</p>
    </article>
  );
};

export default Alert;
