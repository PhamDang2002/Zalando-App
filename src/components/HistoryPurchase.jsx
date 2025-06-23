import { purchaseTabs } from "@libs/constants";
import { currencyFormatter } from "@libs/utils";
import { useGetPurchaseQuery } from "@services/rootApi";
import classNames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import { purchasesStatus } from "./Purchase";

export default function HistoryPurchase() {
  const [status, setStatus] = useState(purchasesStatus.all);
  const purchasesInCart = useGetPurchaseQuery({ status })?.data?.data;

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <button
      key={tab.status}
      onClick={() => setStatus(tab.status)}
      className={classNames(
        "rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none",
        {
          "bg-gradient-accent shadow-glow-accent scale-105 text-white":
            status === tab.status,
          "bg-neutral-100 text-neutral-600 hover:bg-neutral-200":
            status !== tab.status,
        },
      )}
      style={{ marginRight: 12 }}
    >
      {tab.name}
    </button>
  ));

  return (
    <div className="animate-fade-in mx-auto mt-10 w-full max-w-3xl px-2 md:px-0">
      {/* Tabs */}
      <div className="mb-8 flex flex-wrap justify-center">
        {purchaseTabsLink}
      </div>
      {/* Purchases */}
      <div className="space-y-6">
        {purchasesInCart && purchasesInCart.length > 0 ? (
          purchasesInCart.slice(0, 10).map((purchase) => (
            <div
              key={purchase._id}
              className="card shadow-soft hover:shadow-large flex flex-col items-center gap-6 overflow-hidden p-4 transition-all duration-200 sm:w-[60vw] sm:p-6 md:flex-row"
            >
              <Link
                to={`/products/${purchase.product._id}`}
                className="flex flex-1 flex-col items-center gap-4 md:flex-row"
              >
                <div className="flex w-full flex-shrink-0 justify-center md:w-auto">
                  <img
                    className="shadow-soft h-20 w-20 rounded-xl object-cover"
                    src={purchase.product.image}
                    alt={purchase.product.name}
                  />
                </div>
                <div className="w-full flex-grow overflow-hidden md:w-auto">
                  <div className="mb-1 truncate text-lg font-semibold text-neutral-800">
                    {purchase.product.name.slice(0, 50)}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="badge badge-primary">
                      x{purchase.buy_count}
                    </span>
                    <span className="badge badge-accent">
                      {tabNameFromStatus(purchase.status)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 w-full flex-shrink-0 text-right md:mt-0 md:w-auto">
                  <span className="block text-sm text-neutral-400 line-through">
                    {currencyFormatter(purchase.product.price_before_discount)}
                  </span>
                  <span className="text-accent-600 block text-lg font-bold">
                    {currencyFormatter(purchase.product.price)}
                  </span>
                </div>
              </Link>
              <div className="mt-4 flex w-full justify-end md:mt-0">
                <div>
                  <span className="text-sm text-neutral-500">
                    Tổng giá tiền
                  </span>
                  <span className="text-gradient ml-4 text-xl font-bold">
                    {currencyFormatter(
                      purchase.product.price * purchase.buy_count,
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-neutral-100">
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
              Bạn chưa có đơn hàng nào
            </h3>
            <p className="text-neutral-500">
              Khi mua hàng, đơn hàng của bạn sẽ xuất hiện ở đây
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function tabNameFromStatus(status) {
  switch (status) {
    case purchasesStatus.all:
      return "Tất cả";
    case purchasesStatus.waitForConfirmation:
      return "Chờ xác nhận";
    case purchasesStatus.waitForGetting:
      return "Chờ lấy hàng";
    case purchasesStatus.inProgress:
      return "Đang giao";
    case purchasesStatus.delivered:
      return "Đã giao";
    case purchasesStatus.cancelled:
      return "Đã hủy";
    default:
      return "Khác";
  }
}
