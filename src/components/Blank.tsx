
import { cn } from '@/lib/utils';

interface BlankProps {
  word?: string;
  index: number;
  onClick: (index: number) => void;
  disabled?: boolean;
}

const Blank = ({ word, index, onClick, disabled = false }: BlankProps) => {
  return (
    <button 
      className={cn(
        "min-w-[120px] md:min-w-[150px] px-3 py-2 border rounded-md inline-flex items-center justify-center mx-1 my-1 transition-all duration-200",
        word 
          ? "bg-primary/10 border-primary text-primary font-medium shadow-sm" 
          : "bg-white border-gray-300 border-dashed",
        disabled 
          ? "cursor-not-allowed opacity-70" 
          : word 
            ? "cursor-pointer hover:bg-primary/20 hover:shadow-md" 
            : "cursor-pointer hover:border-primary/50 hover:border-dashed"
      )}
      onClick={() => !disabled && onClick(index)}
      disabled={disabled}
      aria-label={word ? `Remove word: ${word}` : `Empty blank ${index + 1}`}
    >
      {word || "___________"}
    </button>
  );
};

export default Blank;
