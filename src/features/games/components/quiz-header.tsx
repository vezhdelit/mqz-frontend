import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/format";

interface QuizHeaderProps {
  currentQuizNumber: number;
  totalQuizes: number;
  timeRemaining: number;
}

const TIME_CRITICAL_THRESHOLD = 10;

/**
 * Display quiz progress and countdown timer
 */
export function QuizHeader({
  currentQuizNumber,
  totalQuizes,
  timeRemaining,
}: QuizHeaderProps) {
  const isCritical = timeRemaining <= TIME_CRITICAL_THRESHOLD;

  return (
    <div className="flex justify-between items-center">
      <div className="text-white">
        <span className="text-lg font-semibold">
          Quiz {currentQuizNumber} of {totalQuizes}
        </span>
      </div>
      <div
        className={cn(
          "text-2xl font-bold px-4 py-2 rounded-lg transition-colors",
          isCritical
            ? "text-red-500 bg-red-500/10 animate-pulse"
            : "text-white bg-white/10"
        )}
        role="timer"
        aria-label={`Time remaining: ${formatTime(timeRemaining)}`}
      >
        {formatTime(timeRemaining)}
      </div>
    </div>
  );
}
