import { Link } from "react-router-dom";

import { useSidebar } from "@hooks/index";
import { useProductDetailQuery } from "@services/rootApi";

import { useEffect } from "react";

import {
  productDetail,
  searchProduct,
  typeofProduct,
} from "@redux/slices/authSlice";
import RestSidebar from "./RestSidebar";
import { useSelector } from "react-redux";
import { Close } from "@mui/icons-material";
import { toggleDrawer } from "@redux/slices/settingsSlice";
import { IconButton } from "@mui/material";

const SideBarContent = ({ page, setPage }) => {
  const {
    isMediumLayout,
    productList,
    limit,
    setProducts,
    dispatch,
    selectedCategory,
    setSelectedCategory,
  } = useSidebar();

  const name = useSelector((store) => store.auth.search);
  const price_max = useSelector((store) => store.auth.priceMax);
  const price_min = useSelector((store) => store.auth.priceMin);
  const rating_filter = useSelector((store) => store.auth.ratingStar);
  const sort_by = useSelector((store) => store.auth.sortBy);
  const order = useSelector((store) => store.auth.orderBy);
  const { data, isSuccess } = useProductDetailQuery({
    page,
    limit,
    category: selectedCategory ? [selectedCategory] : undefined,
    price_min,
    price_max,
    sort_by,
    rating_filter,
    order,
    name,
  });

  const productData = data?.data;

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId); // cập nhật category khi người dùng click

    setPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory(null); // Gán lại selectedCategory là null
    dispatch(searchProduct(undefined));
    setPage(1);
  };
  useEffect(() => {
    if (isSuccess && productData) {
      setProducts(productData);
      dispatch(typeofProduct(productData));
      dispatch(productDetail(data));
    }
  }, [
    data,
    setProducts,
    isSuccess,
    productData,
    page,
    selectedCategory,
    dispatch,
  ]);

  return (
    <div className="space-y-6 p-2 sm:p-4">
      {isMediumLayout && (
        <div className="mb-6 flex items-center justify-between space-x-3">
          <Link to="/" className="flex flex-shrink-0 items-center">
            <svg
              width={132}
              height={24}
              fill="white"
              viewBox="0 0 132 24"
              aria-labelledby=":Rphb8ap:"
              aria-hidden="false"
              role="img"
              data-testid="zalando-logo"
            >
              <title id=":Rphb8ap:">Zalando wohnen</title>

              <path
                fill="#FF4C00"
                d="M21.803 9.411c-1.69-2.11-4.056-4.157-7.152-6.004l-.012-.006C11.518 1.598 8.591.539 5.95.105 4.299-.166 3.512.15 3.153.36c-.358.21-1.021.746-1.615 2.334C.588 5.238.025 8.343 0 11.994v.013c.025 3.65.587 6.755 1.538 9.299.594 1.588 1.257 2.124 1.615 2.334s1.147.526 2.796.255c2.642-.434 5.569-1.493 8.69-3.295l.012-.007c3.096-1.847 5.461-3.895 7.152-6.004 1.056-1.317 1.181-2.168 1.181-2.59 0-.42-.125-1.271-1.18-2.588"
              />
              <path
                fill="#003366"
                d="m28.986 17.42 10.15-9.848h-9.879V5.065h13.805v2.87l-10.15 9.847h10.392v2.508H28.986zM43.787 16.151c0-3.383 2.9-4.32 5.467-4.651l4.773-.605c1.148-.15 1.48-.664 1.48-1.359v-.03c0-1.36-1.178-2.356-3.745-2.356-2.477 0-3.867.936-4.109 2.507h-3.202c.363-3.081 3.051-4.984 7.401-4.984 4.864 0 6.857 2.054 6.857 5.437v10.18h-3.05v-2.417c-1.3 1.873-3.626 2.81-6.254 2.81-3.474 0-5.618-1.752-5.618-4.532m11.72-2.748v-.725c-.513.211-1.087.332-1.722.422l-3.806.514c-1.963.272-2.87.997-2.87 2.326 0 1.42 1.209 2.266 3.172 2.266 3.233 0 5.226-2.206 5.226-4.803M60.13 1.199h3.202v19.09H60.13zM64.389 16.151c0-3.383 2.9-4.32 5.467-4.651l4.773-.605c1.148-.15 1.48-.664 1.48-1.359v-.03c0-1.36-1.178-2.356-3.746-2.356-2.477 0-3.866.936-4.108 2.507h-3.202c.363-3.081 3.051-4.984 7.401-4.984 4.863 0 6.857 2.054 6.857 5.437v10.18h-3.05v-2.417c-1.3 1.873-3.626 2.81-6.254 2.81-3.474 0-5.618-1.752-5.618-4.532m11.72-2.748v-.725c-.513.211-1.087.332-1.722.422l-3.806.514c-1.963.272-2.87.997-2.87 2.326 0 1.42 1.209 2.266 3.172 2.266 3.232 0 5.226-2.206 5.226-4.803M80.73 5.065h3.203v2.477c1.147-1.812 3.322-2.87 5.98-2.87 3.988 0 6.344 2.296 6.344 6.526v9.092h-3.202v-8.64c0-2.809-1.48-4.35-4.199-4.35-2.93 0-4.923 1.964-4.923 4.743v8.247H80.73zM97.315 12.617c0-4.924 3.413-7.945 7.491-7.945 2.447 0 4.562.876 5.83 2.689V1.199h3.202v19.09h-3.202v-2.325c-1.389 1.873-3.383 2.718-5.83 2.718-4.078 0-7.491-3.08-7.491-8.065m13.412.03c0-3.172-1.873-5.377-5.045-5.377-3.141 0-5.044 2.175-5.044 5.347 0 3.202 1.903 5.468 5.044 5.468 3.172 0 5.045-2.266 5.045-5.438M114.896 12.647c0-4.682 3.172-7.974 8.397-7.974 5.257 0 8.398 3.292 8.398 7.974s-3.141 8.036-8.398 8.036c-5.225 0-8.397-3.353-8.397-8.036m13.472 0c0-2.96-1.631-5.376-5.075-5.376s-5.074 2.416-5.074 5.376c0 2.991 1.631 5.438 5.074 5.438 3.444 0 5.075-2.447 5.075-5.438"
              />
            </svg>
          </Link>
          <IconButton
            size="small"
            onClick={() => dispatch(toggleDrawer())}
            className="cursor-pointer"
          >
            <Close />
          </IconButton>
        </div>
      )}

      {/* All Categories Button */}
      <div className="card p-3 sm:p-4">
        <Link to="/" onClick={handleResetFilters}>
          <div
            className={`flex items-center space-x-3 rounded-xl p-2 transition-all duration-200 sm:p-3 ${
              selectedCategory === null
                ? "bg-gradient-primary text-white shadow-soft"
                : "text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                selectedCategory === null ? "bg-white/20" : "bg-neutral-100"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className={`h-4 w-4 ${selectedCategory === null ? "text-white" : "text-neutral-600"}`}
                fill="currentColor"
              >
                <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zM13 3h8v8h-8V3zm0 10h8v8h-8v-8z" />
              </svg>
            </div>
            <span className="font-semibold">Tất cả danh mục</span>
          </div>
        </Link>
      </div>

      {/* Category Filters */}
      <div className="card p-3 sm:p-4">
        <h3 className="mb-4 flex items-center text-lg font-semibold text-neutral-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="mr-2 h-5 w-5 text-brand-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
          Danh mục sản phẩm
        </h3>
        <RestSidebar
          productList={productList}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Quick Stats */}
      <div className="card p-3 sm:p-4">
        <h3 className="mb-4 flex items-center text-lg font-semibold text-neutral-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="mr-2 h-5 w-5 text-accent-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
          Thống kê
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-neutral-50 p-3">
            <span className="text-sm text-neutral-600">Tổng sản phẩm</span>
            <span className="font-semibold text-neutral-800">
              {productData?.products?.length || 0}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-neutral-50 p-3">
            <span className="text-sm text-neutral-600">Danh mục</span>
            <span className="font-semibold text-neutral-800">
              {productData?.products?.reduce((acc, product) => {
                if (!acc.includes(product.category?._id)) {
                  acc.push(product.category?._id);
                }
                return acc;
              }, []).length || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideBarContent;
