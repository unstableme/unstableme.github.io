import { useState } from "react";
import ChatMessage from "./ChatMessage";
import { Message } from "./ChatWidget";

interface Props {
  messages: Message[];
  onClose: () => void;
  onSend: (text: string) => void;
  isLoading: boolean;
}

const ChatWindow = ({
  messages,
  onClose,
  onSend,
  isLoading,
}: Props) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[420px] bg-white rounded-xl shadow-2xl flex flex-col border">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50 rounded-t-xl">
        <span className="font-semibold text-sm">Ask about Santosh</span>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}

        {isLoading && (
          <div className="text-sm text-gray-400 italic px-2">
            Assistant is typing...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-2 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your question..."
          disabled={isLoading}
          className="
            flex-1 rounded-md border 
            px-3 py-2 text-sm 
            text-gray-900
            bg-white
            placeholder-gray-400
            focus:outline-none focus:ring
            disabled:opacity-50
          "
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="
            bg-blue-600 text-white px-3 rounded-md text-sm 
            hover:bg-blue-700 
            disabled:opacity-50
          "
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
