import { purchaseTabs } from "@libs/constants";
import { currencyFormatter } from "@libs/utils";
import { useGetPurchaseQuery } from "@services/rootApi";
import classNames from "classnames";
import { useState } from "react";
import { createSearchParams, Link } from "react-router-dom";
import { purchasesStatus } from "./Purchase";

export default function HistoryPurchase() {
  const [status, setStatus] = useState(purchasesStatus.all);

  const purchasesInCart = useGetPurchaseQuery({ status })?.data?.data;

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: "/user/purchase",
        search: createSearchParams({
          status: String(tab.status),
        }).toString(),
      }}
      className={classNames(
        "flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center",
        {
          "border-b-orange text-primary": status === tab.status,
          "border-b-black/10 text-gray-900": status !== tab.status,
        },
      )}
      onClick={() => setStatus(tab.status)}
    >
      {tab.name}
    </Link>
  ));

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="sticky top-0 flex rounded-t-sm shadow-sm">
            {purchaseTabsLink}
          </div>
          <div>
            {purchasesInCart?.map((purchase) => (
              <div
                key={purchase._id}
                className="mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm"
              >
                <Link to={`/products/${purchase.product._id}`} className="flex">
                  <div className="flex-shrink-0">
                    <img
                      className="h-20 w-20 object-cover"
                      src={purchase.product.image}
                      alt={purchase.product.name}
                    />
                  </div>
                  <div className="ml-3 flex-grow overflow-hidden">
                    <div className="truncate">{purchase.product.name}</div>
                    <div className="mt-3">x{purchase.buy_count}</div>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    <span className="truncate text-gray-500 line-through">
                      {currencyFormatter(
                        purchase.product.price_before_discount,
                      )}
                    </span>
                    <span className="ml-2 truncate text-primary">
                      {currencyFormatter(purchase.product.price)}
                    </span>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <div>
                    <span>Tổng giá tiền</span>
                    <span className="ml-4 text-xl text-primary">
                      {currencyFormatter(
                        purchase.product.price * purchase.buy_count,
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
