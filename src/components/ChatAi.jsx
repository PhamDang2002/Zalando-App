import { Close, ExpandMore } from "@mui/icons-material";
import ChatbotIcon from "./ChatbotIcon";
import { IconButton } from "@mui/material";
import ChartForm from "./ChatForm";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

import { useProductDetailQuery } from "@services/rootApi";

const ChatAi = () => {
  const { data } = useProductDetailQuery();

  const [chatHistory, setChatHistory] = useState([]); // Khởi tạo rỗng

  useEffect(() => {
    if (data?.data?.products && data.data.products.length > 0) {
      setChatHistory([
        {
          hideInChat: true,
          role: "model",
          text: data.data.products
            .map(
              (product) =>
                `- ${product?.name} - ${product?.price}đ - ${product?.image} - ${product?.rating || ""}sao - ${product?._id || ""} -`,
            )
            .join("\n"),
        },
      ]);
    }
  }, [data]);

  const [showChatbot, setShowChatbot] = useState(false);

  const chatBodyRef = useRef();
  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Đang tìm kiếm..."),
        { role: "model", text, isError },
      ]);
    };

    // Lọc các message không có text hoặc text rỗng
    const filteredHistory = history.filter(
      (msg) => typeof msg.text === "string" && msg.text.trim() !== "",
    );

    const mappedHistory = filteredHistory.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: mappedHistory,
      }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions,
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data?.error?.message || "Failed to fetch response");
      const apiResponseText = data?.candidates[0]?.content?.parts[0]?.text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <>
      {/* Nút mở/đóng chatbot */}
      <button
        id="chatbot-toggler"
        className="fixed bottom-4 right-4 z-[100] flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full border-none bg-primary p-2 shadow-lg"
        onClick={() => setShowChatbot(!showChatbot)}
      >
        {showChatbot ? (
          <Close className="text-white" />
        ) : (
          <ChatbotIcon className="fill-white" />
        )}
      </button>

      {/* Cửa sổ chat AI */}
      <div
        className={`fixed bottom-4 right-4 z-[101] w-[420px] flex-col overflow-hidden rounded-[15px] bg-[#fff] shadow-lg transition-all duration-300 ${
          showChatbot ? "flex" : "hidden"
        }`}
        style={{
          width: "90vw",
          maxWidth: 420,
          minWidth: 280,
          right: "1rem",
          bottom: "1rem",
          height: "80vh",
          maxHeight: 600,
        }}
      >
        <div className="flex items-center justify-between border-b bg-primary px-[22px] py-[15px]">
          <div className="flex items-center gap-2">
            <ChatbotIcon className="h-[35px] w-[35px] flex-shrink-0 rounded-full bg-white fill-primary p-2" />
            <h2 className="cursor-pointer p-2 font-bold text-white">
              Chatbot AI
            </h2>
          </div>
          <IconButton
            className="size-[35px] !bg-white !text-primary"
            onClick={() => setShowChatbot(false)}
          >
            <ExpandMore />
          </IconButton>
        </div>
        <div
          className="flex h-[520px] flex-col"
          style={{ height: "calc(80vh - 60px)", minHeight: 350 }}
        >
          <div
            ref={chatBodyRef}
            className="flex flex-1 flex-col gap-4 overflow-y-auto p-[10px] pb-[72px]"
            style={{ fontSize: 15 }}
          >
            <div className="flex items-center gap-3">
              <ChatbotIcon className="h-[35px] w-[35px] flex-shrink-0 rounded-full bg-primary fill-white p-2" />
              <p className="max-w-[75%] px-[16px] py-[12px]">
                Xin chào <br />
                Tôi là Zalando, tôi có thể giúp gì cho bạn?
              </p>
            </div>

            {chatHistory
              .filter((message) => !message.hideInChat) // chỉ render message không bị ẩn
              .map((message, index) =>
                message.role === "user" ? (
                  <div
                    key={index}
                    className="flex flex-col items-end justify-end"
                  >
                    <p className="max-w-[75%] rounded-lg bg-primary px-[16px] py-[12px] text-white">
                      {message.text}
                    </p>
                  </div>
                ) : (
                  <div key={index} className="flex items-center gap-3">
                    <ChatbotIcon className="h-[35px] w-[35px] flex-shrink-0 rounded-full bg-primary fill-white p-2" />
                    <div
                      className={`max-w-[75%] rounded-lg px-[16px] py-[12px] ${
                        message.isError ? "text-primary" : "text-black"
                      }`}
                    >
                      {/* Thêm dòng thông báo nếu có sản phẩm */}
                      {message.text.match(/Giá:|Đánh giá:/) && (
                        <div style={{ fontWeight: "bold", marginBottom: 8 }}>
                          Dưới đây là danh sách sản phẩm theo yêu cầu của bạn:
                        </div>
                      )}
                      {/* Hiển thị từng dòng sản phẩm đẹp hơn */}
                      {message.text.split("\n").map((line, i) => {
                        // Tìm id sản phẩm từ [Xem chi tiết](id)
                        if (line.trim() === "Đang tìm kiếm...") {
                          return (
                            <div
                              key={i}
                              style={{ fontStyle: "italic", color: "#888" }}
                            >
                              Đang tìm kiếm...
                            </div>
                          );
                        }

                        const detailMatch = line.match(
                          /\[Xem chi tiết\]\(([^)]+)\)/i,
                        );
                        const productId = detailMatch ? detailMatch[1] : null;
                        const productLink = productId
                          ? `https://shoppe-app-phi.vercel.app/products/${productId}`
                          : null;

                        // Tìm tên sản phẩm
                        const nameMatch = line.match(/\|\s*([^\|]+)\s*\|/);
                        const productName = nameMatch
                          ? nameMatch[1].trim()
                          : "";

                        // Tìm giá
                        const priceMatch = line.match(/Giá:\s*([0-9.,]+)đ/);
                        const price = priceMatch ? priceMatch[1] : "";

                        // Tìm đánh giá
                        const ratingMatch = line.match(
                          /Đánh giá:\s*([0-9.]+)⭐/,
                        );
                        const rating = ratingMatch ? ratingMatch[1] : "";

                        // Nếu thiếu tên hoặc giá thì bỏ qua dòng này
                        if (!productName || !price) return null;

                        // Lấy ảnh sản phẩm từ data theo productId
                        let image = "";
                        if (productId && data?.data?.products) {
                          const found = data.data.products.find(
                            (p) => p._id === productId,
                          );
                          image = found?.image || "";
                        }

                        return (
                          <div
                            key={i}
                            style={{
                              marginBottom: 16,
                              display: "flex",
                              gap: 16,
                              alignItems: "start",
                              overflow: "hidden",
                              width: 320,
                            }}
                          >
                            {productLink ? (
                              <a
                                href={productLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: "inline-block",
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                <img
                                  src={image}
                                  alt={productName}
                                  style={{
                                    width: 80,
                                    height: 80,
                                    objectFit: "contain", // Sửa từ "cover" thành "contain"
                                    borderRadius: 8,
                                    marginBottom: 8,
                                    background: "#f3f3f3",
                                    display: "block",
                                    boxShadow: "0 1px 4px #0001",
                                  }}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "https://via.placeholder.com/80x80?text=No+Image";
                                  }}
                                />
                              </a>
                            ) : null}
                            <div style={{ textAlign: "start" }}>
                              {productLink ? (
                                <a
                                  href={productLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    color: "black",
                                    fontWeight: "normal",
                                    textDecoration: "none",
                                  }}
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    {productName}
                                  </span>
                                  <br />
                                  Giá: {price}đ
                                  <br />
                                  Đánh giá: {rating}⭐
                                </a>
                              ) : (
                                <span>
                                  <span style={{ fontWeight: "bold" }}>
                                    {productName}
                                  </span>
                                  <br />
                                  Giá: {price}đ
                                  <br />
                                  Đánh giá: {rating}⭐
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ),
              )}
          </div>
          <div className="border-t bg-white p-2">
            <ChartForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatAi;
