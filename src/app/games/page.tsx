"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useAnswerGameQuiz,
  useGetGame,
} from "@/features/games/hooks/use-games";

import { cn } from "@/lib/utils";
import { Answer } from "@/types/answer";
import { ExtendedGameQuiz } from "@/types/game-quizes";
import { ExtendedGame, Game } from "@/types/games";
import { QuizAnswer } from "@/types/quiz-answers";
import { ExtendedQuizOption } from "@/types/quiz-options";
import { ExtendedQuizQuestionReveal } from "@/types/quiz-question-reveals";
import { ExtendedQuizQuestion } from "@/types/quiz-questions";

import Image from "next/image";
import { use, useState, useEffect } from "react";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

export default function Page({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = use(params);

  const { data, error } = useGetGame(gameId);

  if (error) {
    return (
      <div className="flex flex-col gap-5 flex-1">
        <h1 className="text-3xl font-bold text-white mx-auto w-full text-center">
          Game not found
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 flex-1">
      <h1 className="text-3xl font-bold text-white mx-auto w-full text-center">
        Game
      </h1>
      <div className="flex flex-col gap-6">
        {data && <GameItem {...data} />}
      </div>
    </div>
  );
}
const GameItem = (game: ExtendedGame) => {
  return (
    <div className="flex flex-col gap-5">
      {game.gameQuizes.map((gameQuiz) => (
        <GameQuizItem key={gameQuiz.id} {...gameQuiz} />
      ))}
    </div>
  );
};

const GameQuizItem = (gameQuiz: ExtendedGameQuiz) => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(
    gameQuiz.isCorrect,
  );
  const [quizReveals, setQuizReveals] = useState<
    ExtendedQuizQuestionReveal[] | null
  >(null);
  const [givenAnswers, setGivenAnswers] = useState<Answer[] | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<Answer[] | null>(null);
  const answerGameQuiz = useAnswerGameQuiz();
  const onAnswer = async (
    answers: {
      value: string;
    }[],
  ) => {
    const data = await answerGameQuiz.mutateAsync({
      gameId: gameQuiz.gameId,
      gameQuizId: gameQuiz.id,
      answers,
    });
    setIsCorrect(data.isCorrect);
    if (data.quizQuestionReveal) {
      setQuizReveals([data.quizQuestionReveal]);
    }

    if (data.givenAnswers) {
      setGivenAnswers(data.givenAnswers);
    }
    if (data.correctAnswers) {
      setCorrectAnswers(data.correctAnswers);
    }

    console.log("Answered game quiz:", data);
  };
  return (
    <QuizItem
      onAnswer={onAnswer}

      quizId={gameQuiz.quizId}
      quizOptions={gameQuiz.quiz.options}
      quizQuestion={gameQuiz.quiz.question}
      quizReveal={
        gameQuiz.isCompleted
          ? gameQuiz.quiz.questionReveal
          : quizReveals || undefined
      }
      isCorrect={gameQuiz.isCompleted ? gameQuiz.isCorrect : isCorrect}
      givenAnswers={
        gameQuiz.isCompleted ? gameQuiz.userAnswers || null : givenAnswers
      }
      quizAnswers={
        gameQuiz.isCompleted
          ? gameQuiz.quiz.answers
          : correctAnswers || undefined
      }
    />
  );
};

const QuizItem = ({
  quizId,
  quizQuestion,
  quizQuestionReveal,

  quizOptions,
  quizAnswers,

  givenAnswers,

  onAnswer,

  isCorrect,
}: {
  quizId: string;
  quizQuestion: ExtendedQuizQuestion | null;
  quizQuestionReveal: ExtendedQuizQuestionReveal | null;

  quizOptions: ExtendedQuizOption[];
  quizAnswers?: Answer[] | null;
  givenAnswers?: Answer[] | null;

  onAnswer: (
    answer: {
      value: string;
    }[],
  ) => void;
  isCorrect?: boolean | null;
}) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

  // Preload reveal images when they become available
  useEffect(() => {
    if (quizQuestionReveal) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImagesLoaded(false);
      const imageUrls = quizQuestionReveal.items
        .filter((i) => !!i.imageUrl)
        .map((i) => i.imageUrl) as string[];

      const imagePromises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(imagePromises)
        .then(() => {
          setImagesLoaded(true);
          // Small delay for smoother transition
          setTimeout(() => setShowReveal(true), 50);
        })
        .catch(() => {
          // Even on error, show the reveal
          setImagesLoaded(true);
          setTimeout(() => setShowReveal(true), 50);
        });
    } else {
      setShowReveal(false);
      setImagesLoaded(true);
    }
  }, [quizQuestionReveal]);

  const optionClassName = (option: ExtendedQuizOption) => {
    if (!givenAnswers || !quizAnswers) {
      return "";
    }

    const isGiven = givenAnswers.some((given) => given.value === option.id);
    const isCorrectOption = quizAnswers.some(
      (correct) => correct.value === option.id,
    );

    if (isGiven && isCorrectOption) {
      return "bg-green-500 text-white";
    } else if (isGiven && !isCorrectOption) {
      return "bg-rose-500 text-white";
    } else if (!isGiven && isCorrectOption) {
      return "border-2 border-green-500";
    } else {
      return "";
    }
  };

  return (
    <Card key={quizId}>
      <CardContent className="flex flex-col lg:flex-row gap-3 sm:gap-5 p-3 sm:p-4 md:p-6">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-2 sm:gap-4 relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
          {/* Quiz Questions */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-500",
              showReveal ? "opacity-0 pointer-events-none" : "opacity-100",
            )}
          >
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 w-full px-2">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold text-center">
                {quizQuestion?.title}
              </h2>
              {quizQuestion?.description && (
                <h3 className="text-xs sm:text-sm md:text-base text-center">
                  {quizQuestion?.description}
                </h3>
              )}
              <div className="flex flex-row gap-1 sm:gap-2 flex-wrap justify-center">
                {quizQuestion?.items.map((item, itemIndex) => {
                  if (!item.imageUrl) return null;
                  return (
                    <Image
                      key={itemIndex}
                      src={item.imageUrl}
                      alt={
                        quizQuestion?.title ||
                        `Quiz Question ${quizQuestion.id}`
                      }
                      width={250}
                      height={400}
                      className="rounded-md w-auto max-w-[120px] max-h-[200px] sm:max-w-[180px] sm:max-h-[280px] md:max-w-[250px] md:max-h-[400px] object-contain"
                      priority
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quiz Reveals */}
          {quizQuestionReveal && (
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-500",
                showReveal && imagesLoaded
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none",
              )}
            >
              <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 w-full px-2">
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-center">
                  {quizQuestionReveal.title}
                </h2>
                {quizQuestionReveal.description && (
                  <h3 className="text-xs sm:text-sm md:text-base text-center">
                    {quizQuestionReveal.description}
                  </h3>
                )}
                <div className="flex flex-row gap-1 sm:gap-2 flex-wrap justify-center">
                  {quizQuestionReveal.items.map((item, itemIndex) => {
                    if (!item.imageUrl) return null;
                    <Image
                      key={itemIndex}
                      src={item.imageUrl}
                      alt={quizQuestionReveal.title}
                      width={250}
                      height={400}
                      className="rounded-md w-auto max-w-[120px] max-h-[200px] sm:max-w-[180px] sm:max-h-[280px] md:max-w-[250px] md:max-h-[400px] object-contain"
                      priority
                    />;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-2 sm:gap-4">
          {quizAnswers && isCorrect !== null ? (
            isCorrect ? (
              <IoIosCheckmarkCircle className="size-10 sm:size-14 md:size-20 text-green-500 bg-white rounded-full" />
            ) : (
              <IoIosCloseCircle className="size-10 sm:size-14 md:size-20 text-rose-500 bg-white rounded-full" />
            )
          ) : null}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 w-full">
            {quizOptions.map((option) => (
              <Button
                disabledBehavior={"none"}
                onClick={async () => {
                  onAnswer([{ value: option.id }]);
                }}
                size="lg"
                key={option.id}
                className={cn(
                  optionClassName(option),
                  "text-xs sm:text-sm md:text-base h-auto py-2 sm:py-3 md:py-4 whitespace-normal min-h-[44px]",
                )}
              >
                <span className="text-center leading-tight">
                  {option.item?.text}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
