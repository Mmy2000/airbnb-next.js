import { ChevronLeft, ChevronRight } from "lucide-react";

interface Meta {
  current_page: number;
  last_page: number;
  total: number;
}

interface PaginationProps {
  meta: Meta;
  onPageChange: (page: number) => void;
}

const Pagination = ({ meta, onPageChange }: PaginationProps) => {
  const { current_page, last_page } = meta;

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (last_page <= 5) {
      for (let i = 1; i <= last_page; i++) pages.push(i);
    } else {
      if (current_page <= 3) {
        pages.push(1, 2, 3, 4, "...", last_page);
      } else if (current_page >= last_page - 2) {
        pages.push(
          1,
          "...",
          last_page - 3,
          last_page - 2,
          last_page - 1,
          last_page
        );
      } else {
        pages.push(
          1,
          "...",
          current_page - 1,
          current_page,
          current_page + 1,
          "...",
          last_page
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-1 mt-8 text-sm">
      {/* Previous Button */}
      <button
        aria-label="Previous Page"
        disabled={current_page === 1}
        onClick={() => onPageChange(current_page - 1)}
        className={`px-2 py-2 rounded-full border 
          ${
            current_page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "hover:bg-gray-200 border-gray-300 text-gray-600"
          }
        `}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      {getPages().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === current_page}
          className={`px-3 py-2 rounded-lg transition-all duration-200
            ${
              page === current_page
                ? "bg-airbnb text-white font-semibold cursor-not-allowed"
                : page === "..."
                ? "text-gray-400 cursor-default"
                : "hover:bg-airbnb-dark hover:text-white text-gray-700"
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        aria-label="Next Page"
        disabled={current_page === last_page}
        onClick={() => onPageChange(current_page + 1)}
        className={`px-2 py-2 rounded-full border 
          ${
            current_page === last_page
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "hover:bg-gray-200 border-gray-300 text-gray-600"
          }
        `}
      >
        <ChevronRight size={18} />
      </button>

      {/* Total Pages Info */}
      <span className="text-gray-500 ">
        Page {current_page} of {last_page}
      </span>
      <span className="text-gray-500 ml-2">
        {meta.total} results
      </span>

    </div>
  );
};

export default Pagination;
