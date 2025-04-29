import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@pages/RootLayout";
import ModalProvider from "@context/ModalProvider";
import { lazy } from "react";
import { ThemeProvider } from "@mui/material";

import theme from "./configs/muiConfig";
import RegisterPage from "@pages/auth/RegisterPage";
import AuthLayout from "@pages/auth/AuthLayout";
import LoginPage from "@pages/auth/LoginPage";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";

import { PersistGate } from "redux-persist/integration/react";
const HomePage = lazy(() => import("@pages/HomePage"));
const ProductDetail = lazy(() => import("@pages/ProductDetail"));
const UserLayout = lazy(() => import("@pages/UserLayout"));
const Profile = lazy(() => import("@components/Profile"));
const HistoryPurchase = lazy(() => import("@components/HistoryPurchase"));
const ChangePassword = lazy(() => import("@components/ChangePassword"));
const ProductCart = lazy(() => import("@components/ProductCart"));
const CartLayout = lazy(() => import("@pages/CartLayout"));
const ProtectedLayout = lazy(() => import("@pages/ProtectedLayout"));

import Loading from "@components/Loading";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/products/:id",
            element: <ProductDetail />,
          },

          {
            element: <UserLayout />,
            children: [
              {
                path: "/user/profile",
                element: <Profile />,
              },
              {
                path: "/user/password",
                element: <ChangePassword />,
              },
              {
                path: "/user/purchase",
                element: <HistoryPurchase />,
              },
            ],
          },
        ],
      },

      {
        element: <AuthLayout />,
        children: [
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
        ],
      },
      {
        element: <CartLayout />,
        children: [
          {
            path: "/cart",
            element: <ProductCart />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);
