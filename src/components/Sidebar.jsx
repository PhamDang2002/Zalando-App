/* eslint-disable no-unused-vars */
import { Drawer } from "@mui/material";
import SideBarContent from "./SideBarContent";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "@redux/slices/settingsSlice";
import { useDetectLayout } from "@hooks/index";

const Sidebar = ({ page, setPage }) => {
  const { isMediumLayout } = useDetectLayout();
  const isShowDrawer = useSelector((store) => store.settings.isShowDrawer);
  const dispatch = useDispatch();
  const data = useSelector((store) => store.auth.productDetail) || {};

  const category = data.data?.products?.map((item) => item?.category?._id);

  return isMediumLayout ? (
    <Drawer
      open={isShowDrawer}
      onClose={() => dispatch(toggleDrawer())}
      classes={{ paper: "p-4 flex flex-col " }}
      ModalProps={page > 0 ? { keepMounted: true } : {}}
    >
      <SideBarContent category={category} page={page} setPage={setPage} />
    </Drawer>
  ) : (
    <SideBarContent category={category} page={page} setPage={setPage} />
  );
};

export default Sidebar;
