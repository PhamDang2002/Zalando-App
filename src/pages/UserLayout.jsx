import Header from "@components/Header";
import UserProfile from "@components/UserProfile";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="min-h-screen bg-neutral-100 text-sm text-gray-600">
      <Header />
      <div className="container mx-auto px-2 py-4 sm:px-4 md:px-6 md:py-8">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-12 md:gap-8">
          {/* Sidebar */}
          <div className="mb-4 flex justify-center md:col-span-3 md:mb-0 md:block lg:col-span-2">
            <div className="h-full w-full max-w-xs md:w-[15vw] md:max-w-none">
              <UserProfile />
            </div>
          </div>
          {/* Main Content */}
          <div className="flex justify-center md:col-span-9 lg:col-span-10">
            <div className="card min-h-[60vh] w-full max-w-2xl rounded-3xl bg-white p-3 shadow-large sm:p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
