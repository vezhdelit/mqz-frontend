"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useAnswerGameQuiz,
  useGetGame,
} from "@/features/games/hooks/use-games";

import { cn } from "@/lib/utils";
import { Game, GameQuiz } from "@/features/games/types/games";
import { AnswerValue, Quiz, QuizOption } from "@/types/quizes";
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
  const [correctAnswers, setCorrectAnswers] = useState<AnswerValue[] | null>(
    null,
  );
  const answerGameQuiz = useAnswerGameQuiz();
  const onAnswer = async (answer: string) => {
    const data = await answerGameQuiz.mutateAsync({
      gameId: gameQuiz.gameId,
      gameQuizId: gameQuiz.id,
      answer,
    });
    if (data.isCorrect) {
      setCorrectAnswers([{ value: answer }]);
    } else {
      setCorrectAnswers([
        data.correctAnswer ? { value: data.correctAnswer } : { value: "" },
      ]);
    }

    console.log("Answered game quiz:", data);
  };
  return (
    <QuizItem
      onAnswer={onAnswer}
      quiz={gameQuiz.quiz}
      correctAnswers={correctAnswers}
    />
  );
};

const QuizItem = ({
  quiz,
  onAnswer,
  correctAnswers,
}: {
  quiz: Quiz;
  onAnswer: (answer: string) => void;
  correctAnswers?: AnswerValue[] | null;
}) => {
  const [givenAnswers, setGivenAnswers] = useState<AnswerValue[] | null>(null);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

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
    <Card key={quiz.id}>
      <CardContent className="flex flex-row gap-5">
        <div className="w-1/2 flex flex-col items-center justify-center gap-4">
          {quiz.questions.map((question) => (
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
            {quiz.options.map((option) => (
              <Button
                disabledBehavior={"none"}
                onClick={async () => {
                  onAnswer(option.id);
                  setGivenAnswers([{ value: option.id }]);
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
