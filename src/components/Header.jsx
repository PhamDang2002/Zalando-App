import MainHeader from "./MainHeader";
import NavHeader from "./NavHeader";

import { AppBar, Toolbar } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="static"
      className="bg-[linear-gradient(-180deg,#f53d2d,#f63)] px-5 pb-5 pt-2 text-white"
    >
      <Toolbar className="flex !min-h-fit flex-col !items-end">
        <div className="">
          <NavHeader />
        </div>
        <MainHeader />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
