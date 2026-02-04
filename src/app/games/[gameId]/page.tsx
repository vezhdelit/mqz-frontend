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
import { use, useState } from "react";
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
      quizReveals={quizReveals || undefined}
      
      isCorrect={isCorrect}
      givenAnswers={givenAnswers}
      correctAnswers={correctAnswers}
    />
  );
};

const QuizItem = ({
  quizId,
  quizOptions,
  quizQuestions,
  quizReveals,

  onAnswer,
  givenAnswers,
  correctAnswers,
  isCorrect,
}: {
  quizId: string;
  quizOptions: QuizOption[];
  quizQuestions: QuizQuestion[];
  quizReveals?: QuizReveal[];

  onAnswer: (
    answer: {
      value: string;
    }[],
  ) => void;
  givenAnswers?: AnswerValue[] | null;
  correctAnswers?: AnswerValue[] | null;
  isCorrect?: boolean | null;
}) => {
  const optionClassName = (option: QuizOption) => {
    if (!givenAnswers || !correctAnswers) {
      return "";
    }

    const isGiven = givenAnswers.some((given) => given.value === option.id);
    const isCorrectOption = correctAnswers.some(
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
        <div className="w-1/2 flex flex-col items-center justify-center gap-4">
          {quizReveals && quizReveals.length > 0
            ? quizReveals.map((reveal) => (
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
                      />
                    ))}
                  </div>
                </div>
              ))
            : quizQuestions.map((question) => (
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
                      />
                    ))}
                  </div>
                </div>
              ))}
        </div>

        <div className="w-1/2 flex flex-col items-center justify-center gap-4">
          {correctAnswers && isCorrect !== null ? (
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
