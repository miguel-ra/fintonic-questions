import React from "react";
import { ReactComponent as IconSpinner } from "../../assets/icons/spinner.svg";
import classes from "./Spinner.module.scss";

function Spinner() {
  return (
    <IconSpinner role="img" aria-label="spinner" className={classes.spinner} />
  );
}

export default Spinner;
