
import { cn } from '@/lib/utils';

interface WordOptionProps {
  word: string;
  onClick: () => void;
  isUsed: boolean;
}

const WordOption = ({ word, onClick, isUsed }: WordOptionProps) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md border transition-all duration-200 font-medium",
        isUsed 
          ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed opacity-50 transform scale-95" 
          : "bg-white border-primary/70 text-primary hover:bg-primary/10 hover:border-primary hover:shadow-sm active:transform active:scale-95"
      )}
      onClick={onClick}
      disabled={isUsed}
      aria-disabled={isUsed}
    >
      {word}
    </button>
  );
};

export default WordOption;
