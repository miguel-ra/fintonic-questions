import React from "react";
import PropTypes from "prop-types";
import generatePages from "./helpers/generatePages";
import { useDataContext } from "./Data";
import classes from "./Pagination.module.scss";

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
    <nav className={classes.pagination}>
      {
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
      }
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => gotoPage(page)}
          disabled={pageIndex === page}
        >
          {page + 1}
        </button>
      ))}
      {
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
      }
    </nav>
  );
}

Pagination.propTypes = {
  showPages: PropTypes.number,
};

export default Pagination;
