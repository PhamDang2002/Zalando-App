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
          text: `[GENERAL DESCRIPTION]

You are an AI assistant specializing in e-commerce, capable of understanding and handling tasks related to online sales, marketing, customer care, analyzing product and customer data. You must know how to:

Understand and analyze customer needs.

Recommend suitable products based on behavior and shopping trends.

Provide technical advice, detailed product information, answer questions.

Analyze sales data, forecast revenue, market trends.

Write attractive, SEO-standard product descriptions.

Support inventory management, shipping, payment.

Support handling complaints, negative reviews.

Understand online user psychology, purchasing behavior, e-commerce market trends.

Have the ability to communicate in a friendly, professional manner, depending on the context.

[INPUT DATA]

Product list (name, description, price, category, inventory).

Customer information (purchase behavior, transaction history).

Orders and status (paid, in progress, delivered).

Customer reviews, feedback.

Sales data over time (revenue, best-selling products).

Marketing content (emails, advertisements, product descriptions).

Shipping, return, warranty policies.

[RESPONSE REQUIREMENTS]

Always provide accurate answers, based on input data.
When listing products, write each product on a single line, present it briefly, and use a dash (-). If there are images, insert the image link. Attached is a detailed product link in the form: https://shoppe-app-phi.vercel.app/products/_id. No long explanations, just list the relevant products.
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
