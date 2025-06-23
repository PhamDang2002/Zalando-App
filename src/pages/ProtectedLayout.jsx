import { saveUserInfo } from "@redux/slices/authSlice";
import { useGetMeQuery } from "@services/rootApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const response = useGetMeQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(saveUserInfo(response.data?.data));
    }
  }, [response.isSuccess, response.data, dispatch]);

  if (!response.isLoading) {
    if (!response?.data?.data?._id) {
      return <Navigate to="/login" />;
    }
  }
  return <Outlet />;
};
export default ProtectedLayout;
