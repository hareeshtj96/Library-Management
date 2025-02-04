import React from "react";
import { Button } from "@mui/material";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex gap-4 justify-center mt-4">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </Button>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
