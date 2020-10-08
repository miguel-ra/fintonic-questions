import React from "react";
import PropTypes from "prop-types";
import { useTable } from "react-table";
import { useFilters, usePagination, useSortBy } from "react-table";
import Filter from "./Filter";
import Table from "./Table";
import Pagination from "./Pagination";

const DataContext = React.createContext();

const COMPONENT_PLUGINS = new Map([
  [Filter, useFilters],
  [Table, useSortBy],
  [Pagination, usePagination],
]);

const PLUGINS_ORDER = new Map([
  [useFilters, 1],
  [useSortBy, 2],
  [usePagination, 3],
]);

function getPluginsToLoad(children = []) {
  const pluginsToLoad = children
    .map((child) => COMPONENT_PLUGINS.get(child.type))
    .filter((plugin) => plugin);

  const pluginsSorted = pluginsToLoad.sort((a, b) => {
    const first = PLUGINS_ORDER.get(a);
    const second = PLUGINS_ORDER.get(b);

    if (first < second) {
      return -1;
    } else if (first > second) {
      return 1;
    }

    return 0;
  });

  return pluginsSorted;
}

function Data({ columns, data, children }) {
  const plugins = getPluginsToLoad(React.Children.toArray(children));

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

function useDataContext() {
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

export {
  useDataContext,
  COMPONENT_PLUGINS, // Exported for testing purposes
  getPluginsToLoad, // Exported for testing purposes
};

export default Data;
