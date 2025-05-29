import { useState } from "react";
import { useEffect } from "react";

const Pagination = ({ page, setPage, pageSize }) => {
  const handlePageChange = (newPage) => {
    setPage(newPage); // Cập nhật trạng thái page khi người dùng chọn trang
  };
  const [fullPage, setFullPage] = useState([]);

  useEffect(() => {
    const pages = [];
    for (let i = 1; i <= pageSize; i++) {
      pages.push(i);
    }
    setFullPage(pages);
  }, [pageSize]);

  return (
    <div>
      <div className="mt-6 flex flex-wrap justify-center">
        <span
          className={`mx-2 cursor-pointer rounded border ${page === 1 ? "hidden" : "bg-white"} px-3 py-2 shadow-sm`}
          onClick={() => page > 1 && handlePageChange(page - 1)}
        >
          Prev
        </span>
        {fullPage.map((pageNumber) => (
          <a
            key={pageNumber}
            className={`mx-2 cursor-pointer rounded border ${page === pageNumber ? "bg-primary text-white" : "border-transparent bg-white"} px-3 py-2 shadow-sm`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        ))}
        <span
          className={`mx-2 cursor-pointer rounded border ${page === pageSize ? "hidden" : "bg-white"} px-3 py-2 shadow-sm`}
          onClick={() => page < pageSize && handlePageChange(page + 1)}
        >
          Next
        </span>
      </div>
    </div>
  );
};

export default Pagination;
