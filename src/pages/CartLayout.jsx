import CartHeader from "@components/CartHeader";

import { Outlet } from "react-router-dom";

const CartLayout = () => {
  return (
    <div>
      <CartHeader />
      <Outlet />
    </div>
  );
};
export default CartLayout;
