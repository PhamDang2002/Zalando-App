import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
  refresh_token: null,
  userInfo: {},
  typeProduct: "all",
  page: 1,
  cart: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.userInfo = {};
      state.typeProduct = "all";
      state.page = 1;
    },
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    typeofProduct: (state, action) => {
      state.typeProduct = action.payload;
    },
    pageofProduct: (state, action) => {
      state.page = action.payload;
    },
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
    productDetail: (state, action) => {
      state.productDetail = action.payload;
    },
    priceMaxApi: (state, action) => {
      state.priceMax = action.payload;
    },
    priceMinApi: (state, action) => {
      state.priceMin = action.payload;
    },
    ratingStar: (state, action) => {
      state.ratingStar = action.payload;
    },
    sortByTes: (state, action) => {
      state.sortBy = action.payload;
    },
    orderByTes: (state, action) => {
      state.orderBy = action.payload;
    },
    pageSizeTes: (state, action) => {
      state.pageSize = action.payload;
    },
    idProductDetail: (state, action) => {
      state.idProductDetail = action.payload;
    },
    productDetailCart: (state, action) => {
      if (!Array.isArray(state.cart)) {
        state.cart = [];
      }

      const product = action.payload.data; // Đối tượng sản phẩm
      const productId = product._id; // ID sản phẩm

      // Kiểm tra xem sản phẩm đã có trong giỏ chưa
      const existingProduct = state.cart.find(
        (item) => item.data._id === productId,
      );

      if (existingProduct) {
        // Nếu đã có, tăng buy_count lên 1
        existingProduct.buyCount += 1;
      } else {
        // Nếu chưa có, thêm mới vào giỏ với buy_count = 1
        state.cart.push({
          data: product,
          buyCount: 1,
        });
      }
    },
  },
});

export const {
  login,
  logout,
  saveUserInfo,
  typeofProduct,
  pageofProduct,
  searchProduct,
  productDetail,
  priceMaxApi,
  priceMinApi,
  ratingStar,
  sortByTes,
  orderByTes,
  pageSizeTes,
  idProductDetail,
  productDetailCart,
} = authSlice.actions;
export default authSlice.reducer;
