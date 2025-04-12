
import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
}

const Timer = ({ duration, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    // Reset timer when duration changes (new question)
    setTimeLeft(duration);
    setIsWarning(false);
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime <= 1 ? 0 : prevTime - 1;
        
        // Set warning state when 10 seconds or less remain
        if (newTime <= 10 && !isWarning) {
          setIsWarning(true);
        }
        
        if (newTime === 0) {
          clearInterval(timer);
          onTimeUp();
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onTimeUp]);

  // Calculate percentage for progress bar
  const progressPercentage = (timeLeft / duration) * 100;

  // Determine color based on time left
  const getProgressColor = () => {
    if (progressPercentage > 60) return "bg-green-500";
    if (progressPercentage > 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
        <span className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          Time Remaining
        </span>
        <span className={cn(
          "font-medium tabular-nums",
          isWarning ? "text-red-500 animate-pulse" : ""
        )}>
          {timeLeft}s
        </span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-500",
            getProgressColor()
          )}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
