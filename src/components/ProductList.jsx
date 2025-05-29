import { currencyFormatter } from "@libs/utils";
import ProductRating from "./ProductRating";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { idProductDetail } from "@redux/slices/authSlice";

const ProductList = ({
  image,
  name,
  price,
  price_before_discount,
  star,
  sold,
  id,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(idProductDetail(id));
  }, [id, dispatch]);
  return (
    <Link to={`/products/${id}`}>
      <div className="col-span-1">
        <div className="h-[33vh] overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md">
          <div className="relative w-full pt-[100%]">
            <img
              src={image}
              className="absolute left-0 top-0 h-full w-full bg-white object-cover"
            />
          </div>
          <div className="overflow-hidden p-2">
            <div className="line-clamp-2 min-h-[2rem] text-xs">{name}</div>
            <div className="mt-3 flex items-center">
              <div className="max-w-[50%] truncate text-gray-500 line-through">
                <span className="text-sm">
                  {currencyFormatter(price_before_discount)}
                </span>
              </div>
              <div className="ml-1 truncate text-orange">
                <span className="text-sm">{currencyFormatter(price)}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end">
              <div className="flex items-center">
                <div className="relative">
                  <ProductRating star={star} />
                </div>
              </div>
              <div className="ml-2 text-sm">
                <span>{new Intl.NumberFormat().format(sold)}</span>
                <span className="ml-1">Đã bán</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ProductList;
