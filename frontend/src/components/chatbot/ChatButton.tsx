interface Props {
  isOpen: boolean;
  onClick: () => void;
}

const ChatButton = ({ isOpen, onClick }: Props) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
      
      {/* Label */}
      {!isOpen && (
        <div className="text-sm bg-gray-900 text-white px-3 py-1 rounded-md shadow-md
                        animate-fade-up">
          Let’s chat!
        </div>
      )}

      {/* Button */}
      <button
        onClick={onClick}
        className={`
          h-14 w-14 rounded-full 
          bg-blue-600 text-white shadow-lg 
          hover:bg-blue-700 transition-all
          ${!isOpen ? "animate-breathe" : ""}
        `}
        aria-label="Open chat"
      >
        💬
      </button>
    </div>
  );
};

export default ChatButton;
