import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import HeaderAuth from "@components/HeaderAuth";
import Loading from "@components/Loading";

const AuthLayout = () => {
  return (
    <div>
      <HeaderAuth />
      <div className="flex h-screen items-center justify-center bg-orange">
        <div className="h-fit w-[450px] bg-white px-8 py-10">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
