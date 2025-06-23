import Header from "@components/Header";
import UserProfile from "@components/UserProfile";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="bg-neutral-100 text-sm text-gray-600">
      <Header />
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-3 lg:col-span-2">
            <UserProfile />
          </div>
          <div className="md:col-span-9 lg:col-span-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
