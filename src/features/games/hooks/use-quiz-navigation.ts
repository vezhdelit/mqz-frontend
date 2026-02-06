import { useState, useEffect, useCallback, useMemo } from "react";
import type { ExtendedGame } from "@/types/games";

/**
 * Hook for managing quiz navigation state
 * @param game - The current game data
 * @returns Navigation state and controls
 */
export function useQuizNavigation(game: ExtendedGame | undefined) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number | null>(null);

  // Initialize current quiz index
  useEffect(() => {
    if (!game || currentQuizIndex !== null) return;

    let initialIndex = 0;

    if (game.currentGameQuizId) {
      const index = game.gameQuizes.findIndex(
        (gq) => gq.id === game.currentGameQuizId
      );
      initialIndex = index !== -1 ? index : 0;
    } else {
      const firstIncompleteIndex = game.gameQuizes.findIndex(
        (gq) => !gq.isCompleted
      );
      initialIndex = firstIncompleteIndex !== -1 ? firstIncompleteIndex : 0;
    }

    setCurrentQuizIndex(initialIndex);
  }, [game, currentQuizIndex]);

  const goToNextQuiz = useCallback(() => {
    if (currentQuizIndex !== null && game) {
      const nextIndex = currentQuizIndex + 1;
      if (nextIndex < game.gameQuizes.length) {
        setCurrentQuizIndex(nextIndex);
      }
    }
  }, [currentQuizIndex, game]);

  const hasNextQuiz = useMemo(
    () =>
      currentQuizIndex !== null && game
        ? currentQuizIndex < game.gameQuizes.length - 1
        : false,
    [currentQuizIndex, game]
  );

  const currentGameQuiz = useMemo(
    () =>
      currentQuizIndex !== null && game
        ? game.gameQuizes[currentQuizIndex]
        : undefined,
    [currentQuizIndex, game]
  );

  return {
    currentQuizIndex,
    currentGameQuiz,
    goToNextQuiz,
    hasNextQuiz,
  };
}
