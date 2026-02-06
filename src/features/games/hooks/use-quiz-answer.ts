import { useState, useCallback, useEffect } from "react";
import type { Answer } from "@/types/answer";
import type { ExtendedQuizQuestionReveal } from "@/types/quiz-question-reveals";
import { useAnswerGameQuiz } from "@/features/games/hooks/use-games";

interface AnswerResult {
  isCorrect: boolean;
  correctAnswers: Answer[];
  givenAnswers: Answer[];
  quizQuestionReveal: ExtendedQuizQuestionReveal | null;
}

/**
 * Hook for managing quiz answer selection and submission
 * @param gameId - The current game ID
 * @param currentQuizIndex - The current quiz index
 * @returns Answer state and control functions
 */
export function useQuizAnswer(gameId: string, currentQuizIndex: number | null) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null);

  const answerGameQuizMutation = useAnswerGameQuiz();

  // Reset state when quiz changes
  useEffect(() => {
    setSelectedAnswers([]);
    setIsAnswered(false);
    setAnswerResult(null);
  }, [currentQuizIndex]);

  const toggleAnswer = useCallback(
    (answerId: string) => {
      if (isAnswered) return;

      setSelectedAnswers((prev) =>
        prev.includes(answerId)
          ? prev.filter((id) => id !== answerId)
          : [...prev, answerId]
      );
    },
    [isAnswered]
  );

  const submitAnswer = useCallback(
    async (gameQuizId: string) => {
      if (isAnswered) return;

      setIsAnswered(true);

      const answers = selectedAnswers.map((answer) => ({ value: answer }));

      try {
        const result = await answerGameQuizMutation.mutateAsync({
          gameId,
          gameQuizId,
          answers,
        });

        setAnswerResult(result);
        return result;
      } catch (error) {
        console.error("Error submitting answer:", error);
        setIsAnswered(false);
        throw error;
      }
    },
    [gameId, selectedAnswers, isAnswered, answerGameQuizMutation]
  );

  return {
    selectedAnswers,
    isAnswered,
    answerResult,
    toggleAnswer,
    submitAnswer,
    isSubmitting: answerGameQuizMutation.isPending,
  };
}
