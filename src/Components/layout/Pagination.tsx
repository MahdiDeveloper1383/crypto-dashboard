import React from "react";
interface Pagintionprops {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}
export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: Pagintionprops) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded cursor-pointer ${
            currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
