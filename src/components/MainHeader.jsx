import { Link } from "react-router-dom";

import Popover from "./Popover";
import { IconButton } from "@mui/material";

import { Menu as MenuIcon } from "@mui/icons-material";

import { toggleDrawer } from "@redux/slices/settingsSlice";
import { useSearch, useSidebarForHeader } from "@hooks/index";
import { useDispatch } from "react-redux";

import { currencyFormatter } from "@libs/utils";
import { useGetPurchaseQuery } from "@services/rootApi";
import { searchProduct } from "@redux/slices/authSlice";

const MAX_PURCHASES = 5;
const MainHeader = () => {
  const dispatch = useDispatch();
  const {
    isMediumLayout,
    searchTerm,
    setSearchTerm,
    handleKeyDown,
    searchInputRef,
  } = useSearch();

  const status = -1;

  const purchasesInCart = useGetPurchaseQuery({ status })?.data?.data;
  const { triggerResetAll } = useSidebarForHeader(() => {
    setSearchTerm(null);
  });

  return (
    <div className="mt-4 grid w-full grid-cols-12 gap-4">
      {isMediumLayout ? (
        <Link to="/" className="col-span-2">
          <IconButton onClick={() => dispatch(toggleDrawer())}>
            <MenuIcon className="text-white" />
          </IconButton>
        </Link>
      ) : (
        <Link
          to="/"
          className="col-span-2"
          onClick={() => {
            triggerResetAll(); // Kích hoạt reset
            dispatch(searchProduct(undefined));
          }}
        >
          <img
            src="https://img.lazcdn.com/g/tps/images/ims-web/TB1T7K2d8Cw3KVjSZFuXXcAOpXa.png"
            alt=""
          />
        </Link>
      )}

      <form className="col-span-9">
        <div className="relative flex rounded-sm bg-white p-1">
          <input
            type="text"
            ref={searchInputRef}
            className="flex-grow border-none bg-transparent px-3 py-2 text-black outline-none"
            placeholder="Free Ship Đơn Từ 0Đ"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="absolute bottom-0.5 right-1 flex-shrink-0 rounded-sm bg-primary px-2 py-2 hover:opacity-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>

        <div className="flex w-full items-end justify-end">
          {/* {isMediumLayout && (
            <button className="flex-shrink-0 rounded-sm px-2 py-2 text-white hover:opacity-90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          )} */}
        </div>
      </form>

      <div className="flex items-center justify-center">
        <div>
          <Popover
            renderPopover={
              <div className="relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md">
                {purchasesInCart && purchasesInCart.length > 0 ? (
                  <div className="p-2">
                    <div className="capitalize text-gray-400">
                      Sản phẩm mới thêm
                    </div>
                    <div className="mt-5">
                      {purchasesInCart
                        .slice(0, MAX_PURCHASES)
                        .map((purchase) => (
                          <div
                            className="mt-2 flex py-2 hover:bg-gray-100"
                            key={purchase?.product?._id}
                          >
                            <div className="flex-shrink-0">
                              <img
                                src={`${purchase?.product?.image}`}
                                alt={purchase?.data?.data?.name}
                                className="h-11 w-11 object-cover"
                              />
                            </div>
                            <div className="ml-2 flex-grow overflow-hidden">
                              <div className="truncate">
                                {purchase?.product?.name}
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0">
                              <span className="text-orange">
                                {currencyFormatter(purchase?.price)}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="text-xs capitalize text-gray-500">
                        {purchasesInCart.length > MAX_PURCHASES
                          ? purchasesInCart.length - MAX_PURCHASES
                          : ""}{" "}
                        Thêm hàng vào giỏ
                      </div>
                      <Link
                        to="/cart"
                        className="rounded-sm bg-primary px-4 py-2 capitalize text-white hover:bg-opacity-90"
                      >
                        Xem giỏ hàng
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-[300px] w-[300px] flex-col items-center justify-center p-2">
                    <div className="mt-3 capitalize">Chưa có sản phẩm</div>
                  </div>
                )}
              </div>
            }
          >
            <Link to="/" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {purchasesInCart && purchasesInCart.length > 0 && (
                <span className="absolute left-[17px] top-[-5px] rounded-full bg-white px-[9px] py-[1px] text-xs text-orange">
                  {purchasesInCart?.length}
                </span>
              )}
            </Link>
          </Popover>
        </div>
      </div>
    </div>
  );
};
export default MainHeader;
