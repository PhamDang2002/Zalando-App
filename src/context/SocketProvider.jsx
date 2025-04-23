// import { useEffect } from "react";
// import { createContext, useContext } from "react";
// import { io } from "socket.io-client";
// const socket = io("https://api-ecom.duthanhduoc.com", {
//   autoConnect: false,
//   path: "/socket.io",
// });
// const SocketContext = createContext();

// // eslint-disable-next-line react-refresh/only-export-components
// export const useModalContext = () => {
//   return useContext(SocketContext);
// };

// const SocketProvider = ({ children }) => {
//   useEffect(() => {
//     socket.connect();
//     socket.on("connect", () => {
//       console.log("connected");
//     });

//     socket.on("disconnect", () => {
//       console.log("disconnected");
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("disconnect");
//       socket.disconnect();
//     };
//   }, []);
//   return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
// };
// export default SocketProvider;
