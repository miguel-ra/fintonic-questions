import React from "react";
import { ReactQueryConfigProvider } from "react-query";

const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
  },
};

function AppProviders({ children }) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      {children}
    </ReactQueryConfigProvider>
  );
}

export { AppProviders };
