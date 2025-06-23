import ChatAi from "@components/ChatAi";
import Header from "@components/Header";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <ChatAi />
    </div>
  );
};

export default PublicLayout;
