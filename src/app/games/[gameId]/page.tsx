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

export default function Page({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = use(params);
  const { data: game, error } = useGetGame(gameId);

  const { currentQuizIndex, currentGameQuiz, goToNextQuiz, hasNextQuiz } =
    useQuizNavigation(game);

  const {
    selectedAnswers,
    isAnswered,
    answerResult,
    toggleAnswer,
    submitAnswer,
    isSubmitting,
  } = useQuizAnswer(gameId, currentQuizIndex);

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
      <div className="flex flex-col gap-5 flex-1">
        <h1 className="text-3xl font-bold text-white mx-auto w-full text-center">
          Game not found
        </h1>
      </div>
    );
  }

  // Loading state
  if (!game || currentQuizIndex === null || !currentGameQuiz) {
    return (
      <div className="flex flex-col gap-5 flex-1">
        <h1 className="text-3xl font-bold text-white mx-auto w-full text-center">
          Loading...
        </h1>
      </div>
    );
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
    <div className="flex flex-col gap-5 flex-1 p-6 max-w-4xl mx-auto">
      <QuizHeader
        currentQuizNumber={currentQuizIndex + 1}
        totalQuizes={game.gameQuizes.length}
        timeRemaining={timeRemaining}
      />

      {currentQuiz.question && (
        <QuizQuestion
          question={currentQuiz.question}
          questionReveal={answerResult?.quizQuestionReveal}
          isReavealed={isAnswered}
        />
      )}

      <QuizOptionsGrid
        options={currentQuiz.options}
        selectedAnswers={selectedAnswers}
        isAnswered={isAnswered}
        correctAnswers={answerResult?.correctAnswers || []}
        givenAnswers={answerResult?.givenAnswers || []}
        onSelectAnswer={toggleAnswer}
      />

      <QuizActions
        isAnswered={isAnswered}
        hasNextQuiz={hasNextQuiz}
        canSubmit={selectedAnswers.length > 0}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onNext={handleNext}
        onFinish={handleFinish}
      />
    </div>
  );
}
