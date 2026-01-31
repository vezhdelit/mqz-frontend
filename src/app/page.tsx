"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useAnswerQuiz,
  useGetQuizes,
} from "@/features/quizes/hooks/use-quizes";
import { cn } from "@/lib/utils";
import { AnswerValue, Quiz, QuizOption } from "@/types/quizes";
import Image from "next/image";
import { useState } from "react";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

export default function Page() {
  const { data } = useGetQuizes();

  return (
    <div className="flex flex-col gap-5 flex-1">
      <h1 className="text-3xl font-bold text-white mx-auto w-full text-center">
        Welcome to the MQZ Demo
      </h1>
      <div className="flex flex-col gap-6">
        {data?.data.items?.map((quiz) => (
          <QuizItem key={quiz.id} {...quiz} />
        ))}
      </div>
    </div>
  );
}

const QuizItem = (quiz: Quiz) => {
  const [givenAnswers, setGivenAnswers] = useState<AnswerValue[] | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<AnswerValue[] | null>(
    null,
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const answerQuiz = useAnswerQuiz();

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
                disabled={answerQuiz.isSuccess}
                disabledBehavior={"none"}
                onClick={async () => {
                  const data = await answerQuiz.mutateAsync({
                    quizId: quiz.id,
                    answers: [{ value: option.id }],
                  });
                  setGivenAnswers(data.givenAnswers);
                  setCorrectAnswers(data.correctAnswers);
                  setIsCorrect(data.status === "correct");
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
