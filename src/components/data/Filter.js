import React from "react";
import { useDataContext } from "./Data";
import Select from "./filters/Select";
import classes from "./Filter.module.scss";

function Filter() {
  const { headers } = useDataContext();

  return (
    <div className={classes.container}>
      {headers.map((column) =>
        column.canFilter ? (
          <React.Fragment key={column.id}>
            {column.render("Filter")}
          </React.Fragment>
        ) : null
      )}
    </div>
  );
}

Filter.Select = Select;

export default Filter;
