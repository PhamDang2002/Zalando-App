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
    <div className="bg-gray-300/40 px-3 py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div>Sắp xếp theo</div>
          <button
            className={`h-8 px-4 text-center text-sm capitalize ${
              sortType === "createdAt" ? "bg-primary text-white" : "bg-white"
            }`}
            onClick={() => setSortType("createdAt")}
          >
            Phổ biến
          </button>
          <button
            className={`h-8 px-4 text-center text-sm capitalize ${
              sortType === "view" ? "bg-primary text-white" : "bg-white"
            }`}
            onClick={() => setSortType("view")}
          >
            Mới nhất
          </button>
          <button
            className={`h-8 px-4 text-center text-sm capitalize ${
              sortType === "sold" ? "bg-primary text-white" : "bg-white"
            }`}
            onClick={() => setSortType("sold")}
          >
            Bán chạy
          </button>
          <select
            className={`h-8 px-4 text-left ${orderType ? "bg-primary text-white" : "bg-white"} text-sm capitalize outline-none`}
            onChange={handleSortChange} // sử dụng onChange thay vì onClick
          >
            <option value="default" className="bg-white text-black">
              Mặc định
            </option>
            <option value="asc" className="bg-white text-black">
              Giá: Thấp đến cao
            </option>
            <option value="desc" className="bg-white text-black">
              Giá: Cao đến thấp
            </option>
          </select>
        </div>

        <div className="flex items-center">
          <div className="ml-2 flex">
            <span
              className={`${page <= 1 && "cursor-not-allowed"} flex h-8 w-9 cursor-pointer items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 shadow hover:bg-slate-100`}
              onClick={() => page > 1 && setPage(page - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-3 w-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </span>

            <span
              className={`${page >= pageSize && "cursor-not-allowed"} flex h-8 w-9 cursor-pointer items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 shadow hover:bg-slate-100`}
              onClick={() => page < pageSize && setPage(page + 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-3 w-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductType;
