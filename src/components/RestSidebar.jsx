import { Button, List, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStar";

import { useSidebarForHeader } from "@hooks/index";
import { useDispatch } from "react-redux";
import { searchProduct } from "@redux/slices/authSlice";

const RestSidebar = ({
  productList,
  selectedCategory,
  handleCategoryChange,
}) => {
  const {
    priceMin,
    priceMax,
    setPriceMin,
    setPriceMax,
    errorMessage,
    handleApply,
    rating,
    setRating,
    triggerResetAll,
  } = useSidebarForHeader(() => {
    handleCategoryChange(null);
  });
  const dispatch = useDispatch();
  return (
    <div>
      <div className="mt-4 h-[1px] bg-gray-300" />
      <ul>
        <li className="py-2 pl-2">
          <List className="absolute flex flex-col">
            {productList?.map((product) => (
              <Link
                key={product._id}
                className={`mb-2 ${selectedCategory === product._id ? "font-bold text-primary" : "text-black"}`}
                onClick={() => handleCategoryChange(product._id)} // gọi hàm khi click
              >
                {product.name}
              </Link>
            ))}
          </List>
        </li>
      </ul>
      <Link to="/" className="mt-4 flex items-center font-bold uppercase">
        <svg
          enableBackground="new 0 0 15 15"
          viewBox="0 0 15 15"
          x={0}
          y={0}
          className="mr-3 h-4 w-3 fill-current stroke-current"
        >
          <g>
            <polyline
              fill="none"
              points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        <div>Bộ lọc Tìm kiếm</div>
      </Link>
      <div className="my-4 h-[1px] bg-gray-300" />
      <div className="my-5">
        <div>Khoảng giá</div>
        <form className="mt-2">
          <div className="flex items-start">
            <TextField
              slotProps={{
                input: { className: "h-8 w-24 px-3 py-2" },
                htmlInput: { className: "!p-0" },
              }}
              value={priceMin || ""}
              onChange={(e) => setPriceMin(e.target.value)}
              type="number"
              placeholder="₫ TỪ"
              onKeyDown={(e) => {
                // Ngăn chặn nhập dấu + và -
                if (
                  e.key === "+" ||
                  e.key === "-" ||
                  e.key === "e" ||
                  e.key === "." ||
                  e.key === ","
                ) {
                  e.preventDefault();
                }
              }}
            />
            <div className="mx-2 mt-2 shrink-0">-</div>
            <TextField
              type="number"
              placeholder="₫ ĐẾN"
              value={priceMax || ""}
              onChange={(e) => setPriceMax(e.target.value)}
              slotProps={{
                input: { className: "h-8 w-24 px-3 py-2" },
                htmlInput: { className: "!p-0" },
              }}
              onKeyDown={(e) => {
                // Ngăn chặn nhập dấu + và -
                if (
                  e.key === "+" ||
                  e.key === "-" ||
                  e.key === "e" ||
                  e.key === "." ||
                  e.key === ","
                ) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div className="mt-1 min-h-[1.25rem] text-center text-sm text-primary">
            {errorMessage}
          </div>

          <Button variant="contained" className="w-full" onClick={handleApply}>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className="my-4 h-[1px] bg-gray-300" />
      <div className="text-sm">Đánh giá</div>
      <RatingStars rating={rating} setRating={setRating} />
      <div className="my-4 h-[1px] bg-gray-300" />
      <Button
        variant="contained"
        className="w-full"
        onClick={() => {
          triggerResetAll(); // Kích hoạt reset
          dispatch(searchProduct(undefined));
        }}
      >
        Xóa tất cả
      </Button>
    </div>
  );
};

export default RestSidebar;
