import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, jest } from "@jest/globals";
import ProductCartItem from "./ProductCartItem";
import { currencyFormatter } from "../libs/utils";
import { MemoryRouter } from "react-router-dom";

const purchase = {
  _id: "1",
  buy_count: 2,
  product: {
    name: "Áo thun",
    image: "image.png",
    price: 100000,
    price_before_discount: 120000,
    quantity: 10,
  },
};

test("render đúng thông tin sản phẩm", () => {
  render(
    <MemoryRouter>
      <ProductCartItem
        purchase={purchase}
        checked={false}
        onCheck={() => {}}
        onDelete={() => {}}
        onIncrease={() => {}}
        onDecrease={() => {}}
        onType={() => {}}
      />
    </MemoryRouter>,
  );
  expect(screen.getByText("Áo thun")).toBeInTheDocument();
  expect(screen.getByText(currencyFormatter(100000))).toBeInTheDocument();
  expect(screen.getByText(currencyFormatter(120000))).toBeInTheDocument();
});

test("gọi onDelete khi bấm nút xóa", () => {
  const onDelete = jest.fn();
  render(
    <MemoryRouter>
      <ProductCartItem
        purchase={purchase}
        checked={false}
        onCheck={() => {}}
        onDelete={onDelete}
        onIncrease={() => {}}
        onDecrease={() => {}}
        onType={() => {}}
      />
    </MemoryRouter>,
  );
  fireEvent.click(screen.getByText("Xóa"));
  expect(onDelete).toHaveBeenCalledWith("1");
});
