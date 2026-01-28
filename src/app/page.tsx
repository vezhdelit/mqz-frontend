"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useAnswerQuiz,
  useGetQuizes,
} from "@/features/quizes/hooks/use-quizes";
import { Quiz } from "@/types/quizes";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const { data: quizes } = useGetQuizes();

  return (
    <div className="flex flex-col gap-5 flex-1">
      <h1 className="text-3xl font-bold text-white mx-auto w-full text-center">
        Welcome to the MQZ Demo
      </h1>
      <div className="flex flex-col gap-6">
        {quizes?.map((quiz) => (
          <QuizItem key={quiz.id} {...quiz} />
        ))}
      </div>
    </div>
  );
}

const QuizItem = (quiz: Quiz) => {
  const answerQuiz = useAnswerQuiz();
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
          <div className=" grid grid-cols-2 gap-4 w-full">
            {quiz.options.map((option) => (
              <Button
                onClick={async () => {
                  const data = await answerQuiz.mutateAsync({
                    quizId: quiz.id,
                    answers: [{ value: option.id }],
                  });
                  alert(data.message);
                }}
                size="lg"
                key={option.id}
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
