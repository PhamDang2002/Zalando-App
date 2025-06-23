import { Link } from "react-router-dom";
import Popover from "./Popover";
import { Avatar } from "@mui/material";
import { useLogout, useUserInfo } from "@hooks/index";

const NavHeader = () => {
  const userInfo = useUserInfo();
  const { logOut } = useLogout();
  return (
    <div className="flex items-center gap-4">
      {userInfo?._id ? (
        <Popover
          className="group flex cursor-pointer items-center gap-2"
          renderPopover={
            <div className="shadow-large animate-fade-in relative min-w-[200px] rounded-2xl border border-neutral-100 bg-white">
              <Link
                to="/user/profile"
                className="flex items-center gap-2 rounded-t-2xl px-4 py-3 transition-colors hover:bg-neutral-50"
              >
                <svg
                  className="text-brand-600 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Tài khoản của tôi
              </Link>
              <Link
                to="/user/purchase"
                className="flex items-center gap-2 px-4 py-3 transition-colors hover:bg-neutral-50"
              >
                <svg
                  className="text-accent-600 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h18M9 3v18m6-18v18"
                  />
                </svg>
                Đơn mua
              </Link>
              <button
                onClick={() => logOut()}
                className="flex w-full items-center gap-2 rounded-b-2xl px-4 py-3 text-left text-red-500 transition-colors hover:bg-neutral-50"
              >
                <svg
                  className="h-5 w-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7"
                  />
                </svg>
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className="flex items-center gap-2 transition-transform group-hover:scale-105">
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: 20,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              {userInfo.email?.[0]?.toUpperCase()}
            </Avatar>
            <span className="max-w-[120px] truncate text-sm font-semibold text-white drop-shadow">
              {userInfo.email}
            </span>
          </div>
        </Popover>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            to="/register"
            className="btn-secondary rounded-xl px-4 py-2 text-sm"
          >
            Đăng ký
          </Link>
          <Link to="/login" className="btn-accent rounded-xl px-4 py-2 text-sm">
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  );
};
export default NavHeader;
