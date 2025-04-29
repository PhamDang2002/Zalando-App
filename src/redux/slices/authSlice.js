import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
  refresh_token: null,
  userInfo: {},
  typeProduct: "all",
  page: 1,
  handleCategoryChange: null,
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
} = authSlice.actions;
export default authSlice.reducer;
