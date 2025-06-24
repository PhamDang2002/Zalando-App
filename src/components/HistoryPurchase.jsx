import { purchaseTabs } from "@libs/constants";
import { currencyFormatter } from "@libs/utils";
import { useGetPurchaseQuery } from "@services/rootApi";
import classNames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import { purchasesStatus } from "./Purchase";
import { useDetectLayout } from "@hooks/index";

export default function HistoryPurchase() {
  const [status, setStatus] = useState(purchasesStatus.all);
  const purchasesInCart = useGetPurchaseQuery({ status })?.data?.data;
  const { isMediumLayout } = useDetectLayout();

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <button
      key={tab.status}
      onClick={() => setStatus(tab.status)}
      className={classNames(
        "mb-2 rounded-full border border-transparent px-4 py-2 text-xs font-semibold transition-all duration-200 focus:outline-none sm:mb-0 sm:px-6 sm:text-sm",
        {
          "scale-105 bg-gradient-accent text-white shadow-glow-accent":
            status === tab.status,
          "border-neutral-200 bg-neutral-100 text-neutral-600 hover:bg-neutral-200":
            status !== tab.status,
        },
      )}
      style={{ marginRight: 8 }}
    >
      {tab.name}
    </button>
  ));

  return (
    <div className="mx-auto mt-6 w-full max-w-2xl animate-fade-in px-0 sm:mt-10 sm:px-0">
      {/* Tabs */}
      <div className="mb-6 flex flex-wrap justify-center gap-2 sm:mb-8 sm:gap-4">
        {purchaseTabsLink}
      </div>
      {/* Purchases */}
      <div className="space-y-4 sm:space-y-6">
        {purchasesInCart && purchasesInCart.length > 0 ? (
          purchasesInCart.slice(0, 10).map((purchase) => (
            <div
              key={purchase._id}
              className={`card flex w-full flex-col items-center gap-4 overflow-hidden rounded-2xl border border-neutral-100 bg-white p-3 shadow-soft transition-all duration-200 hover:shadow-large sm:p-6 ${isMediumLayout ? "w-[85vw]" : ""}`}
            >
              <Link
                to={`/products/${purchase.product._id}`}
                className="group flex w-full flex-1 flex-col items-center gap-3 sm:gap-4 md:flex-row"
              >
                <div className="flex w-full flex-shrink-0 justify-center md:w-auto">
                  <img
                    className="h-16 w-16 rounded-xl object-cover shadow-soft transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20"
                    src={purchase.product.image}
                    alt={purchase.product.name}
                  />
                </div>
                <div className="w-full flex-grow overflow-hidden md:w-auto">
                  <div className="mb-1 truncate text-base font-semibold text-neutral-800 transition-colors duration-200 group-hover:text-brand-600 sm:text-lg">
                    {purchase.product.name.slice(0, 50)}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="badge badge-primary text-xs sm:text-sm">
                      x{purchase.buy_count}
                    </span>
                    <span className="badge badge-accent text-xs sm:text-sm">
                      {tabNameFromStatus(purchase.status)}
                    </span>
                  </div>
                </div>
                <div className="mt-3 w-full flex-shrink-0 text-right md:mt-0 md:w-auto">
                  <span className="block text-xs text-neutral-400 line-through sm:text-sm">
                    {currencyFormatter(purchase.product.price_before_discount)}
                  </span>
                  <span className="block text-base font-bold text-accent-600 sm:text-lg">
                    {currencyFormatter(purchase.product.price)}
                  </span>
                </div>
              </Link>
              <div className="mt-3 flex w-full justify-end md:mt-0">
                <div>
                  <span className="text-xs text-neutral-500 sm:text-sm">
                    Tổng giá tiền
                  </span>
                  <span className="text-gradient ml-2 text-lg font-bold sm:ml-4 sm:text-xl">
                    {currencyFormatter(
                      purchase.product.price * purchase.buy_count,
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 sm:h-24 sm:w-24">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-10 w-10 text-neutral-400 sm:h-12 sm:w-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-neutral-700 sm:text-xl">
              Bạn chưa có đơn hàng nào
            </h3>
            <p className="text-xs sm:text-neutral-500">
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
      return "Đã huỷ";
    default:
      return "Khác";
  }
}
