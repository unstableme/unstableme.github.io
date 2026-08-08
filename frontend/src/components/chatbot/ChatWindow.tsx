import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { Message } from "./ChatWidget";
import { useMode } from "@/context/ThemeContext";

interface Props {
  messages: Message[];
  onClose: () => void;
  onSend: (text: string) => void;
  isLoading: boolean;
}

const ChatWindow = ({ messages, onClose, onSend, isLoading }: Props) => {
  const { mode } = useMode();
  const isBat = mode === "batman";
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput("");
  };

  return (
    <div
      className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[420px] mode-card shadow-2xl flex flex-col"
      style={{ backgroundColor: "hsl(var(--card))" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="font-semibold text-sm text-foreground font-themed-mono">
          {isBat ? "// BATCOMPUTER — ask about Santosh" : "🏔️ Ask about Santosh"}
        </span>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close chat">
          ✕
        </button>
      </div>

      {/* Messages */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}
        {isLoading && (
          <div className="text-sm text-muted-foreground italic px-2 font-themed-mono">
            {isBat ? "Decrypting response..." : "Assistant is typing..."}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-2 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={isBat ? "Query the archives..." : "Type your question..."}
          disabled={isLoading}
          className="flex-1 px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground border border-border outline-none focus:border-primary/50 disabled:opacity-50"
          style={{ borderRadius: "var(--radius)" }}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="mode-btn-primary !px-4 !py-2 text-sm disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
