import { Link } from "react-router-dom";
import Popover from "./Popover";

import { Avatar } from "@mui/material";
import { useLogout, useUserInfo } from "@hooks/index";

const NavHeader = () => {
  const userInfo = useUserInfo();
  const { logOut } = useLogout();
  return (
    <div className="flex">
      <Popover
        className="ml-6 flex cursor-pointer items-center py-1 hover:text-white/70"
        renderPopover={
          <div className="relative rounded-sm border border-gray-200 bg-white shadow-md">
            <Link
              to="/user/profile"
              className="block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500"
            >
              Tài khoản của tôi
            </Link>
            <Link
              to="/user/purchase"
              className="block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500"
            >
              Đơn mua
            </Link>
            <button
              onClick={() => logOut()}
              className="block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500"
            >
              Đăng xuất
            </button>
          </div>
        }
      >
        <div className="mr-2 flex h-6 w-6 flex-shrink-0 items-center">
          <Avatar sx={{ width: 30, height: 30, fontSize: 20 }}>
            {userInfo.email?.[0]?.toUpperCase()}
          </Avatar>
        </div>
        <div className="ml-2">{userInfo.email}</div>
      </Popover>

      {!userInfo._id && (
        <div className="flex items-center">
          <Link to="/" className="mx-3 capitalize hover:text-white/70">
            Đăng ký
          </Link>
          <div className="h-4 border-r-[1px] border-r-white/40" />
          <Link to="/" className="mx-3 capitalize hover:text-white/70">
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  );
};
export default NavHeader;
