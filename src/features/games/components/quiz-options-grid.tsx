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
  answerType: "single_choice" | "multiple_choice";
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
  answerType,
  onSelectAnswer,
}: QuizOptionsGridProps) {
  const gridClassName = answerType === "single_choice" 
    ? "grid grid-cols-1 md:grid-cols-2 gap-4" 
    : "grid grid-cols-1 md:grid-cols-2 gap-4";

  return (
    <div className={gridClassName}>
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
