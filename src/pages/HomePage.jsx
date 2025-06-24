import Pagination from "@components/Pagination";
import ProductList from "@components/ProductList";
import ProductType from "@components/ProductType";
import Sidebar from "@components/Sidebar";
import { pageofProduct } from "@redux/slices/authSlice";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const [page, setPage] = useState(1); // State for page
  const dispatch = useDispatch();
  // Get product data from Redux
  const data = useSelector((store) => store.auth.typeProduct);
  const pageSize = data?.pagination?.page_size;
  // Dispatch the page change to Redux
  const handlePageChange = (pageChange) => {
    setPage(pageChange); // Update local page state
    dispatch(pageofProduct(pageChange)); // Dispatch page to Redux
  };
  useEffect(() => {
    // When page changes, dispatch the new page
    dispatch(pageofProduct(page));
  }, [page, dispatch, pageSize]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Main Content */}
      <div className="container mx-auto px-2 py-4 sm:px-4 md:px-6 md:py-8">
        <div className="flex flex-col gap-4 md:gap-8 lg:flex-row">
          {/* Sidebar */}
          <div className="mb-4 w-full flex-shrink-0 lg:mb-0 lg:w-64">
            <Sidebar page={page} setPage={setPage} pageSize={pageSize} />
          </div>
          {/* Main Content */}
          <div className="flex-1">
            {/* Product Type Filter */}
            <div className="mb-4 md:mb-8">
              <ProductType setPage={setPage} page={page} pageSize={pageSize} />
            </div>
            {/* Products Grid */}
            <div className="mb-8">
              {data?.products && data.products.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
                  {data.products.map((item) => (
                    <ProductList
                      key={item._id}
                      id={item._id}
                      image={item.image}
                      name={item.name}
                      price={item.price}
                      price_before_discount={item.price_before_discount}
                      star={item.rating}
                      sold={item.sold}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-neutral-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-12 w-12 text-neutral-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-neutral-700">
                    Không tìm thấy sản phẩm
                  </h3>
                  <p className="text-neutral-500">
                    Hãy thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác
                  </p>
                </div>
              )}
            </div>
            {/* Pagination */}
            {data?.products && data.products.length > 0 && (
              <div className="flex justify-center">
                <Pagination
                  page={page}
                  setPage={setPage}
                  pageSize={pageSize}
                  onClick={() => handlePageChange(page)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
