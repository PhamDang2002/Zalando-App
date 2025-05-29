import { usePurchaseMutation } from "@services/rootApi";
import { useState } from "react";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const HeaderProductDetail = ({
  product,
  isMediumLayout,
  imageRef,
  handleZoom,
  handleRemoveZoom,
  prev,
  currentImages,
  chooseActive,
  next,
  handleBuyCount,
  buyCount,
  activeImage,
  ProductRating,
  currencyFormatter,
  rateSale,
  QuantityController,
}) => {
  const [productCart, setProductCart] = useState([]);
  const [purchase, { data, isLoading }] = usePurchaseMutation();
  const getData = useParams();
  const product_id = getData.id;
  const buy_count = buyCount;
  const dispatch = useDispatch();
  function onSubmit() {
    const formData = { product_id, buy_count: buyCount };
    purchase(formData); // Gọi API để thêm sản phẩm vào giỏ
  }
  useEffect(() => {
    setProductCart(data);
  }, [data, dispatch]);

  return (
    <div>
      <div className="bg-white p-4 shadow">
        <div className={`${!isMediumLayout && "grid grid-cols-12"} gap-9`}>
          <div className="col-span-5">
            <div
              className="relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow"
              onMouseMove={handleZoom}
              onMouseLeave={handleRemoveZoom}
            >
              <img
                src={activeImage || 0}
                alt={product.name}
                className="absolute left-0 top-0 h-full w-full bg-white object-cover"
                ref={imageRef}
              />
            </div>
            <div className="relative mt-4 grid grid-cols-5 gap-1">
              <button
                className="absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                onClick={prev}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              {currentImages.map((img) => {
                const isActive = img === activeImage;
                return (
                  <div
                    className="relative w-full pt-[100%]"
                    key={img}
                    onMouseEnter={() => chooseActive(img)}
                  >
                    <img
                      src={img}
                      alt={product.name}
                      className={`absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover`}
                    />
                    {isActive && (
                      <div className="absolute inset-0 border-2 border-orange" />
                    )}
                  </div>
                );
              })}
              <button
                className="absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                onClick={next}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
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
          <div className="col-span-7">
            <h1
              className={`${isMediumLayout && "mt-2"} text-xl font-medium uppercase`}
            >
              {product.name}
            </h1>
            <div className="mt-8 flex items-center">
              <div className="flex items-center">
                <span className="mr-1 border-b border-b-orange text-orange">
                  {product.rating}
                </span>
                <ProductRating
                  star={product.rating}
                  activeClassname="fill-orange text-orange h-4 w-4"
                  nonActiveClassname="fill-gray-300 text-gray-300 h-4 w-4"
                />
              </div>
              <div className="mx-4 h-4 w-[1px] bg-gray-300"></div>
              <div>
                <span>{currencyFormatter(product.sold)}</span>
                <span className="ml-1 text-gray-500">Đã bán</span>
              </div>
            </div>
            <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
              <div className="text-gray-500 line-through">
                {currencyFormatter(product.price_before_discount)}
              </div>
              <div className="ml-3 text-3xl font-medium text-orange">
                {currencyFormatter(product.price)}
              </div>
              <div
                className={`${isMediumLayout ? "hidden" : "ml-4 rounded-sm bg-primary px-1 py-[2px] text-xs font-semibold uppercase text-white"}`}
              >
                {rateSale(product.price_before_discount, product.price)} giảm
              </div>
            </div>
            <div className="mt-8 flex items-center">
              <div className="capitalize text-gray-500">Số lượng</div>
              <QuantityController
                onDecrease={handleBuyCount}
                onIncrease={handleBuyCount}
                onType={handleBuyCount}
                value={buyCount}
                max={product.quantity}
              />
              <div className="ml-6 text-sm text-gray-500">
                {product.quantity} {"Sản phẩm có sẵn"}
              </div>
            </div>
            <div className="mt-8 flex items-center">
              <button
                className="flex h-12 items-center justify-center rounded-sm border border-orange bg-primary/10 px-5 capitalize text-orange shadow-sm hover:bg-primary/5"
                onClick={() => onSubmit({ product_id, buy_count })}
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="mr-[10px] h-5 w-5 animate-spin text-orange"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    enableBackground="new 0 0 15 15"
                    viewBox="0 0 15 15"
                    x={0}
                    y={0}
                    className="mr-[10px] h-5 w-5 fill-current stroke-orange text-orange"
                  >
                    <g>
                      <g>
                        <polyline
                          fill="none"
                          points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy="13.5" r={1} stroke="none" />
                        <circle cx="11.5" cy="13.5" r={1} stroke="none" />
                      </g>
                      <line
                        fill="none"
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        x1="7.5"
                        x2="10.5"
                        y1={7}
                        y2={7}
                      />
                      <line
                        fill="none"
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        x1={9}
                        x2={9}
                        y1="8.5"
                        y2="5.5"
                      />
                    </g>
                  </svg>
                )}
                {isLoading ? "Đang thêm..." : "Thêm vào giỏ hàng"}
              </button>
              <button className="fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-primary px-5 capitalize text-white shadow-sm outline-none hover:bg-primary/90">
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderProductDetail;
