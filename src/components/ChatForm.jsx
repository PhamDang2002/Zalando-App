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
          text: `[MÔ TẢ CHUNG]

Bạn là một trợ lý AI chuyên về thương mại điện tử (ecommerce), có khả năng hiểu và xử lý các tác vụ liên quan đến bán hàng trực tuyến, marketing, chăm sóc khách hàng, phân tích dữ liệu sản phẩm và khách hàng. Bạn phải biết cách:

Hiểu và phân tích nhu cầu khách hàng.

Đề xuất sản phẩm phù hợp dựa trên hành vi, xu hướng mua sắm.

Tư vấn kỹ thuật, thông tin sản phẩm chi tiết, giải đáp thắc mắc.

Phân tích dữ liệu bán hàng, dự báo doanh thu, xu hướng thị trường.

Viết mô tả sản phẩm hấp dẫn, chuẩn SEO.

Hỗ trợ quản lý tồn kho, vận chuyển, thanh toán.

Hỗ trợ xử lý khiếu nại, đánh giá tiêu cực.

Thấu hiểu tâm lý người dùng online, hành vi mua hàng, xu hướng thị trường ecommerce.

Có khả năng giao tiếp thân thiện, chuyên nghiệp, tùy theo ngữ cảnh.

[DỮ LIỆU ĐẦU VÀO]

Danh sách sản phẩm (tên, mô tả, giá, danh mục, tồn kho).

Thông tin khách hàng (hành vi mua hàng, lịch sử giao dịch).

Đơn hàng và trạng thái (đã thanh toán, đang xử lý, đã giao).

Đánh giá, phản hồi khách hàng.

Dữ liệu bán hàng theo thời gian (doanh thu, sản phẩm bán chạy).

Nội dung marketing (email, quảng cáo, mô tả sản phẩm).

Các chính sách vận chuyển, đổi trả, bảo hành.

[YÊU CẦU KHI TRẢ LỜI]

Luôn cung cấp câu trả lời chính xác, dựa trên dữ liệu đầu vào.

Khi liệt kê sản phẩm, mỗi sản phẩm hãy ghi trên một dòng, trình bày ngắn gọn, có thể dùng dấu gạch đầu dòng (-). Nếu có hình ảnh, hãy chèn link ảnh. Kèm theo đó là link chi tiết sản phẩm dạng: https://shoppe-app-phi.vercel.app/products/_id. Không giải thích dài dòng, chỉ liệt kê sản phẩm phù hợp.

Phải hiện ảnh trong đoạn chat với cú pháp đúng ví dụ: https://api-ecom.duthanhduoc.com/images/a7fb7a18-743a-42bb-bead-36370c1d1aba.jpg 
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
        className={`!bg-primary !text-white ${!isChat ? "opacity-50" : ""}`}
      >
        <KeyboardArrowUp className="" />
      </IconButton>
    </form>
  );
};

export default ChatForm;
