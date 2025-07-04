import { Link } from "react-router-dom";
import { useState } from "react";

import Popover from "./Popover";
import { IconButton, Modal, Box } from "@mui/material";

import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import { toggleDrawer } from "@redux/slices/settingsSlice";
import { useSearch, useSidebarForHeader } from "@hooks/index";
import { useDispatch } from "react-redux";

import { currencyFormatter } from "@libs/utils";
import { useGetPurchaseQuery } from "@services/rootApi";
import { searchProduct } from "@redux/slices/authSlice";

const MAX_PURCHASES = 5;

const MobileSearchModal = ({
  open,
  onClose,
  searchTerm,
  setSearchTerm,
  handleKeyDown,
  searchInputRef,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-start justify-center p-4 pt-20"
    >
      <Box className="w-full max-w-md rounded-2xl bg-white p-6 shadow-large">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-800">Tìm kiếm</h3>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>
        <div className="relative">
          <input
            type="text"
            ref={searchInputRef}
            className="input-mobile"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-gradient-accent p-2 transition-all duration-300 hover:scale-105"
          >
            <SearchIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </Box>
    </Modal>
  );
};

const MainHeader = () => {
  const dispatch = useDispatch();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

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
    <>
      <div className="flex w-full items-center justify-between gap-4 sm:flex-row sm:gap-6">
        {/* Logo and Menu Button */}
        <div className="flex w-full items-center justify-between sm:w-auto">
          {isMediumLayout ? (
            <IconButton
              onClick={() => dispatch(toggleDrawer())}
              className="bg-white/10 transition-all duration-300 hover:bg-white/20"
              size="large"
            >
              <MenuIcon className="text-white" />
            </IconButton>
          ) : (
            <Link
              to="/"
              onClick={() => {
                triggerResetAll();
                dispatch(searchProduct(undefined));
              }}
              className="header-logo"
            >
              <div className="flex items-center">
                <svg
                  width={120}
                  height={22}
                  fill="white"
                  viewBox="0 0 132 24"
                  aria-labelledby=":Rphb8ap:"
                  aria-hidden="false"
                  role="img"
                  data-testid="zalando-logo"
                  className="sm:h-6 sm:w-[132px]"
                >
                  <title id=":Rphb8ap:">Zalando wohnen</title>
                  <path
                    fill="#FF4C00"
                    d="M21.803 9.411c-1.69-2.11-4.056-4.157-7.152-6.004l-.012-.006C11.518 1.598 8.591.539 5.95.105 4.299-.166 3.512.15 3.153.36c-.358.21-1.021.746-1.615 2.334C.588 5.238.025 8.343 0 11.994v.013c.025 3.65.587 6.755 1.538 9.299.594 1.588 1.257 2.124 1.615 2.334s1.147.526 2.796.255c2.642-.434 5.569-1.493 8.69-3.295l.012-.007c3.096-1.847 5.461-3.895 7.152-6.004 1.056-1.317 1.181-2.168 1.181-2.59 0-.42-.125-1.271-1.18-2.588"
                  />
                  <path
                    fill="white"
                    d="m28.986 17.42 10.15-9.848h-9.879V5.065h13.805v2.87l-10.15 9.847h10.392v2.508H28.986zM43.787 16.151c0-3.383 2.9-4.32 5.467-4.651l4.773-.605c1.148-.15 1.48-.664 1.48-1.359v-.03c0-1.36-1.178-2.356-3.745-2.356-2.477 0-3.867.936-4.109 2.507h-3.202c.363-3.081 3.051-4.984 7.401-4.984 4.864 0 6.857 2.054 6.857 5.437v10.18h-3.05v-2.417c-1.3 1.873-3.626 2.81-6.254 2.81-3.474 0-5.618-1.752-5.618-4.532m11.72-2.748v-.725c-.513.211-1.087.332-1.722.422l-3.806.514c-1.963.272-2.87.997-2.87 2.326 0 1.42 1.209 2.266 3.172 2.266 3.233 0 5.226-2.206 5.226-4.803M60.13 1.199h3.202v19.09H60.13zM64.389 16.151c0-3.383 2.9-4.32 5.467-4.651l4.773-.605c1.148-.15 1.48-.664 1.48-1.359v-.03c0-1.36-1.178-2.356-3.746-2.356-2.477 0-3.866.936-4.108 2.507h-3.202c.363-3.081 3.051-4.984 7.401-4.984 4.863 0 6.857 2.054 6.857 5.437v10.18h-3.05v-2.417c-1.3 1.873-3.626 2.81-6.254 2.81-3.474 0-5.618-1.752-5.618-4.532m11.72-2.748v-.725c-.513.211-1.087.332-1.722.422l-3.806.514c-1.963.272-2.87.997-2.87 2.326 0 1.42 1.209 2.266 3.172 2.266 3.232 0 5.226-2.206 5.226-4.803M80.73 5.065h3.203v2.477c1.147-1.812 3.322-2.87 5.98-2.87 3.988 0 6.344 2.296 6.344 6.526v9.092h-3.202v-8.64c0-2.809-1.48-4.35-4.199-4.35-2.93 0-4.923 1.964-4.923 4.743v8.247H80.73zM97.315 12.617c0-4.924 3.413-7.945 7.491-7.945 2.447 0 4.562.876 5.83 2.689V1.199h3.202v19.09h-3.202v-2.325c-1.389 1.873-3.383 2.718-5.83 2.718-4.078 0-7.491-3.08-7.491-8.065m13.412.03c0-3.172-1.873-5.377-5.045-5.377-3.141 0-5.044 2.175-5.044 5.347 0 3.202 1.903 5.468 5.044 5.468 3.172 0 5.045-2.266 5.045-5.438M114.896 12.647c0-4.682 3.172-7.974 8.397-7.974 5.257 0 8.398 3.292 8.398 7.974s-3.141 8.036-8.398 8.036c-5.225 0-8.397-3.353-8.397-8.036m13.472 0c0-2.96-1.631-5.376-5.075-5.376s-5.074 2.416-5.074 5.376c0 2.991 1.631 5.438 5.074 5.438 3.444 0 5.075-2.447 5.075-5.438"
                  />
                </svg>
                <div className="mx-2 h-4 w-[1px] bg-primary sm:mx-4 sm:h-6" />
                <div className="text-sm font-medium capitalize text-primary sm:text-base md:text-xl">
                  Giỏ hàng
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Search Form */}
        <form className="header-search">
          <div className="relative flex rounded-xl bg-white/95 p-2 shadow-soft backdrop-blur-sm sm:rounded-2xl">
            <input
              type="text"
              ref={searchInputRef}
              className="flex-grow border-none bg-transparent px-3 py-2 text-sm text-neutral-800 outline-none placeholder:text-neutral-500 sm:px-4 sm:py-3"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {!isMediumLayout && (
              <button
                type="submit"
                className="flex-shrink-0 rounded-lg bg-gradient-accent px-3 py-2 transition-all duration-300 hover:scale-105 hover:shadow-glow-accent active:scale-95 sm:rounded-xl sm:px-4 sm:py-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4 text-white sm:h-5 sm:w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            )}
            {isMediumLayout && (
              <button
                type="button"
                onClick={() => setMobileSearchOpen(true)}
                className="flex-shrink-0 rounded-lg bg-gradient-accent px-3 py-2 transition-all duration-300 hover:scale-105 hover:shadow-glow-accent active:scale-95"
              >
                <SearchIcon className="h-4 w-4 text-white" />
              </button>
            )}
          </div>
        </form>

        {/* Cart Icon */}
        <div className="header-cart">
          <div>
            <Popover
              renderPopover={
                <div className="relative max-w-[400px] animate-fade-in rounded-2xl border border-neutral-200 bg-white text-sm shadow-large">
                  {purchasesInCart && purchasesInCart.length > 0 ? (
                    <div
                      className={`p-4 ${isMediumLayout && "!w-[95vw] max-w-[350px]"}`}
                    >
                      <div className="mb-4 flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-accent-500"></div>
                        <span className="font-semibold text-neutral-700">
                          Sản phẩm mới thêm
                        </span>
                      </div>
                      <div className="space-y-3">
                        {purchasesInCart
                          .slice(0, MAX_PURCHASES)
                          .map((purchase) => (
                            <div
                              className="flex items-center rounded-xl p-3 transition-all duration-200 hover:bg-neutral-50"
                              key={purchase?.product?._id}
                            >
                              <div className="flex-shrink-0">
                                <img
                                  src={`${purchase?.product?.image}`}
                                  alt={purchase?.data?.data?.name}
                                  className="h-12 w-12 rounded-lg object-cover shadow-soft"
                                />
                              </div>
                              <div className="ml-3 flex-grow overflow-hidden">
                                <div className="truncate font-medium text-neutral-800">
                                  {purchase?.product?.name}
                                </div>
                                <div className="mt-1 text-xs text-neutral-500">
                                  Đã thêm vào giỏ
                                </div>
                              </div>
                              <div className="ml-3 flex-shrink-0">
                                <span className="font-semibold text-accent-600">
                                  {currencyFormatter(purchase?.price)}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
                        <div className="text-xs text-neutral-500">
                          {purchasesInCart.length > MAX_PURCHASES
                            ? `${purchasesInCart.length - MAX_PURCHASES} sản phẩm khác`
                            : `${purchasesInCart.length} sản phẩm`}
                        </div>
                        <Link
                          to="/cart"
                          className="btn-accent px-4 py-2 text-sm"
                        >
                          Xem giỏ hàng
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-[250px] w-[280px] flex-col items-center justify-center p-6 sm:h-[300px] sm:w-[300px]">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-8 w-8 text-neutral-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                      </div>
                      <div className="font-medium text-neutral-500">
                        Giỏ hàng trống
                      </div>
                      <div className="mt-1 text-xs text-neutral-400">
                        Hãy thêm sản phẩm vào giỏ
                      </div>
                    </div>
                  )}
                </div>
              }
            >
              <div className="relative flex cursor-pointer items-center justify-center rounded-full bg-white/10 p-2 transition-all duration-300 hover:bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                {purchasesInCart && purchasesInCart.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">
                    {purchasesInCart.length > 99
                      ? "99+"
                      : purchasesInCart.length}
                  </span>
                )}
              </div>
            </Popover>
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      <MobileSearchModal
        open={mobileSearchOpen}
        onClose={() => setMobileSearchOpen(false)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleKeyDown={handleKeyDown}
        searchInputRef={searchInputRef}
      />
    </>
  );
};
export default MainHeader;
