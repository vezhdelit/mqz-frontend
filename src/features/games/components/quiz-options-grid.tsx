import type { ExtendedQuizOption } from "@/types/quiz-options";
import type { Answer } from "@/types/answer";
import { QuizOption } from "./quiz-option";
import { isCorrectOption, isGivenOption } from "../utils/answer-utils";

interface QuizOptionsGridProps {
  options: ExtendedQuizOption[];
  selectedAnswers: string[];
  isAnswered: boolean;
  correctAnswers: Answer[];
  givenAnswers: Answer[];
  onSelectAnswer: (answerId: string) => void;
}

/**
 * Display grid of quiz options with interactive selection
 */
export function QuizOptionsGrid({
  options,
  selectedAnswers,
  isAnswered,
  correctAnswers,
  givenAnswers,
  onSelectAnswer,
}: QuizOptionsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option) => {
        const isSelected = selectedAnswers.includes(option.id);
        const isCorrect = isCorrectOption(option.id, correctAnswers);
        const isGiven = isGivenOption(option.id, givenAnswers);

        return (
          <QuizOption
            key={option.id}
            option={option}
            isSelected={isSelected}
            isAnswered={isAnswered}
            isCorrect={isCorrect}
            isGiven={isGiven}
            onSelect={onSelectAnswer}
          />
        );
      })}
    </div>
  );
}
