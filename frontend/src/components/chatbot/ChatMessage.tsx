import { Message } from "./ChatWidget";

interface Props {
  message: Message;
}

const ChatMessage = ({ message }: Props) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-3 py-2 text-sm ${
          isUser
            ? "bg-primary text-primary-foreground rounded-lg rounded-br-none"
            : "bg-secondary text-secondary-foreground border border-border rounded-lg rounded-bl-none"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;
