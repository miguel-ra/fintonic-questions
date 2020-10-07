import { useFilters, usePagination, useSortBy } from "react-table";
import getPluginsToLoad, { COMPONENT_PLUGINS } from "../getPluginsToLoad";
import Filter from "../../Filter";
import Table from "../../Table";
import Pagination from "../../Pagination";

const NO_PLUGIN_TYPE = "NO_PLUGIN_TYPE";
const FILTER_TYPE = { type: Filter };
const TABLE_TYPE = { type: Table };
const PATINATION_TYPE = { type: Pagination };

describe("getPluginsToLoad", () => {
  it("Should return an empty array if children are not sent", () => {
    const result = getPluginsToLoad();
    expect(result).toEqual([]);
  });

  it("Should return an empty array if children do not require a plugin", () => {
    const result = getPluginsToLoad([{ type: NO_PLUGIN_TYPE }]);

    expect(result).toEqual([]);
  });

  it("Should return the correct plugin for each component", () => {
    // Filter
    let result = getPluginsToLoad([FILTER_TYPE]);
    expect(result).toEqual([COMPONENT_PLUGINS.get(FILTER_TYPE.type)]);

    // Table
    result = getPluginsToLoad([TABLE_TYPE]);
    expect(result).toEqual([COMPONENT_PLUGINS.get(TABLE_TYPE.type)]);

    // PAGINATION
    result = getPluginsToLoad([PATINATION_TYPE]);
    expect(result).toEqual([COMPONENT_PLUGINS.get(PATINATION_TYPE.type)]);
  });

  it("Should return the correct plugins in the correct order", () => {
    const result = getPluginsToLoad([PATINATION_TYPE, FILTER_TYPE, TABLE_TYPE]);

    expect(result[0]).toEqual(useFilters);
    expect(result[1]).toEqual(useSortBy);
    expect(result[2]).toEqual(usePagination);
  });
});
