import React, { FC } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <div>
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-l`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-300">{`Page ${currentPage}`}</span>
        <button
          className={`px-4 py-2 ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-r`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
