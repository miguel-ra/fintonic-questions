import { generatePages } from "../Pagination";

describe("generatePages", () => {
  it("Should return pageIndex if showPages is invalid", () => {
    const PAGE_INDEX = 0;
    const SHOW_PAGES = -1;
    const NUMBER_OF_PAGES = 5;

    const result = generatePages(PAGE_INDEX, SHOW_PAGES, NUMBER_OF_PAGES);

    expect(result).toEqual([PAGE_INDEX]);
  });

  it("Should return a valid pagination", () => {
    const SHOW_PAGES = 3;
    const NUMBER_OF_PAGES = 5;

    let result = generatePages(0, SHOW_PAGES, NUMBER_OF_PAGES);
    expect(result).toEqual([0, 1, 2]);

    result = generatePages(3, SHOW_PAGES, NUMBER_OF_PAGES);
    expect(result).toEqual([2, 3, 4]);

    result = generatePages(5, SHOW_PAGES, NUMBER_OF_PAGES);
    expect(result).toEqual([3, 4, 5]);
  });
});
