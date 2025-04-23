import { login, logout } from "@redux/slices/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { persistor } from '../redux/store';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access_token; // Sử dụng đúng tên `access_token` từ state của bạn

    if (token) {
      headers.set("Authorization", ` ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    result.error.status === 401 &&
    result.error.data.message === "Token Expired"
  ) {
    const refresh_token = api.getState().auth.refresh_token;

    if (refresh_token) {
      const refreshResult = await baseQuery(
        {
          url: "/refresh-token",
          method: "POST",
          body: { refresh_token },
        },
        api,
        extraOptions,
      );
      const newAccessToken = refreshResult.data.access_token;
      if (newAccessToken) {
        api.dispatch(
          login({
            access_token: newAccessToken,
            refresh_token,
          }),
        );
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
        window.location.href = "/login";
      }
    }
  }
  return result;
};

export const rootApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: ({ fullName, email, password }) => ({
          url: "/register",
          method: "POST",
          body: { fullName, email, password },
        }),
      }),
      login: builder.mutation({
        query: ({ email, password }) => ({
          url: "/login",
          method: "POST",
          body: { email, password },
        }),
      }),
      getMe: builder.query({
        query: () => "/me",
      }),
      productListType: builder.query({
        query: () => "/categories",
      }),
      productDetail: builder.query({
        query: ({
          page,
          limit,
          price_max,
          price_min,
          category,
          rating_filter,
          sort_by,
          order,
          name,
        } = {}) => {
          return {
            url: `/products`,
            params: {
              page,
              limit,
              price_max,
              price_min,
              category,
              rating_filter,
              sort_by,
              order,
              name,
            },
          };
        },
      }),
      productDetailTes: builder.query({
        query: ({ page, limit, category } = {}) => {
          return {
            url: `/products`,
            params: {
              page,
              limit,
              category,
            },
          };
        },
      }),

      productDetailById: builder.query({
        query: (id) => `/products/${id}`,
      }),
      refreshToken: builder.mutation({
        query: (refresh_token) => ({
          url: "/refresh-access-token",
          body: { refresh_token },
          method: "POST",
        }),
      }),
      purchase: builder.mutation({
        query: ({ buy_count, product_id }) => ({
          url: "/purchases/add-to-cart",
          method: "POST",
          body: { buy_count, product_id },
        }),
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useProductListTypeQuery,
  useProductDetailQuery,
  useRefreshTokenMutation,
  useProductDetailByIdQuery,
  useProductDetailTesQuery,
  usePurchaseMutation,
  useCheckoutPaymentMutation,
} = rootApi;
