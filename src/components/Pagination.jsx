const Pagination = ({ page, setPage, pageSize }) => {
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Calculate visible pages for better UX
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(pageSize - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < pageSize - 1) {
      rangeWithDots.push("...", pageSize);
    } else {
      rangeWithDots.push(pageSize);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center">
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          className={`rounded-xl p-3 transition-all duration-200 ${
            page === 1
              ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
              : "hover:shadow-soft border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
          }`}
          onClick={() => page > 1 && handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Page Numbers */}
        {visiblePages.map((pageNumber, index) => (
          <div key={index}>
            {pageNumber === "..." ? (
              <span className="px-3 py-2 text-neutral-400">...</span>
            ) : (
              <button
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  page === pageNumber
                    ? "bg-gradient-primary shadow-soft text-white"
                    : "hover:shadow-soft border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )}
          </div>
        ))}

        {/* Next Button */}
        <button
          className={`rounded-xl p-3 transition-all duration-200 ${
            page === pageSize
              ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
              : "hover:shadow-soft border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
          }`}
          onClick={() => page < pageSize && handlePageChange(page + 1)}
          disabled={page === pageSize}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
