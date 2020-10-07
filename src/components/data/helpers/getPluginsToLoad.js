import { useFilters, usePagination, useSortBy } from "react-table";
import Filter from "../Filter";
import Table from "../Table";
import Pagination from "../Pagination";

export const COMPONENT_PLUGINS = new Map([
  [Filter, useFilters],
  [Table, useSortBy],
  [Pagination, usePagination],
]);

export const PLUGINS_ORDER = new Map([
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

export default getPluginsToLoad;
