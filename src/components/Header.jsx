import MainHeader from "./MainHeader";
import NavHeader from "./NavHeader";

import { AppBar, Toolbar } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="static"
      className="bg-[linear-gradient(-180deg,#f53d2d,#f63)] text-white"
    >
      <Toolbar className="container flex !min-h-fit flex-col !items-end gap-0">
        <div className="">
          <NavHeader />
        </div>
        <MainHeader />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
