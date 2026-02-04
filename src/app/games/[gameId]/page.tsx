"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useAnswerGameQuiz,
  useGetGame,
} from "@/features/games/hooks/use-games";

import { cn } from "@/lib/utils";
import { Game, GameQuiz } from "@/features/games/types/games";
import {
  AnswerValue,
  Quiz,
  QuizOption,
  QuizQuestion,
  QuizReveal,
} from "@/features/games/types/quizes";
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
        Game {gameId}
      </h1>
      <div className="flex flex-col gap-6">
        {data && <GameItem {...data} />}
      </div>
    </div>
  );
}
const GameItem = (game: Game) => {
  return (
    <div className="flex flex-col gap-5">
      {game.gameQuizes.map((gameQuiz) => (
        <GameQuizItem key={gameQuiz.id} {...gameQuiz} />
      ))}
    </div>
  );
};

const GameQuizItem = (gameQuiz: GameQuiz) => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(
    gameQuiz.isCorrect,
  );
  const [quizReveals, setQuizReveals] = useState<QuizReveal[] | null>(null);
  const [givenAnswers, setGivenAnswers] = useState<AnswerValue[] | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<AnswerValue[] | null>(
    null,
  );
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
    if (data.quizReveal) {
      setQuizReveals([data.quizReveal]);
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
      // quiz={gameQuiz.quiz}

      quizId={gameQuiz.quizId}
      quizOptions={gameQuiz.quiz.options}
      quizQuestions={gameQuiz.quiz.questions}
      quizReveals={
        gameQuiz.isCompleted ? gameQuiz.quiz.reveals : quizReveals || undefined
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
  quizOptions,
  quizQuestions,
  quizReveals,
  quizAnswers,

  givenAnswers,

  onAnswer,

  isCorrect,
}: {
  quizId: string;
  quizOptions: QuizOption[];
  quizQuestions: QuizQuestion[];
  quizReveals?: QuizReveal[];
  quizAnswers?: AnswerValue[];

  givenAnswers?: AnswerValue[] | null;

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
    if (quizReveals && quizReveals.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImagesLoaded(false);
      const imageUrls = quizReveals.flatMap((reveal) =>
        reveal.items.map((item) => item.imageUrl),
      );

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
  }, [quizReveals]);

  const optionClassName = (option: QuizOption) => {
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
      <CardContent className="flex flex-row gap-5">
        <div className="w-1/2 flex flex-col items-center justify-center gap-4 relative min-h-[500px]">
          {/* Quiz Questions */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-500",
              showReveal ? "opacity-0 pointer-events-none" : "opacity-100",
            )}
          >
            {quizQuestions.map((question) => (
              <div
                key={question.id}
                className="flex flex-col items-center justify-center gap-4"
              >
                <h2 className="text-lg font-semibold">{question.title}</h2>
                {question.description && <h3>{question.description}</h3>}
                <div className="flex flex-row gap-2">
                  {question.items.map((item, itemIndex) => (
                    <Image
                      key={itemIndex}
                      src={item.imageUrl}
                      alt={question.title}
                      width={250}
                      height={400}
                      className="rounded-md"
                      priority
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quiz Reveals */}
          {quizReveals && quizReveals.length > 0 && (
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-500",
                showReveal && imagesLoaded
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none",
              )}
            >
              {quizReveals.map((reveal) => (
                <div
                  key={reveal.id}
                  className="flex flex-col items-center justify-center gap-4"
                >
                  <h2 className="text-lg font-semibold">{reveal.title}</h2>
                  {reveal.description && <h3>{reveal.description}</h3>}
                  <div className="flex flex-row gap-2">
                    {reveal.items.map((item, itemIndex) => (
                      <Image
                        key={itemIndex}
                        src={item.imageUrl}
                        alt={reveal.title}
                        width={250}
                        height={400}
                        className="rounded-md"
                        priority
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-1/2 flex flex-col items-center justify-center gap-4">
          {quizAnswers && isCorrect !== null ? (
            isCorrect ? (
              <IoIosCheckmarkCircle className="size-20 text-green-500 bg-white rounded-full" />
            ) : (
              <IoIosCloseCircle className="size-20 text-rose-500 bg-white rounded-full" />
            )
          ) : null}
          <div className=" grid grid-cols-2 gap-4 w-full">
            {quizOptions.map((option) => (
              <Button
                disabledBehavior={"none"}
                onClick={async () => {
                  onAnswer([{ value: option.id }]);
                }}
                size="lg"
                key={option.id}
                className={cn(optionClassName(option))}
              >
                <span className={"truncate"}>{option.text}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
