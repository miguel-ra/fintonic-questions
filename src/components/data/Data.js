import React from "react";
import PropTypes from "prop-types";
import { useTable } from "react-table";
import Filter from "./Filter";
import Table from "./Table";
import Pagination from "./Pagination";
import getPluginsToLoad from "./helpers/getPluginsToLoad";

const DataContext = React.createContext();

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
