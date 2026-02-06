import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ExtendedQuizQuestion } from "@/types/quiz-questions";
import { ExtendedQuizQuestionReveal } from "@/types/quiz-question-reveals";
import { useState, useRef, useEffect } from 'react'
import autoAnimate from '@formkit/auto-animate'

interface QuizQuestionProps {
  question: ExtendedQuizQuestion;
  isReavealed?: boolean;
  questionReveal?: ExtendedQuizQuestionReveal | null;
}

export function QuizQuestion({ question }: QuizQuestionProps) {
  return (
    <Card className="bg-white/10 border-white/20 animate-in fade-in slide-in-from-top-4 duration-500">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-white mb-2">{question.title}</h2>
        {question.description && (
          <p className="text-white/80">{question.description}</p>
        )}
        {question.items && question.items.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {question.items.map((item) => (
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
                {item.text && <p className="text-white mt-2">{item.text}</p>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
