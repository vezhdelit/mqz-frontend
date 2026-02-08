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
 * @param answerType - The type of answer (single_choice, multiple_choice, or text_input)
 * @returns Answer state and control functions
 */
export function useQuizAnswer(
  gameId: string,
  currentQuizIndex: number | null,
  answerType: "single_choice" | "multiple_choice" | "text_input" = "multiple_choice"
) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [textInput, setTextInput] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null);

  const answerGameQuizMutation = useAnswerGameQuiz();

  // Reset state when quiz changes
  useEffect(() => {
    setSelectedAnswers([]);
    setTextInput("");
    setIsAnswered(false);
    setAnswerResult(null);
  }, [currentQuizIndex]);

  const toggleAnswer = useCallback(
    (answerId: string) => {
      if (isAnswered) return;

      if (answerType === "single_choice") {
        // For single choice, replace selection or deselect if clicking the same option
        setSelectedAnswers((prev) =>
          prev.includes(answerId) ? [] : [answerId]
        );
      } else if (answerType === "multiple_choice") {
        // For multiple choice, toggle selection
        setSelectedAnswers((prev) =>
          prev.includes(answerId)
            ? prev.filter((id) => id !== answerId)
            : [...prev, answerId]
        );
      }
      // text_input doesn't use toggleAnswer
    },
    [isAnswered, answerType]
  );

  const updateTextInput = useCallback(
    (text: string) => {
      if (isAnswered) return;
      setTextInput(text);
    },
    [isAnswered]
  );

  const submitAnswer = useCallback(
    async (gameQuizId: string) => {
      if (isAnswered) return;

      setIsAnswered(true);

      // For text_input, use the textInput value; for others, use selectedAnswers
      const answers =
        answerType === "text_input"
          ? [{ value: textInput.trim() }]
          : selectedAnswers.map((answer) => ({ value: answer }));

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
    [gameId, selectedAnswers, textInput, answerType, isAnswered, answerGameQuizMutation]
  );

  return {
    selectedAnswers,
    textInput,
    isAnswered,
    answerResult,
    toggleAnswer,
    updateTextInput,
    submitAnswer,
    isSubmitting: answerGameQuizMutation.isPending,
  };
}
