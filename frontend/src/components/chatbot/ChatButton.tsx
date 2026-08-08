import { useMode } from "@/context/ThemeContext";
import { BatIcon } from "@/components/layout/ModeToggle";
import { Mountain } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

const ChatButton = ({ isOpen, onClick }: Props) => {
  const { mode } = useMode();
  const isBat = mode === "batman";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* short label on phones so it stays clear of page content */}
      {!isOpen && (
        <div className="mode-card px-3 py-1 text-xs text-foreground shadow-md animate-fade-up font-themed-mono">
          <span className="sm:hidden">{isBat ? "Signal" : "Chat"}</span>
          <span className="hidden sm:inline">
            {isBat ? "Signal the assistant" : "Let's chat!"}
          </span>
        </div>
      )}

      <button
        onClick={onClick}
        className={`h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg
          flex items-center justify-center hover:opacity-90 transition-all
          ${!isOpen ? "animate-breathe" : ""}`}
        aria-label="Open chat"
      >
        {isBat ? <BatIcon className="w-9" /> : <Mountain className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default ChatButton;
