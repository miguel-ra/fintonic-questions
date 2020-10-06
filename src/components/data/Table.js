import React from "react";
import cx from "classnames";
import { useDataContext } from "./Data";
import classes from "./Table.module.scss";

import { ReactComponent as IconSort } from "../../assets/icons/sort.svg";
import { ReactComponent as IconSortDown } from "../../assets/icons/sort-down.svg";
import { ReactComponent as IconSortUp } from "../../assets/icons/sort-up.svg";

function Table() {
  const {
    getTableProps,
    getTableBodyProps,
    headers,
    prepareRow,
    rows,
    page,
  } = useDataContext();

  return (
    <div className={classes.wrapper}>
      <table className={classes.table} {...getTableProps()}>
        <thead>
          <tr>
            {headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={cx({
                  [classes.active]: column.isSorted,
                  [classes.isSorteable]: !column.disableSortBy,
                })}
              >
                {column.render("Header")}
                {!column.disableSortBy ? (
                  <span className={classes.icon}>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <IconSortDown />
                      ) : (
                        <IconSortUp />
                      )
                    ) : (
                      <IconSort />
                    )}
                  </span>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {(page || rows).map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
