import { useState, useRef, useEffect } from "react";
import API from "../api";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  //  auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };

    // add user message
    setMessages((prev) => [...prev, userMessage]);

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
          "/chat/ask",
          { question: input },
          {
            headers: {
              Authorization: `Bearer ${token}`,
             },
          }
        );

      const botMessage = {
        text: res.data.answer,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (err) {
      console.log(err);
      setMessages((prev) => [
        ...prev,
        { text: "Error getting response ", sender: "bot" },
      ]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/*  Header */}
      <div className="bg-gray-800 text-white p-4 text-center font-bold">
        ChatGPT Clone
      </div>

      {/*  Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* auto scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <div className="p-4 bg-white flex gap-2">
        <input
          className="flex-1 border rounded p-2"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Send
        </button>
      </div>

    </div>
  );
}

export default Chat;