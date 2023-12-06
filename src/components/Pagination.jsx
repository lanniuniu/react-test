/* eslint-disable react/prop-types */
// Pagination.js
import React from "react";

/**
 * Generates a pagination component.
 *
 * @param {object} props - The properties for the pagination component.
 * @param {number} props.pageSize - The number of items per page.
 * @param {number} props.currentPage - The current page number.
 * @param {number} props.totalPages - The total number of pages.
 * @param {function} props.handlePageChange - The function to handle page changes.
 * @return {JSX.Element} - The pagination component.
 */
const Pagination = ({
  pageSize,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span style={{ margin: "0 10px" }}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>

      <span style={{ margin: "0 10px" }}>page size: {pageSize}</span>
    </div>
  );
};

export default Pagination;
