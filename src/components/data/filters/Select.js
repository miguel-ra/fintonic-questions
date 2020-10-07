import React, { useMemo } from "react";
import cx from "classnames";
import classes from "./Select.module.scss";

function Select({
  column: { filterValue, setFilter, preFilteredRows, id, Header },
}) {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      className={cx(classes.select, { [classes.active]: !!filterValue })}
      aria-label={id}
    >
      <option value="">{Header} (All)</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {};

export default Select;
