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

  return <div className="flex flex-col gap-5 flex-1"></div>;
}
