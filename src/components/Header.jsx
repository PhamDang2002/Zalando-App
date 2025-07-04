import MainHeader from "./MainHeader";
import NavHeader from "./NavHeader";

import { AppBar, Toolbar } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="static"
      className="bg-gradient-primary text-white shadow-large"
      elevation={0}
    >
      <Toolbar className="header-container">
        {/* Top row - Navigation */}
        <div className="header-nav">
          <NavHeader />
        </div>

        {/* Bottom row - Main content */}
        <div className="header-main">
          <MainHeader />
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
