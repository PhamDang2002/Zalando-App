import { Link } from "react-router-dom";

import { Button } from "@mui/material";

import QuantityController from "./QuantityController";
import { currencyFormatter } from "@libs/utils";
import {
  useBuyProductsMutation,
  useDeletePurchaseMutation,
  useGetPurchaseQuery,
  useUpdatePurchaseMutation,
} from "@services/rootApi";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import ProductCartItem from "./ProductCartItem";

export default function ProductCart() {
  const status = -1;
  const productsCart = useGetPurchaseQuery({ status })?.data?.data;
  const [deleteProduct] = useDeletePurchaseMutation();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [updateProduct] = useUpdatePurchaseMutation();
  const dispatch = useDispatch();
  const [buyProduct, { data, isSuccess }] = useBuyProductsMutation();
  // Hàm handleCheckboxChange để lấy id khi click vào checkbox
  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevState) => {
      if (prevState.includes(productId)) {
        return prevState.filter((id) => id !== productId); // Nếu đã chọn, bỏ chọn
      } else {
        return [...prevState, productId]; // Nếu chưa chọn, thêm vào danh sách chọn
      }
    });
  };

  const handleDelete = (productId) => {
    // Xóa sản phẩm được chọn (chỉ xóa sản phẩm với ID là productId)
    deleteProduct(productId);
    // Cập nhật lại selectedProducts nếu cần
    // setSelectedProducts((prevState) =>
    //   prevState.filter((id) => id !== productId),
    // );
  };

  const handleSelectAllChange = () => {
    // Thay đổi trạng thái của checkbox chính
    setIsAllChecked((prev) => {
      const newCheckedState = !prev;
      // Cập nhật tất cả sản phẩm trong giỏ hàng vào selectedProducts
      if (newCheckedState) {
        setSelectedProducts(productsCart.map((item) => item._id));
      } else {
        setSelectedProducts([]);
      }
      return newCheckedState;
    });
  };
  useEffect(() => {
    if (productsCart) {
      const newTotalPrice = productsCart.reduce((total, purchase) => {
        if (selectedProducts.includes(purchase._id)) {
          return (
            total + (purchase?.product?.price || 0) * (purchase?.buy_count || 0)
          );
        }
        return total;
      }, 0);
      setTotalPrice(newTotalPrice);
    }
  }, [selectedProducts, productsCart]);

  const handleDeleteSelected = () => {
    selectedProducts.forEach((productId) => {
      deleteProduct(productId);
    });
    setSelectedProducts([]);
  };

  const handleIncrease = (purchase) => {
    const newBuyCount = purchase.buy_count + 1;
    if (newBuyCount <= purchase.product.quantity) {
      updateProduct({
        product_id: purchase.product._id,
        buy_count: newBuyCount,
      });
    }
  };

  const handleDecrease = (purchase) => {
    const newBuyCount = purchase.buy_count - 1;
    if (newBuyCount >= 1) {
      updateProduct({
        product_id: purchase.product._id,
        buy_count: newBuyCount,
      });
    }
  };

  const handleType = (purchase, value) => {
    if (value >= 1 && value <= purchase.product.quantity) {
      updateProduct({
        product_id: purchase.product._id,
        buy_count: value,
      });
    }
  };

  const handleBuy = async () => {
    // Create the payload with the selected products (product_id and buy_count)
    const selectedProductDetails = productsCart
      .filter((purchase) => selectedProducts.includes(purchase._id)) // Filter only the selected products
      .map((purchase) => ({
        product_id: purchase?.product?._id,

        buy_count: purchase.buy_count,
      }));

    // Call the API with the selected products
    await buyProduct(selectedProductDetails);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(openSnackbar({ message: data?.message }));
    }
  }, [isSuccess, data, dispatch]);
  return (
    <div className="bg-neutral-100 py-16">
      <div className="px-10">
        <div>
          <div className="container overflow-auto">
            <div className="min-w-[1000px]">
              <div className="grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow">
                <div className="col-span-6">
                  <div className="flex items-center">
                    <div className="flex flex-shrink-0 items-center justify-center pr-3">
                      <input
                        type="checkbox"
                        className="h-5 w-5 accent-orange"
                        checked={isAllChecked} // Kiểm tra trạng thái checkbox chính
                        onChange={handleSelectAllChange} //
                      />
                    </div>
                    <div className="flex-grow text-black">Sản phẩm</div>
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="grid grid-cols-5 text-center">
                    <div className="col-span-2">Đơn giá</div>
                    <div className="col-span-1">Số lượng</div>
                    <div className="col-span-1">Số tiền</div>
                    <div className="col-span-1">Thao tác</div>
                  </div>
                </div>
              </div>

              {productsCart?.length > 0 && (
                <div className="my-3 rounded-sm bg-white p-5 shadow">
                  {productsCart.map((purchase) => (
                    <ProductCartItem
                      key={purchase?._id}
                      purchase={purchase}
                      checked={selectedProducts.includes(purchase._id)}
                      onCheck={() => handleCheckboxChange(purchase._id)}
                      onDelete={handleDelete}
                      onIncrease={handleIncrease}
                      onDecrease={handleDecrease}
                      onType={handleType}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="container sticky z-10 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center">
            <div className="flex items-center">
              <div className="flex flex-shrink-0 items-center justify-center pr-3">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-orange"
                  checked={isAllChecked} // Kiểm tra trạng thái checkbox chính
                  onChange={handleSelectAllChange}
                />
              </div>
              <button className="mx-3 border-none bg-none">
                Chọn tất cả [{productsCart?.length}]
              </button>
              <button
                className="mx-3 border-none bg-none"
                onClick={handleDeleteSelected}
              >
                Xóa
              </button>
            </div>

            <div className="mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center sm:justify-end">
                  <div>Tổng thanh toán</div>
                  <div className="mx-2 text-2xl text-primary">
                    {currencyFormatter(totalPrice)}
                  </div>
                </div>
              </div>
              <Button
                variant="contained"
                className="mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0"
                onClick={handleBuy}
              >
                Mua hàng
              </Button>
            </div>
          </div>
        </div>

        {productsCart?.length === 0 && (
          <div className="text-center">
            <div className="mt-5 font-bold text-gray-400">
              Giỏ hàng của bạn còn trống
            </div>
            <div className="mt-5 text-center">
              <Link
                to="/"
                className="rounded-sm bg-primary px-10 py-2 uppercase text-white transition-all hover:bg-primary/80"
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
