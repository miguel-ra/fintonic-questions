import React from "react";
import PropTypes from "prop-types";
import { useSortBy, useTable, usePagination, useFilters } from "react-table";
import Filter from "./Filter";
import Table from "./Table";
import Pagination from "./Pagination";

const DataContext = React.createContext();

const COMPONENT_PLUGINS = new Map([
  [Filter, useFilters],
  [Table, useSortBy],
  [Pagination, usePagination],
]);

function Data({ columns, data, children }) {
  const plugins = React.Children.map(children, (child) =>
    COMPONENT_PLUGINS.get(child.type)
  );

  const methods = useTable(
    {
      columns,
      data,
    },
    ...plugins
  );

  return (
    <DataContext.Provider value={{ ...methods }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error(`useDataContext must be used within a DataContext`);
  }
  return context;
}

Data.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.elementType,
      accessor: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

Data.Filter = Filter;
Data.Table = Table;
Data.Pagination = Pagination;

export default Data;
