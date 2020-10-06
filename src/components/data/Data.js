import React from "react";
import { useSortBy, useTable } from "react-table";
import Table from "./Table";

const DataContext = React.createContext();

function Data({ columns, data, children }) {
  const methods = useTable(
    {
      columns,
      data,
    },
    useSortBy
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

Data.Table = Table;

export default Data;
