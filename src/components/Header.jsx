import MainHeader from "./MainHeader";
import NavHeader from "./NavHeader";

import { AppBar, Toolbar } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="static"
      className="bg-gradient-primary shadow-large text-white"
      elevation={0}
    >
      <Toolbar className="container flex !min-h-fit flex-col !items-end gap-0 py-4">
        <div className="flex justify-end">
          <NavHeader />
        </div>
        <MainHeader />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
