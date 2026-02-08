"use client";

import { use, useCallback } from "react";
import { useGetGame } from "@/features/games/hooks/use-games";
import { useQuizNavigation } from "../../../features/games/hooks/use-quiz-navigation";
import { useQuizAnswer } from "../../../features/games/hooks/use-quiz-answer";
import { useQuizTimer } from "../../../features/games/hooks/use-quiz-timer";
import { QuizHeader } from "../../../features/games/components/quiz-header";
import { QuizQuestion } from "../../../features/games/components/quiz-question";
import { QuizOptionsGrid } from "../../../features/games/components/quiz-options-grid";
import { QuizActions } from "../../../features/games/components/quiz-actions";
import { GameCompleted } from "../../../features/games/components/game-completed";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { ERROR_MESSAGES } from "@/lib/constants";

export default function Page({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = use(params);
  const { data: game, error, isLoading } = useGetGame(gameId);

  const { currentQuizIndex, currentGameQuiz, goToNextQuiz, hasNextQuiz } =
    useQuizNavigation(game);

  const {
    selectedAnswers,
    textInput,
    isAnswered,
    answerResult,
    toggleAnswer,
    updateTextInput,
    submitAnswer,
    isSubmitting,
  } = useQuizAnswer(gameId, currentQuizIndex, currentGameQuiz?.quiz.answerType);

  const handleTimeUp = useCallback(() => {
    if (currentGameQuiz && !isAnswered) {
      submitAnswer(currentGameQuiz.id);
    }
  }, [currentGameQuiz, isAnswered, submitAnswer]);

  const { timeRemaining, reset: resetTimer } = useQuizTimer(
    !isAnswered && !!currentGameQuiz && !currentGameQuiz.isCompleted,
    handleTimeUp,
  );

  const handleSubmit = useCallback(async () => {
    if (currentGameQuiz) {
      await submitAnswer(currentGameQuiz.id);
    }
  }, [currentGameQuiz, submitAnswer]);

  const handleNext = useCallback(() => {
    goToNextQuiz();
    resetTimer();
  }, [goToNextQuiz, resetTimer]);

  const handleFinish = useCallback(() => {
    window.location.reload();
  }, []);

  // Error state
  if (error) {
    return (
      <ErrorState
        title={ERROR_MESSAGES.GAME.NOT_FOUND}
        message="The game you're looking for doesn't exist or has been removed."
      />
    );
  }

  // Loading state
  if (isLoading || !game || currentQuizIndex === null || !currentGameQuiz) {
    return <LoadingState message="Loading game..." />;
  }

  // Game completed state
  if (
    game.status === "completed" ||
    game.completedQuizes === game.totalQuizes
  ) {
    return (
      <GameCompleted
        completedQuizes={game.completedQuizes}
        totalQuizes={game.totalQuizes}
      />
    );
  }

  const currentQuiz = currentGameQuiz.quiz;

  if (!currentQuiz) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 flex-1 p-3 md:p-5 max-w-4xl mx-auto bg-lime-900 shrink">
      <QuizHeader
        currentQuizNumber={currentQuizIndex + 1}
        totalQuizes={game.gameQuizes.length}
        timeRemaining={timeRemaining}
      />

      {currentQuiz.question && (
        <QuizQuestion
          question={currentQuiz.question}
          questionReveal={answerResult?.quizQuestionReveal}
          isRevealed={isAnswered}
        />
      )}

      <QuizOptionsGrid
        options={currentQuiz.options}
        selectedAnswers={selectedAnswers}
        textInput={textInput}
        isCorrect={answerResult?.isCorrect || false}
        isAnswered={isAnswered}
        correctAnswers={answerResult?.correctAnswers || []}
        givenAnswers={answerResult?.givenAnswers || []}
        answerType={currentQuiz.answerType}
        onSelectAnswer={toggleAnswer}
        onTextInputChange={updateTextInput}
      />

      <QuizActions
        isAnswered={isAnswered}
        hasNextQuiz={hasNextQuiz}
        canSubmit={
          currentQuiz.answerType === "text_input"
            ? textInput.trim().length > 0
            : selectedAnswers.length > 0
        }
        isSubmitting={isSubmitting}
        answerType={currentQuiz.answerType}
        answerInstructions={currentQuiz.answerInstructions}
        onSubmit={handleSubmit}
        onNext={handleNext}
        onFinish={handleFinish}
      />
    </div>
  );
}
