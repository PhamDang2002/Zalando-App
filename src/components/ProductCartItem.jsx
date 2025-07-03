import { Link } from "react-router-dom";
import QuantityController from "./QuantityController";
import { currencyFormatter } from "../libs/utils";

export default function ProductCartItem({
  purchase,
  checked,
  onCheck,
  onDelete,
  onIncrease,
  onDecrease,
  onType,
}) {
  return (
    <div className="mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0">
      <div className="col-span-6">
        <div className="flex">
          <div className="flex flex-shrink-0 items-center justify-center pr-3">
            <input
              type="checkbox"
              className="h-5 w-5 accent-orange"
              checked={checked}
              onChange={onCheck}
            />
          </div>
          <div className="flex-grow">
            <div className="flex">
              <Link className="h-20 w-20 flex-shrink-0" to="/">
                <img
                  alt={purchase?.product?.name}
                  src={purchase?.product?.image}
                />
              </Link>
              <div className="flex-grow px-2 pb-2 pt-1">
                <Link to="/" className="line-clamp-2 text-left">
                  {purchase?.product?.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6">
        <div className="grid grid-cols-5 items-center">
          <div className="col-span-2">
            <span className="text-gray-500 line-through">
              {currencyFormatter(purchase?.product?.price_before_discount)}
            </span>
            <span className="ml-2 text-orange">
              {currencyFormatter(purchase?.product?.price)}
            </span>
          </div>
          <div className="col-span-1">
            <QuantityController
              value={purchase.buy_count}
              max={purchase.product.quantity}
              onIncrease={() => onIncrease(purchase)}
              onDecrease={() => onDecrease(purchase)}
              onType={(value) => onType(purchase, value)}
            />
          </div>
          <div className="col-span-1">
            <span className="text-orange">
              {currencyFormatter(purchase?.product?.price * purchase.buy_count)}
            </span>
          </div>
          <div className="col-span-1">
            <button
              onClick={() => onDelete(purchase._id)}
              className="text-red-500"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
