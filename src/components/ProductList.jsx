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
      <div className="group">
        <div className="card card-hover overflow-hidden bg-white">
          {/* Image Container */}
          <div className="relative w-full overflow-hidden pt-[100%]">
            <img
              src={image}
              className="absolute left-0 top-0 h-full w-full bg-neutral-50 object-cover transition-transform duration-500 group-hover:scale-110"
              alt={name}
            />
            {/* Discount Badge */}
            {price_before_discount > price && (
              <div className="absolute left-3 top-3">
                <span className="badge badge-accent font-semibold">
                  -
                  {Math.round(
                    ((price_before_discount - price) / price_before_discount) *
                      100,
                  )}
                  %
                </span>
              </div>
            )}
            {/* Quick View Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/10">
              <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="shadow-soft rounded-full bg-white/90 p-3 backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5 text-neutral-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.639 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.639 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Product Name */}
            <div className="mb-3">
              <h3 className="group-hover:text-brand-600 line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-relaxed text-neutral-800 transition-colors duration-200">
                {name}
              </h3>
            </div>

            {/* Price Section */}
            <div className="mb-3">
              <div className="flex items-center space-x-2">
                {price_before_discount > price ? (
                  <>
                    <span className="text-accent-600 text-lg font-bold">
                      {currencyFormatter(price)}
                    </span>
                    <span className="text-sm text-neutral-400 line-through">
                      {currencyFormatter(price_before_discount)}
                    </span>
                  </>
                ) : (
                  <span className="text-accent-600 text-lg font-bold">
                    {currencyFormatter(price)}
                  </span>
                )}
              </div>
            </div>

            {/* Rating and Sold */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <ProductRating star={star} />
                </div>
              </div>
              <div className="text-xs text-neutral-500">
                <span className="font-medium">
                  {new Intl.NumberFormat().format(sold)}
                </span>
                <span className="ml-1">đã bán</span>
              </div>
            </div>

            {/* Free Shipping Badge */}
            <div className="mt-3 border-t border-neutral-100 pt-3">
              <span className="badge badge-success text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-1 h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                Miễn phí vận chuyển
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ProductList;
