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
    <div className="space-y-6">
      {isMediumLayout && (
        <Link to="/" className="block">
          <div className="mb-6 flex items-center space-x-3">
            <div className="bg-gradient-primary shadow-soft flex h-10 w-10 items-center justify-center rounded-xl">
              <svg
                width={20}
                height={20}
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-white"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-gradient text-xl font-bold">Shoppe</span>
          </div>
        </Link>
      )}

      {/* All Categories Button */}
      <div className="card p-4">
        <Link to="/" onClick={handleResetFilters}>
          <div
            className={`flex items-center space-x-3 rounded-xl p-3 transition-all duration-200 ${
              selectedCategory === null
                ? "bg-gradient-primary shadow-soft text-white"
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
      <div className="card p-4">
        <h3 className="mb-4 flex items-center text-lg font-semibold text-neutral-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="text-brand-600 mr-2 h-5 w-5"
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
      <div className="card p-4">
        <h3 className="mb-4 flex items-center text-lg font-semibold text-neutral-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="text-accent-600 mr-2 h-5 w-5"
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
