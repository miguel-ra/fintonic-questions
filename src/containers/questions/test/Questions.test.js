import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Questions from "../Questions";
import { API_URL } from "../../../constants";
import { mockServerResponse } from "../../../internals/testing/utils";
import QUESTIONS_MOCK from "../../../internals/mocks/questions";
import userEvent from "@testing-library/user-event";
import { columns } from "../data-config";

const DEFAULT_QUESTIONS_PER_PAGE = 10;

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [screen.getByRole("img", { name: /spinner/i })],
    {
      timeout: 4000,
    }
  );

describe("<Questions />", () => {
  it("Should render initial components", () => {
    render(<Questions />);

    const header = screen.getByRole("heading", { name: /browse questions/i });
    const loader = screen.getByRole("img", { name: /spinner/i });

    expect(header).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
  });

  it("Should show default error if api responds 200 but the in response response_code is not 0", async () => {
    mockServerResponse(API_URL, { response_code: 1 });
    render(<Questions />);

    await waitForLoadingToFinish();

    const errorText = screen.getByText("Error fetching data");
    expect(errorText).toBeInTheDocument();
  });

  it("Should render filter and update table when one is applied", async () => {
    render(<Questions />);

    await waitForLoadingToFinish();

    //Check filters are render
    const categoryFilter = screen.getByRole("combobox", { name: /category/i });
    const typeFilter = screen.getByRole("combobox", { name: /type/i });
    const difficultyFilter = screen.getByRole("combobox", {
      name: /difficulty/i,
    });
    expect(categoryFilter).toBeInTheDocument();
    expect(typeFilter).toBeInTheDocument();
    expect(difficultyFilter).toBeInTheDocument();

    // Set filter
    userEvent.selectOptions(categoryFilter, QUESTIONS_MOCK.results[0].category);
    const rowgroup = screen.getByRole("rowgroup", { name: /content/i });
    expect(rowgroup.children).toHaveLength(1);

    // Reset filter
    fireEvent.change(categoryFilter, { target: { value: "" } });
    expect(rowgroup.children).toHaveLength(DEFAULT_QUESTIONS_PER_PAGE);
  });

  it("Should render table and update row sorting when click on a table header", async () => {
    const COLUMN = { index: 0, id: "category" };

    render(<Questions />);

    await waitForLoadingToFinish();

    const sortByHeaders = screen.getAllByRole("columnheader", {
      name: /toggle sortby/i,
    });

    // The columns from the config are render
    const configSorteableColumns = columns
      .map((column) => {
        return !column.disableSortBy ? column.Header : null;
      })
      .filter((column) => column);
    const domSorteableColumns = sortByHeaders.map(
      (th) => th.innerHTML.split("<")[0]
    );
    expect(domSorteableColumns).toEqual(configSorteableColumns);

    // Table render is render
    const rowgroup = screen.getByRole("rowgroup", { name: /content/i });
    expect(rowgroup.children).toHaveLength(DEFAULT_QUESTIONS_PER_PAGE);

    // Sort is changed
    const valueFristRow = rowgroup.children[0].children[COLUMN.index].innerHTML;
    userEvent.dblClick(sortByHeaders[COLUMN.index]);
    const newValueFristRow =
      rowgroup.children[0].children[COLUMN.index].innerHTML;

    // Check the last is the first
    expect(valueFristRow).not.toBe(newValueFristRow);
    expect(newValueFristRow).toBe(
      QUESTIONS_MOCK.results[QUESTIONS_MOCK.results.length - 1][COLUMN.id]
    );
  });

  it("Should render pagination with the correct number of questions and pages", async () => {
    const NUMBER_OF_ARROW_BUTTONS = 2;

    render(<Questions />);

    await waitForLoadingToFinish();

    const rowgroup = screen.getByRole("rowgroup", { name: /content/i });
    expect(rowgroup.children).toHaveLength(DEFAULT_QUESTIONS_PER_PAGE);

    // Check number of buttons
    const pagination = screen.getByRole("navigation", { name: "pagination" });
    const numberOfButtons =
      Math.ceil(QUESTIONS_MOCK.results.length / DEFAULT_QUESTIONS_PER_PAGE) +
      NUMBER_OF_ARROW_BUTTONS;
    expect(pagination.children).toHaveLength(numberOfButtons);

    // Change to next page
    const nextButton = pagination.children[pagination.children.length - 1];
    userEvent.click(nextButton);

    // Next page is load
    expect(rowgroup.children).toHaveLength(
      QUESTIONS_MOCK.results.slice(
        DEFAULT_QUESTIONS_PER_PAGE,
        DEFAULT_QUESTIONS_PER_PAGE * 2
      ).length
    );
  });
});
