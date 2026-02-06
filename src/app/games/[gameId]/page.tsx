"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useAnswerGameQuiz,
  useGetGame,
} from "@/features/games/hooks/use-games";

import { cn } from "@/lib/utils";
import { Answer } from "@/types/answer";
import { ExtendedQuizQuestionReveal } from "@/types/quiz-question-reveals";

import Image from "next/image";
import { use, useState, useEffect } from "react";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

const QUIZ_TIME_LIMIT = 60; // 1 minute in seconds

export default function Page({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = use(params);

  const { data: game, error } = useGetGame(gameId);
  const answerGameQuiz = useAnswerGameQuiz();

  const [currentQuizIndex, setCurrentQuizIndex] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_TIME_LIMIT);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerResult, setAnswerResult] = useState<{
    isCorrect: boolean;
    correctAnswers: Answer[];
    givenAnswers: Answer[];
    quizQuestionReveal: ExtendedQuizQuestionReveal | null;
  } | null>(null);

  // Initialize currentQuizIndex based on game.currentGameQuizId
  useEffect(() => {
    if (!game || currentQuizIndex !== null) return;

    if (game.currentGameQuizId) {
      // Find the index of the current game quiz
      const index = game.gameQuizes.findIndex(
        (gq) => gq.id === game.currentGameQuizId,
      );
      setCurrentQuizIndex(index !== -1 ? index : 0);
    } else {
      // No current quiz set, start from first incomplete quiz
      const firstIncompleteIndex = game.gameQuizes.findIndex(
        (gq) => !gq.isCompleted,
      );
      setCurrentQuizIndex(
        firstIncompleteIndex !== -1 ? firstIncompleteIndex : 0,
      );
    }
  }, [game, currentQuizIndex]);

  const currentGameQuiz =
    currentQuizIndex !== null ? game?.gameQuizes[currentQuizIndex] : undefined;
  const currentQuiz = currentGameQuiz?.quiz;

  // Timer logic
  useEffect(() => {
    if (!currentGameQuiz || isAnswered || currentGameQuiz.isCompleted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - auto submit empty answer
          handleSubmitAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuizIndex, isAnswered, currentGameQuiz]);

  // Reset state when moving to next quiz
  useEffect(() => {
    setSelectedAnswers([]);
    setTimeRemaining(QUIZ_TIME_LIMIT);
    setIsAnswered(false);
    setAnswerResult(null);
  }, [currentQuizIndex]);

  const handleSubmitAnswer = async () => {
    if (!currentGameQuiz || isAnswered) return;

    setIsAnswered(true);

    const answers = selectedAnswers.map((answer) => ({ value: answer }));

    try {
      const result = await answerGameQuiz.mutateAsync({
        gameId,
        gameQuizId: currentGameQuiz.id,
        answers,
      });

      setAnswerResult(result);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex !== null && currentQuizIndex < (game?.gameQuizes.length || 0) - 1) {
      setCurrentQuizIndex((prev) => (prev !== null ? prev + 1 : 0));
    }
  };

  const handleAnswerSelect = (answerId: string) => {
    if (isAnswered) return;

    setSelectedAnswers((prev) => {
      if (prev.includes(answerId)) {
        return prev.filter((id) => id !== answerId);
      } else {
        return [...prev, answerId];
      }
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (error) {
    return (
      <div className="flex flex-col gap-5 flex-1">
        <h1 className="text-3xl font-bold text-white mx-auto w-full text-center">
          Game not found
        </h1>
      </div>
    );
  }

  if (!game || !currentGameQuiz || !currentQuiz) {
    return (
      <div className="flex flex-col gap-5 flex-1">
        <h1 className="text-3xl font-bold text-white mx-auto w-full text-center">
          Loading...
        </h1>
      </div>
    );
  }

  // Game completed
  if (
    game.status === "completed" ||
    game.completedQuizes === game.totalQuizes
  ) {
    return (
      <div className="flex flex-col gap-5 flex-1 items-center justify-center">
        <h1 className="text-3xl font-bold text-white text-center">
          Game Completed!
        </h1>
        <p className="text-xl text-white">
          You completed {game.completedQuizes} out of {game.totalQuizes} quizes
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 flex-1 p-6 max-w-4xl mx-auto">
      {/* Header with progress and timer */}
      <div className="flex justify-between items-center">
        <div className="text-white">
          <span className="text-lg font-semibold">
            Quiz {currentQuizIndex !== null ? currentQuizIndex + 1 : 0} of {game.gameQuizes.length}
          </span>
        </div>
        <div
          className={cn(
            "text-2xl font-bold px-4 py-2 rounded-lg",
            timeRemaining <= 10
              ? "text-red-500 bg-red-500/10"
              : "text-white bg-white/10",
          )}
        >
          {formatTime(timeRemaining)}
        </div>
      </div>

      {/* Quiz Question */}
      {currentQuiz.question && (
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {currentQuiz.question.title}
            </h2>
            {currentQuiz.question.description && (
              <p className="text-white/80">
                {currentQuiz.question.description}
              </p>
            )}
            {currentQuiz.question.items &&
              currentQuiz.question.items.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {currentQuiz.question.items.map((item) => (
                    <div key={item.id}>
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={item.text || "Quiz image"}
                          width={400}
                          height={300}
                          className="rounded-lg"
                        />
                      )}
                      {item.text && (
                        <p className="text-white mt-2">{item.text}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
          </CardContent>
        </Card>
      )}

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuiz.options.map((option) => {
          const isSelected = selectedAnswers.includes(option.id);
          const isCorrect =
            answerResult?.correctAnswers.some(
              (ans) => "quizOptionId" in ans && ans.quizOptionId === option.id,
            ) || false;
          const isGiven =
            answerResult?.givenAnswers.some(
              (ans) => "quizOptionId" in ans && ans.quizOptionId === option.id,
            ) || false;

          return (
            <Card
              key={option.id}
              className={cn(
                "cursor-pointer transition-all hover:scale-105",
                isSelected && !isAnswered && "ring-2 ring-blue-500",
                isAnswered &&
                  isCorrect &&
                  "ring-2 ring-green-500 bg-green-500/20",
                isAnswered &&
                  isGiven &&
                  !isCorrect &&
                  "ring-2 ring-red-500 bg-red-500/20",
                isAnswered ? "cursor-default" : "cursor-pointer",
              )}
              onClick={() => handleAnswerSelect(option.id)}
            >
              <CardContent className="p-4 relative">
                {option.item && (
                  <>
                    {option.item.imageUrl && (
                      <Image
                        src={option.item.imageUrl}
                        alt={option.item.text || "Option"}
                        width={300}
                        height={200}
                        className="rounded-lg w-full object-cover"
                      />
                    )}
                    {option.item.text && (
                      <p className="text-white mt-2 text-center font-semibold">
                        {option.item.text}
                      </p>
                    )}
                  </>
                )}
                {isAnswered && (
                  <div className="absolute top-2 right-2">
                    {isCorrect && (
                      <IoIosCheckmarkCircle className="text-green-500 text-3xl" />
                    )}
                    {isGiven && !isCorrect && (
                      <IoIosCloseCircle className="text-red-500 text-3xl" />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Answer Result */}
      {answerResult && answerResult.quizQuestionReveal && (
        <Card className="bg-blue-500/20 border-blue-500/50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">
              {answerResult.quizQuestionReveal.title}
            </h3>
            {answerResult.quizQuestionReveal.description && (
              <p className="text-white/90">
                {answerResult.quizQuestionReveal.description}
              </p>
            )}
            {answerResult.quizQuestionReveal.items &&
              answerResult.quizQuestionReveal.items.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {answerResult.quizQuestionReveal.items.map((item) => (
                    <div key={item.id}>
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={item.text || "Reveal image"}
                          width={400}
                          height={300}
                          className="rounded-lg"
                        />
                      )}
                      {item.text && (
                        <p className="text-white mt-2">{item.text}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        {!isAnswered ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswers.length === 0}
            size="lg"
            className="px-8"
          >
            Submit Answer
          </Button>
        ) : (
          <>
            {currentQuizIndex !== null &&
            currentQuizIndex < game.gameQuizes.length - 1 ? (
              <Button onClick={handleNextQuiz} size="lg" className="px-8">
                Next Quiz
              </Button>
            ) : (
              <Button
                onClick={() => window.location.reload()}
                size="lg"
                className="px-8"
              >
                View Results
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
