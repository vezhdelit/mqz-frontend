interface GameCompletedProps {
  completedQuizes: number;
  totalQuizes: number;
}

export function GameCompleted({
  completedQuizes,
  totalQuizes,
}: GameCompletedProps) {
  return (
    <div className="flex flex-col gap-5 flex-1 items-center justify-center">
      <h1 className="text-3xl font-bold text-white text-center">
        Game Completed!
      </h1>
      <p className="text-xl text-white">
        You completed {completedQuizes} out of {totalQuizes} quizes
      </p>
    </div>
  );
}
