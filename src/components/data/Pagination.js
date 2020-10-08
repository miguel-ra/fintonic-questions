import React from "react";
import PropTypes from "prop-types";
import { useDataContext } from "./Data";
import classes from "./Pagination.module.scss";

function generatePages(pageIndex, showPages, numberOfPages) {
  let pages = [pageIndex];
  let index = 0;
  let buttonInserted = true;
  while (pages.length < showPages && buttonInserted) {
    index += 1;
    buttonInserted = false;
    if (pageIndex + index < numberOfPages) {
      pages.push(pageIndex + index);
      buttonInserted = true;
    }
    if (pageIndex - index >= 0) {
      pages.unshift(pageIndex - index);
      buttonInserted = true;
    }
  }
  return pages;
}

function Pagination({ showPages = 3 }) {
  const {
    canPreviousPage,
    pageOptions,
    gotoPage,
    canNextPage,
    previousPage,
    nextPage,
    state: { pageIndex },
  } = useDataContext();

  const pages = generatePages(pageIndex, showPages, pageOptions.length);

  return (
    <nav className={classes.pagination} aria-label="pagination">
      {canPreviousPage && <button onClick={() => previousPage()}>{"<"}</button>}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => gotoPage(page)}
          disabled={pageIndex === page}
        >
          {page + 1}
        </button>
      ))}
      {canNextPage && <button onClick={() => nextPage()}>{">"}</button>}
    </nav>
  );
}

Pagination.propTypes = {
  showPages: PropTypes.number,
};

export { generatePages }; // Exported for testing purposes

export default Pagination;
