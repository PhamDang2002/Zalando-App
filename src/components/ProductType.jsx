import { orderByTes, sortByTes } from "@redux/slices/authSlice";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ProductType = ({ setPage, page, pageSize }) => {
  const [sortType, setSortType] = useState();
  const [orderType, setOrderType] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sortByTes(sortType));
    dispatch(orderByTes(orderType));
  }, [sortType, dispatch, orderType]);

  const handleSortChange = (event) => {
    const value = event.target.value;
    if (value === "asc") {
      setSortType("price");
      setOrderType("asc");
    } else if (value === "desc") {
      setSortType("price");
      setOrderType("desc");
    } else if (value === "default") {
      setOrderType(undefined);
    }
  };

  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Sort Options */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-neutral-600">
            Sắp xếp theo:
          </span>

          <button
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
              sortType === "createdAt"
                ? "bg-gradient-primary shadow-soft text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
            onClick={() => setSortType("createdAt")}
          >
            <div className="flex items-center space-x-2">
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
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <span>Phổ biến</span>
            </div>
          </button>

          <button
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
              sortType === "view"
                ? "bg-gradient-primary shadow-soft text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
            onClick={() => setSortType("view")}
          >
            <div className="flex items-center space-x-2">
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
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Mới nhất</span>
            </div>
          </button>

          <button
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
              sortType === "sold"
                ? "bg-gradient-primary shadow-soft text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
            onClick={() => setSortType("sold")}
          >
            <div className="flex items-center space-x-2">
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
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
              <span>Bán chạy</span>
            </div>
          </button>

          <select
            className={`rounded-xl px-4 py-2 text-sm font-medium outline-none transition-all duration-200 ${
              orderType
                ? "bg-gradient-primary shadow-soft text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
            onChange={handleSortChange}
          >
            <option value="default" className="bg-white text-neutral-700">
              Mặc định
            </option>
            <option value="asc" className="bg-white text-neutral-700">
              Giá: Thấp đến cao
            </option>
            <option value="desc" className="bg-white text-neutral-700">
              Giá: Cao đến thấp
            </option>
          </select>
        </div>

        {/* Quick Navigation */}
        <div className="flex items-center space-x-2">
          <button
            className={`rounded-xl p-2 transition-all duration-200 ${
              page <= 1
                ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
                : "hover:shadow-soft bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
            onClick={() => page > 1 && setPage(page - 1)}
            disabled={page <= 1}
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

          <span className="px-3 py-2 text-sm font-medium text-neutral-600">
            Trang {page} / {pageSize || 1}
          </span>

          <button
            className={`rounded-xl p-2 transition-all duration-200 ${
              page >= pageSize
                ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
                : "hover:shadow-soft bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
            onClick={() => page < pageSize && setPage(page + 1)}
            disabled={page >= pageSize}
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
    </div>
  );
};

export default ProductType;
