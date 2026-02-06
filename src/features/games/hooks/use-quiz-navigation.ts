import { useState, useEffect, useCallback } from "react";
import { ExtendedGame } from "@/types/games";

export function useQuizNavigation(game: ExtendedGame | undefined) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!game || currentQuizIndex !== null) return;

    if (game.currentGameQuizId) {
      const index = game.gameQuizes.findIndex(
        (gq) => gq.id === game.currentGameQuizId
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentQuizIndex(index !== -1 ? index : 0);
    } else {
      const firstIncompleteIndex = game.gameQuizes.findIndex(
        (gq) => !gq.isCompleted
      );
      setCurrentQuizIndex(firstIncompleteIndex !== -1 ? firstIncompleteIndex : 0);
    }
  }, [game, currentQuizIndex]);

  const goToNextQuiz = useCallback(() => {
    if (currentQuizIndex !== null && game) {
      const nextIndex = currentQuizIndex + 1;
      if (nextIndex < game.gameQuizes.length) {
        setCurrentQuizIndex(nextIndex);
      }
    }
  }, [currentQuizIndex, game]);

  const hasNextQuiz = currentQuizIndex !== null && game
    ? currentQuizIndex < game.gameQuizes.length - 1
    : false;

  const currentGameQuiz = currentQuizIndex !== null && game
    ? game.gameQuizes[currentQuizIndex]
    : undefined;

  return {
    currentQuizIndex,
    currentGameQuiz,
    goToNextQuiz,
    hasNextQuiz,
  };
}
