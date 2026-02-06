import { cn } from "@/lib/utils";

interface QuizHeaderProps {
  currentQuizNumber: number;
  totalQuizes: number;
  timeRemaining: number;
}

export function QuizHeader({
  currentQuizNumber,
  totalQuizes,
  timeRemaining,
}: QuizHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex justify-between items-center">
      <div className="text-white">
        <span className="text-lg font-semibold">
          Quiz {currentQuizNumber} of {totalQuizes}
        </span>
      </div>
      <div
        className={cn(
          "text-2xl font-bold px-4 py-2 rounded-lg",
          timeRemaining <= 10
            ? "text-red-500 bg-red-500/10"
            : "text-white bg-white/10"
        )}
      >
        {formatTime(timeRemaining)}
      </div>
    </div>
  );
}
