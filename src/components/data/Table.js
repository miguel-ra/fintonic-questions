import React from "react";
import { useDataContext } from "./Data";

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
    <>
      <table {...getTableProps()}>
        <thead>
          <tr>
            {headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                {!column.disableSortBy ? (
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : "🔽🔼"}
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
    </>
  );
}

export default Table;
