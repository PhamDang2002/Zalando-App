import ProductRating from "@components/ProductRating";
import QuantityController from "@components/QuantityController";
import { currencyFormatter, rateSale } from "@libs/utils";

import ProductList from "@components/ProductList";
import { useProductDetail } from "@hooks/index";
import { useEffect } from "react";
import { useState } from "react";
import FooterProductDetail from "@components/FooterProductDetail";
import HeaderProductDetail from "@components/HeaderProductDetail";
import Loading from "@components/Loading";
export default function ProductDetail() {
  const [activeImage, setActiveImage] = useState("");
  const {
    product,
    isLoading,
    error,
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
    productsData,
  } = useProductDetail({ setActiveImage });

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  if (isLoading) {
    return <Loading />; // Hiển thị khi đang load
  }

  if (error) {
    return <div>Error loading product details</div>; // Hiển thị lỗi nếu có lỗi
  }
  if (!product) return null;
  return (
    <div className="bg-gray-200 py-6">
      <div className="px-10">
        <HeaderProductDetail
          product={product}
          isMediumLayout={isMediumLayout}
          imageRef={imageRef}
          handleZoom={handleZoom}
          handleRemoveZoom={handleRemoveZoom}
          prev={prev}
          currentImages={currentImages}
          chooseActive={chooseActive}
          next={next}
          handleBuyCount={handleBuyCount}
          buyCount={buyCount}
          activeImage={activeImage}
          ProductRating={ProductRating}
          currencyFormatter={currencyFormatter}
          rateSale={rateSale}
          QuantityController={QuantityController}
        />
      </div>
      <FooterProductDetail
        product={product}
        productsData={productsData}
        ProductList={ProductList}
      />
    </div>
  );
}
