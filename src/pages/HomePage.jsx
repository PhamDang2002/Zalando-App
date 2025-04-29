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
    <div className="container flex gap-4 p-8">
      <Sidebar page={page} setPage={setPage} pageSize={pageSize} />
      <div className="flex-1">
        <ProductType setPage={setPage} page={page} pageSize={pageSize} />

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data?.products &&
            data.products.map((item) => (
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

        <Pagination
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          onClick={() => handlePageChange(page)}
        />
      </div>
    </div>
  );
}
export default HomePage;
