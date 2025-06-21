import { KeyboardArrowUp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";

const ChatForm = ({ setChatHistory, generateBotResponse, chatHistory }) => {
  const [isChat, setIsChat] = useState("");
  const inputRef = useRef(null);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();

    inputRef.current.value = ""; // Clear the input field after submission
    if (!userMessage) return; // Prevent empty messages
    setIsChat("");
    setChatHistory((prev) => [...prev, { role: "user", text: userMessage }]);
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "model",
          text: "Đang tìm kiếm...",
        },
      ]);
      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Bạn là một trợ lý AI chuyên về thương mại điện tử (ecommerce), có nhiệm vụ hỗ trợ khách hàng và quản trị viên trong các tác vụ liên quan đến bán hàng trực tuyến. Hãy trả lời ngắn gọn, rõ ràng, chuyên nghiệp, trình bày đẹp, dễ đọc, sử dụng dữ liệu đầu vào bên dưới.

**Yêu cầu trình bày sản phẩm:**
- Mỗi sản phẩm trên một dòng, theo mẫu:
  [Ảnh sản phẩm](link_ảnh) | **Tên sản phẩm** | Giá: ...đ | Đánh giá: ...⭐ | [Xem chi tiết](link_sản_phẩm)
- Không dùng bảng, không dùng thẻ <img>, chỉ dùng markdown như trên.
- Nếu có nhiều sản phẩm, hãy liệt kê tối đa 5 sản phẩm phù hợp nhất.
- Nếu không tìm thấy sản phẩm phù hợp, hãy trả lời lịch sự.
- Không giải thích dài dòng, chỉ trả lời đúng trọng tâm.

**Dữ liệu đầu vào:**
- Danh sách sản phẩm (tên, mô tả, giá, danh mục, tồn kho, hình ảnh, đánh giá, liên kết chi tiết).
- Thông tin khách hàng (hành vi mua hàng, lịch sử giao dịch).
- Đơn hàng và trạng thái (đã thanh toán, đang xử lý, đã giao).
- Đánh giá, phản hồi khách hàng.
- Dữ liệu bán hàng theo thời gian (doanh thu, sản phẩm bán chạy).
- Nội dung marketing (email, quảng cáo, mô tả sản phẩm).
- Các chính sách vận chuyển, đổi trả, bảo hành.

**Câu hỏi của người dùng:**  
${userMessage}`,
        },
      ]);
    }, 600);
  };

  return (
    <form
      action=""
      className="flex items-center gap-2 bg-white outline-none"
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        className="h-[47px] w-full flex-1 rounded-lg border-none bg-none px-[17px] py-0 text-[0.95rem] outline-none focus-within:bg-slate-100"
        placeholder="Message..."
        ref={inputRef}
        onChange={(e) => setIsChat(e.target.value)}
        value={isChat}
        required
      />
      <IconButton
        onClick={handleFormSubmit}
        className={`!bg-primary !text-white ${!isChat ? "opacity-50" : ""}`}
      >
        <KeyboardArrowUp className="" />
      </IconButton>
    </form>
  );
};

export default ChatForm;
