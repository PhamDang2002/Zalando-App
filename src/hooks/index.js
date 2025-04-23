import { logout, searchProduct } from "@redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  useProductDetailByIdQuery,
  useProductDetailTesQuery,
  useProductListTypeQuery,
} from "@services/rootApi";
import { useState } from "react";
import { useMemo } from "react";
import { useRef } from "react";
export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };
  return { logOut };
};

export const useUserInfo = () => {
  return useSelector((state) => state.auth.userInfo);
};

export const useDetectLayout = () => {
  const theme = useTheme();

  const isMediumLayout = useMediaQuery(theme.breakpoints.down("md"));
  return {
    isMediumLayout,
  };
};

export const useSidebar = () => {
  const { isMediumLayout } = useDetectLayout();
  const productListData = useProductListTypeQuery();
  const productList = productListData?.currentData?.data;
  const limit = 10;
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);

  return {
    isMediumLayout,
    productList,
    limit,
    products,
    setProducts,
    dispatch,
    selectedCategory,
    setSelectedCategory,
  };
};

export const useSearch = () => {
  const { isMediumLayout } = useDetectLayout();
  const [searchTerm, setSearchTerm] = useState();
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchProduct(searchTerm));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Ngăn chặn hành động mặc định (refresh trang)
      handleSearch(); // Gọi hàm tìm kiếm
    }
  };

  return {
    isMediumLayout,
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleKeyDown,
  };
};

export const useProductDetail = ({ activeImage, setActiveImage }) => {
  const { isMediumLayout } = useDetectLayout();
  const { id } = useParams();
  const { data, isLoading, error } = useProductDetailByIdQuery(id);

  const [buyCount, setBuyCount] = useState(1);
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5]);
  const chooseActive = (img) => {
    setActiveImage(img);
  };
  const product = data?.data;
  const limit = 20;
  const page = 1;
  const category = product?.category._id;

  const productsData = useProductDetailTesQuery({
    limit,
    page,
    category,
  });

  const currentImages = useMemo(
    () => (product ? product?.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages],
  );
  const imageRef = useRef(null);
  const handleZoom = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const image = imageRef.current;
    const { naturalHeight, naturalWidth } = image;
    // Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý được bubble event
    // const { offsetX, offsetY } = event.nativeEvent

    // Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX);
    const offsetY = event.pageY - (rect.y + window.scrollY);

    const top = offsetY * (1 - naturalHeight / rect.height);
    const left = offsetX * (1 - naturalWidth / rect.width);
    image.style.width = naturalWidth + "px";
    image.style.height = naturalHeight + "px";
    image.style.maxWidth = "unset";
    image.style.top = top + "px";
    image.style.left = left + "px";
  };

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute("style");
  };
  const next = () => {
    if (currentIndexImages[1] < product.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1]);
    }
  };

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1]);
    }
  };

  const handleBuyCount = (value) => {
    setBuyCount(value);
  };
  return {
    isMediumLayout,
    data,
    isLoading,
    error,
    activeImage,
    buyCount,
    currentIndexImages,
    chooseActive,
    product,
    limit,
    page,
    category,
    productsData,
    currentImages,
    imageRef,
    handleZoom,
    handleRemoveZoom,
    next,
    prev,
    handleBuyCount,
  };
};
