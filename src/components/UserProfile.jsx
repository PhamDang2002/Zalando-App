import { Avatar } from "@mui/material";
import classNames from "classnames";

import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

export default function UserProfile() {
  const profile = useSelector((state) => state.auth.userInfo);
  const displayEmail =
    profile?.email?.length > 50
      ? profile?.email.slice(0, 50) + "..."
      : profile?.email;

  return (
    <div className="card mx-auto w-full max-w-xs animate-fade-in overflow-hidden rounded-2xl border border-neutral-100 bg-white p-4 shadow-large sm:p-6 md:max-w-none">
      <div className="mb-6 flex flex-col items-center gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:gap-0">
        <Link to="/">
          <Avatar
            sx={{
              width: 48,
              height: 48,
              fontSize: 24,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {profile?.email?.[0]?.toUpperCase()}
          </Avatar>
        </Link>
        <div className="flex-grow text-center sm:pl-4 sm:text-left">
          <div className="mb-1 truncate text-base font-semibold text-neutral-800 sm:text-lg">
            {displayEmail}
          </div>
          <Link
            to="/user/profile"
            className="flex items-center justify-center gap-1 text-xs font-medium text-brand-600 hover:underline sm:justify-start sm:text-sm"
          >
            <svg
              width={14}
              height={14}
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 inline-block"
            >
              <path
                d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                fill="#0ea5e9"
                fillRule="evenodd"
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <NavLink
          to="/user/profile"
          className={({ isActive }) =>
            classNames(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-3 sm:text-base",
              {
                "scale-105 bg-gradient-primary text-white shadow-soft":
                  isActive,
                "text-neutral-700 hover:bg-neutral-50": !isActive,
              },
            )
          }
        >
          <span className="flex h-6 w-6 items-center justify-center">
            <svg
              className="h-5 w-5"
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
          </span>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to="/user/password"
          className={({ isActive }) =>
            classNames(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-3 sm:text-base",
              {
                "scale-105 bg-gradient-primary text-white shadow-soft":
                  isActive,
                "text-neutral-700 hover:bg-neutral-50": !isActive,
              },
            )
          }
        >
          <span className="flex h-6 w-6 items-center justify-center">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m0-6v2m-6 4V7a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2z"
              />
            </svg>
          </span>
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to="/user/purchase"
          className={({ isActive }) =>
            classNames(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-3 sm:text-base",
              {
                "scale-105 bg-gradient-primary text-white shadow-soft":
                  isActive,
                "text-neutral-700 hover:bg-neutral-50": !isActive,
              },
            )
          }
        >
          <span className="flex h-6 w-6 items-center justify-center">
            <svg
              className="h-5 w-5"
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
          </span>
          Đơn mua
        </NavLink>
      </div>
    </div>
  );
}
